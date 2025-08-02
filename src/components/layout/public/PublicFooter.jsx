import React from 'react';
import {Link} from 'react-router-dom';
import {FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, MapPinIcon} from 'lucide-react';

function PublicFooter() {
    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-blue-400">EduLearn</h3>
                        <p className="text-gray-300 mb-4">
                            Empowering learners worldwide with expert-led courses and cutting-edge technology.
                            Your journey to success starts here.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <FacebookIcon className="w-5 h-5"/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <TwitterIcon className="w-5 h-5"/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <InstagramIcon className="w-5 h-5"/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <LinkedinIcon className="w-5 h-5"/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-blue-400 transition">Home</Link>
                            </li>
                            <li>
                                <Link to="/courses" className="text-gray-300 hover:text-blue-400 transition">All
                                    Courses</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition">About
                                    Us</Link>
                            </li>
                            <li>
                                <Link to="/instructors"
                                      className="text-gray-300 hover:text-blue-400 transition">Instructors</Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition">Blog</Link>
                            </li>
                            <li>
                                <Link to="/contact"
                                      className="text-gray-300 hover:text-blue-400 transition">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Popular Categories</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/categories/web-development"
                                      className="text-gray-300 hover:text-blue-400 transition">Web Development</Link>
                            </li>
                            <li>
                                <Link to="/categories/data-science"
                                      className="text-gray-300 hover:text-blue-400 transition">Data Science</Link>
                            </li>
                            <li>
                                <Link to="/categories/design"
                                      className="text-gray-300 hover:text-blue-400 transition">Design</Link>
                            </li>
                            <li>
                                <Link to="/categories/business"
                                      className="text-gray-300 hover:text-blue-400 transition">Business</Link>
                            </li>
                            <li>
                                <Link to="/categories/marketing"
                                      className="text-gray-300 hover:text-blue-400 transition">Marketing</Link>
                            </li>
                            <li>
                                <Link to="/categories/photography"
                                      className="text-gray-300 hover:text-blue-400 transition">Photography</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPinIcon className="w-5 h-5 text-blue-400"/>
                                <span className="text-gray-300">123 Education St, Learning City, LC 12345</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <PhoneIcon className="w-5 h-5 text-blue-400"/>
                                <span className="text-gray-300">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MailIcon className="w-5 h-5 text-blue-400"/>
                                <span className="text-gray-300">info@edulearn.com</span>
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="mt-6">
                            <h5 className="text-sm font-semibold mb-2">Subscribe to Newsletter</h5>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 dark:border-gray-700 bg-gray-950 dark:bg-black">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-2 md:mb-0">
                            © 2024 EduLearn. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition">Privacy
                                Policy</Link>
                            <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition">Terms of
                                Service</Link>
                            <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition">Cookie
                                Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default PublicFooter;