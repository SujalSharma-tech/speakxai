const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["ANAGRAM", "MCQ", "READ_ALONG", "CONTENT_ONLY", "CONVERSATION"],
    required: true,
  },
  title: { type: String, required: true },
  solution: { type: String },
  anagramType: { type: String, enum: ["WORD", "SENTENCE"] },
  blocks: [
    {
      text: { type: String, required: true },
      showInOption: { type: Boolean, required: true },
      isAnswer: { type: Boolean, required: true },
    },
  ],
  options: [
    {
      text: { type: String, required: true },
      isCorrectAnswer: { type: Boolean, required: true },
    },
  ],
  siblingId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
