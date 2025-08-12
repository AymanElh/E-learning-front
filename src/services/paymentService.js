import api from './api.js';

export const paymentService = {
    async createPaymentIntent(courseId, paymentProvider = "stripe") {
        try {
            const response = await api.post('/payments/create-intent', {
                course_id: courseId,
                payment_provider: paymentProvider
            });

            return response.data;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create payment intent'
            };
        }
    },
    async confirmPayment(paymentIntentId) {
        try {
            const response = await api.post('/payments/confirm', {
                payment_intent_id: paymentIntentId
            });
            return response.data;
        } catch (error) {
            console.error('Error confirming payment:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to confirm payment'
            };
        }
    }
}