"use client";

export default function FAQsPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 p-4">
            <section className="text-gray-400 bg-gray-900 body-font rounded-md">
                <div className="container px-5 py-12 sm:py-24 mx-auto flex flex-wrap">
                    <h2 className="sm:text-3xl text-2xl text-white font-medium title-font mb-2 md:w-2/5">
                        Frequently Asked Questions
                    </h2>
                    <div className="md:w-3/5 md:pl-6 h-80 overflow-y-auto pr-4">
                        <p className="leading-relaxed text-base mb-6">
                            Find answers to common questions about our anonymous chat service.
                        </p>
                        
                        <div className="space-y-6 text-gray-300">
                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">What is anonch.at?</h3>
                                <p className="leading-relaxed text-sm">
                                    anonch.at is a completely anonymous chat service that allows you to have conversations 
                                    without revealing your identity. No registration required, no personal information stored, 
                                    and no chat logs kept.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">How do I start a chat?</h3>
                                <p className="leading-relaxed text-sm">
                                    Simply visit our homepage and click "Start Anonymous Chat" or create a custom room 
                                    by entering a room name. You can share the room link with others to join the same conversation.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Are my messages really anonymous?</h3>
                                <p className="leading-relaxed text-sm">
                                    Yes, absolutely. We do not track, store, or log any of your messages or personal information. 
                                    Chat rooms are temporary and automatically deleted after a period of inactivity. We use 
                                    no tracking cookies or analytics that could identify you.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">How long do chat rooms last?</h3>
                                <p className="leading-relaxed text-sm">
                                    Chat rooms remain active as long as there are participants. After all users leave, 
                                    the room and its messages are automatically deleted after a short period to ensure 
                                    complete privacy.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Can I use this on mobile devices?</h3>
                                <p className="leading-relaxed text-sm">
                                    Yes! Our chat service is fully responsive and works seamlessly on desktop computers, 
                                    tablets, and mobile phones through your web browser. No app download required.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Is there a user limit per room?</h3>
                                <p className="leading-relaxed text-sm">
                                    Currently, there are only 2 users allowed per room.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">What if someone is being inappropriate?</h3>
                                <p className="leading-relaxed text-sm">
                                    If you encounter inappropriate behavior, you can simply leave the room and create a new one. 
                                    Since our service is anonymous, the best protection is to avoid sharing room links publicly 
                                    and only chat with people you trust.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Do you use any anti-spam measures?</h3>
                                <p className="leading-relaxed text-sm">
                                    Yes, we use Cloudflare Turnstile to prevent automated spam and abuse while maintaining 
                                    your anonymity. This helps ensure a better experience for all users without compromising privacy.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Can I create a permanent room?</h3>
                                <p className="leading-relaxed text-sm">
                                    While you can create custom room names, all rooms are temporary by design for privacy reasons. 
                                    However, you can bookmark a room name and reuse it whenever you want to chat with the same group.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Is the service free?</h3>
                                <p className="leading-relaxed text-sm">
                                    Yes, anonch.at is completely free to use. We believe in providing accessible, anonymous 
                                    communication without any barriers or costs to users.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">What browsers are supported?</h3>
                                <p className="leading-relaxed text-sm">
                                    Our service works on all modern web browsers including Chrome, Firefox, Safari, Edge, 
                                    and their mobile equivalents. We recommend using an updated browser for the best experience.
                                </p>
                            </section>

                            <section className="border-b border-gray-600 pb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">How can I report technical issues?</h3>
                                <p className="leading-relaxed text-sm">
                                    If you experience technical problems, try refreshing the page first. For persistent issues, 
                                    you can contact us through our contact page. Please provide details about your browser 
                                    and the specific issue you&apos;re experiencing.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-lg font-semibold text-white mb-2">Can I suggest new features?</h3>
                                <p className="leading-relaxed text-sm">
                                    We welcome feedback and feature suggestions! Please reach out through our contact page 
                                    with your ideas. We&apos;re always looking to improve the service while maintaining our 
                                    core principles of anonymity and simplicity.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
