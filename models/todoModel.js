const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todoName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
