"use client"

import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface AICopilotProps {
  onSuggest: (suggestion: string) => void
}

export default function AICopilot({ onSuggest }: AICopilotProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(true)
  
  useEffect(() => {
    // Simulate AI thinking and generating suggestions
    const timer = setTimeout(() => {
      setIsTyping(false)
      setSuggestions([
        "I understand you received a product that wasn't what you expected. I'd be happy to help with a refund. Could you please provide your order number?",
        "I'll look into the refund options for your purchase. Our policy allows returns within 30 days of delivery. Does that timeline work for your situation?",
        "I'm sorry to hear about the issue with your purchase. Let me check if we can process a refund even though the package is unopened. This should actually make the process easier."
      ])
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg my-4">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-gray-900 w-5 h-5 rounded-sm flex items-center justify-center mr-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
              <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-sm font-medium">AI Copilot</span>
        </div>
        <Button variant="ghost" size="xs" className="p-0 h-6 w-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
      
      {isTyping ? (
        <div className="flex items-center space-x-2 h-20 justify-center p-4">
          <div className="typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <span className="text-sm text-gray-500">AI is drafting suggestions...</span>
        </div>
      ) : (
        <div>
          <div className="p-4 mb-2">
            <h3 className="font-medium mb-1">Hi, I'm Fin AI Copilot</h3>
            <p className="text-sm text-gray-500">Ask me anything about this conversation.</p>
          </div>
          
          <div className="px-4 pb-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-blue-50 rounded p-3 text-sm relative group mb-2 hover:bg-blue-100 transition-colors">
                {suggestion}
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="primary" 
                    size="xs" 
                    onClick={() => onSuggest(suggestion)}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}