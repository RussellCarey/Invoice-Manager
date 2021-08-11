const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const InvoiceModel = new mongoose.Schema({
  invoiceId: {
    type: String,
  },
  status: {
    type: String,
  },
  billerId: {
    type: String,
    required: [true, "Biller ID not fouund"],
  },
  billerUsename: {
    type: String,
    required: [true, "Biller username not found"],
  },
  billerStreet: {
    type: String,
    required: [true, "Please enter an street address"],
  },
  billerCity: {
    type: String,
    required: [true, "Please enter a City."],
  },
  billerPostCode: {
    type: String,
    required: [true, "Please enter a post code."],
    // unique: [true, "Email already exists."],
    // lowercase: true,
    // validate: [validator.isEmail, "Please enter a valid email."],
  },
  billerCountry: {
    type: String,
    required: [true, "Please enter a Country."],
  },
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
  clientIssueDate: {
    type: String,
    required: [true, "Please enter the issue date."],
  },
  clientPaymentTerms: {
    type: String,
    required: [true, "Please enter payment terms."],
  },
  projectDescription: {
    type: String,
    required: [true, "Please enter a project description."],
  },
  items: {
    type: Array,
    required: [true, "Please enter at least one item."],
  },
  total: {
    type: String,
  },
  payed: {
    type: Boolean,
  },
});

const Invoice = mongoose.model("Invoice", InvoiceModel);

module.exports = Invoice;
