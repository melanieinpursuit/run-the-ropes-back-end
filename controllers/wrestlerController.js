const express = require('express')
const wrestlers = express.Router()
const {
    checkName, validateURL
} = require('../validations/checkWrestlers')
const commentsController = require('./commentsController.js')
wrestlers.use('/:wrestlerId/comments', commentsController)
const {
    getAllWrestlers,
    getWrestler,
    createWrestler,
    deleteWrestler,
    updateWrestler
} = require('../queries/wrestlers')

// GET ALL WRESTLERS
wrestlers.get('/', async (req, res) => {
    const allWrestlers = await getAllWrestlers();
    if (allWrestlers[0]) {
        res.status(200).json(allWrestlers)
    } else {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

// SHOW ONE WRESTLER 
wrestlers.get('/:id', async (req, res) => {
    const { id } = req.params;
    const wrestler = await getWrestler(id)
    if (!wrestler.message) {
        res.status(200).json(wrestler)
    } else {
        res.status(400).json({ error: 'Not Found'})
    }
})

// CREATE A WRESTLER
wrestlers.post('/', checkName, validateURL, async (req, res) => {
    let dataCopy = { ...req.body }
    const capitalizeNames = dataCopy.name 
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    dataCopy.name = capitalizeNames

    try {
        const wrestler = await createWrestler(dataCopy)
        res.status(200).json(wrestler)
    } catch (error) {
        res.status(500).json({ error: 'Error Creating Wrestler' })
    }
})

// DELETE A WRESTLER 
wrestlers.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedWrestler = await deleteWrestler(id);
        res.status(200).json(deletedWrestler)
    } catch (error) {
        res.status(404).json({ error: 'ID Not Found'})
    }
})

// UPDATE A WRESTLER
wrestlers.put('/:id', checkName, validateURL, async (req, res) => {
    try {
        const { id } = req.params
        const updatedWrestler = await updateWrestler(id, req.body)
        res.status(200).json(updatedWrestler)
    } catch (error) {
        res.status(404).json({ error: 'Wrestler Not Found!'})
    }
})

module.exports = wrestlers;