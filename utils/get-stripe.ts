

import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_LIVE_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error('Stripe publishable key is missing.');
      return null;
    }


    try {
      stripePromise = loadStripe(publishableKey)
    } catch (error) {
      console.error('Error loading Stripe:', error);
      throw error;
    }
  }

  return stripePromise;
};

export default getStripe()
