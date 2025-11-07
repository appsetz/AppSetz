'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Calendar, Code, X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CopyrightFooter from '@/components/CopyrightFooter';
import { Project } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
  const fetchProjects = async () => {
    try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
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

  const getProjectIcon = (title: string) => {
    const iconMap: { [key: string]: string } = {
      'Ladakh Tempo': '🚐',
      'Food Mama': '🍕',
      'TechLand': '🌾',
      'Hidden Tone Decoder': '🎵',
      'Healthcare Platform': '🏥',
      'Electron Bazar': '🛒',
      'Contract Wise': '📋',
      'Boom Journal': '📚',
      'Yato Parking': '🅿️',
    };
    return iconMap[title] || '📱';
  };

  const formatDate = (date: Date) => {
    // Check if date is valid and is a Date object
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return 'Recent';
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-screen">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-gray-300 border-t-black rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600">Loading projects...</p>
          </motion.div>
        </main>
        <CopyrightFooter />
    </div>
  );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-bold text-white mb-6"
              >
                Our <span className="text-blue-400">Projects</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Discover our portfolio of innovative applications that have transformed businesses and delighted users worldwide.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            {projects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">No Projects Yet</h3>
                <p className="text-gray-400">Check back soon for our latest work!</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ y: -6 }}
                    className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Project Image */}
                    {(project.images && project.images.length > 0) && (
                      <div className="w-full bg-gray-100">
                        <div className="w-full aspect-[16/9]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    {/* Project Content */}
                    <div className="p-6">
                      {/* Top right round button */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-center"
                        aria-label="View details"
                      >
                        <ArrowRight className="w-4 h-4 text-gray-700" />
                      </button>

                      {/* Project Title & Description */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Action links like the reference: Case Study + View Details */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-3 py-1.5 text-sm rounded-md bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100"
                        >
                          Case Study
                        </button>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-sm text-gray-700 hover:text-gray-900"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-20"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 max-w-4xl mx-auto border border-gray-700">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Ready to Build Something Amazing?
                  </h3>
                  <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                    Let&apos;s collaborate to bring your vision to life with cutting-edge technology and exceptional design.
                  </p>
                  <motion.button 
                    onClick={() => window.location.href = 'https://cal.com/reachpavankumar-txgih5'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white hover:bg-gray-100 text-black font-semibold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Start Your Project
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Full Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedProject(null)} />
            <div className="relative z-10 min-h-screen bg-black">
              {/* Close button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="fixed top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Project Details Content */}
              <div className="pt-20 pb-16">
                {/* Overview/Hero */}
                <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_20%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(600px_circle_at_80%_0%,rgba(34,197,94,0.08),transparent_60%)]" />
                  <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <motion.h1 
                        initial={{opacity:0,y:20}} 
                        animate={{opacity:1,y:0}} 
                        transition={{duration:0.6}} 
                        className="text-4xl sm:text-6xl font-extrabold text-white mb-4"
                      >
                        {selectedProject.title}
                      </motion.h1>
                      <motion.p 
                        initial={{opacity:0,y:20}} 
                        animate={{opacity:1,y:0}} 
                        transition={{duration:0.6, delay:0.1}} 
                        className="text-lg text-gray-300 mb-6"
                      >
                        {selectedProject.description}
                      </motion.p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {(selectedProject.techStack || ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Firebase']).slice(0,6).map(t => (
                          <span key={t} className="px-3 py-1 rounded-full bg-green-900/30 text-green-300 border border-green-700/40 text-xs">{t}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.liveDemoUrl && (
                          <a href={selectedProject.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-lime-500 text-black font-semibold shadow-lg hover:shadow-xl">
                            <ExternalLink className="w-4 h-4 mr-2"/> View Live App
                          </a>
                        )}
                        {selectedProject.githubUrl && (
                          <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20">
                            <Github className="w-4 h-4 mr-2"/> Explore Project
                          </a>
                        )}
                      </div>
                    </div>
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
                      {selectedProject.images && selectedProject.images[0] && (
                        <div className="rounded-2xl overflow-hidden border border-gray-700/60 shadow-2xl bg-gray-900">
                          <div className="w-full aspect-[16/9]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={selectedProject.images[0]} alt={selectedProject.title} className="w-full h-full object-cover"/>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </section>

                {/* Results */}
                <section className="py-16 sm:py-20 bg-gray-950">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="text-center text-3xl sm:text-4xl font-bold text-white mb-10">Impactful Results</motion.h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { value: '90%', label: 'booking efficiency increase', sub: 'compared to previous manual system' },
                        { value: '50%', label: 'reduction in booking time', sub: 'for both customers and staff' },
                        { value: '30%', label: 'increase in customer satisfaction', sub: 'based on post-launch surveys' }
                      ].map((r, i) => (
                        <motion.div key={r.label} initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4, delay: i*0.1}} className="p-6 rounded-2xl border border-emerald-800/40 bg-gradient-to-b from-emerald-900/30 to-transparent text-emerald-300">
                          <div className="text-5xl font-extrabold text-emerald-400 mb-2">{r.value}</div>
                          <div className="text-white font-semibold leading-snug">{r.label}</div>
                          <div className="text-sm text-emerald-300/80 mt-2">{r.sub}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* About */}
                <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-start">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">About the Project</h3>
                      <p className="text-gray-300 mb-8">{selectedProject.description}</p>
                      <div className="grid grid-cols-2 gap-6 text-gray-300">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Project Type</div>
                          <div className="font-medium">UI/UX Design</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Platform</div>
                          <div className="font-medium">iOS & Android</div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-gray-800 p-6 bg-gray-900/50">
                      <h4 className="text-xl font-semibold text-white mb-4">Our Mission</h4>
                      <ul className="space-y-3">
                        {['Real-time booking confirmations', 'Driver tracking in real time', 'Comprehensive admin panel'].map((f) => (
                          <li key={f} className="flex items-start gap-3 text-gray-300">
                            <span className="mt-1 text-green-400"><CheckCircle2 className="w-5 h-5"/></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Tech Stack */}
                <section className="py-16 sm:py-20 bg-gray-950">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-center text-3xl font-bold text-white mb-10">Technologies Used</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                      {(selectedProject.techStack || ['Next.js','TypeScript','Tailwind CSS','Framer Motion','Firebase']).map((t, i) => (
                        <motion.div key={t} initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.3, delay:i*0.05}} className="rounded-2xl border border-gray-800 bg-gray-900 p-5 text-center text-gray-200">
                          <div className="mx-auto mb-3 w-10 h-10 rounded-xl bg-yellow-500/90 grid place-items-center text-black font-bold">{t.slice(0,1)}</div>
                          <div className="text-sm font-medium">{t}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Challenges & Features */}
                <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-6">Challenges We Overcame</h3>
                      <ul className="space-y-5">
                        {['Scalability of the booking system during peak seasons', 'Driver management with schedules, routes and availability', 'Delivering an intuitive multilingual UX for non tech-savvy users'].map((c, i) => (
                          <motion.li key={c} initial={{opacity:0, x:-10}} animate={{opacity:1,x:0}} transition={{duration:0.35, delay:i*0.05}} className="flex items-start gap-3 text-gray-300">
                            <span className="mt-1 inline-flex w-9 h-9 rounded-xl bg-green-500/15 text-green-400 border border-green-700/30 items-center justify-center">•</span>
                            <span>{c}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-6">Innovative Features</h3>
                      <ul className="space-y-5">
                        {['Real-time booking confirmations', 'Driver tracking in real time', 'Comprehensive admin panel', 'Seamless payment integration'].map((f, i) => (
                          <motion.li key={f} initial={{opacity:0, x:10}} animate={{opacity:1,x:0}} transition={{duration:0.35, delay:i*0.05}} className="flex items-start gap-3 text-gray-300">
                            <span className="mt-1 inline-flex w-9 h-9 rounded-xl bg-yellow-500/15 text-yellow-400 border border-yellow-700/30 items-center justify-center">✓</span>
                            <span>{f}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
        </main>
      
      <CopyrightFooter />
    </div>
  );
}