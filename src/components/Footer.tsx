"use client"

import React, { useState } from 'react';
import Modal from 'react-modal';


const Footer = () => {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  const openPrivacyModal = () => {
    setPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setPrivacyModalOpen(false);
  };

  const openTermsModal = () => {
    setTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setTermsModalOpen(false);
  };

  return (
    <footer className="bg-gray-900 text-white p-8">
    <div className="flex flex-col md:flex-row justify-between">
      <div className="mb-4 md:mb-0">
        <h3 className="text-xl font-bold mb-2">PDFCraftify</h3>
        <p className="text-gray-400">Transforming static documents into dynamic dialogues.</p>
      </div>
      <div className="mb-4 md:mb-0">
        <h3 className="text-xl font-bold mb-2">Contact Us</h3>
        <p className="text-gray-400">Email: pdfcraftify@gmail.com</p>
      
      </div> 
      <div>
        <h3 className="text-xl font-bold mb-2">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="https://twitter.com/PdfCraftify" className="text-gray-400 hover:text-white transition duration-300">
            Twitter
          </a>
          <a href="https://www.facebook.com/profile.php?id=61552189864979" className="text-gray-400 hover:text-white transition duration-300">
            Facebook
          </a>
        </div>
      </div>
    </div>
      <hr className="my-6 border-gray-700" />
      <p className="text-sm text-gray-500">
        &copy; 2023 PDFCraftify. All rights reserved. | 
        <a href="#!" className="text-gray-400 hover:text-white transition duration-300" onClick={openPrivacyModal}> Privacy Policy</a> | 
        <a href="#!" className="text-gray-400 hover:text-white transition duration-300"  onClick={openTermsModal}> Terms of Service</a>
      </p>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onRequestClose={closePrivacyModal}
        contentLabel="Privacy Policy"
      >
        <div>
          <h2 className="text-xl font-bold mb-2">Privacy Policy</h2>
          <p className="text-gray-400">
          <p>
              Welcome to PDFCraftify! This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website. By using our services, you agree to the terms outlined in this policy.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              We collect personal information, such as your name, email address, and contact details, when you willingly provide it to us through our website.
            </p>

            <h3>2. How We Use Your Information</h3>
            <p>
              We use your personal information to respond to your inquiries, provide information about our products and services, and enhance the content and functionality of our website.
            </p>

            <h3>3. Cookies and Other Tracking Technologies</h3>
            <p>
              We employ cookies and tracking technologies to gather data about your website usage. This may include your IP address, browser type, operating system, and other device-related information. This information helps us improve our website content, functionality, and tailor your user experience.
            </p>

            {/* Add more sections as needed */}

            <h3>8. Changes to this Privacy Policy</h3>
            <p>
              We may update this Privacy Policy periodically. The latest version will be posted on our website with the date of the most recent update.
            </p>

            <h3>9. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please reach out to us at contact@pdfcraftify.com.
            </p>

            <p>
              Thank you for entrusting PDFCraftify with your information. We are committed to protecting your privacy and providing a secure online experience.
            </p>
          </p>
          {/* You can add more content here */}
          <button onClick={closePrivacyModal}>Close</button>
        </div>
      </Modal>


       {/* Terms of service Modal */}
       <Modal
        isOpen={isTermsModalOpen}
        onRequestClose={closeTermsModal}
        contentLabel="Terms of Service"
      >
        <div>
          <h2 className="text-xl font-bold mb-2">Privacy Policy</h2>
          <p className="text-gray-400">
          <p>
              Welcome to PDFCraftify! This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website. By using our services, you agree to the terms outlined in this policy.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              We collect personal information, such as your name, email address, and contact details, when you willingly provide it to us through our website.
            </p>

            <h3>2. How We Use Your Information</h3>
            <p>
              We use your personal information to respond to your inquiries, provide information about our products and services, and enhance the content and functionality of our website.
            </p>

            <h3>3. Cookies and Other Tracking Technologies</h3>
            <p>
              We employ cookies and tracking technologies to gather data about your website usage. This may include your IP address, browser type, operating system, and other device-related information. This information helps us improve our website content, functionality, and tailor your user experience.
            </p>

            {/* Add more sections as needed */}

            <h3>8. Changes to this Privacy Policy</h3>
            <p>
              We may update this Privacy Policy periodically. The latest version will be posted on our website with the date of the most recent update.
            </p>

            <h3>9. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please reach out to us at contact@pdfcraftify.com.
            </p>

            <p>
              Thank you for entrusting PDFCraftify with your information. We are committed to protecting your privacy and providing a secure online experience.
            </p>
          </p>
          {/* You can add more content here */}
          <button onClick={closeTermsModal}>Close</button>
        </div>
      </Modal>
  
    </footer>
  );
  }

export default Footer;
