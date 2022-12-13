import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe("pk_test_51LfITCSIwAzANlK4VI5XOc73CaaawmFEC0pBBPrkBJr4uVxSJsFMkE8tKEDxmnN2rr2p8wvLG7XJkoO6tCbHXyuG001db09QL2");
  }

  return stripePromise;
}

export default getStripe;