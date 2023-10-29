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
    <>
      <footer className="bg-gray-900 text-white p-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Converse2Pdf</h3>
            <p className="text-gray-400">Transforming static documents into dynamic dialogues.</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-gray-400">Email: converse2pdf@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com/converse2pdf" className="text-gray-400 hover:text-white transition duration-300">
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
          &copy; 2023 Converse2Pdf. All rights reserved. |
          <a href="#!" className="text-gray-400 hover:text-white transition duration-300" onClick={openPrivacyModal}> Privacy Policy</a> |
          <a href="#!" className="text-gray-400 hover:text-white transition duration-300" onClick={openTermsModal}> Terms of Service</a>
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
              Welcome to Converse2Pdf! This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website. By using our services, you agree to the terms outlined in this policy.
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

            <h3>4. Security Measures</h3>
            <p>
              We implement security measures to protect your personal information from unauthorized access and use.
            </p>

            <h3>5. Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.

            </p>

            <h3>6. Data Retention</h3>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>

            <h3>7. Children's Privacy</h3>
            <p>
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13 years of age.
            </p>

            <h3>8. Changes to this Privacy Policy</h3>
            <p>
              We may update this Privacy Policy periodically. The latest version will be posted on our website with the date of the most recent update.
            </p>

            <h3>9. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please reach out to us at contact@converse2pdf.com.
            </p>

            <p>
              Thank you for entrusting Converse2Pdf with your information. We are committed to protecting your privacy and providing a secure online experience.
            </p>
            
            <button onClick={closePrivacyModal}>Close</button>
            </p>
          </div>
        </Modal>

        {/* Terms of service Modal */}
        <Modal
          isOpen={isTermsModalOpen}
          onRequestClose={closeTermsModal}
          contentLabel="Terms of Service"
        >
          <div>
            <h2 className="text-xl font-bold mb-2">Terms of Service</h2>
            <p className="text-gray-400">
              <p>
              Welcome to Converse2Pdf! This Terms of Service explains the terms and conditions for using our website. By using our services, you agree to comply with these terms.
            </p>
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
            </p>

            <h3>2. User Conduct</h3>
            <p>
              You agree to use our website in accordance with all applicable laws and regulations. You also agree not to:
              - Violate any local, national, or international law or regulation
              - Transmit any material that is abusive, harassing, obscene, or otherwise objectionable
              - Attempt to gain unauthorized access to our computer systems or engage in any activity that disrupts, diminishes the quality of, interferes with the performance of, or impairs the functionality of our website.
            </p>

            <h3>3. Intellectual Property</h3>
            <p>
              The content on our website, including without limitation, the text, software, scripts, graphics, photos, sounds, music, videos, interactive features, and the like ("Content") is owned by or licensed to us and is subject to copyright and other intellectual property rights under international conventions.
            </p>

            <h3>4. Termination</h3>
            <p>
              We may terminate or suspend access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h3>5. Changes to Terms</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>

            <h3>6. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at Converse2Pdf@gmail.com.
            </p>

            <p>
              Thank you for using Converse2Pdf! We hope you find our services valuable and enjoyable.
            </p>
        
            <button onClick={closeTermsModal}>Close</button>
            </p>
          </div>
        </Modal>
      </footer>
    </>
  );
};

export default Footer;
