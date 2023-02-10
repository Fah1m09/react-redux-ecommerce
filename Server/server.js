require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173"
    })
)

const stripe = require("stripe")("sk_test_51MZA0uFGDT8rfu7eCdaKPoGh6aqSMw5fYxWy9udv3Wxk19bfMHmWXmzUCWilIJym3hG4bU1TP4TSTsSnQQlp2xqA00M6496pTq")

const storeItems = new Map([
    [1, {priceInCents: 100, name: "Product 1"}],
    [2, {priceInCents: 500, name: "Laptop"}]
])

exports.index = function(req, res){
  request("https://dummyjson.com/products", function(error, response, body) {
    var json = JSON.parse(body);
    res.render('main', {
      title: json.user_posts[0].post.title,
      sinatra: json.user_posts[0].post.body
    });
  });
};

app.post("/create-checkout-session", async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
              const storeItem = storeItems.get(item.id)
              return {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: storeItem.name,
                  },
                  unit_amount: storeItem.priceInCents,
                },
                quantity: item.quantity,
              }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        })
        res.json({ url: session.url })
    } catch (e) {

        res.status(500).json({error: e.message})
    }

})

app.listen(3000)