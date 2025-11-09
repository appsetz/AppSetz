'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import { DottedSurface } from '@/components/DottedSurface';

export default function HeroSection() {
  const scrollToContact = () => {
    window.location.href = '/contact';
  };
  const goToProjects = () => {
    window.location.href = '/projects';
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DottedSurface />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Launch your app
            </motion.span>
            <br />
            <HeadlinePhases />
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 3.5, // appears after final line
                type: 'spring',
                stiffness: 180,
                damping: 20,
              }}
              className="inline-block ml-2"
            >
              .
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            For Startups & SMEs. Business-results oriented and AI-powered 🚀
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToContact}
              className="bg-white hover:bg-gray-100 text-black font-medium px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Get a quote
            </button>
            <button
              onClick={goToProjects}
              className="border border-gray-600 hover:border-gray-500 text-gray-300 font-medium px-8 py-4 rounded-lg transition-colors duration-200"
            >
              View portfolio
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

type Phase = 'initial' | 'markWrong' | 'final';

function HeadlinePhases() {
  const [phase, setPhase] = useState<Phase>('initial');

  // Timeline (premium slow pacing):
  // 0.0s – 1.6s  : initial sentence (Months not Days)
  // 1.6s – 3.2s  : line-draw strike + red X "stamp"
  // 3.2s+        : final sentence (Days not Months)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('markWrong'), 1600);
    const t2 = setTimeout(() => setPhase('final'), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === 'initial') {
    return (
      <>
        <AnimatedLine delay={0.45}>
          in{' '}
          <motion.span
            className="text-blue-400"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Months
          </motion.span>
        </AnimatedLine>
        <br />
        <AnimatedLine delay={0.65}>
          not{' '}
          <motion.span
            className="text-gray-300"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Days
          </motion.span>
        </AnimatedLine>
      </>
    );
  }

  if (phase === 'markWrong') {
    return (
      <>
        <AnimatedLine delay={0.0}>
          in{' '}
          <WrongWord word="Months" />
        </AnimatedLine>
        <br />
        <AnimatedLine delay={0.18}>
          not{' '}
          <WrongWord word="Days" />
        </AnimatedLine>
      </>
    );
  }

  // phase === 'final'
  return (
    <>
      <AnimatedLine delay={0.0}>
        in{' '}
        <motion.span
          className="text-blue-400"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 140,
            damping: 18,
            delay: 0.15,
          }}
          whileHover={{ scale: 1.06, transition: { duration: 0.18 } }}
        >
          Days
        </motion.span>
      </AnimatedLine>
      <br />
      <AnimatedLine delay={0.18}>
        Not{' '}
        <motion.span
          className="text-gray-500"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 140,
            damping: 18,
            delay: 0.35,
          }}
          whileHover={{ scale: 1.04, transition: { duration: 0.18 } }}
        >
          Months
        </motion.span>
      </AnimatedLine>
    </>
  );
}

/* ---------- Helpers ---------- */

function AnimatedLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

function WrongWord({ word }: { word: string }) {
  return (
    <span className="relative inline-flex items-center gap-2">
      {/* Word with animated red strike-through line */}
      <span className="relative inline-block">
        <span className="text-blue-300">{word}</span>
        {/* Line-draw strike: starts at width 0, grows to 100% */}
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-red-500 rounded"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: 'left center' }}
        />
      </span>

      {/* Red X with "stamp" effect */}
      <motion.span
        initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
        animate={{
          scale: [0.7, 1.06, 0.98, 1.0],
          rotate: [-12, 3, -1, 0],
          opacity: [0, 1, 1, 1],
        }}
        transition={{
          duration: 0.75,
          times: [0, 0.45, 0.75, 1],
          ease: [0.16, 1, 0.3, 1], // "thud" feel
          delay: 0.35,
        }}
        className="inline-block"
        aria-label={`${word} marked wrong`}
      >
        <XCircle className="w-8 h-8 text-red-500" />
      </motion.span>
    </span>
  );
}
