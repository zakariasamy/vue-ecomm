const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51HX8jSKFE4EtiRqmBVCrh3nJQ9zFbQO1etCieopLhCcnsg9IUdxqI90dcI4oZpKVJ410D12WvrFKSQ7iqDXuspQT00NO3EUKqp');
const YOUR_DOMAIN = 'http://localhost:8080';
const cors = require('cors')({origin: true});

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
   });


exports.CheckoutSession = functions.https.onRequest(async(request, res) => {
    cors(request, res, async () => {

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Stubborn Attachments',
                  images: ['https://i.imgur.com/EHyR2nP.png'],
                },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}/success.html`,
          cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });
        res.json({ id: session.id });
    });
});