'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const handleLogoClick = () => {
    const now = Date.now();
    
    // Reset counter if more than 2 seconds have passed since last click
    if (now - lastClickTime > 2000) {
      setLogoClickCount(0);
    }
    
    setLogoClickCount(prev => prev + 1);
    setLastClickTime(now);
    
    // Check if user has clicked 4 times within 2 seconds
    if (logoClickCount >= 3) { // 4 clicks total (0-indexed)
      setLogoClickCount(0);
      // Navigate to admin screen (you can implement this later)
      console.log('Admin access triggered');
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'contact') {
      window.location.href = '/contact';
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/assets/appkraft_logo-removebg-preview.png"
              alt="AppSetz Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              priority
            />
            <span className="text-2xl font-bold text-white tracking-tight">
              AppSetz
            </span>
          </button>

                 {/* Desktop Navigation */}
                 <nav className="hidden md:flex items-center space-x-8">
                   <button
                     onClick={() => window.location.href = '/'}
                     className="text-gray-300 hover:text-white font-medium transition-colors"
                   >
                     Home
                   </button>
                   <button
                     onClick={() => scrollToSection('about')}
                     className="text-gray-300 hover:text-white font-medium transition-colors"
                   >
                     Why Us
                   </button>
                   <button
                     onClick={() => scrollToSection('services')}
                     className="text-gray-300 hover:text-white font-medium transition-colors"
                   >
                     Services
                   </button>
                   <button
                     onClick={() => window.location.href = '/projects'}
                     className="text-gray-300 hover:text-white font-medium transition-colors"
                   >
                     Projects
                   </button>
                   <button
                     onClick={() => scrollToSection('pricing')}
                     className="text-gray-300 hover:text-white font-medium transition-colors"
                   >
                     Pricing
                   </button>
                   <button
                     onClick={() => scrollToSection('contact')}
                     className="text-gray-300 hover:text-white font-medium transition-colors"
                   >
                     Contact
                   </button>
                 </nav>

                {/* CTA Button */}
                <button
                  onClick={() => { window.location.href = 'https://cal.com/reachpavankumar-txgih5'; }}
                   className="hidden md:block bg-white hover:bg-gray-100 text-black font-medium px-6 py-2 rounded-lg transition-colors duration-200"
                 >
                   Book Free Consultation
                 </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

               {/* Mobile Menu */}
               {isMenuOpen && (
                 <div className="md:hidden py-4 border-t border-gray-800">
                   <div className="flex flex-col space-y-4">
                     <button
                       onClick={() => window.location.href = '/'}
                       className="text-gray-300 hover:text-white font-medium transition-colors text-left"
                     >
                       Home
                     </button>
                     <button
                       onClick={() => scrollToSection('about')}
                       className="text-gray-300 hover:text-white font-medium transition-colors text-left"
                     >
                       Why Us
                     </button>
                     <button
                       onClick={() => scrollToSection('services')}
                       className="text-gray-300 hover:text-white font-medium transition-colors text-left"
                     >
                       Services
                     </button>
                     <button
                       onClick={() => window.location.href = '/projects'}
                       className="text-gray-300 hover:text-white font-medium transition-colors text-left"
                     >
                       Projects
                     </button>
                     <button
                       onClick={() => scrollToSection('pricing')}
                       className="text-gray-300 hover:text-white font-medium transition-colors text-left"
                     >
                       Pricing
                     </button>
                     <button
                       onClick={() => scrollToSection('contact')}
                       className="text-gray-300 hover:text-white font-medium transition-colors text-left"
                     >
                       Contact
                     </button>
                    <button
                      onClick={() => { window.location.href = 'https://cal.com/reachpavankumar-txgih5'; }}
                       className="bg-white hover:bg-gray-100 text-black font-medium px-6 py-2 rounded-lg transition-colors duration-200 text-left"
                     >
                       Book Free Consultation
                     </button>
                   </div>
                 </div>
               )}
      </div>
    </header>
  );
}
