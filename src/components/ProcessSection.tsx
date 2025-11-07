'use client';

import { motion } from 'framer-motion';

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We start with understanding your vision, requirements, and business goals. This initial consultation helps us map out the perfect strategy for your project."
  },
  {
    step: "02", 
    title: "Design",
    description: "Our UI/UX experts create intuitive wireframes and high-fidelity prototypes that capture your brand identity while ensuring exceptional user experience."
  },
  {
    step: "03",
    title: "Development", 
    description: "Our skilled developers bring the designs to life using clean, scalable code. We follow industry best practices to ensure your application is robust and future-proof."
  },
  {
    step: "04",
    title: "Testing",
    description: "Rigorous quality assurance across multiple devices and platforms ensures your application is bug-free, responsive, and delivers a seamless experience."
  },
  {
    step: "05",
    title: "Deployment",
    description: "We handle the entire submission and release process to make your application available on app stores, followed by continuous support and maintenance."
  }
];

export default function ProcessSection() {
  const handleStartProject = () => {
    window.location.href = 'https://cal.com/reachpavankumar-txgih5';
  };
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-extrabold text-blue-400 mb-2">How It Works</h2>
          <div className="mx-auto h-4 w-0.5 bg-blue-500/40 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700" />

          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Left column (hidden on mobile) */}
                  <div className={`hidden md:block`}>
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, y: 24, x: -16 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur p-6 sm:p-8 shadow-xl"
                      >
                        <div className="absolute -top-3 left-6 text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">Step {step.step}</div>
                        <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{step.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center column - connector */}
                  <div className="hidden md:flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      className="w-12 h-12 rounded-full border border-gray-700 bg-gray-900 text-white grid place-items-center shadow-lg"
                    >
                      <span className="text-xl">{isLeft ? '+' : '•'}</span>
                    </motion.div>
                  </div>

                  {/* Right column (hidden on mobile) */}
                  <div className={`hidden md:block`}>
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, y: 24, x: 16 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur p-6 sm:p-8 shadow-xl"
                      >
                        <div className="absolute -top-3 left-6 text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">Step {step.step}</div>
                        <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{step.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile single-column layout: show card full width */}
                  <div className="md:hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur p-6 sm:p-8 shadow-xl"
                    >
                      <div className="absolute -top-3 left-6 text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">Step {step.step}</div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button 
            onClick={handleStartProject}
            className="bg-white hover:bg-gray-100 text-black font-medium px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Start your project →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
