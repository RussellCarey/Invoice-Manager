const InvoiceModel = require("../models/InvoiceModel");
const Email = require("../utils/email");
const randomstring = require("randomstring");
const stripeController = require("./stripeController");
const dayjs = require("dayjs");

exports.getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await InvoiceModel.find();

    if (invoices) {
      res.json({
        status: "success",
        data: invoices,
      });
      //
    } else {
      res.json({
        message: "No invoices found..",
        status: "success",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleInvoice = async (req, res, next) => {
  try {
    const id = req.params.id;
    const foundItem = await InvoiceModel.findOne({ invoiceId: id });

    res.json({
      status: "success",
      data: foundItem,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const id = req.params.id;

    const foundItem = await InvoiceModel.findOne({ invoiceId: id });
    foundItem.invoiceId = req.body.invoiceId;
    foundItem.status = req.body.status || "pending";
    foundItem.billerId = req.body.billerId || "test";
    foundItem.billerUsename = req.body.billerUsename || "test";
    foundItem.billerStreet = req.body.billerStreet;
    foundItem.billerCity = req.body.billerCity;
    foundItem.billerPostCode = req.body.billerPostCode;
    foundItem.billerCountry = req.body.billerCountry;
    foundItem.clientName = req.body.clientName;
    foundItem.clientEmail = req.body.clientEmail;
    foundItem.clientStreetAddress = req.body.clientStreetAddress;
    foundItem.clientCity = req.body.clientCity;
    foundItem.clientPostCode = req.body.clientPostCode;
    foundItem.clientCountry = req.body.clientCountry;
    foundItem.clientIssueDate = req.body.clientIssueDate;
    foundItem.clientPaymentTerms = req.body.clientPaymentTerms;
    foundItem.clientPaymentTerms = await calculatePaymentDate(
      foundItem.clientIssueDate,
      foundItem.clientPaymentTerms
    );
    foundItem.projectDescription = req.body.projectDescription;
    foundItem.items = req.body.items;
    foundItem.total = req.body.items.reduce((t, item) => t + item.total, 0);

    foundItem.save();

    res.json({
      status: "success",
      data: foundItem,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.params.status;

    const foundItem = await InvoiceModel.findOne({ invoiceId: id });
    foundItem.status = status;
    foundItem.save();

    res.json({
      status: "success",
      data: foundItem,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSingleInvoice = async (req, res, next) => {
  try {
    const id = req.params.id;
    const foundItem = await InvoiceModel.findOneAndDelete({ invoiceId: id });

    res.json({
      status: "success",
      data: foundItem,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postNewInvoice = async (req, res, next) => {
  try {
    const newInvoice = await new InvoiceModel();
    newInvoice.invoiceId = await randomstring.generate(5).toUpperCase();
    newInvoice.status = req.body.status || "pending";
    newInvoice.billerId = req.body.billerId || "test";
    newInvoice.billerUsename = req.body.billerUsename || "test";
    newInvoice.billerStreet = req.body.billerStreet;
    newInvoice.billerCity = req.body.billerCity;
    newInvoice.billerPostCode = req.body.billerPostCode;
    newInvoice.billerCountry = req.body.billerCountry;
    newInvoice.clientName = req.body.clientName;
    newInvoice.clientEmail = req.body.clientEmail;
    newInvoice.clientStreetAddress = req.body.clientStreetAddress;
    newInvoice.clientCity = req.body.clientCity;
    newInvoice.clientPostCode = req.body.clientPostCode;
    newInvoice.clientCountry = req.body.clientCountry;
    newInvoice.clientIssueDate = req.body.clientIssueDate;
    newInvoice.clientPaymentTerms = req.body.clientPaymentTerms;
    newInvoice.clientPaymentTerms = await calculatePaymentDate(
      newInvoice.clientIssueDate,
      newInvoice.clientPaymentTerms
    );
    newInvoice.projectDescription = req.body.projectDescription;
    newInvoice.items = req.body.items;
    newInvoice.total = req.body.items.reduce((t, item) => t + item.total, 0);

    newInvoice.save();

    try {
      const email = await new Email(
        newInvoice.clientEmail,
        newInvoice.clientName,
        "test"
      );

      email.send("TEST EMAIL", newInvoice, "testEmail");
    } catch (error) {
      console.log(error);
    }

    res.json({
      status: "success",
      data: newInvoice,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.setUpPaymentPage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const foundItem = await InvoiceModel.findOne({ invoiceId: id });

    const session = await stripeController.StripeSession(foundItem);

    res.json({
      status: "success",
      data: session,
    });
  } catch (error) {
    console.log(error);
  }
};

const calculatePaymentDate = async (issueDate, paymentTerms) => {
  const unix = dayjs(issueDate).unix() * 1000;
  const updatedUnix = unix + 1000 * 60 * 60 * (paymentTerms * 24);
  const date = dayjs(updatedUnix).format("YYYY-MM-DD");
  return date;
};
