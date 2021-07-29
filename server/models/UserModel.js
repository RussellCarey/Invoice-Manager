const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a full name."],
  },
  username: {
    type: String,
    required: [true, "Please enter a username."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: [true, "Email already exists."],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email."],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "guide", "lead-guide", "admin"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlength: 8,
    // Never show up in any output to the client!
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      validator: function (el) {
        // Return true or false - If true return - only works on save
        return el === this.password;
      },
      message: "Passwords do not match.",
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

//? Notes
//? If we didnt modify the password property or we have created a new document - next
//? If not then change the date / time of passwordChangedAt to now
//? Soetimes the JWT is a little slow so put it back a second to make sure token is created after PW has changed.
UserModel.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//? Notes
//? First we only run the function of it password has been added anew or is going to be modified.
//? Set the password as an ENCYPTED HASED passwordp5.BandPass()
//? Set password confirm as undefiened as we dont need it anymore, its just used to check the user has double checked their password.
UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//? Notes
//? Check the password being input is correct after being checked by the encrypter.
UserModel.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//? Notes
//? Check if the password has been changed after the token has expired?
UserModel.methods.changedPasswordAfter = async function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimestamp;
  }
  // False means not changed
  return false;
};

//? Notes
//? First create a random string to use as the temp reset token.
//? Then encrypt it and set it to the users account
//? Set the expiry time as date.now plus 10 minutes in miliseconds.
//? Return the UNENCRYPTED key for the user?
//? ONLY SAVED ENCRYPTED DATA TO THE DB
//! Return the not encrypted reset token as we send that to the user - we then compare THAT to the encypted one in the database

UserModel.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  console.log(resetToken);
  console.log(this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model("User", UserModel);

module.exports = User;
