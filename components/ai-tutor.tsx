"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Send, 
  Paperclip, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  ListChecks,
  Lightbulb,
  Bot,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

const suggestedPrompts = [
  { icon: Lightbulb, text: "Explain this concept", description: "Break down complex topics" },
  { icon: ListChecks, text: "Create quiz questions", description: "Test your knowledge" },
  { icon: FileText, text: "Summarize my notes", description: "Get key takeaways" },
  { icon: HelpCircle, text: "Help me understand", description: "Clarify confusion" },
]

export function AITutor() {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handlePromptClick = (promptText: string) => {
    setInput(promptText)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">AI Tutor</h1>
            <p className="text-sm text-muted-foreground">Your personal learning assistant</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Powered by GPT
        </Badge>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="space-y-8 py-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">How can I help you learn today?</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Ask me anything about your studies. I can explain concepts, create quizzes, summarize notes, and more.
                </p>
              </div>

              {/* Suggested Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedPrompts.map((prompt, index) => (
                  <Card 
                    key={index}
                    className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors"
                    onClick={() => handlePromptClick(prompt.text)}
                  >
                    <CardContent className="flex items-start gap-3 p-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <prompt.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{prompt.text}</p>
                        <p className="text-sm text-muted-foreground">{prompt.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className={cn(
                    "w-8 h-8 shrink-0",
                    message.role === "user" ? "bg-secondary" : "bg-primary/20"
                  )}>
                    <AvatarFallback className={cn(
                      message.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary/20 text-primary"
                    )}>
                      {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 max-w-[80%]",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    )}
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <p key={index} className="text-sm leading-relaxed whitespace-pre-wrap">
                            {part.text}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-4">
                  <Avatar className="w-8 h-8 shrink-0 bg-primary/20">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl px-4 py-3 bg-card border border-border">
                    <div className="flex items-center gap-2">
                      <Spinner className="w-4 h-4" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your learning..."
              className="min-h-[56px] max-h-[200px] pr-24 resize-none bg-secondary border-border focus:border-primary"
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                type="submit"
                size="icon"
                className="w-8 h-8 bg-primary hover:bg-primary/90"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Spinner className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  )
}
