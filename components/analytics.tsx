"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Clock, TrendingUp, Target, Award, Flame, BookOpen, Brain, Code } from "lucide-react"

// Mock data for study time over the week
const weeklyStudyData = [
  { day: "Mon", hours: 2.5, goal: 3 },
  { day: "Tue", hours: 3.2, goal: 3 },
  { day: "Wed", hours: 1.8, goal: 3 },
  { day: "Thu", hours: 4.1, goal: 3 },
  { day: "Fri", hours: 2.9, goal: 3 },
  { day: "Sat", hours: 5.2, goal: 4 },
  { day: "Sun", hours: 3.8, goal: 4 },
]

// Mock data for topic strengths
const topicStrengthData = [
  { topic: "React", strength: 85, fullMark: 100 },
  { topic: "TypeScript", strength: 72, fullMark: 100 },
  { topic: "Python", strength: 68, fullMark: 100 },
  { topic: "Machine Learning", strength: 45, fullMark: 100 },
  { topic: "System Design", strength: 60, fullMark: 100 },
  { topic: "Algorithms", strength: 78, fullMark: 100 },
]

// Mock data for monthly progress
const monthlyProgressData = [
  { month: "Jan", hours: 45 },
  { month: "Feb", hours: 52 },
  { month: "Mar", hours: 48 },
  { month: "Apr", hours: 61 },
  { month: "May", hours: 55 },
  { month: "Jun", hours: 72 },
]

// Topic cards data
const topicCards = [
  { name: "React & Next.js", progress: 85, sessions: 24, icon: Code, color: "#10b981" },
  { name: "TypeScript", progress: 72, sessions: 18, icon: Code, color: "#3b82f6" },
  { name: "Python", progress: 68, sessions: 15, icon: Brain, color: "#f59e0b" },
  { name: "Machine Learning", progress: 45, sessions: 8, icon: Brain, color: "#8b5cf6" },
]

export function Analytics() {
  const totalHoursThisWeek = weeklyStudyData.reduce((acc, day) => acc + day.hours, 0)
  const averageDaily = (totalHoursThisWeek / 7).toFixed(1)

  return (
    <div className="p-6 space-y-6 overflow-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Study Analytics</h1>
        <p className="text-muted-foreground">Track your learning progress and topic strengths</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">{totalHoursThisWeek.toFixed(1)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-2/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-2xl font-bold text-foreground">{averageDaily}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-foreground">12 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Topics Mastered</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Time */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Study Time</CardTitle>
            <CardDescription>Hours studied each day this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: { label: "Hours", color: "#10b981" },
                goal: { label: "Goal", color: "#3b82f6" },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyStudyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorHours)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Topic Strengths Radar */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Topic Strengths</CardTitle>
            <CardDescription>Your proficiency across different topics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                strength: { label: "Strength", color: "#10b981" },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={topicStrengthData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="topic" tick={{ fill: "#888", fontSize: 11 }} />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: "#888", fontSize: 10 }}
                    tickCount={5}
                  />
                  <Radar
                    name="Strength"
                    dataKey="strength"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress & Topic Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Progress */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Progress</CardTitle>
            <CardDescription>Total study hours per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: { label: "Hours", color: "#3b82f6" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Weekly Goals
            </CardTitle>
            <CardDescription>Your progress this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Study Hours</span>
                <span className="text-foreground font-medium">23.5 / 24h</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Topics Covered</span>
                <span className="text-foreground font-medium">4 / 5</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Quizzes Completed</span>
                <span className="text-foreground font-medium">8 / 10</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Notes Created</span>
                <span className="text-foreground font-medium">12 / 15</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Topic Progress Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Topic Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topicCards.map((topic, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${topic.color}20` }}
                  >
                    <topic.icon className="w-5 h-5" style={{ color: topic.color }} />
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {topic.sessions} sessions
                  </Badge>
                </div>
                <h3 className="font-medium text-foreground mb-2">{topic.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{topic.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${topic.progress}%`, backgroundColor: topic.color }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
