const router = require("express").Router();
const User = require("../models/User");
const validator = require('validator');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is in a valid format
    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: 'You must enter a valid email address' });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'A user with that email already exists.' });
    }

    // Create a new user
    const user = new User({ email, password });
    await user.save();

    req.session.user_id = user._id;
    console.log({ user });
    res.send({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  //   If no user is found, send error message
  if (!user) return res.status(402).send({ error: "User not found." });

  //   If password does not match, send error message
  const valid_password = await user.validatePass(req.body.password);
  if (!valid_password)
    return res.status(401).send({ error: "Your password does not match." });

  // Login user if both validations pass
  req.session.user_id = user._id;

  res.send({ user });
});

router.get("/logout", (req, res) => {
  req.session.destroy();

  res.send({ message: "You have successfully logged out." });
});

router.get("/", async (req, res) => {
  const user_id = req.session.user_id;

  if (!user_id) return res.send({ user: null });

  const user = await User.findById(user_id).populate({
    populate: "user",
    populate: "entries",
  });

  res.send({ user: user });
});

module.exports = router;
