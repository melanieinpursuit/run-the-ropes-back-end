const checkName = (req, res, next) => {
    if (req.body.name) {
        next()
    } else {
        res.status(400).json({ Error: 'Name is Required!'})
    }
}

const validateURL = (req, res, next) => {
    if (req.body.image.substring(0, 8) === 'https://') {
        next()
    } else {
        res.status(400).json({ error: 'Link must have a https:// URL'})
    }
}

module.exports = { checkName, validateURL }