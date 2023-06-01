const router = require('express').Router()
const User = require('../models/User')
const Entry = require('../models/Entry')
const ObjectId = require('mongoose').Types.ObjectId;

function isAuthenticated(req, res, next) {
  console.log('testing for valid session')
    if (!req.session.user_id)
        return res.status(401).send({ error: "Please login first." })

    next();
}

// Get prompt
router.get('/prompt', isAuthenticated, async (req, res) => {
  console.log(' user is ', req.session.user_id);

    const user_id = req.session.user_id
    console.log({user})

    const user = await User.findById(user_id).populate()

    res.send({ user })
})

// Create an entry
router.post('/prompt', isAuthenticated, async (req, res) => {
    const user_id = req.session.user_id;

    const { prompt, entry } = req.body;
  
    try {
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).send({ error: 'User not found.' });
      }
  
      const newEntry = await Entry.create({
        prompt,
        entry,
        user: user._id,
      });
  
      user.entries.push(newEntry);
      await user.save();
  
      res.send({ entry: newEntry });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  });

// Get user's entries
router.get(`/entries/:id`, isAuthenticated, async (req, res) => {
    const user_id = req.session.user_id;
  
    try {
      // Retrieve entries for the current user
      const entries = await Entry.find({ user: user_id });
  
      res.send({ entries });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  });

// Edit an entry
router.put('/entries/:id/:id', isAuthenticated, async (req, res) => {
  const user_id = req.session.user_id
  try {
      const entry = await Entry.findByIdAndUpdate(new ObjectId(req.params.id),{
          ...req.body,
          user: user_id
      },{new: true})
      
      res.send({entries: entry })
      console.log({entries: entry })
  } catch (err) {
      res.status(500).send({ error: err })
  }
})
  
module.exports = router