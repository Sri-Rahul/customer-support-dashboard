"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Send, Phone, X, Moon, Menu, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MessageBubble from '@/components/ui/MessageBubble'
import { getConversationById, getMessagesForConversation } from '@/lib/data'
import AICopilot from '@/components/ui/AICopilot'
import { cn } from '@/lib/utils'

interface ChatWindowProps {
  conversationId: string | null
  onToggleConversations: () => void
  onToggleDetails: () => void
  showConversationsButton: boolean
}

export default function ChatWindow({
  conversationId,
  onToggleConversations,
  onToggleDetails,
  showConversationsButton
}: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [conversation, setConversation] = useState<any>(null)
  const [showAICopilot, setShowAICopilot] = useState(false)
  const [suggestedResponses, setSuggestedResponses] = useState<string[]>([
    'How do I get a refund?',
    'When will my order arrive?',
    'I need to change my shipping address'
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (conversationId) {
      const conv = getConversationById(conversationId)
      const msgs = getMessagesForConversation(conversationId)
      setConversation(conv)
      setMessages(msgs)
    }
  }, [conversationId])
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleSendMessage = (text?: string) => {
    if (!text && !inputValue.trim()) return
    
    const newMessage = {
      id: String(Date.now()),
      text: text || inputValue,
      sender: 'agent',
      timestamp: new Date().toISOString(),
      status: 'sent'
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    
    // Simulate customer response after a delay
    if (Math.random() > 0.7) {
      setTimeout(() => {
        let responses = [
          "Thanks for your help!",
          "I appreciate the quick response.",
          "That solves my problem.",
          "I'll try that and let you know if it works.",
          "Is there anything else I should know?"
        ]
        
        // Add refund-specific responses for Nikola Tesla conversation
        if (conversationId === '6') {
          responses = [
            "Thank you for checking. Is there any way to make an exception to the 60-day policy?",
            "I understand your policy, but the product was defective. Can you make an exception?",
            "I placed the order over 60 days ago 😢. Could you make an exception, please?",
            "The item is still unopened in its original packaging. Can you please consider this case?",
            "I've been a loyal customer for years. Is there any flexibility on the return window?"
          ]
        }
        
        const customerReply = {
          id: String(Date.now() + 1),
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'customer',
          timestamp: new Date().toISOString(),
          status: 'sent'
        }
        
        setMessages(prev => [...prev, customerReply])
      }, 3000)
    }
  }
  
  return (
    <>
      {/* Chat header */}
      <div className="chat-header py-2 px-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          {showConversationsButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggleConversations} 
              className="mr-2"
            >
              <Menu size={20} />
            </Button>
          )}

          {conversation && (
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-900 truncate max-w-[150px] sm:max-w-full">{conversation?.name}</h2>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Simplified controls for mobile */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </Button>

            <Button 
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 border-gray-200 rounded mx-1 h-8 px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </Button>
          </div>
          
          {/* Always visible important buttons */}
          <div className="flex items-center">
            <Button 
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 border-gray-200 rounded h-8 px-3 flex items-center"
            >
              <Phone size={16} className="mr-1" /> 
              <span className="hidden sm:inline">Call</span>
            </Button>
            
            <Button 
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 border-gray-200 rounded h-8 px-3 flex items-center ml-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              <span className="hidden sm:inline">Snooze</span>
            </Button>
            
            <Button 
              className="bg-black hover:bg-gray-800 text-white rounded h-8 px-3 flex items-center ml-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span className="hidden sm:inline">Close</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggleDetails}
            className="md:hidden text-gray-600 hover:text-gray-900 h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center ml-1"
            aria-label="Show details"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="chat-messages">
        {messages.map((message) => (
          message.sender === 'system' ? (
            <div key={message.id} className="flex justify-center my-2 px-4 animate-fade-in">
              <div className="bg-amber-100 text-sm py-2 px-4 rounded-md flex items-center justify-between w-full max-w-md transition-all duration-300 hover:bg-amber-200">
                <span>{message.text}</span>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-1">
                    {new Date(message.timestamp).getMinutes() - new Date().getMinutes() < 0 
                      ? `${Math.abs(new Date(message.timestamp).getMinutes() - new Date().getMinutes())}m`
                      : '16m'}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={message.id} className="animate-fade-in transition-all duration-300">
              <MessageBubble
                message={message}
              />
            </div>
          )
        ))}
        
        {/* AI Copilot section */}
        <div className={cn("transition-all duration-500 ease-in-out", {
          "opacity-100 max-h-96 animate-scale-in": showAICopilot,
          "opacity-0 max-h-0 overflow-hidden animate-scale-out": !showAICopilot
        })}>
          <AICopilot onSuggest={(suggestion) => handleSendMessage(suggestion)} />
        </div>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <div className="chat-input-container animate-fade-in">
        {/* Suggested responses */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs font-medium text-gray-500 mr-1">Suggested:</span>
          {suggestedResponses.map((suggestion, i) => (
            <Button
              key={i}
              variant="subtle"
              size="xs"
              className="text-xs py-1 px-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
              onClick={() => handleSendMessage(suggestion)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              {suggestion}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center border border-gray-200 rounded-full bg-white transition-all duration-300 hover:shadow-md focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-gray-700 m-1" 
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M13 3L4.8 15.7c-.5.8.2 1.8 1.1 1.8h13.2c.9 0 1.6-1 1.1-1.8L11.3 3c-.4-.7-1.4-.7-1.8 0z"/>
            </svg>
          </Button>
          
          <div className="h-5 w-px bg-gray-200"></div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-gray-700 m-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </Button>
          
          <div className="h-5 w-px bg-gray-200"></div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-gray-700 m-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </Button>
          
          <div className="relative flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
          </div>

          <Button 
            variant={inputValue.trim() ? 'primary' : 'ghost'} 
            className="rounded-full bg-black text-white hover:bg-gray-800 px-4 py-2 m-1" 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
          >
            Send
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-center text-gray-400 flex items-center justify-center">
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded mr-1">⌘K / Ctrl+K</span>
          for shortcuts
        </div>
      </div>
    </>
  )
}