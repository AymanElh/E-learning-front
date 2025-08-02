import React from 'react';
import PublicLayout from "../components/layout/public/PublicLayout.jsx";
import { BookOpenIcon, StarIcon, PlayCircleIcon, CheckCircleIcon, TrendingUpIcon } from 'lucide-react';

function Home() {
    const features = [
        {
            icon: <BookOpenIcon className="w-8 h-8 text-blue-500" />,
            title: "Expert-Led Courses",
            description: "Learn from industry professionals with real-world experience in their fields."
        },
        {
            icon: <PlayCircleIcon className="w-8 h-8 text-green-500" />,
            title: "Interactive Learning",
            description: "Engage with video lectures, quizzes, and hands-on projects to reinforce your learning."
        },
        {
            icon: <CheckCircleIcon className="w-8 h-8 text-purple-500" />,
            title: "Certificates",
            description: "Earn certificates upon course completion to showcase your new skills to employers."
        },
        {
            icon: <TrendingUpIcon className="w-8 h-8 text-orange-500" />,
            title: "Track Progress",
            description: "Monitor your learning journey with detailed progress tracking and analytics."
        }
    ];

    const stats = [
        { number: "10,000+", label: "Students Enrolled" },
        { number: "500+", label: "Courses Available" },
        { number: "50+", label: "Expert Instructors" },
        { number: "95%", label: "Completion Rate" }
    ];

    return (
        <PublicLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-6">
                        Unlock Your Potential with
                        <span className="block text-yellow-300 dark:text-yellow-400">Expert-Led Courses</span>
                    </h1>
                    <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-100 dark:text-gray-200">
                        Join thousands of learners worldwide and master new skills with our comprehensive
                        online learning platform. From beginner to expert, we have courses for every level.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition">
                            Start Learning Today
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 transition">
                            Browse Courses
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="p-6">
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
                                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our Platform?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            We provide everything you need to succeed in your learning journey
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg dark:shadow-gray-900/50 transition">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Popular Categories</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Explore our most sought-after course categories</p>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {['Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Photography'].map((category, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center hover:bg-blue-50 dark:hover:bg-blue-900/50 transition cursor-pointer">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpenIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-16 bg-gray-900 dark:bg-gray-950 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
                        <p className="text-xl text-gray-300 dark:text-gray-400">Join thousands of satisfied learners</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Web Developer",
                                content: "The courses are well-structured and easy to follow. I landed my dream job after completing the full-stack development course!",
                                rating: 5
                            },
                            {
                                name: "Michael Chen",
                                role: "Data Analyst",
                                content: "Excellent instructors and practical projects. The data science track gave me the skills I needed to transition careers.",
                                rating: 5
                            },
                            {
                                name: "Emily Rodriguez",
                                role: "UX Designer",
                                content: "The design courses are top-notch. The instructors provide valuable feedback and the community is very supportive.",
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-300 dark:text-gray-400 mb-4">"{testimonial.content}"</p>
                                <div>
                                    <div className="font-semibold text-white">{testimonial.name}</div>
                                    <div className="text-gray-400 dark:text-gray-500">{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 dark:bg-blue-800 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100 dark:text-blue-200">
                        Join our community of learners and take the first step towards achieving your goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 dark:bg-gray-100 dark:text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-white transition">
                            Sign Up Now
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 dark:hover:bg-gray-100 dark:hover:text-blue-700 transition">
                            View All Courses
                        </button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}

export default Home;