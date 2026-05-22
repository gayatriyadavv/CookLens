"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GlowButton from "@/components/ui/GlowButton";
import ParticleField from "@/components/ui/ParticleField";
import SteamEffect from "@/components/ui/SteamEffect";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const phrases = [
  "Upload any food image. Get instant AI-powered cooking insights.",
  "Detect ingredients, analyze cooking stages, discover recipes.",
  "Your personal AI chef — always ready, always learning.",
];

const floatingEmoji = [
  { emoji: "🍳", x: "8%", y: "20%", delay: 0, size: "text-4xl" },
  { emoji: "🌶️", x: "85%", y: "15%", delay: 1.2, size: "text-3xl" },
  { emoji: "🍕", x: "92%", y: "55%", delay: 0.5, size: "text-3xl" },
  { emoji: "🥘", x: "5%", y: "65%", delay: 2, size: "text-4xl" },
  { emoji: "🧄", x: "78%", y: "75%", delay: 1.8, size: "text-2xl" },
  { emoji: "🍋", x: "15%", y: "80%", delay: 0.8, size: "text-2xl" },
];

function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 35);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 18);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((p) => (p + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <span className="text-text-secondary">
      {phrases[phraseIndex].substring(0, charIndex)}
      <span className="inline-block w-0.5 h-5 sm:h-6 bg-accent-amber ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Radial gradients for depth */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-burgundy/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-amber/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-saffron/5 blur-[150px]" />
      </div>

      {/* Particle Field */}
      <ParticleField count={30} />

      {/* Steam Effect from bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48">
        <SteamEffect intensity="high" />
      </div>

      {/* Floating Food Emoji */}
      {floatingEmoji.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{
            delay: 1 + item.delay,
            duration: 0.6,
            ease: "backOut",
          }}
          className={`absolute ${item.size} pointer-events-none select-none animate-float hidden sm:block`}
          style={{
            left: item.x,
            top: item.y,
            animationDelay: `${item.delay}s`,
            animationDuration: `${5 + item.delay}s`,
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center"
      >
        {/* Announcement Badge */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-accent-amber/5 border border-accent-amber/15
            text-accent-amber text-xs sm:text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
            Now with Multi-Cuisine AI Detection
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="heading-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
        >
          Your AI{" "}
          <span className="relative inline-block">
            <span className="gradient-text-amber">Kitchen</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-accent-amber to-accent-saffron rounded-full origin-left"
            />
          </span>
          <br />
          Companion
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl min-h-[2em] font-light"
        >
          <TypewriterText />
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/upload">
            <GlowButton variant="primary" size="lg">
              Start Cooking
              <ArrowRight className="w-5 h-5 ml-1" />
            </GlowButton>
          </Link>
          <Link href="#how-it-works">
            <GlowButton variant="secondary" size="lg">
              <Play className="w-4 h-4" />
              See How It Works
            </GlowButton>
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-16 flex items-center justify-center gap-6 sm:gap-8 text-text-secondary text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🍳"].map((e, i) => (
                <span
                  key={i}
                  className="w-7 h-7 rounded-full bg-bg-secondary border border-border-glass flex items-center justify-center text-xs"
                >
                  {e}
                </span>
              ))}
            </div>
            <span>10K+ chefs</span>
          </div>
          <span className="w-px h-4 bg-border-glass" />
          <div className="flex items-center gap-1">
            {"⭐".repeat(5)}
            <span className="ml-1">4.9/5</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
