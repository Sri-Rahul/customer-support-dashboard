"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/FixedAvatar'
import { cn } from '@/lib/utils'

interface ConversationItemProps {
  conversation: any
  isActive: boolean
  onClick: () => void
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick
}: ConversationItemProps) {
  const { id, name, lastMessage, time, isUnread, priority, avatar, company, typing } = conversation
  
  return (
    <div 
      className={cn(
        "conversation-item", 
        isActive && "active",
        isUnread && "font-medium"
      )}
      onClick={onClick}
      style={{
        backgroundColor: isActive ? "#e9f0fe" : "transparent",
        borderTop: "none",
        borderBottom: "1px solid #edf0f3",
        padding: "0.75rem 1rem",
        position: "relative",
        cursor: "pointer"
      }}
    >
      <div className="flex items-start">
        <div className="relative mr-3">
          <Avatar className="h-8 w-8">
            {avatar ? (
              <AvatarImage src={avatar} alt={name} />
            ) : (
              <AvatarFallback 
                className={
                  id === '1' ? 'bg-violet-100 text-violet-800' : 
                  id === '2' ? 'bg-red-100 text-red-800' : 
                  id === '3' ? 'bg-blue-100 text-blue-800' :
                  id === '4' ? 'bg-gray-900 text-white' :
                  id === '5' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }
              >
                {name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          
          {priority === 'high' && (
            <span className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r-md"></span>
          )}
          
          {conversation.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          )}
          
          {typing && (
            <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-black text-white text-[0.6rem] flex items-center justify-center rounded-full">
              T
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline">
            <div className="text-sm font-medium truncate max-w-[120px]">
              {name}
              {company && <span className="text-gray-500 font-normal"> - {company}</span>}
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap ml-1">{time}</span>
          </div>
          
          <p className="text-xs text-gray-600 truncate pr-4">{lastMessage}</p>
        </div>
      </div>
      
      {isUnread && typeof isUnread === 'number' && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-xs font-semibold flex items-center justify-center rounded-sm px-1.5 py-0.5">
          {isUnread}
        </span>
      )}
    </div>
  )
}