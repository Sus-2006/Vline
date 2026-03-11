"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { AITutor } from "@/components/ai-tutor"
import { Analytics } from "@/components/analytics"
import { LaptopShowcase } from "@/components/laptop-showcase"
import { TopicReviews } from "@/components/topic-reviews"
import { motion, AnimatePresence } from "framer-motion"
import { CursorGlow } from "@/components/cursor-glow"
import { AnimatedGradientBackground } from "@/components/animated-gradient"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  }

  const getTabIndex = (tab: string) => {
    const tabs = ["dashboard", "ai-tutor", "analytics", "reviews", "showcase"]
    return tabs.indexOf(tab)
  }

  const direction = getTabIndex(activeTab) > getTabIndex(activeTab) ? 1 : -1

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <AnimatedGradientBackground />
      
      {/* Cursor glow effect */}
      <CursorGlow />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.main
          key={activeTab}
          className="flex-1 overflow-auto"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
        >
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "ai-tutor" && <AITutor />}
          {activeTab === "analytics" && <Analytics />}
          {activeTab === "reviews" && <TopicReviews />}
          {activeTab === "showcase" && <LaptopShowcase />}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
