'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import Header from '@/components/Header';
import CopyrightFooter from '@/components/CopyrightFooter';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear success state when user starts typing
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('✅ Message successfully sent to Firestore! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold text-white mb-4">
                Let's Connect
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Don't wait! Build your product now and transform your vision into reality.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-black rounded-lg p-8 border border-gray-700"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Send us a message</h2>
                
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-900 border border-green-500 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <p className="text-green-300 font-medium">Message Successfully Sent!</p>
                        <p className="text-green-400 text-sm">Your message has been saved to Firestore and we'll get back to you soon.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-gray-900 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-gray-900 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-gray-900 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors resize-none bg-gray-900 text-white placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`w-full font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 ${
                      isSuccess 
                        ? 'bg-green-500 text-white cursor-not-allowed' 
                        : 'bg-white hover:bg-gray-100 text-black'
                    }`}
                  >
                    {isSubmitting ? 'Sending to Firestore...' : isSuccess ? '✓ Message Sent!' : 'Send Message'}
                  </button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Get In Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Give us a call</h3>
                        <p className="text-gray-300">+91 7676729328</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Email us</h3>
                        <p className="text-gray-300">info.appsetz@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Our location</h3>
                        <p className="text-gray-300">Working remotely worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-lg p-8 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Let's Build Something Amazing Together</h3>
                  <p className="text-gray-300 mb-6">
                    Ready to transform your app idea into reality? Book a free consultation with our experts and let's discuss how we can help bring your vision to life.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">1</span>
                      </div>
                      <span className="text-gray-300">Share your app idea with us</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">2</span>
                      </div>
                      <span className="text-gray-300">Get a free project assessment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">3</span>
                      </div>
                      <span className="text-gray-300">Receive a tailored development plan</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Quick Response Guarantee</h4>
                    <p className="text-gray-300 text-sm">
                      We respond to all inquiries within 24 hours. For urgent projects, we can schedule a call the same day.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <CopyrightFooter />
    </div>
  );
}
