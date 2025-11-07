'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { Testimonial } from '@/types';
import toast from 'react-hot-toast';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newTestimonial = await response.json();
        setTestimonials([newTestimonial, ...testimonials]);
        setFormData({ name: '', role: '', content: '', rating: 5 });
        setShowForm(false);
        toast.success('Review submitted successfully!');
      } else {
        toast.error('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-gray-300 mt-4">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Client Reviews
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-2">No reviews yet</h3>
              <p className="text-gray-300 mb-6">Be the first to share your experience!</p>
              <button 
                onClick={() => setShowForm(true)}
                className="bg-white hover:bg-gray-100 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Add Your Review
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black rounded-2xl border border-gray-700 p-6 sm:p-8 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                        <p className="text-gray-300 text-sm">{testimonial.role}</p>
                      </div>
                      <div className="flex items-center space-x-1">
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
                    <p className="text-gray-300 italic leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {testimonials.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                >
                  <span>
                    {showAll ? 'Show Less' : `Show More (${testimonials.length - 3} more)`}
                  </span>
                  {showAll ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <button 
                onClick={() => setShowForm(true)}
                className="bg-white hover:bg-gray-100 text-black font-bold px-8 py-4 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your Review</span>
              </button>
            </motion.div>
          </div>
        )}

        {/* Review Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Add Your Review</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Your Role/Title</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-400"
                    placeholder="e.g., CEO, Founder, Developer"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingChange(rating)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          rating <= formData.rating
                            ? 'bg-yellow-400 text-black'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Your Review</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-400 resize-none"
                    placeholder="Share your experience working with us..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
