require('dotenv').config({ path: '.env.local' });
const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function run() {
  try {
    const options = {
      amount: 399,
      currency: "USD",
      receipt: "receipt_order_" + Date.now(),
    };
    const order = await instance.orders.create(options);
    console.log(order);
  } catch (error) {
    console.error(error);
  }
}
run();
