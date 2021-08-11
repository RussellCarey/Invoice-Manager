const path = require("path");
const nodemailer = require("nodemailer");
const AppError = require("../utils/AppError");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const pug = require("pug");
const { htmlToText } = require("html-to-text");

//? Notes AND FIRST CODE
//? Create a transporter
//? Provide the provider and the auth options. For gmail you need to use less secure app option
//? Mail options contain the user who your sending to's email and the email content.
//? Send the emaiL!

module.exports = class Email {
  constructor(email, name, url) {
    this.to = email;
    this.firstName = name;
    this.url = url;
    this.from = `Admin <${process.env.EMAIL_EMAILFROM}>`;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        // To activate use gmail 'less secure app' option.
        // Sendrid and mailgun are good options.
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject, invoice, template) {
    try {
      // 1) Render HTML based on a pug template
      const html = await pug.renderFile(
        `${__dirname}/../views/emails/${template}.pug`,
        {
          firstName: this.firstName,
          url: this.url,
          subject,
          invoice,
        }
      );

      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject: subject,
        html: html,
        text: htmlToText(html),
      };

      // 3) Create a transport and send email
      return await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }

  async sendPaymentConfirmEmail() {
    await this.send("Payment Complete", null, "paymentProcessed");
  }

  async sendForgotPasswordEmail() {
    await this.send("forgotPasswordEmail", "Forgot your password?");
  }
};
