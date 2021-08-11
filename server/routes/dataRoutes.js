const express = require("express");
const stripeController = require("../controllers/stripeController");
const invoiceController = require("../controllers/invoiceController");

const router = express.Router();

router.get("/invoices", invoiceController.getAllInvoices);
router.get("/invoice/:id", invoiceController.getSingleInvoice);
router.delete("/invoice/:id", invoiceController.deleteSingleInvoice);
router.patch("/invoice/status/:id/:status", invoiceController.changeStatus);
router.patch("/invoice/:id", invoiceController.updateInvoice);

router.get("/invoice/payment/:id", invoiceController.setUpPaymentPage);

router.post("/newInvoice", invoiceController.postNewInvoice);

router.post("/stripewebhook", stripeController.webhook);

module.exports = router;
