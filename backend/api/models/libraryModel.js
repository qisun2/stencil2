const mongoose = require("mongoose");

// define the schema for a sample, each sample has below properties.
const librarySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  libraryId: { type: String },
  sampleId: {type: String},
  projectId: { type: String },
  groupTag: {type: Map, of: String},
  libraryType: {type: String},
  libraryData: {type: Array, of: Map},
  createdBy: {type: String},
  createTimestamp: {type: Date},
  updatedBy: {type: String},
  updateTimestamp: {type: Date},
  status: {type: String}
}
, { collection: 'stencilLibraries' }
);

module.exports = mongoose.model("Library", librarySchema);