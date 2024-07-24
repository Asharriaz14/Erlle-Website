const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51PBVzUE7QptZTxfyCMDMGngPibN5lRkIQbrdtOUvotxlqMMxBFX6DXqRUFKvWAuh1dJOl4c8JAQOoaMxswgmLnAA00ZDDizUDW");
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("It is working");
});

app.post("/payment", (req, res) => {
    const { product, token } = req.body;
    console.log("Product", product);
    console.log("Price", product.price);

    const idempotencyKey = uuidv4();

    stripe.charges.create({
        amount: product.price * 100, // amount in cents
        currency: 'usd',
        source: token.id, // use token.id to charge the card directly
        receipt_email: token.email,
        description: `Purchase of ${product.name}`,
        shipping: {
            name: token.card.name,
            address: {
                country: token.card.address_country
            }
        }
    }, { idempotencyKey })
    .then(result => res.status(200).json(result))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Payment failed' });
    });
});

// Listen
app.listen(8282, () => console.log("LISTENING AT PORT 8282"));
