const { Schema, model } = require('mongoose');

const entrySchema = new Schema({
  prompt: {
    type: String,
  },
  entry: {
    type: String,
    required: true,
  },

  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]

});

const Entry = model('entry', entrySchema)

module.exports = Entry


