"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Brain, Sparkles } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Camera,
    title: "Upload",
    description:
      "Snap or upload a photo of your food. Our system accepts any format — raw ingredients, mid-cook, or plated dishes.",
  },
  {
    num: "02",
    icon: Brain,
    title: "AI Analyzes",
    description:
      "Our multi-model AI pipeline identifies ingredients, assesses cooking stage, classifies the cuisine, and understands the dish type.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Get Results",
    description:
      "Receive detailed recipes, pro cooking tips, nutritional info, and personalized guidance — all in seconds.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-amber/3 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-5xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent-amber/5 border border-accent-amber/15 text-accent-amber text-xs font-medium mb-4">
            How It Works
          </span>
          <h2 className="heading-playfair text-3xl sm:text-4xl lg:text-5xl font-bold">
            How{" "}
            <span className="gradient-text-amber">CookLens</span>{" "}
            Works
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
            Three simple steps from photo to plate.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] -translate-y-1/2">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              className="h-px w-full origin-left"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(245,158,11,0.3) 0px, rgba(245,158,11,0.3) 6px, transparent 6px, transparent 14px)",
              }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                  }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Number Badge */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-2xl
                        bg-[var(--color-bg-glass)] backdrop-blur-xl
                        border border-[var(--color-border-glass)]
                        flex items-center justify-center
                        shadow-[0_0_30px_rgba(245,158,11,0.08)]
                        group cursor-default"
                    >
                      <Icon className="w-8 h-8 text-accent-amber" />
                    </motion.div>

                    {/* Step Number */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full
                      bg-gradient-to-br from-accent-amber to-accent-saffron
                      text-bg-primary text-xs font-bold
                      flex items-center justify-center
                      shadow-lg shadow-accent-amber/25"
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="heading-playfair text-xl font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
