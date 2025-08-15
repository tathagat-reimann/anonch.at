// components/Footer.js
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-orange-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">anonch.at</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">The only pure, no logs, anonymous chat.</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <Link href="/legal" className="text-gray-400 hover:text-white">Legal</Link>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <Link href="/faqs" className="text-gray-400 hover:text-white">FAQs</Link>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
