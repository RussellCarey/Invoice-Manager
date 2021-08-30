const stripe = require("stripe")("");
const Email = require("../utils/email");
const InvoiceModel = require("../models/InvoiceModel");

exports.StripeSession = async (invoice) => {
  const items = invoice.items;
  if (!items) return;

  const stripeLineItems = items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: stripeLineItems,
      mode: "payment",
      success_url: `${process.env.STRIPE_SUCCESS_URL}`,
      cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
      client_reference_id: invoice.invoiceId,
    });

    return session;
  } catch (error) {
    console.log(error);
  }
};

// Installed the stripe CLI, logged in and then used;;
// stripe listen --forward-to http://localhost:8080/webhook
// This allows to listen on the local host..
// This then returned a key which is saved in the env.
exports.webhook = async (req, res) => {
  console.log("activating webhook");
  // The req headers contain, host accept etc. We want the signiture from it.
  // Someone from the outside is poisting to it..
  const sig = req.headers["stripe-signature"];
  if (!sig) return;

  const event = req.body;
  if (!event) return;

  // let event;
  let session;

  // If it is checkout completed (payment went through) do this..
  if (event.type === "checkout.session.completed") {
    session = event.data.object;
    console.log("event data", session);
    // Send payment confirm email
    await SendConfirmEmail(session);

    // Set invoice in database to paid
    await setinvoiceToPaid(session);
  }

  res.json({
    data: session,
  });
};

const SendConfirmEmail = async (customer) => {
  const clientEmail = customer.customer_details.email;

  try {
    const email = await new Email(clientEmail, "valued client!", "test");

    email.sendPaymentConfirmEmail();
  } catch (error) {
    console.log(error);
  }
};

// WE CAN SET A client_reference_id MANUALLY ( AS ABOVE )
const setinvoiceToPaid = async (session) => {
  try {
    const invoiceId = session.client_reference_id;
    const invoice = await InvoiceModel.findOne({ invoiceId: invoiceId });
    invoice.status = "paid";
    await invoice.save();
  } catch (error) {
    console.log(error);
    console.log("ERROR CHANGING STATUS");
  }
};
