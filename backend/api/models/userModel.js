const mongoose = require("mongoose");

// define the schema for a sample, each sample has below properties.
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String },
  userEmail: {type: String},
  userPassword: { type: String },
  role: {type:String},
  authMode: { type: String },
  projects: {type: String },
  createTimestamp: {type: Date},
  updateTimestamp: {type: Date},
  status: {type: String},
}
, { collection: 'stencilUsers' }
);

module.exports = mongoose.model("User", userSchema);