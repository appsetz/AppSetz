'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  const features = [
    { icon: '⚡', title: 'Fast Delivery', description: 'Most projects completed within 2-4 weeks' },
    { icon: '💰', title: 'Competitive Pricing', description: 'Transparent pricing with no hidden costs' },
    { icon: '🔧', title: 'Full Support', description: 'Complete maintenance and support included' },
    { icon: '📱', title: 'Cross-Platform', description: 'Single codebase for iOS and Android' },
    { icon: '🎨', title: 'Modern Design', description: 'Latest UI/UX trends and best practices' },
    { icon: '🚀', title: 'Performance Optimized', description: 'Smooth, fast, and efficient applications' },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            WHY US
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            At AppSetz, we are a team of passionate and experienced app developers and software engineers driven by a shared mission: to empower businesses with innovative technology solutions.
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">15+</div>
            <div className="text-gray-300">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">1K+</div>
            <div className="text-gray-300">Members Community</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">2+</div>
            <div className="text-gray-300">Years of Experience</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black rounded-lg p-6 border border-gray-700"
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}