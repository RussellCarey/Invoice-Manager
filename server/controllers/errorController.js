const AppError = require("../utils/AppError");

//? Notes
//? My own simplifed version of Jonas global error handler.
//? In producting it gets a custom message to display when using ArrError, blank is a generic message.
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    const error = { ...err };
    let errorMessage;

    if (error.customMessage) {
      errorMessage = error.customMessage;
    } else {
      errorMessage =
        "Something unusual seems to have occured. Please try again or contact us if it persists!";
    }

    return res.status(err.statusCode).render("errorPage", {
      title: "Error",
      errorCode: err.statusCode,
      errorMessage: errorMessage,
    });
  }

  if (process.env.NODE_ENV === "development") {
    const errorMessage = err.message;
    return next(new AppError(`Something went wrong!::: ${errorMessage}`, 111));
  }
};
