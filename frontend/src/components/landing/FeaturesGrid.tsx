"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ScanEye,
  Flame,
  BookOpen,
  MessageSquare,
  Apple,
  Globe,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  {
    icon: ScanEye,
    title: "Ingredient Detection",
    description:
      "Advanced computer vision identifies every ingredient in your photo — from spices to proteins — with remarkable precision.",
  },
  {
    icon: Flame,
    title: "Cooking Stage Analysis",
    description:
      "Know exactly where you are in the cooking process. Our AI analyzes textures, colors, and consistency in real-time.",
  },
  {
    icon: BookOpen,
    title: "Smart Recipes",
    description:
      "Get personalized recipe suggestions based on detected ingredients. Never waste food again with smart pairing.",
  },
  {
    icon: MessageSquare,
    title: "Cooking Copilot",
    description:
      "An AI assistant that guides you step-by-step through any recipe, answering questions and adjusting to your skill level.",
  },
  {
    icon: Apple,
    title: "Nutrition Insights",
    description:
      "Instant nutritional breakdown of your meals. Track macros, calories, and micronutrients from a single photo.",
  },
  {
    icon: Globe,
    title: "Multi-Cuisine",
    description:
      "From Italian pasta to Japanese sushi, Indian curries to Mexican tacos — our AI understands 50+ world cuisines.",
  },
];

export default function FeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-accent-burgundy/8 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-amber/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent-amber/5 border border-accent-amber/15 text-accent-amber text-xs font-medium mb-4">
            Features
          </span>
          <h2 className="heading-playfair text-3xl sm:text-4xl lg:text-5xl font-bold">
            Powered by{" "}
            <span className="gradient-text-amber">Intelligence</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            Six powerful AI capabilities that transform how you cook, learn, and
            create in the kitchen.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * i,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                }}
              >
                <GlassCard className="p-6 sm:p-8 h-full group" hover animate={false}>
                  {/* Icon */}
                  <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-amber/10 border border-accent-amber/15 group-hover:bg-accent-amber/15 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent-amber" />
                  </div>

                  {/* Title */}
                  <h3 className="heading-playfair text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
