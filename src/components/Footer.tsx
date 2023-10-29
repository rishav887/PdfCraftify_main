"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';

const Footer: React.FC = () => {
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
      </footer>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onRequestClose={closePrivacyModal}
        contentLabel="Privacy Policy"
      >
        <div>
          <h2 className="text-xl font-bold mb-2">Privacy Policy</h2>
          <p className="text-gray-400">
            Welcome to Converse2Pdf! This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website. By using our services, you agree to the terms outlined in this policy.
          </p>
          {/* Add the rest of the Privacy Policy content here */}
          <button onClick={closePrivacyModal}>Close</button>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={isTermsModalOpen}
        onRequestClose={closeTermsModal}
        contentLabel="Terms of Service"
      >
        <div>
          <h2 className="text-xl font-bold mb-2">Terms of Service</h2>
          <p className="text-gray-400">
            Welcome to Converse2Pdf! This Terms of Service explains the terms and conditions for using our website. By using our services, you agree to comply with these terms.
          </p>
          {/* Add the rest of the Terms of Service content here */}
          <button onClick={closeTermsModal}>Close</button>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
