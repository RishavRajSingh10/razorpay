var express = require('express');
var router = express.Router();
let Razorpay = require('razorpay')

var instance = new Razorpay({
  key_id: 'rzp_test_G1tJq2wwcY4Fnl',
  key_secret: 'gA42axOypq5sGzlNWnZICLB8',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/create/orderId', function(req, res, next) {
  var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send(order)
  });

});

router.post('/api/payment/verify',function(req,res){
  let razorpayPaymentId = req.body.response.razorpay_payment_id
  let razorpayOrderId = req.body.response.razorpay_order_id;
  let signature = req.body.response.razorpay_signature;
  let secret = 'gA42axOypq5sGzlNWnZICLB8'
  
var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');

const result = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
res.send(result)
})

module.exports = router;
