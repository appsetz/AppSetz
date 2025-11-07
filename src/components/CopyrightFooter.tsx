'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export default function CopyrightFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Top row: Logo left, Follow Us right */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <Image
                src="/assets/appkraft_logo-removebg-preview.png"
                alt="AppSetz Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold">AppSetz</span>
            </div>
            
            {/* Follow Us Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3 text-center sm:text-right">Follow Us</h3>
              <div className="flex justify-center sm:justify-end space-x-6">
                <motion.a
                  href="https://x.com/AppSetz?t=BjzaU11KkbKsIFshOPUjiQ&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
                
                <motion.a
                  href="https://www.instagram.com/appsetz?igsh=eDF5MHB2OXFraGd1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/company/appsetz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </div>
          
          {/* Copyright and tagline centered */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              © 2024 AppSetz. All rights reserved.
            </p>
            
            <p className="text-gray-500 text-xs">
              Professional Flutter Development Services
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
