"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const laptops = [
  {
    id: "linkedin",
    name: "LinkedIn",
    tagline: "Professional Networking",
    description: "Connect with professionals, share your learning journey, and build your career network.",
    screen: "linkedin"
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    tagline: "AI-Powered Notes",
    description: "Transform your notes into an interactive AI assistant that helps you understand and retain information.",
    screen: "notebooklm"
  },
  {
    id: "vscode",
    name: "VS Code",
    tagline: "Code Editor",
    description: "The most powerful code editor for developers. Write, debug, and deploy your projects.",
    screen: "vscode"
  },
]

function LinkedInScreen() {
  return (
    <div className="w-full h-full bg-[#f3f2ee] flex flex-col text-[6px] sm:text-[8px] overflow-hidden">
      {/* LinkedIn Header */}
      <div className="bg-white border-b border-gray-200 px-2 py-1 flex items-center gap-2">
        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#0a66c2] rounded flex items-center justify-center">
          <span className="text-white font-bold text-[5px] sm:text-[7px]">in</span>
        </div>
        <div className="flex-1 bg-[#eef3f8] rounded px-2 py-0.5">
          <span className="text-gray-500">Search</span>
        </div>
        <div className="flex gap-1">
          {["Home", "Network", "Jobs", "Messaging"].map((item) => (
            <div key={item} className="text-gray-600 px-1 hidden sm:block">{item}</div>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-2 flex gap-2">
        {/* Sidebar */}
        <div className="hidden sm:block w-16 space-y-2">
          <div className="bg-white rounded-lg p-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-1" />
            <div className="text-center text-gray-800 font-medium truncate">Profile</div>
            <div className="text-center text-gray-500">500+ connections</div>
          </div>
        </div>
        {/* Feed */}
        <div className="flex-1 space-y-2">
          <div className="bg-white rounded-lg p-2">
            <div className="flex gap-1 mb-1">
              <div className="w-4 h-4 bg-gray-300 rounded-full" />
              <div>
                <div className="font-medium text-gray-800">Learning Update</div>
                <div className="text-gray-500">Completed React Course</div>
              </div>
            </div>
            <div className="h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded flex items-center justify-center text-blue-600">
              New Certification
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotebookLMScreen() {
  return (
    <div className="w-full h-full bg-[#1a1a2e] flex text-[6px] sm:text-[8px] overflow-hidden">
      {/* Sidebar */}
      <div className="w-12 sm:w-20 bg-[#16162a] border-r border-[#2a2a4a] p-2 space-y-2">
        <div className="text-purple-400 font-bold text-[7px] sm:text-[9px] mb-2">NotebookLM</div>
        <div className="space-y-1">
          {["Physics Notes", "ML Basics", "React Guide"].map((note) => (
            <div key={note} className="bg-[#2a2a4a] rounded px-1 py-0.5 text-gray-300 truncate">
              {note}
            </div>
          ))}
        </div>
        <div className="border-t border-[#2a2a4a] pt-2 mt-2">
          <div className="text-purple-400">+ New Source</div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#16162a] border-b border-[#2a2a4a] px-2 py-1 flex items-center justify-between">
          <span className="text-white font-medium">Physics Notes</span>
          <div className="flex gap-1">
            <div className="bg-purple-500/20 text-purple-300 px-1 rounded">AI</div>
          </div>
        </div>
        {/* Content Area */}
        <div className="flex-1 p-2 flex gap-2">
          <div className="flex-1 bg-[#0d0d1a] rounded p-2 space-y-1">
            <div className="text-gray-400">Your notes about quantum mechanics...</div>
            <div className="h-1 bg-purple-500/30 rounded w-3/4" />
            <div className="h-1 bg-purple-500/20 rounded w-1/2" />
          </div>
          <div className="hidden sm:block w-20 bg-[#0d0d1a] rounded p-2">
            <div className="text-purple-400 font-medium mb-1">AI Chat</div>
            <div className="space-y-1">
              <div className="bg-purple-500/10 rounded px-1 py-0.5 text-gray-300 text-[5px]">
                Explain quantum entanglement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function VSCodeScreen() {
  return (
    <div className="w-full h-full bg-[#1e1e1e] flex text-[6px] sm:text-[8px] overflow-hidden">
      {/* Activity Bar */}
      <div className="w-4 sm:w-6 bg-[#333333] flex flex-col items-center py-1 gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-3 h-3 bg-gray-500/30 rounded" />
        ))}
      </div>
      {/* Sidebar */}
      <div className="w-14 sm:w-24 bg-[#252526] border-r border-[#3c3c3c] p-1">
        <div className="text-gray-400 text-[5px] sm:text-[6px] mb-1">EXPLORER</div>
        <div className="space-y-0.5">
          <div className="text-yellow-400">src</div>
          <div className="pl-2 text-blue-400">App.tsx</div>
          <div className="pl-2 text-blue-400">index.css</div>
          <div className="text-green-400">package.json</div>
        </div>
      </div>
      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="bg-[#252526] flex items-center border-b border-[#3c3c3c]">
          <div className="bg-[#1e1e1e] px-2 py-0.5 text-white border-r border-[#3c3c3c] flex items-center gap-1">
            <span className="text-blue-400">TS</span>
            <span>App.tsx</span>
          </div>
        </div>
        {/* Code Area */}
        <div className="flex-1 p-1 font-mono">
          <div className="flex">
            <span className="text-gray-500 w-3 sm:w-4 text-right mr-1">1</span>
            <span><span className="text-purple-400">import</span> <span className="text-yellow-300">React</span> <span className="text-purple-400">from</span> <span className="text-orange-300">{'"react"'}</span></span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-3 sm:w-4 text-right mr-1">2</span>
            <span></span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-3 sm:w-4 text-right mr-1">3</span>
            <span><span className="text-purple-400">function</span> <span className="text-yellow-300">App</span><span className="text-gray-400">() {"{"}</span></span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-3 sm:w-4 text-right mr-1">4</span>
            <span className="pl-2"><span className="text-purple-400">return</span> <span className="text-gray-400">(</span></span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-3 sm:w-4 text-right mr-1">5</span>
            <span className="pl-4"><span className="text-blue-400">{"<div>"}</span><span className="text-white">Hello</span><span className="text-blue-400">{"</div>"}</span></span>
          </div>
        </div>
        {/* Terminal */}
        <div className="h-8 sm:h-12 bg-[#1e1e1e] border-t border-[#3c3c3c] p-1">
          <div className="text-gray-400 text-[5px] sm:text-[6px]">TERMINAL</div>
          <div className="text-green-400">$ npm run dev</div>
        </div>
      </div>
    </div>
  )
}

function AnimatedLaptop({ 
  laptop, 
  isActive, 
  isOpening,
  onClick,
  index
}: { 
  laptop: typeof laptops[0]
  isActive: boolean
  isOpening: boolean
  onClick: () => void
  index: number
}) {
  const containerVariants = {
    initial: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const scaleVariants = {
    inactive: {
      scale: 0.85,
      opacity: 0.6,
    },
    active: {
      scale: 1,
      opacity: 1,
    },
  }

  const lidVariants = {
    closed: {
      rotateX: 80,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    open: {
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const screenVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.4, delay: 0.3 },
    },
  }

  const glowVariants = {
    inactive: { opacity: 0 },
    active: {
      opacity: [0.5, 1, 0.5],
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1)",
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative cursor-pointer group"
    >
      <motion.div
        variants={scaleVariants}
        animate={isActive ? "active" : "inactive"}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ perspective: "1200px" }}
        className="relative"
        onClick={onClick}
      >
        {/* Glow effect for active laptop */}
        <motion.div
          variants={glowVariants}
          animate={isActive ? "active" : "inactive"}
          className="absolute -inset-4 rounded-xl -z-10"
        />

        {/* Laptop Container */}
        <div className="relative">
          {/* Screen/Lid with 3D rotation */}
          <motion.div
            variants={lidVariants}
            animate={isActive ? "open" : "closed"}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className={cn(
              "relative w-48 sm:w-64 md:w-80 h-32 sm:h-40 md:h-52 rounded-t-xl overflow-hidden",
              "border-2 border-b-0 bg-gradient-to-b from-gray-800 to-gray-900",
              isActive ? "border-primary/60 shadow-xl" : "border-gray-700 shadow-lg"
            )}
          >
            {/* Screen bezel frame */}
            <div className="absolute inset-0 rounded-t-xl border border-gray-900/50 pointer-events-none" />

            {/* Screen Content with fade-in */}
            <motion.div
              variants={screenVariants}
              initial="initial"
              animate={isActive ? "animate" : "initial"}
              className="absolute inset-1 sm:inset-2 rounded overflow-hidden bg-black"
            >
              {laptop.screen === "linkedin" && <LinkedInScreen />}
              {laptop.screen === "notebooklm" && <NotebookLMScreen />}
              {laptop.screen === "vscode" && <VSCodeScreen />}
            </motion.div>

            {/* Camera bezel */}
            <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-1.5 bg-gray-800 rounded-full shadow-inner" />

            {/* Keyboard gradient effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/30 rounded-t-xl" />
          </motion.div>

          {/* Base/Keyboard */}
          <motion.div
            animate={isActive ? { borderColor: "rgba(34, 197, 94, 0.6)" } : { borderColor: "rgb(55, 65, 81)" }}
            className={cn(
              "w-48 sm:w-64 md:w-80 h-3 sm:h-4 rounded-b-xl border-2 border-t-0",
              "bg-gradient-to-b from-gray-800 to-gray-950 relative shadow-lg"
            )}
          >
            {/* Keyboard details */}
            <div className="absolute inset-1 flex justify-around opacity-40">
              <div className="w-1 h-0.5 bg-gray-600 rounded" />
              <div className="w-1 h-0.5 bg-gray-600 rounded" />
              <div className="w-1 h-0.5 bg-gray-600 rounded" />
            </div>

            {/* Trackpad */}
            <motion.div
              animate={isActive ? { boxShadow: "0 0 10px rgba(34, 197, 94, 0.2)" } : { boxShadow: "none" }}
              className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 bg-gradient-to-b from-gray-600 to-gray-700 rounded transition-all"
            />
          </motion.div>
        </div>

        {/* Active badge with animation */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute -top-3 -right-3"
            >
              <Badge className="bg-primary text-primary-foreground shadow-lg font-semibold">
                Active
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function LaptopShowcase() {
  const [activeLaptop, setActiveLaptop] = useState("linkedin")

  const handleLaptopClick = (laptopId: string) => {
    if (laptopId === activeLaptop) return
    setActiveLaptop(laptopId)
  }

  const currentLaptop = laptops.find(l => l.id === activeLaptop)

  const heroVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const infoVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  }

  const dotVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: { duration: 0.3, delay: 1.5 },
    },
  }

  return (
    <div className="min-h-full bg-background overflow-auto">
      {/* Hero Section */}
      <motion.div
        className="relative py-12 sm:py-16 px-6"
        variants={heroVariants}
        initial="initial"
        animate="animate"
      >
        {/* Background gradient with animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-6xl mx-auto text-center space-y-4">
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Learning Tools Showcase
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance"
          >
            The Tools That Power
            <motion.span
              className="text-primary block"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Modern Learning
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto text-balance"
          >
            Click on each laptop to see the essential platforms that help you learn, connect, and build in public.
          </motion.p>
        </div>
      </motion.div>

      {/* Laptops Display */}
      <div className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Laptop Grid with staggered entrance */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12">
            {laptops.map((laptop, index) => (
              <AnimatedLaptop
                key={laptop.id}
                laptop={laptop}
                isActive={activeLaptop === laptop.id}
                isOpening={activeLaptop === laptop.id}
                onClick={() => handleLaptopClick(laptop.id)}
                index={index}
              />
            ))}
          </div>

          {/* Active Laptop Info with AnimatePresence */}
          <AnimatePresence mode="wait">
            {currentLaptop && (
              <motion.div
                key={currentLaptop.id}
                variants={infoVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-2xl mx-auto text-center space-y-4"
              >
                <motion.div
                  className="flex items-center justify-center gap-3 flex-wrap"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {currentLaptop.name}
                  </h2>
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {currentLaptop.tagline}
                    </Badge>
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-muted-foreground leading-relaxed text-balance"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {currentLaptop.description}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Dots with motion */}
          <motion.div
            className="flex justify-center gap-2 mt-8"
            variants={dotVariants}
            initial="initial"
            animate="animate"
          >
            {laptops.map((laptop) => (
              <motion.button
                key={laptop.id}
                className={cn(
                  "rounded-full transition-all duration-300",
                  activeLaptop === laptop.id
                    ? "bg-primary w-6 h-2"
                    : "bg-muted-foreground/30 w-2 h-2 hover:bg-muted-foreground/50"
                )}
                onClick={() => handleLaptopClick(laptop.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  activeLaptop === laptop.id
                    ? {
                        boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)",
                      }
                    : {}
                }
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section - Razer Style */}
      <motion.div
        className="bg-card border-t border-border py-16 px-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            THE LEARNING ADVANTAGE
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "AI-Powered",
                description: "Leverage cutting-edge AI to accelerate your learning and understand complex topics faster.",
                bgColor: "bg-primary/10",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-chart-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Community Driven",
                description: "Connect with fellow learners, share knowledge, and grow together in public.",
                bgColor: "bg-chart-2/10",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-chart-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Track Progress",
                description: "Visualize your growth with detailed analytics and stay motivated on your learning journey.",
                bgColor: "bg-chart-3/10",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center space-y-4 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={cn("w-16 h-16 mx-auto rounded-xl flex items-center justify-center", feature.bgColor)}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {feature.icon}
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold text-foreground"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {feature.title}
                </motion.h3>

                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
