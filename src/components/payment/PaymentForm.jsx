import {useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {Lock, Loader} from 'lucide-react';
import {paymentService} from '../../services/paymentService';

const cardElementOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#8493ff',
            '::placeholder': {color: '#aab7c4'},
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        },
        invalid: {color: '#9e2146'},
    },
    hidePostalCode: true
};

function PaymentForm({course, onSuccess, onError}) {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [cardholderName, setCardholderName] = useState('');
    const [cardError, setCardError] = useState('');

    const handleSubmit = async () => {
        if (!stripe || !elements || !cardholderName.trim()) {
            setCardError('Please enter cardholder name');
            return;
        }

        setLoading(true);
        setCardError('');

        try {
            // Step 1: Create payment intent
            const paymentIntentResponse = await paymentService.createPaymentIntent(course.id);

            if (!paymentIntentResponse.success) {
                throw new Error(paymentIntentResponse.message);
            }

            const {client_secret} = paymentIntentResponse.data;

            // Step 2: Confirm payment with Stripe
            const {error, paymentIntent} = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {name: cardholderName},
                }
            });

            if (error) {
                throw new Error(error.message);
            }

            // Step 3: Confirm with backend
            if (paymentIntent.status === 'succeeded') {
                const confirmResponse = await paymentService.confirmPayment(paymentIntent.id);

                if (!confirmResponse.success) {
                    throw new Error(confirmResponse.message);
                }

                onSuccess(confirmResponse.data);
            }

        } catch (err) {
            onError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCardChange = (event) => {
        setCardError(event.error ? event.error.message : '');
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cardholder Name
                </label>
                <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Card Information
                </label>
                <div
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700">
                    <CardElement
                        options={cardElementOptions}
                        onChange={handleCardChange}
                    />
                </div>
                {cardError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {cardError}
                    </p>
                )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-400">
                    <Lock className="w-4 h-4"/>
                    <span className="text-sm font-medium">
                        Your payment information is secure and encrypted by Stripe
                    </span>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={!stripe || loading || !cardholderName.trim()}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
                {loading ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin"/>
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <Lock className="w-5 h-5"/>
                        <span>Pay ${course?.price}</span>
                    </>
                )}
            </button>
        </div>
    );
}

export default PaymentForm;