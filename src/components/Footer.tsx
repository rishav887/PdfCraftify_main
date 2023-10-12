import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">PDFCraftify</h3>
          <p className="text-gray-400">Transforming static documents into dynamic dialogues.</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p className="text-gray-400">Email: info@pdfcraftify.com</p>
        
        </div> 
        <div>
          <h3 className="text-xl font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-700" />
      <p className="text-sm text-gray-500">
        &copy; 2023 PDFCraftify. All rights reserved. | Privacy Policy | Terms of Service
      </p>
    </footer>
  );
}

export default Footer;
