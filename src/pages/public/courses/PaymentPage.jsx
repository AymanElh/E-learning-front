import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {courseService} from "../../../services/courseService.js";
import {ArrowLeft, ShieldCheck, CreditCard, CheckCircle, XCircle} from "lucide-react";
import StripeWrapper from "../../../components/payment/StripeWrapper.jsx";
import PaymentForm from "../../../components/payment/PaymentForm.jsx";

function PaymentPage() {
    const { id} = useParams();
    const navigate = useNavigate();

    const [paymentStep, setPaymentStep] = useState('details');
    const [error, setError] = useState("");
    const [paymentData, setPaymentData] = useState(null);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        loadCourse();
    }, [id]);

    const loadCourse = async () => {
        try {
            setPaymentStep('loading');
            // Replace this with your actual course service call
            const response = await courseService.getCourseById(id);
            // console.log(response)
            if (response.success) {
                setCourse(response.data);
                setPaymentStep('details');
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            console.error("Error load the course: ", err);
            setError('Failed to load course details');
            setPaymentStep('error');
        }
    }

    function handleGoBack() {
        navigate(-1);
    }

    function handlePaymentSuccess(data) {
        setPaymentData(data);
        setPaymentStep('success');
    }

    function handlePaymentError(errorMessage) {
        setError(errorMessage);
        setPaymentStep('error');
    }

    function handleGoToCourse() {
        navigate(`/courses/${courseId}`);
    }

    if (paymentStep === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Loading course details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5"/>
                            <span>Back</span>
                        </button>

                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {paymentStep === 'success' ? 'Payment Complete' : 'Secure Checkout'}
                        </h1>

                        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                            <ShieldCheck className="w-5 h-5"/>
                            <span className="text-sm font-medium">Stripe Secured</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Course Summary */}
                    <div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-fit">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Order Summary
                        </h2>

                        {course && (
                            <>
                                <div className="flex space-x-4">
                                    <div
                                        className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CreditCard className="w-8 h-8 text-white"/>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                            by {course.instructor?.name || 'Instructor'}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Price:</span>
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                ${course.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between text-lg font-semibold">
                                        <span className="text-gray-900 dark:text-white">Total:</span>
                                        <span className="text-gray-900 dark:text-white">${course.price}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Payment Section */}
                    <div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        {paymentStep === 'details' && course && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Payment Information
                                </h2>

                                <StripeWrapper>
                                    <PaymentForm
                                        course={course}
                                        onSuccess={handlePaymentSuccess}
                                        onError={handlePaymentError}
                                    />
                                </StripeWrapper>
                            </div>
                        )}

                        {paymentStep === 'success' && (
                            <div className="text-center py-12">
                                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6"/>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Payment Successful!
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Congratulations! You have been enrolled in the course.
                                </p>

                                <div
                                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-green-800 dark:text-green-400">
                                        <strong>Order Number:</strong> {paymentData?.order_number}
                                    </p>
                                </div>

                                <button
                                    onClick={handleGoToCourse}
                                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
                                >
                                    Start Learning Now
                                </button>
                            </div>
                        )}

                        {paymentStep === 'error' && (
                            <div className="text-center py-12">
                                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6"/>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {error.includes('course') ? 'Course Not Found' : 'Payment Failed'}
                                </h3>
                                <p className="text-red-600 dark:text-red-400 mb-6">
                                    {error}
                                </p>
                                <div className="space-y-3">
                                    {!error.includes('course') && (
                                        <button
                                            onClick={() => {
                                                setPaymentStep('details');
                                                setError('');
                                            }}
                                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                                        >
                                            Try Again
                                        </button>
                                    )}
                                    <button
                                        onClick={handleGoBack}
                                        className="w-full px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        Go Back
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;