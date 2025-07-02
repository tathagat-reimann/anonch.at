"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ChatRoom() {
    

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center">
                <section className="text-gray-400 bg-gray-900 body-font rounded-md">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap">
                        <h2 className="sm:text-3xl text-2xl text-white font-medium title-font mb-2 md:w-2/5">
                            Legal Information
                        </h2>
                        <div className="md:w-3/5 md:pl-6 h-80 overflow-y-auto pr-4">
                            <p className="leading-relaxed text-base mb-6">
                                This is the legal information page. Please refer to our terms of service and privacy policy for more details.
                            </p>
                            
                            <div className="space-y-6 text-gray-300">
                                <section>
                                    <h3 className="text-xl font-semibold text-white mb-3">Terms of Service</h3>
                                    <p className="leading-relaxed text-sm mb-4">
                                        By using this anonymous chat service ("Service"), you agree to be bound by these Terms of Service. 
                                        If you do not agree to these terms, please do not use the Service.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-sm">
                                        <li>You must be at least 13 years old to use this Service</li>
                                        <li>You agree not to use the Service for any unlawful purposes</li>
                                        <li>You will not share harmful, offensive, or inappropriate content</li>
                                        <li>We reserve the right to terminate access at any time</li>
                                        <li>The Service is provided "as is" without warranties</li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-white mb-3">Privacy Policy</h3>
                                    <p className="leading-relaxed text-sm mb-4">
                                        We are committed to protecting your privacy. This policy explains how we handle information 
                                        when you use our anonymous chat service.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-sm">
                                        <li>We do not store chat messages or personal information</li>
                                        <li>Chat rooms are temporary and deleted after inactivity</li>
                                        <li>We may use cookies for basic functionality</li>
                                        <li>We use Cloudflare Turnstile for spam protection</li>
                                        <li>No personal data is shared with third parties</li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-white mb-3">Disclaimer</h3>
                                    <p className="leading-relaxed text-sm mb-4">
                                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                                        EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
                                        FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR SECURITY.
                                    </p>
                                    <p className="leading-relaxed text-sm">
                                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DIRECT, 
                                        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM 
                                        YOUR USE OF THE SERVICE.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-white mb-3">Content Policy</h3>
                                    <p className="leading-relaxed text-sm mb-4">
                                        Users are prohibited from sharing content that is:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-sm">
                                        <li>Illegal, harmful, threatening, or harassing</li>
                                        <li>Defamatory, obscene, or invasive of privacy</li>
                                        <li>Infringing on intellectual property rights</li>
                                        <li>Spam, advertising, or commercial solicitation</li>
                                        <li>Containing malware or malicious code</li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-white mb-3">Contact Information</h3>
                                    <p className="leading-relaxed text-sm">
                                        If you have questions about these terms or need to report abuse, 
                                        please contact us through appropriate channels. We reserve the right 
                                        to update these terms at any time without notice.
                                    </p>
                                </section>

                                <section className="border-t border-gray-600 pt-4">
                                    <p className="text-xs text-gray-400">
                                        Last updated: {new Date().toLocaleDateString()}
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
