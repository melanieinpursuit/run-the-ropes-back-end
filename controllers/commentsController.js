const express = require('express')
const comments = express.Router( {mergeParams: true})
const {
    getAllComments,
    getComment,
    createComment,
    deleteComment,
    updateComment
} = require ('../queries/comments')

// GET ALL COMMENTS
comments.get('/', async (req, res) => {
    const { wrestlerId } = req.params;

    const allComments = await getAllComments(wrestlerId)
    if (allComments[0]) {
        res.status(200).json(allComments)
    } else {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// SHOW ONE COMMENT
comments.get('/:id', async (req, res) => {
    const { id } = req.params;
    const comment = await getComment(id)
    if (!comment.message) {
        res.status(200).json(comment)
    } else {
        res.status(400).json({ error: 'Not Found'})
    }
})

// CREATE A COMMENT
comments.post('/', async (req, res) => {
    try {
        const comment = await createComment(req.body)
        res.status(200).json(comment)
    } catch (error) {
        return res.status(500).json({ error: 'Error leaving comment.' })
    }
})

// DELETE A COMMENT
comments.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedComment = await deleteComment(id)
        res.status(200).json(deletedComment)
    } catch (error) {
        res.status(404).json({ error: 'Comment not found!' })
    }
})

// UPDATE A COMMENT
comments.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedComment = await updateComment(id, req.body)
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(404).json({ error: 'Comment not found!'} )
    }
})

module.exports = comments;