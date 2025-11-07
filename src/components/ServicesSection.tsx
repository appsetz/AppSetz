'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: "Startup & MVP",
    description: "Quickly validate your concept with a market-ready MVP that captures your core idea.",
    features: ["Rapid prototyping", "Core features only", "Market validation", "Budget-friendly"]
  },
  {
    title: "Full-Cycle Development",
    description: "End-to-end app creation: design, development, testing, and store deployment.",
    features: ["Complete development", "UI/UX design", "Testing & QA", "App store deployment"]
  },
  {
    title: "Custom Solutions",
    description: "Bespoke applications tailored to your unique business challenges and goals.",
    features: ["Custom architecture", "Scalable solutions", "Enterprise features", "Ongoing support"]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Services We Provide
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We build robust apps through collaborative development that turns your vision into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-black rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="text-white font-medium hover:text-gray-300 transition-colors">
                Learn more →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
