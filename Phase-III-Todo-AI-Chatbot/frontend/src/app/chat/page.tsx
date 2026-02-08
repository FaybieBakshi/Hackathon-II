'use client'

import { useState, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import axios from 'axios'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      // TODO: Replace with actual API endpoint when backend is ready
      // For now, simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: generateMockResponse(inputMessage),
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
        setIsLoading(false)
        setIsTyping(false)
      }, 1500)
    } catch (error) {
      console.error('Error sending message:', error)
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const generateMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('add') || input.includes('create')) {
      return "I'll help you create that task! The task has been added to your list. Is there anything else you'd like to do?"
    } else if (input.includes('list') || input.includes('show')) {
      return "Here are your current tasks: 1. Buy groceries, 2. Call mom, 3. Finish project report. You have 3 tasks total."
    } else if (input.includes('complete') || input.includes('done')) {
      return "Great job! I've marked that task as complete. You're making good progress!"
    } else if (input.includes('delete') || input.includes('remove')) {
      return "I've removed that task from your list. Is there anything else you need help with?"
    } else if (input.includes('hello') || input.includes('hi')) {
      return "Hello! I'm your AI task assistant. I can help you manage tasks using natural language. Try saying 'Add a new task' or 'Show my tasks'!"
    } else {
      return "I can help you manage your tasks! You can ask me to add tasks, list your tasks, mark tasks as complete, or delete tasks. What would you like to do?"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text-enhanced text-shadow-glow">
              AI Task Assistant
            </h1>
          </div>
          <p className="text-white/70 text-lg">
            Manage your tasks naturally with AI-powered conversations
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-grow flex flex-col max-w-4xl mx-auto w-full">
          <div className="flex-grow glass-interactive rounded-2xl border border-white/10 overflow-hidden flex flex-col mb-4">
            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-xl animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/70 text-lg mb-2">
                    Welcome to your AI Task Assistant!
                  </p>
                  <p className="text-white/50">
                    Try saying things like:
                  </p>
                  <div className="mt-4 space-y-2 text-white/40 text-sm">
                    <div className="glass-interactive rounded-lg px-4 py-2">
                      "Add 'Buy groceries' to my tasks"
                    </div>
                    <div className="glass-interactive rounded-lg px-4 py-2">
                      "Show me all my tasks"
                    </div>
                    <div className="glass-interactive rounded-lg px-4 py-2">
                      "Mark 'Call mom' as complete"
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                          : 'glass-interactive text-white border border-white/10'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="glass-interactive rounded-2xl px-4 py-3 border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow glass-interactive rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:border-violet-400/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-6 py-3 rounded-xl gradient-premium text-white font-medium transition-all hover-scale disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-violet-500/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => setInputMessage("Show me all my tasks")}
              className="glass-interactive rounded-lg px-4 py-2 text-white/70 hover:text-white text-sm transition-colors border border-white/10"
            >
              List Tasks
            </button>
            <button
              onClick={() => setInputMessage("Add a new task for tomorrow")}
              className="glass-interactive rounded-lg px-4 py-2 text-white/70 hover:text-white text-sm transition-colors border border-white/10"
            >
              Add Task
            </button>
            <button
              onClick={() => setInputMessage("What tasks are pending?")}
              className="glass-interactive rounded-lg px-4 py-2 text-white/70 hover:text-white text-sm transition-colors border border-white/10"
            >
              Status Check
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}