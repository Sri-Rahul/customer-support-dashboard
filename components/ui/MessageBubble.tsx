"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface MessageBubbleProps {
  message: {
    id: string
    text: string
    sender: 'agent' | 'customer' | 'ai' | 'system'
    timestamp: string
    status?: 'sending' | 'sent' | 'delivered' | 'read' | 'seen'
    avatar?: string
    name?: string
  }
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { sender, text, timestamp, status, avatar, name } = message
  
  const formattedTime = format(new Date(timestamp), 'h:mm a')
  
  // System messages are now handled in the parent component
  if (sender === 'system') {
    return null;
  }
  
  const isCustomer = sender === 'customer'
  const isAI = sender === 'ai'
  const isAgent = sender === 'agent'

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={cn(
      "flex items-start gap-3 py-2 group transition-all duration-300 hover:-translate-y-0.5", 
      {
        "justify-end": isAgent || isAI,
        "animate-fade-in": true
      }
    )}>
      {isCustomer && (
        <Avatar className="mt-0.5 h-8 w-8 transition-transform duration-300 group-hover:scale-105">
          {avatar ? (
            <AvatarImage src={avatar} alt={name || 'Customer'} />
          ) : (
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {(name || 'C').charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
      )}

      <div className={cn("message-bubble transition-all duration-300", {
        "agent": isAgent,
        "customer": isCustomer,
        "ai": isAI,
        "hover:shadow-md": true
      })}
      style={{
        backgroundColor: isCustomer ? "#f3f4f6" : "#e9f0fe",
        borderRadius: "1rem",
        padding: "0.75rem 1rem"
      }}
      >
        <div>{text}</div>
        <div className="flex items-center justify-end mt-1 text-xs text-gray-500">
          {formatTime(timestamp)}
          
          {status === 'seen' || status === 'read' ? (
            <div className="flex items-center ml-1">
              <span className="text-xs mr-1">Seen</span>
              {(sender === 'agent' || sender === 'ai') && (
                <Avatar className="h-4 w-4">
                  <AvatarImage src={avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"} alt={name || 'User'} />
                </Avatar>
              )}
            </div>
          ) : status === 'sent' && (
            <svg className="w-3 h-3 ml-1 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L9 16L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>

      {(isAgent || isAI) && (
        <Avatar className="mt-0.5 h-8 w-8 transition-transform duration-300 group-hover:scale-105">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{name ? name.charAt(0) : 'A'}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}