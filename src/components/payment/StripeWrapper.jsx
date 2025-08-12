import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../../utils/constants';

const stripePromise = loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);

function StripeWrapper({ children }) {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
}

export default StripeWrapper;