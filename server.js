const express = require("express");
const cors = require("cors");
const path = require("path");
const stripeUtils = require("./server-utils/stripe/server.stripe.utils");
const firestore_server_utils = require("./server-utils/firestore/server.firestore.utils");
const compression = require("compression");
var enforce = require('express-sslify');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(compression());
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    express.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));
if (process.env.NODE_ENV === 'production') {
  app.use(compression);
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get("*", (req, res) => {
  const index = path.join(__dirname, "client/build", "index.html");
  res.sendFile(index);
});
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

app.post("/create-payment-intent", async (req, res) => {
  const { cartItems } = req.body;
  const paymentIntent = await stripeUtils.createPaymentIntent(cartItems);
  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  });
});
app.post("/update-payment-intent", async (req, res) => {
  const payload = req.body.payload.update;
  const id = req.body.payload.id;
  await stripeUtils.updatePaymentIntent(id, {
    payload,
  });
  res.status(200).send({ status: "OK" });
});
app.post("/cancel-payment-intent", async (req, res) => {
  const { id } = req.body;
  await stripeUtils.cancelPaymentIntent(id);
  res.status(200).send({ status: "OK" });
});
app.post("/create-order", async (req, res) => {
  const { id, items, customer, total } = req.body;
  await firestore_server_utils.createDocument("orders", id, {
    items,
    customer,
    id,
    PlacedAt: new Date().toString(),
    total,
  });
  res.status(200).send({ status: "OK" });
});
app.post("/webhook", async (request, response) => {
  const eventRaw = request.body;
  const headers = request.headers;
  const newEvent = await stripeUtils.verifyWebhookEvent(
    eventRaw,
    headers,
    response
  );
  stripeUtils.handleWebookEvents(newEvent);
  response.send();
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`🚀  Server running on port ${port}`);
});

// Uncomment to setup stripe store based on firestore database
// stripeUtils.createProducts({ createSKUs: true });
// stripeUtils.updateProducts({ updateSKUs: true });
