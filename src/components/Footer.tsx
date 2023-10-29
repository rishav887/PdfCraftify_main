"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';

const Footer: React.FC = () => {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  const openPrivacyModal = () => setPrivacyModalOpen(true);
  const closePrivacyModal = () => setPrivacyModalOpen(false);

  const openTermsModal = () => setTermsModalOpen(true);
  const closeTermsModal = () => setTermsModalOpen(false);

  const PrivacyPolicyModalContent: React.FC = () => (
    <div>
      <h2 className="text-xl font-bold mb-2">Privacy Policy</h2>
      <p className="text-gray-400">
        Welcome to Converse2Pdf! This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website. By using our services, you agree to the terms outlined in this policy.
      </p>
      {/* Add the rest of the Privacy Policy content here */}
      <button onClick={closePrivacyModal}>Close</button>
    </div>
  );

  const TermsOfServiceModalContent: React.FC = () => (
    <div>
      <h2 className="text-xl font-bold mb-2">Terms of Service</h2>
      <p className="text-gray-400">
        Welcome to Converse2Pdf! This Terms of Service explains the terms and conditions for using our website. By using our services, you agree to comply with these terms.
      </p>
      {/* Add the rest of the Terms of Service content here */}
      <button onClick={closeTermsModal}>Close</button>
    </div>
  );

  return (
    <>
      <footer className="bg-gray-900 text-white p-8">
        {/* Add the rest of the footer content here */}
        <p className="text-sm text-gray-500">
          &copy; 2023 Converse2Pdf. All rights reserved. |
          <a href="#!" className="text-gray-400 hover:text-white transition duration-300" onClick={openPrivacyModal}> Privacy Policy</a> |
          <a href="#!" className="text-gray-400 hover:text-white transition duration-300" onClick={openTermsModal}> Terms of Service</a>
        </p>
      </footer>

      <Modal
        isOpen={isPrivacyModalOpen}
        onRequestClose={closePrivacyModal}
        contentLabel="Privacy Policy"
      >
        <PrivacyPolicyModalContent />
      </Modal>

      <Modal
        isOpen={isTermsModalOpen}
        onRequestClose={closeTermsModal}
        contentLabel="Terms of Service"
      >
        <TermsOfServiceModalContent />
      </Modal>
    </>
  );
};

export default Footer;
