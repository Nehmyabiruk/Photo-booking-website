import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

/**
 * Create a payment intent for a deposit
 * @param {number} amount — in USD cents (e.g. 25000 = $250)
 * @param {object} metadata — booking metadata
 */
export async function createPaymentIntent(amount, metadata = {}) {
  return stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata,
  });
}

/**
 * Retrieve a payment intent
 */
export async function getPaymentIntent(paymentIntentId) {
  return stripe.paymentIntents.retrieve(paymentIntentId);
}

/**
 * Construct a Stripe webhook event
 */
export function constructWebhookEvent(body, signature) {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

export default stripe;
