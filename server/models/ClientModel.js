const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const ClientModel = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, "Please enter a name."],
  },
  clientEmail: {
    type: String,
    required: [true, "Please enter an email."], // minlength: 8,
    // // Never show up in any output to the client!
    // select: false,
  },
  clientStreetAddress: {
    type: String,
    required: [true, "Please enter a client street address."],
    // validate: {
    //   validator: function (el) {
    //     // Return true or false - If true return - only works on save
    //     return el === this.password;
    //   },
    //   message: "Passwords do not match.",
    // },
  },
  clientCity: {
    type: String,
    required: [true, "Please enter a client city."],
  },
  clientPostCode: {
    type: String,
    required: [true, "Please enter a client post code."],
    // unique: [true, "Email already exists."],
    // lowercase: true,
    // validate: [validator.isEmail, "Please enter a valid email."],
  },
  clientCountry: {
    type: String,
    required: [true, "Please enter a client's country."],
  },
});

const Client = mongoose.model("ClientModel", CLientModel);

module.exports = Client;
