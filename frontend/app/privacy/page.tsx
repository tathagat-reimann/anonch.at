"use client";

export default function PrivacyPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 p-4">
            <section className="text-gray-400 bg-gray-900 body-font rounded-md">
                <div className="container px-5 py-12 sm:py-24 mx-auto flex flex-wrap">
                    <h2 className="sm:text-3xl text-2xl text-white font-medium title-font mb-2 md:w-2/5">
                        Privacy Policy
                    </h2>
                    <div className="md:w-3/5 md:pl-6 h-80 overflow-y-auto pr-4">
                        <p className="leading-relaxed text-base mb-6">
                            Your privacy is our top priority. This policy explains how we protect your anonymity and handle information on anonch.at.
                        </p>
                        
                        <div className="space-y-6 text-gray-300">
                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Our Privacy Commitment</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    anonch.at is built with privacy by design. We believe in true anonymity and take every measure 
                                    to ensure your conversations remain completely private and untraceable.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>No registration or personal information required</li>
                                    <li>No chat logs or message history stored</li>
                                    <li>No tracking cookies or user analytics</li>
                                    <li>No IP address logging or user identification</li>
                                    <li>No data sharing with third parties</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Information We Don't Collect</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    Unlike most online services, we specifically avoid collecting any personal information:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><strong>Personal Data:</strong> Names, email addresses, phone numbers, or any identifying information</li>
                                    <li><strong>Chat Content:</strong> Messages, files, or any communication content</li>
                                    <li><strong>User Behavior:</strong> Browsing patterns, chat frequency, or usage analytics</li>
                                    <li><strong>Device Information:</strong> Device fingerprints, browser details, or hardware specifications</li>
                                    <li><strong>Location Data:</strong> IP addresses, geographic location, or timezone information</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">How Chat Rooms Work</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    Our chat system is designed to be ephemeral and leave no traces:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Chat rooms exist only in temporary memory while active</li>
                                    <li>Messages are deleted immediately when all users leave the room</li>
                                    <li>No message backup or recovery system exists</li>
                                    <li>Room names and content are automatically purged after inactivity</li>
                                    <li>No server-side storage of any conversation data</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Technical Safeguards</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    We implement multiple technical measures to protect your privacy:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><strong>Encrypted Connections:</strong> All data transmission uses HTTPS encryption</li>
                                    <li><strong>No Logging:</strong> Web server access logs are disabled for chat endpoints</li>
                                    <li><strong>Memory-Only Storage:</strong> Chat data exists only in volatile memory</li>
                                    <li><strong>Automatic Cleanup:</strong> Scheduled purging of any temporary data</li>
                                    <li><strong>Minimal Infrastructure:</strong> Reduced attack surface with minimal data retention</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Cloudflare Turnstile</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    We use Cloudflare Turnstile for spam protection while preserving your anonymity:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Turnstile operates without collecting personal information</li>
                                    <li>No permanent cookies or tracking mechanisms</li>
                                    <li>Designed to work with privacy-focused browsing</li>
                                    <li>Helps prevent automated abuse without compromising anonymity</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Cookies and Local Storage</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    We minimize the use of cookies and local storage:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Essential cookies only for basic functionality</li>
                                    <li>No tracking or analytics cookies</li>
                                    <li>Session data is temporary and automatically cleared</li>
                                    <li>No persistent storage of user preferences or history</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Legal Compliance</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    Our privacy approach aligns with major privacy regulations:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><strong>GDPR Compliance:</strong> No personal data processing means no GDPR obligations</li>
                                    <li><strong>Data Minimization:</strong> We collect only what is absolutely necessary (nothing)</li>
                                    <li><strong>Right to be Forgotten:</strong> Automatic data deletion ensures this by default</li>
                                    <li><strong>Consent:</strong> No personal data collection means no consent requirements</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Third-Party Services</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    We minimize third-party integrations to protect your privacy:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Cloudflare for DDoS protection and Turnstile (privacy-preserving)</li>
                                    <li>No analytics services or tracking pixels</li>
                                    <li>No social media integrations or sharing buttons</li>
                                    <li>No advertising networks or marketing tools</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Your Responsibilities</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    While we protect your privacy, you also play a role:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Don't share personal information in chats</li>
                                    <li>Use unique room names for private conversations</li>
                                    <li>Be cautious about sharing room links publicly</li>
                                    <li>Consider using a VPN for additional privacy</li>
                                    <li>Use privacy-focused browsers when possible</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Transparency and Trust</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    We believe in complete transparency about our privacy practices:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>This policy describes our actual technical implementation</li>
                                    <li>We have no hidden data collection or processing</li>
                                    <li>Our privacy-first approach is not just policy, but by design</li>
                                    <li>We regularly review our systems to ensure privacy compliance</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-white mb-3">Changes to This Policy</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    While our commitment to privacy remains constant, we may update this policy:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Changes will only strengthen privacy protections</li>
                                    <li>Major changes will be clearly communicated</li>
                                    <li>We will never weaken our privacy commitments</li>
                                    <li>Updates reflect technical improvements or legal clarifications</li>
                                </ul>
                            </section>

                            <section className="border-t border-gray-600 pt-4">
                                <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
                                <p className="leading-relaxed text-sm mb-4">
                                    If you have questions about our privacy practices or this policy, please contact us 
                                    through our contact page. We're committed to transparency and will address any privacy concerns.
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
