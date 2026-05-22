"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ParticleField from "@/components/ui/ParticleField";
import Link from "next/link";

const stats = [
  { value: 10, suffix: "K+", label: "Recipes" },
  { value: 50, suffix: "+", label: "Cuisines" },
  { value: 99, suffix: "%", label: "Accuracy" },
];

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-burgundy/5 to-bg-primary" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-amber/5 blur-[150px]" />
      </div>

      <ParticleField count={15} />

      <div className="relative mx-auto max-w-3xl text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-playfair text-3xl sm:text-4xl lg:text-5xl font-bold">
            Ready to Cook{" "}
            <span className="gradient-text-amber">Smarter</span>?
          </h2>
          <p className="mt-5 text-text-secondary text-lg sm:text-xl max-w-xl mx-auto">
            Join thousands of home chefs using AI to elevate every meal.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <Link href="/upload">
            <GlowButton variant="primary" size="lg">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-1" />
            </GlowButton>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1"
            >
              <span className="heading-playfair text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text-amber">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                />
              </span>
              <span className="text-text-secondary text-xs sm:text-sm font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
