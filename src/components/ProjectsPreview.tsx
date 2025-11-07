'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, ExternalLink, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProjectsPreview() {
  interface Project {
    id: string;
    title: string;
    description: string;
    techStack?: string[];
    createdAt?: Date;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data.slice(0, 3)); // Show only first 3 projects
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We believe in the power of technology to empower businesses. Explore our latest projects and see how we&apos;ve helped our clients transform their ideas into reality.
          </p>
        </motion.div>

        {/* Featured Banners - containers in one line, row scrolls left -> right */}
        <div className="mb-12 space-y-4">
          <div className="text-center">
            <button
              onClick={() => (window.location.href = '/projects')}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Learn More
            </button>
          </div>

          <div className="relative overflow-hidden">
            {/* Viewport */}
            <div className="w-full">
              {/* Track - duplicate items (2x) for seamless loop */}
              <motion.div
                className="flex items-stretch gap-6 sm:gap-8"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                {['/assets/decoder-landingpage.png','/assets/oxyverse-landing.png','/assets/landing.png','/assets/decoder-landingpage.png','/assets/oxyverse-landing.png','/assets/landing.png'].map((src, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-700 aspect-[16/9] bg-black min-w-[92vw] sm:min-w-[360px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="Featured project" className="w-full h-full object-cover" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
