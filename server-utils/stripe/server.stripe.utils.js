const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.join(__dirname, "../../", ".env") });
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_ENDPOINT_SECRET_KEY;
const firestore = require("../firestore/server.firestore.utils");

const formatCollectionsForStripe = (collections) => {
  let formatedData = [];
  collections.map((data) => {
    let newItem = {};
    for (let i = 0; i < data.items.length; i++) {
      const { name, id, imageUrl, price } = data.items[i];
      newItem = { name, id, images: [imageUrl], price: price * 100 };
      formatedData.push(newItem);
    }
  });
  return formatedData;
};

const fetchProductsList = async () => {
  try {
    return await stripe.products.list({
      limit: 100000,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const createProduct = async ({ id, name, images }) => {
  try {
    await stripe.products.create({ type: "good", id, name, images });
  } catch (error) {
    console.log(error.message);
  }
};
const createPrice = async ({ id, price }) => {
  try {
    await stripe.prices.create({
      unit_amount: price,
      currency: "usd",
      product: id,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const updateProduct = async (product) => {
  const { productId, name, images } = product;
  try {
    return await stripe.products.update(productId.toString(), { name, images });
  } catch (error) {
    console.log(error.message);
  }
};

const updatePrice = async (priceId, unit_amount, productId) => {
  try {
    await stripe.prices.update(priceId, {
      active: false,
    });
    return await stripe.prices.create({
      unit_amount,
      currency: "usd",
      product: productId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

async function createSKUs(product) {
  const { id, price } = product;
  try {
    await stripe.skus.create({
      price,
      currency: "usd",
      inventory: { type: "infinite" },
      product: id,
    });
  } catch (error) {
    console.log(error.message);
  }
}

const updateSKU = async ({ id, price }) => {
  try {
    await stripe.skus.update(id, { price });
  } catch (error) {
    console.log(error.message);
  }
};

const fetchSKUs = async () => {
  try {
    return await stripe.skus.list({ limit: 10000 });
  } catch (error) {
    console.log(error.message);
  }
};

const selectUniqueProducts = (stripeProductsList, firestoreList) => {
  const stripeProductsIdsList = stripeProductsList.data.map(({ id }) =>
    Number.parseInt(id)
  );
  return firestoreList.filter((firestoreItem) => {
    if (stripeProductsIdsList.includes(firestoreItem.id) == false) {
      return firestoreList.find((item) => item.id == firestoreItem.id);
    }
  });
};

const fetchFormatedFirebaseList = async () => {
  try {
    const collection = await firestore.fetchCollection();
    return formatCollectionsForStripe(collection);
  } catch (error) {
    console.log(error.message);
  }
};

const fetchProductsPricesList = async () => {
  try {
    return await stripe.prices.list({
      limit: 1000,
    });
  } catch (error) {
    console.log(error.message);
  }
};

async function createProducts(options) {
  const firebaseProductsList = await fetchFormatedFirebaseList();
  const stripeProductsList = await fetchProductsList();
  const payload = selectUniqueProducts(
    stripeProductsList,
    firebaseProductsList
  );
  if (payload.length > 0) {
    console.log("Adding new stripe products");
    for (let i = 0; i < payload.length; i++) {
      switch (true) {
        case options.createSKUs:
          await createProduct(payload[i]);
          await createSKUs(payload[i]);
          break;
        case options.createPrices:
          await createProduct(payload[i]);
          await createPrice(payload[i]);
        default:
          console.log(
            `Missing parameter. Pass the object like '{withSKUs==true}' to create product with SKUs`
          );
      }
    }
  } else {
    console.log("Stripe products are up to date");
  }
}

const createStripePriceProductList = (stripePriceList, stripeProductList) => {
  const prices = stripePriceList.data.map(({ unit_amount, product, id }) => {
    return { price: unit_amount, id: Number.parseInt(product), priceId: id };
  });
  const products = stripeProductList.data.map(({ id, images, name }) => {
    return { name, id: Number.parseInt(id), images };
  });
  return products.map((product) => {
    const priceListId = prices.findIndex((obj) => {
      if (obj.id == product.id) {
        return obj;
      }
    });
    return {
      ...product,
      price: prices[priceListId].price,
      priceId: prices[priceListId].priceId,
    };
  });
};

async function updateProducts(options) {
  const firebaseProductsList = await fetchFormatedFirebaseList();
  switch (true) {
    case options.updatePrices:
      const stripeProductsList = await fetchProductsList();
      const stripeProductsPricesList = await fetchProductsPricesList();

      const stripeList = createStripePriceProductList(
        stripeProductsPricesList,
        stripeProductsList
      );

      const updatePayload = firebaseProductsList
        .map(({ id, images, name, price }) => {
          let updatedProduct = {};
          const stripeProductId = stripeList.findIndex((obj) => {
            if (obj.id == id) {
              return obj;
            }
          });
          const stripeProduct = stripeList[stripeProductId];
          if (stripeProduct.images[0] !== images[0]) {
            updatedProduct = { ...updatedProduct, images: images[0] };
          }
          if (stripeProduct.name !== name) {
            updatedProduct = { ...updatedProduct, name: name };
          }
          if (stripeProduct.price !== price) {
            updatedProduct = { ...updatedProduct, price: price };
          }
          if (Object.keys(updatedProduct).length === 0) {
            return false;
          } else {
            return {
              productId: id,
              images,
              name,
              price,
              priceId: stripeList[stripeProductId].priceId,
            };
          }
        })
        .filter((item) => item);
      if (updatePayload.length > 0) {
        console.log("Updating stripe products");
        for (let i = 0; i < updatePayload.length; i++) {
          const { name, productId, images, price, priceId } = updatePayload[i];
          await updateProduct({ name, productId, images });
          await updatePrice(priceId, price, productId);
        }
      } else {
        console.log("Product and prices are up to date");
      }
      break;
    case options.updateSKUs:
      const SKUs = await fetchSKUs();
      const updatePayloadSKUs = SKUs.data
        .map(({ id, product, price }) => {
          let updatedSKUs = {};
          const product_id = Number.parseInt(product);
          const firebase_id = firebaseProductsList.findIndex((obj) => {
            if (obj.id == product_id) {
              return obj;
            }
          });
          if (firebaseProductsList[firebase_id].price !== price) {
            updatedSKUs = {
              ...updatedSKUs,
              price: firebaseProductsList[firebase_id].price,
            };
          }
          if (Object.keys(updatedSKUs).length === 0) {
            return false;
          } else {
            return {
              id,
              product,
              price: firebaseProductsList[firebase_id].price,
            };
          }
        })
        .filter((item) => item);

      if (updatePayloadSKUs.length > 0) {
        console.log("Updating stripe SKUs");
        for (let i = 0; i < updatePayloadSKUs.length; i++) {
          const { id, price } = updatePayloadSKUs[i];
          await updateSKU({ id, price });
        }
      } else {
        console.log("SKUs are up to date");
      }
      break;
    default:
      console.log(`Missing parameter object with options.`);
  }
}

const calculateOrderAmount = async (items) => {
  const SKUs = await fetchSKUs();
  const parsedPriceAndQuantity = items.map(({ id, quantity }) => {
    const product_id = Number.parseInt(id);
    const item_id = SKUs.data.findIndex((obj) => {
      if (obj.product == product_id) {
        return obj;
      }
    });
    return { price: SKUs.data[item_id].price, quantity };
  });
  const totalPrice = parsedPriceAndQuantity
    .map(({ price, quantity }) => price * quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  return totalPrice;
};

async function createPaymentIntent(items) {
  try {
    return await stripe.paymentIntents.create({
      amount: await calculateOrderAmount(items),
      currency: "usd",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function updatePaymentIntent(id, { payload }) {
  if ("items" in payload) {
    try {
      return await stripe.paymentIntents.update(id, {
        amount: await calculateOrderAmount(payload.items),
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      return await stripe.paymentIntents.update(id, { ...payload });
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function cancelPaymentIntent(id) {
  try {
    return await stripe.paymentIntents.cancel(id);
  } catch (error) {
    console.log(error.message);
  }
}

async function verifyWebhookEvent(webhookRawBody, headers, response) {
  if (webhookSecret) {
    const webhookStripeSignatureHeader = headers["stripe-signature"];
    let event;
    try {
      event = await stripe.webhooks.constructEvent(
        webhookRawBody,
        webhookStripeSignatureHeader,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
    console.log(event.type, "Success:", event.id);
    return event;
  }
}

function handleWebookEvents(event) {
  switch (event.type) {
    case "charge.succeeded":
    case "payment_intent.created":
      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(
        `✅ PaymentIntent for ${paymentIntent.amount / 100}$ was successful!`
      );
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      break;
    default:
      console.log(`⚠️  Unhandled event type ${event.type}.`);
  }
}

module.exports = {
  verifyWebhookEvent,
  handleWebookEvents,
  createProducts,
  updateProducts,
  createPaymentIntent,
  updatePaymentIntent,
  cancelPaymentIntent,
};
