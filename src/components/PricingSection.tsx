'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const pricingPlans = [
  {
    name: "Frontend Development",
    subtitle: "Starting from",
    price: "$200",
    currency: "USD",
    features: [
      "Mobile app for your users",
      "Converting your design into working app", 
      "Connecting to external services",
      "Smooth animations and transitions",
      "Help when you need it",
      "10-30 Day Delivery",
      "Unlimited changes until you are happy"
    ],
    buttonText: "Start Your Project",
    popular: false
  },
  {
    name: "MVP Development",
    subtitle: "Complete Starter Package", 
    price: "$1,500",
    currency: "USD",
    features: [
      "Mobile app plus admin dashboard",
      "Custom design for your brand",
      "Converting designs into working app",
      "Building your apps brain (backend)",
      "1-3 Month Delivery",
      "Getting your app on App Store & Play Store",
      "Testing everything works perfectly",
      "Unlimited changes until you are happy"
    ],
    buttonText: "Start Your Project",
    popular: true
  },
  {
    name: "Full-Cycle App Development",
    subtitle: "Everything You Need",
    price: "$4,000", 
    currency: "USD",
    features: [
      "User app, business app & admin dashboard",
      "Premium design customized for your brand",
      "Converting designs into working app",
      "Complete backend system built for growth",
      "2-4 Month Delivery",
      "Publishing on App Store & Play Store",
      "Thorough testing for flawless performance",
      "Full control with admin dashboard",
      "Unlimited changes until you are happy"
    ],
    buttonText: "Start Your Project",
    popular: false
  }
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState('new');

  const handleContactUs = () => {
    window.location.href = '/contact';
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple Pricing
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Clear options to bring your app idea to life, with everything included to launch successfully
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative rounded-lg p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'border-white bg-gray-900'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-3 py-1 rounded text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.subtitle}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-300 ml-2">{plan.currency}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="w-4 h-4 bg-white rounded-full mr-3 mt-1 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-white hover:bg-gray-100 text-black'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-4">Need a custom solution? Contact us for personalized pricing.</p>
          <button 
            onClick={handleContactUs}
            className="text-white font-medium hover:text-gray-300 transition-colors"
          >
            Contact us →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
