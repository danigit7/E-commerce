import stripe from '../config/stripe.js';
import Order from '../models/Order.js';

// @desc    Create Stripe checkout session
// @route   POST /api/stripe/create-checkout-session
// @access  Private
export const createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Create line items for Stripe
    const lineItems = order.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/order-success/${orderId}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout?cancelled=true`,
      client_reference_id: orderId,
      metadata: {
        orderId: orderId,
        userId: req.user._id.toString(),
      },
    });

    // Update order with session ID
    order.paymentDetails.stripeSessionId = session.id;
    await order.save();

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Stripe webhook handler
// @route   POST /api/stripe/webhook
// @access  Public (but verified by Stripe signature)
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId);

      if (order) {
        order.paymentStatus = 'paid';
        order.paymentDetails.stripePaymentIntentId = session.payment_intent;
        await order.save();

        console.log(`Payment successful for order ${orderId}`);
      }
    } catch (error) {
      console.error('Error updating order after payment:', error);
    }
  }

  res.json({ received: true });
};

// @desc    Get payment status
// @route   GET /api/stripe/payment-status/:orderId
// @access  Private
export const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

