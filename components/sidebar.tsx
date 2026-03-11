"use client"

import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart3, 
  Laptop,
  BookOpen,
  User,
  Settings,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "ai-tutor", icon: MessageSquare, label: "AI Tutor" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "reviews", icon: Star, label: "Reviews" },
  { id: "showcase", icon: Laptop, label: "Showcase" },
]

const bottomItems = [
  { id: "notebook", icon: BookOpen, label: "Notebook" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "settings", icon: Settings, label: "Settings" },
]

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const containerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const activeIndicatorVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  }

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        className="flex flex-col w-16 lg:w-64 h-screen bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border/50 relative z-40"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 p-4 border-b border-sidebar-border"
          variants={itemVariants}
        >
          <motion.div
            className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center accent-glow"
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <motion.span
            className="hidden lg:block font-semibold text-sidebar-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            LearnInPublic
          </motion.span>
        </motion.div>

        {/* Main Navigation */}
        <motion.nav
          className="flex-1 p-3 space-y-1"
          variants={containerVariants}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={false}
                    animate={activeTab === item.id ? "active" : "inactive"}
                    variants={activeIndicatorVariants}
                  >
                    <Button
                      variant={activeTab === item.id ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-center lg:justify-start gap-3 h-11 relative transition-all glow-hover",
                        activeTab === item.id && "bg-sidebar-accent text-sidebar-accent-foreground shadow-md accent-glow"
                      )}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <motion.div
                        animate={activeTab === item.id ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                      </motion.div>
                      <span className="hidden lg:block">{item.label}</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.nav>

        {/* Bottom Navigation */}
        <motion.div
          className="p-3 space-y-1 border-t border-sidebar-border"
          variants={containerVariants}
        >
          {bottomItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-center lg:justify-start gap-3 h-11 text-muted-foreground hover:text-sidebar-foreground transition-colors"
                    onClick={() => setActiveTab(item.id)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                    </motion.div>
                    <span className="hidden lg:block">{item.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      </motion.aside>
    </TooltipProvider>
  )
}
