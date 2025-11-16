'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Testimonial } from '@/types';

export default function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        // Show only first 2 testimonials (newest first, already sorted by API)
        setTestimonials(data.slice(0, 2));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();

    // Listen for new testimonial events to refresh the preview
    const handleNewTestimonial = () => {
      fetchTestimonials();
    };

    window.addEventListener('testimonialAdded', handleNewTestimonial);

    return () => {
      window.removeEventListener('testimonialAdded', handleNewTestimonial);
    };
  }, []);

  const scrollToReviews = () => {
    const reviewSection = document.getElementById('reviews');
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <>
      {/* Testimonials Preview Section */}
      <section className="pt-20 pb-6 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              See What Our Clients Said About Our Work
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Real feedback from real clients who trusted us with their projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-2xl border border-gray-700 p-6 sm:p-8 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">{testimonial.name}</h3>
                        <p className="text-gray-300 text-sm truncate">{testimonial.role}</p>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 italic leading-relaxed break-words overflow-wrap-anywhere line-clamp-4">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Button without container - full width section */}
      <div className="bg-black pb-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={scrollToReviews}
            className="bg-white hover:bg-gray-100 text-black font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </>
  );
}

