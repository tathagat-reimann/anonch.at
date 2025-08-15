"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
    const [emailRevealed, setEmailRevealed] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Obfuscated email construction to avoid bot scraping
        const parts = ['contact', '@', 'anonch', '.', 'at'];
        setEmail(parts.join(''));
    }, []);

    const revealEmail = () => {
        setEmailRevealed(true);
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            // You could add a toast notification here if you want
        } catch (err) {
            console.error('Failed to copy email: ', err);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 p-4">
            <section className="text-gray-400 bg-gray-900 body-font rounded-md">
                <div className="container px-5 py-12 sm:py-24 mx-auto flex flex-wrap">
                    <h2 className="sm:text-3xl text-2xl text-white font-medium title-font mb-2 md:w-2/5">
                        Contact Us
                    </h2>
                    <div className="md:w-3/5 md:pl-6 h-80 overflow-y-auto pr-4">
                        <p className="leading-relaxed text-base mb-6">
                            Have questions, feedback, or need support? We're here to help while respecting your privacy.
                        </p>
                        
                        <div className="space-y-6 text-gray-300">
                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Get in Touch</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    For any inquiries, technical support, or feedback about anonch.at, please reach out to us via email.
                                </p>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-400 mb-2">Email Address:</p>
                                            {!emailRevealed ? (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-white font-mono">contact [at] anonch [dot] at</span>
                                                    <button
                                                        onClick={revealEmail}
                                                        className="px-3 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
                                                    >
                                                        Reveal Email
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-white font-mono">{email}</span>
                                                    <button
                                                        onClick={copyEmail}
                                                        className="px-3 py-1 text-xs bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
                                                        title="Copy to clipboard"
                                                    >
                                                        Copy
                                                    </button>
                                                    <a
                                                        href={`mailto:${email}`}
                                                        className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                                                    >
                                                        Send Email
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">What to Include</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    To help us assist you better, please include relevant details in your message:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><strong>Technical Issues:</strong> Browser type, device, and steps to reproduce the problem</li>
                                    <li><strong>Feature Requests:</strong> Detailed description of the desired functionality</li>
                                    <li><strong>Privacy Concerns:</strong> Specific questions about our privacy practices</li>
                                    <li><strong>Bug Reports:</strong> What you expected vs. what actually happened</li>
                                    <li><strong>General Feedback:</strong> Your experience and suggestions for improvement</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Response Time</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    We strive to respond to all inquiries promptly:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><strong>Technical Support:</strong> Usually within 24-48 hours</li>
                                    <li><strong>General Questions:</strong> Within 2-3 business days</li>
                                    <li><strong>Privacy Inquiries:</strong> Priority response within 24 hours</li>
                                    <li><strong>Bug Reports:</strong> Acknowledgment within 24 hours, fix timeline varies</li>
                                </ul>
                                <p className="leading-relaxed text-sm mt-4 text-gray-400">
                                    Please note that we operate with a small team and appreciate your patience.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Privacy Notice</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    When you contact us, we respect your privacy:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>We only use your email to respond to your inquiry</li>
                                    <li>We don't add you to mailing lists without explicit consent</li>
                                    <li>Support emails are deleted after the issue is resolved</li>
                                    <li>We don't share your contact information with third parties</li>
                                    <li>You can request deletion of your support correspondence at any time</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Common Questions</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    Before reaching out, you might find answers in our other resources:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><a href="/faqs" className="text-blue-400 hover:text-blue-300 underline">Frequently Asked Questions</a> - Common usage and technical questions</li>
                                    <li><a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</a> - Detailed information about data handling</li>
                                    <li><a href="/legal" className="text-blue-400 hover:text-blue-300 underline">Legal Information</a> - Terms of service and legal details</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Emergency Contact</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    For urgent security issues or abuse reports:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Use the same email address with "URGENT" in the subject line</li>
                                    <li>Include as much detail as possible about the security concern</li>
                                    <li>We prioritize security-related communications</li>
                                    <li>For immediate safety concerns, also contact local authorities</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Language Support</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    We currently provide support in:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><strong>English:</strong> Primary support language</li>
                                    <li><strong>Other Languages:</strong> We'll do our best to assist using translation tools</li>
                                </ul>
                                <p className="leading-relaxed text-sm mt-4 text-gray-400">
                                    Feel free to write in your preferred language, and we'll work to understand and respond appropriately.
                                </p>
                            </section>

                            <section className="border-t border-gray-600 pt-4">
                                <h3 className="text-xl font-semibold text-white mb-3">Thank You</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    We appreciate your interest in anonch.at and value your feedback. Your input helps us 
                                    improve the service while maintaining our commitment to privacy and anonymity.
                                </p>
                                <p className="text-xs text-gray-400" suppressHydrationWarning>
                                    Last updated: {new Date().toLocaleDateString()}
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
