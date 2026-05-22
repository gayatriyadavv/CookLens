"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Upload,
  Brain,
  ChefHat,
  Database,
  Clock,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";

const sidebarLinks = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Upload, label: "Upload", href: "/upload" },
  { icon: Brain, label: "Analysis", href: "/analysis" },
  { icon: ChefHat, label: "History", href: "/history" },
  { icon: Database, label: "Dataset", href: "/dataset" },
  { icon: ShoppingCart, label: "Pantry", href: "/pantry" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        width: collapsed ? 72 : 240,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-16 bottom-0 z-40
        glass-dense flex flex-col
        border-r border-border-glass
        lg:top-20"
    >
      {/* Logo section (collapsed) */}
      <div className="flex items-center justify-center py-4 border-b border-border-glass/50">
        <Flame className="h-5 w-5 text-accent-amber" />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 heading-playfair font-bold text-sm"
          >
            CookLens
          </motion.span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative flex items-center gap-3 rounded-xl
                transition-all duration-200 group
                ${collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5"}
                ${
                  isActive
                    ? "bg-accent-amber/10 text-accent-amber"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-accent-amber/10 border border-accent-amber/20"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
              <Icon className="relative z-10 w-5 h-5 shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative z-10 text-sm font-medium whitespace-nowrap"
                >
                  {link.label}
                </motion.span>
              )}

              {/* Tooltip on collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 rounded-md
                  bg-bg-secondary text-text-primary text-xs font-medium
                  opacity-0 group-hover:opacity-100 pointer-events-none
                  transition-opacity duration-200 whitespace-nowrap
                  shadow-lg border border-border-glass z-50"
                >
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-4 border-t border-border-glass/50
          text-text-secondary hover:text-text-primary transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </motion.aside>
  );
}
