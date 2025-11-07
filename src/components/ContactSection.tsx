'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Don&apos;t wait! Build your product now and transform your vision into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-black rounded-lg p-8 border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Send us a message</h3>
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
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors resize-none bg-gray-900 text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Give us a call</h4>
                    <p className="text-gray-300">+91 7676729328</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Email us</h4>
                    <p className="text-gray-300">info.appsetz@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Our location</h4>
                    <p className="text-gray-300">Working remotely worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-lg p-6 border border-gray-700">
              <h4 className="font-semibold text-white mb-4">Let&apos;s Build Something Amazing Together</h4>
              <p className="text-gray-300 mb-4">
                Ready to transform your app idea into reality? Book a free consultation with our experts and let&apos;s discuss how we can help bring your vision to life.
              </p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>1. Share your app idea with us</p>
                <p>2. Get a free project assessment</p>
                <p>3. Receive a tailored development plan</p>
              </div>
              <button className="mt-4 bg-white hover:bg-gray-100 text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                Book Free Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}