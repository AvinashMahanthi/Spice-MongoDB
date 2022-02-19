const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  teamSize: {
    type: Number,
    required: true,
  },
  graduationType: {
    type: String,
    required: true,
  },
  mentorName: {
    type: String,
    required: true,
  },
  mentorDesignation: {
    type: String,
    required: true,
  },
  teamLeaderName: {
    type: String,
    required: true,
  },
  teamLeaderEmail: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  alternateMobileNumber: {
    type: Number,
    required: true,
  },
  institutionName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  teamMembers: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectAbstract: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Response", responseSchema);
