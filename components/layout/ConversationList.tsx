"use client"

import React, { useState } from 'react'
import { ChevronDown, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ConversationItem from '@/components/ui/ConversationItem'
import { conversations } from '@/lib/data'

interface ConversationListProps {
  activeId: string | null
  onSelectConversation: (id: string) => void
}

export default function ConversationList({ 
  activeId, 
  onSelectConversation 
}: ConversationListProps) {
  const [filter, setFilter] = useState('5 Open')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-3 border-b border-gray-200 bg-white">
        <h1 className="text-lg font-medium mb-3">Your inbox</h1>
        
        <div className="flex items-center justify-between gap-2 mb-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm text-gray-600 justify-between border-gray-200 rounded-xl h-8 px-2 flex-1"
          >
            <div className="flex items-center">
              <span>{filter}</span>
            </div>
            <ChevronDown size={14} />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm text-gray-600 justify-between border-gray-200 rounded-xl h-8 px-2 flex-1"
          >
            <div className="flex items-center">
              <span>Waiting longest</span>
            </div>
            <ChevronDown size={14} />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input 
            type="text"
            placeholder="Search conversations"
            className="pl-9 bg-gray-50 border-gray-200 rounded-xl h-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {filteredConversations.map(conversation => (
          <ConversationItem 
            key={conversation.id}
            conversation={conversation}
            isActive={activeId === conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
          />
        ))}
      </div>
      
      <div className="border-t border-gray-200 p-2 bg-white flex items-center justify-center">
        <div className="flex bg-gray-100 rounded-sm">
          <button className="px-2 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button className="px-2 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}