const router = require('express').Router()
const User = require('../models/User')
const Entry = require('../models/Entry')
const ObjectId = require('mongoose').Types.ObjectId;

function isAuthenticated(req, res, next) {
    if (!req.session.user_id)
        return res.status(401).send({ error: "Please login first." })

    next();
}

// Get prompt
router.get('/prompt', isAuthenticated, async (req, res) => {
    const user_id = req.session.user_id

    const user = await User.findById(user_id).populate()

    res.send(user)
})

// Get user's entries
router.get('/entries', isAuthenticated, async (req, res) => {
    const user_id = req.session.user_id

    const user = await User.findById(user_id).populate('entries')

    res.send(user.entries)
})

module.exports = router