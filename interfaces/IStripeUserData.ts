import Stripe from 'stripe';

export interface IStripeUserData extends Stripe.Subscription {
  paymentMethods: Stripe.PaymentMethod[];
}
