const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// var validateEmail = function (email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email)
// };

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email); // Use validator.isEmail to validate email format
      },
      message: 'You must enter a valid email address'
    }
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  entries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'entry'
    }
  ]
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
}

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const encrypted_password = await bcrypt.hash(this.password, 10);

    this.password = encrypted_password;
    return next();
  }
  next()
});

userSchema.methods.validatePass = async function (provided_password) {
  const is_valid = await bcrypt.compare(provided_password, this.password);
  return is_valid;
}

const User = model('user', userSchema)

module.exports = User

