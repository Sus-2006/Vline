"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Flame, Clock, BookOpen, Bot } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"

const learningPosts = [
  {
    id: 1,
    user: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40", initials: "SC" },
    title: "Learned about React Server Components today!",
    description: "Finally understood the difference between use client and use server directives. The mental model of thinking about the network boundary really clicked.",
    tags: ["React", "Next.js", "Web Dev"],
    likes: 42,
    comments: 8,
    time: "2h ago"
  },
  {
    id: 2,
    user: { name: "Marcus Johnson", avatar: "/placeholder.svg?height=40&width=40", initials: "MJ" },
    title: "Deep dive into TypeScript generics",
    description: "Spent 3 hours understanding conditional types and infer keyword. Created a type-safe API client that validates responses at compile time.",
    tags: ["TypeScript", "Programming"],
    likes: 67,
    comments: 15,
    time: "4h ago"
  },
  {
    id: 3,
    user: { name: "Emily Rodriguez", avatar: "/placeholder.svg?height=40&width=40", initials: "ER" },
    title: "Machine Learning fundamentals with Python",
    description: "Completed my first neural network from scratch using numpy. Understanding backpropagation was the hardest part but so rewarding!",
    tags: ["ML", "Python", "AI"],
    likes: 89,
    comments: 23,
    time: "6h ago"
  },
]

export function Dashboard() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  
  // Parallax transform for floating elements
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const floatingOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2])

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const hoverVariants = {
    hover: {
      y: -4,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.15 },
    tap: { scale: 0.95 },
  }

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  }

  const statCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -6,
      boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.1)",
      transition: { duration: 0.3 },
    },
  }

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    )
  }

  return (
    <div className="flex h-full">
      {/* Main Feed */}
      <motion.div 
        ref={containerRef}
        className="flex-1 p-6 overflow-auto relative" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        {/* Floating background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full"
            style={{ 
              y: floatingY,
              opacity: floatingOpacity,
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <motion.div
            className="absolute top-1/2 right-0 w-48 h-48 rounded-full"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -60]),
              opacity: floatingOpacity,
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-32 h-32 rounded-full"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -40]),
              opacity: floatingOpacity,
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
              filter: "blur(25px)",
            }}
          />
        </div>

        <motion.div
          className="max-w-2xl mx-auto space-y-6 relative z-10"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl font-bold">
              <span className="gradient-text">Learning Feed</span>
            </h1>
            <p className="text-muted-foreground">See what others are learning today</p>
          </motion.div>

          {/* Create Post */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card glass-card-hover cursor-text gradient-border">
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="flex-1"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      variant="outline" 
                      className="flex-1 justify-start text-muted-foreground h-11 bg-secondary border-border hover:bg-muted transition-all duration-300"
                    >
                      What did you learn today?
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Posts */}
          {learningPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover="hover"
            >
              <Card className="glass-card glass-card-hover overflow-hidden gradient-border">
                <motion.div
                  variants={hoverVariants}
                  className="h-full"
                >
                  <CardContent className="pt-4">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{post.user.name}</span>
                          <span className="text-muted-foreground text-sm">{post.time}</span>
                        </div>
                        <h3 className="font-medium text-foreground">{post.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{post.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 pt-2">
                          <motion.div
                            variants={iconVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`text-muted-foreground hover:text-primary gap-2 transition-colors ${
                                likedPosts.includes(post.id) ? "text-primary" : ""
                              }`}
                              onClick={() => toggleLike(post.id)}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  likedPosts.includes(post.id)
                                    ? "fill-primary"
                                    : ""
                                }`}
                              />
                              {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                            </Button>
                          </motion.div>
                          <motion.div
                            variants={iconVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
                              <MessageCircle className="w-4 h-4" />
                              {post.comments}
                            </Button>
                          </motion.div>
                          <motion.div
                            variants={iconVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
                              <Share2 className="w-4 h-4" />
                              Share
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Sidebar Stats */}
      <motion.aside
        className="hidden xl:block w-80 p-6 border-l border-border space-y-6 overflow-y-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Study Streak */}
        <motion.div
          variants={statCardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Card className="glass-card glass-card-hover gradient-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="w-4 h-4 text-orange-500" />
                </motion.div>
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <motion.span
                  className="text-4xl font-bold text-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  12
                </motion.span>
                <span className="text-muted-foreground">days</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Keep it going!</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Study Time */}
        <motion.div
          variants={statCardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Card className="glass-card glass-card-hover gradient-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {"Today's Study Time"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <motion.span
                  className="text-4xl font-bold text-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  2.5
                </motion.span>
                <span className="text-muted-foreground">hours</span>
              </div>
              <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  style={{ originX: 0 }}
                  onAnimationComplete={() => {}}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">62% of daily goal</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          variants={statCardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Card className="glass-card glass-card-hover gradient-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Button variant="outline" className="w-full justify-start gap-3 bg-secondary border-border hover:bg-muted">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Smart Notebook
                </Button>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Button variant="outline" className="w-full justify-start gap-3 bg-secondary border-border hover:bg-muted">
                  <Bot className="w-4 h-4 text-primary" />
                  AI Tutor
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.aside>
    </div>
  )
}
