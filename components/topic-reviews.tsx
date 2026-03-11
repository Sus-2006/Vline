"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Star, ChevronDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const topics = [
  { id: "all", label: "All Topics" },
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "ml", label: "Machine Learning" },
  { id: "python", label: "Python" },
  { id: "system-design", label: "System Design" },
]

type ReviewIconType = "code" | "brain" | "shield" | "lightning" | "database" | "graph" | "rocket" | "layers"

interface Review {
  id: number
  user: { name: string; initials: string; avatar: string }
  topic: string
  topicId: string
  rating: number
  title: string
  body: string
  tags: string[]
  likes: number
  comments: number
  time: string
  iconType: ReviewIconType
  iconBg: string
  iconColor: string
}

const reviews: Review[] = [
  {
    id: 1,
    user: { name: "Sarah Chen", initials: "SC", avatar: "" },
    topic: "React",
    topicId: "react",
    rating: 5,
    title: "React Server Components finally clicked",
    body: "After weeks of confusion, the mental model snapped into place. Thinking about the network boundary as a first-class concept changes everything about how you structure apps.",
    tags: ["React", "Next.js"],
    likes: 42,
    comments: 8,
    time: "2h ago",
    iconType: "layers",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    id: 2,
    user: { name: "Marcus Johnson", initials: "MJ", avatar: "" },
    topic: "TypeScript",
    topicId: "typescript",
    rating: 4,
    title: "Conditional types and the infer keyword",
    body: "Built a fully type-safe API client that validates responses at compile time. The infer keyword unlocks patterns that feel almost magical once you understand how variance works.",
    tags: ["TypeScript", "Advanced"],
    likes: 67,
    comments: 15,
    time: "4h ago",
    iconType: "shield",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
  },
  {
    id: 3,
    user: { name: "Emily Rodriguez", initials: "ER", avatar: "" },
    topic: "Machine Learning",
    topicId: "ml",
    rating: 5,
    title: "Backpropagation from scratch in NumPy",
    body: "Implemented a neural network without any framework. Once I stopped treating backprop as a black box and derived the gradients by hand, everything became intuitive.",
    tags: ["ML", "Python", "AI"],
    likes: 89,
    comments: 23,
    time: "6h ago",
    iconType: "brain",
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
  },
  {
    id: 4,
    user: { name: "David Kim", initials: "DK", avatar: "" },
    topic: "System Design",
    topicId: "system-design",
    rating: 5,
    title: "Designing a distributed rate limiter",
    body: "Explored token bucket vs sliding window algorithms. Redis's atomic Lua scripts are the cleanest solution for cross-instance consistency without external coordination.",
    tags: ["System Design", "Redis"],
    likes: 103,
    comments: 31,
    time: "8h ago",
    iconType: "database",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    id: 5,
    user: { name: "Aisha Patel", initials: "AP", avatar: "" },
    topic: "Python",
    topicId: "python",
    rating: 4,
    title: "AsyncIO concurrency patterns",
    body: "Finally grasped the event loop. The key insight: async doesn't mean parallel — it means cooperative multitasking. TaskGroups in Python 3.11 make structured concurrency clean.",
    tags: ["Python", "AsyncIO"],
    likes: 55,
    comments: 12,
    time: "10h ago",
    iconType: "lightning",
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-400",
  },
  {
    id: 6,
    user: { name: "Tom Nguyen", initials: "TN", avatar: "" },
    topic: "React",
    topicId: "react",
    rating: 4,
    title: "useOptimistic and the future of UX",
    body: "Paired useOptimistic with server actions to create instant-feedback UI that still handles errors gracefully. The pattern eliminates nearly all loading spinners from my app.",
    tags: ["React", "UX"],
    likes: 77,
    comments: 19,
    time: "12h ago",
    iconType: "rocket",
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
  },
  {
    id: 7,
    user: { name: "Lena Fischer", initials: "LF", avatar: "" },
    topic: "Machine Learning",
    topicId: "ml",
    rating: 5,
    title: "Attention mechanisms demystified",
    body: "Visualizing attention heads as learned routing tables was the breakthrough. Each head learns to route information between tokens based on different learned relationships.",
    tags: ["ML", "Transformers", "AI"],
    likes: 134,
    comments: 44,
    time: "1d ago",
    iconType: "graph",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    id: 8,
    user: { name: "Raj Mehta", initials: "RM", avatar: "" },
    topic: "TypeScript",
    topicId: "typescript",
    rating: 3,
    title: "Module augmentation for third-party types",
    body: "Augmenting library types without forking them is underused. Declare merging lets you extend interfaces globally, which is great for adding custom metadata to Express's Request.",
    tags: ["TypeScript", "DX"],
    likes: 38,
    comments: 7,
    time: "1d ago",
    iconType: "code",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
  {
    id: 9,
    user: { name: "Zoe Clarke", initials: "ZC", avatar: "" },
    topic: "System Design",
    topicId: "system-design",
    rating: 5,
    title: "Event sourcing vs CQRS — when to combine",
    body: "Spent a week reading case studies from LinkedIn and Axon. Event sourcing is great for auditability, but CQRS is what makes the read side scalable independently from writes.",
    tags: ["System Design", "Architecture"],
    likes: 91,
    comments: 28,
    time: "2d ago",
    iconType: "layers",
    iconBg: "bg-teal-500/15",
    iconColor: "text-teal-400",
  },
]

const ICONS: Record<ReviewIconType, React.FC<{ className?: string }>> = {
  code: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  brain: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  shield: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  lightning: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  database: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  graph: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  rocket: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  layers: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l9 4.5L12 11 3 6.5 12 2zM3 12l9 4.5 9-4.5M3 17l9 4.5 9-4.5" />
    </svg>
  ),
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const Icon = ICONS[review.iconType]

  return (
    <motion.article
      className="group relative flex flex-col gap-4 rounded-xl p-5 glass-card glass-card-hover gradient-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Icon */}
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", review.iconBg)}>
        <Icon className={cn("w-5 h-5", review.iconColor)} />
      </div>

      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
            {review.title}
          </h3>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Body */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {review.body}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {review.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-secondary/60 text-muted-foreground text-xs px-2 py-0.5 border border-border/50"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-border/60">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={review.user.avatar} />
            <AvatarFallback className="text-[10px] bg-secondary text-muted-foreground">
              {review.user.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{review.user.name}</span>
          <span className="text-xs text-muted-foreground/50">&middot;</span>
          <span className="text-xs text-muted-foreground/50">{review.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-3.5 h-3.5" />
            {review.likes}
          </button>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
            {review.comments}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export function TopicReviews() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered = activeFilter === "all"
    ? reviews
    : reviews.filter((r) => r.topicId === activeFilter)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="min-h-full bg-background overflow-auto">
      {/* Header */}
      <div className="px-6 py-10 border-b border-border">
        <div className="max-w-6xl mx-auto space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs tracking-wider uppercase">
            Community Reviews
          </Badge>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-balance">
                <span className="gradient-text">What learners are saying</span>
              </h1>
              <p className="mt-2 text-muted-foreground max-w-xl text-balance">
                Real insights from the community — topic discussions, breakthroughs, and honest takes on every subject.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span><strong className="text-foreground">2,400+</strong> reviews this week</span>
            </div>
          </div>

          {/* Topic filter pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {topics.map((t, i) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveFilter(t.id)
                  setVisibleCount(6)
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150",
                  activeFilter === t.id
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(34,197,94,0.25)] accent-glow"
                    : "bg-secondary/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground glow-hover"
                )}
              >
                {t.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {visible.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No reviews for this topic yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                className="gap-2 border-border hover:border-primary/50 hover:bg-card text-muted-foreground hover:text-foreground"
                onClick={() => setVisibleCount((c) => c + 3)}
              >
                <ChevronDown className="w-4 h-4" />
                Load more reviews
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
