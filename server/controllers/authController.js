const crypto = require("crypto");
const { promisify } = require("util");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const Email = require("../utils/email");

//? Notes
//? This function uses the sign method to create a JWT from the user ID, secret and a expiry time.
//? It is then sent along later to the  client
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//? Notes
//? Function that creates a new token and sends to in a res
//? A COOOOKKKIEE is a small piece of text that servers can send the to client and automaticall stores a cookie it recieves and then
//? sends it back to the SERVER IT CAME FROM.
//? SET EXPIRES as the current time now plus the date converted to milliseconds.
//? Remove password from the user in req so it doesnt show up
//? Make it so the cookie is only send over secure HTTPS: secure
//? Make it so the browser cannot change the cookie only read it: httpOnly
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

//? Notes
//? Sign up first creates a user from the passed in information to the req.bodyp5.BandPass()
//? It then tries to create a user to the database using .Create
//?
//? Then it uses the sign token function to create a token based on this new user mongo _id. Then send to client.
exports.signup = async (req, res, next) => {
  try {
    const newUser = await UserModel.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const url = "none";
    await new Email(newUser, url).sendWelcome();

    createSendToken(newUser, 201, req, res);
  } catch (error) {
    console.log(error);
    return next(
      new AppError("Sorry! An error occured, please try again!", 401)
    );
  }
};

//? Notes
//? On login it first gets the entered email and password from the login data
//? It then checks if the email or password is empty
//? USING find it then tries to track the user down by its unqiue email and its password (we have the pw hidden from output so thast why you use +password)
//! correctPassword is a method put onto the model to BCRYPT compare the password entered and that on the databasep5.BandPass()
//? If it is okay the token is the sent to the user and the user will be logged in..
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return new AppError("Please provide email and password!", 400);
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("Incorrect email or password", 401));

    createSendToken(user, 201, req, res);
  } catch (error) {
    return next(new AppError("Error signing in, please try again.", 401));
  }
};

//? Notes
//? Send a false cookie with logout instead of a JWT and with a short expiry time so it 'goes off' quickly.
//? Send a success
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 50),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

//? Notes
//? Create a token in the scope of this entire function
//? Check if inside the header authorization it exists AND starts with Bearer (convention for tokens).
//? If it does remove the bearer from the data and just keep the token number?
//? If there is no token return an error
//? Decode the jwt token using the secret used to encode it.
//? Find the current user using the ID retrieved from the decoded token.
//? Check to see if the user has changed his PW in the meatime using the METHOD put onto the user model.
//? Set req.user as the new user information to use.
//! ALSO check the saved cookies for the JWT (needs cookie parse)
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Split the Bearer and token apart and get the token which is the second part.
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError("User is not logged in", 403));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("Problem with credentials, Please sign in again.", 401)
      );
    }

    if ((await currentUser.changedPasswordAfter(decoded.iat)) == true) {
      return next(new AppError("Sorry, Please log in again.", 401));
    }

    res.locals.user = currentUser;
    req.user = currentUser;

    next();
  } catch (error) {
    return next(
      new AppError("You do not have permisssion to access this page!", 403)
    );
  }
};

//? Notes
//? This seems to be for pages that dont require protection or use of sensitive data.
//? This only checks if the user is logged in and not if the page is special.
//? There is no error as we can just send them to the page anyway and they wont ne logged in or anything.
//! Sets req.locals. use as the user - this is how pug can get the data as locals is passed in.
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await UserModel.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (await currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER - REQ.LOCALS allows pug templates to have access to vars inside them.
      //! So the user data can be accessed using the pug templates

      res.locals.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }

  // If not logged in, just go to the page and show non logged in user stuff. Protected routes need PROTECTING
  next();
};

//? Notes
//? Restricts the route to a user with a certain role or status.
//? We neeed to pass in the data so we wrap the req, res in a function and pass that the roles that are ALLOWED!
//? If the roles include the role THE USER HAS then next --- If not pull an error.
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Sorry, you do not have permission for this.", 401)
      );
    }
    next();
  };
};

//? Notes
//? First get the user by the email provided in the body
//? User the METHOD to create a reset token and encrypt it, que it up to be saved and then return the unencrypted password
//? Await user.save - This saves reset token etc to the database - validateBeforeSave false means we dont need to provide all required fields again.
//? Set the reset url for that user - using the reset token.
//? Set the message you will send the user.
//? Try to send the email using the UTILITY sendMail function.
//? IF IT FAILS RESET THE USERS PASSWORD RESETTING DETAILS -- in another catch block.
exports.forgotPassword = async (req, res, next) => {
  let user;
  try {
    user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return next(new AppError("No user with this email address", 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    await new Email(user, resetToken).sendForgotPasswordEmail();

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    user.passResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("", 403));
  }
};

//? Notes
//? Get the token from params -- route/:param
//? Has the token that we have recieved in the email (so we can compare it with the servers hashed one)
//?  Find the user based on the HASHED token only and make sure the token hasnt expired.
//? Que up the change to the user; Adding the new password and reseting the times
//? Save the user to the DB
//? Sign a NEW token as the PW has changed.
//? Return the token to the client

exports.resetPassword = async (req, res, next) => {
  try {
    // Encypt the non encrypted one from return to the encrypted one same as the DB to compare
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new AppError("Error with reset token, please send another request", 400)
      );
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    createSendToken(user, 201, req, res);

    res.status(500).json({
      status: "success",
      message: "Password changed okay.",
    });
  } catch (error) {
    console.log(error);
    return next(
      new AppError("Error with reset token, please send another request.", 500)
    );
  }
};

//? Notes
//? Get the user USER IS IN REQ BECAUSE OF PROTECT
//? Check if the user is there and the password is correcting using the method to check the encryption.
//? Update the scheme with the new password information
//? Save that new password using save();
//! Do not use findByIdAndUpdate as it will not have access to 'this' - always use save when doing passwords.
//? Sign a new token and send it back to the client
exports.updatePassword = async (req, res, next) => {
  try {
    // 1) Get user from collection
    const user = await UserModel.findById(req.user.id).select("+password");

    if (
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError("Your current password is wrong.", 401));
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();

    createSendToken(user, 200, req, res);
  } catch (error) {
    return next(
      new AppError(
        "Error updating password. Check your inputs are correct and try again.",
        500
      )
    );
  }
};
