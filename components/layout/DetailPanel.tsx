"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDown, X, Plus, Send, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getConversationById } from '@/lib/data'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'

interface DetailPanelProps {
  conversationId: string | null
  onClose?: () => void
}

export default function DetailPanel({ 
  conversationId,
  onClose 
}: DetailPanelProps) {
  const [activeTab, setActiveTab] = useState('copilot')
  const [conversation, setConversation] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (conversationId) {
      const conv = getConversationById(conversationId)
      setConversation(conv)
      
      // Add a small delay before showing the panel to trigger animation
      setTimeout(() => setIsVisible(true), 50)
    }
    
    return () => {
      setIsVisible(false)
    }
  }, [conversationId])

  if (!conversation) return null

  return (
    <div className={cn(
      "flex flex-col h-full transition-all duration-300 ease-in-out",
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
    )}>
      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200 bg-white">
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="md:hidden transition-transform duration-200 hover:scale-105"
          >
            <X size={18} />
          </Button>
        )}
        
        <div className="flex items-center border-b border-gray-200 w-full">
          <div className="flex-1 flex">
            <button
              className={`flex items-center justify-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === 'copilot' ? 'tab-active' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('copilot')}
            >
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="16" x="2" y="4" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="2" />
              </svg>
              Copilot
            </button>
            
            <button
              className={`flex items-center justify-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === 'details' ? 'tab-active' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Content with transition */}
      <div className={cn(
        "flex-1 overflow-y-auto transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}>
        {activeTab === 'copilot' ? (
          <div className="bg-white">
            <div className="chat-conversation">
              {/* User Message */}
              <div className="flex items-start gap-3 px-4 pt-4 pb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">You</div>
                  <div className="text-sm text-gray-700 mt-1">How do I get a refund?</div>
                </div>
              </div>
              
              {/* AI Copilot Message */}
              <div className="flex items-start gap-3 px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-100">
                <div className="w-8 h-8 shrink-0 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Fin</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Fin</div>
                  <div className="text-sm text-gray-700 mt-1">
                    <p className="mb-3">We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund.</p>
                    <p className="mb-3">To assist you with your refund request, could you please provide your order ID and proof of purchase.</p>
                    <p className="mb-3">Please note:</p>
                    <p className="mb-3">We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding.</p>
                    <p className="flex items-start">
                      <span>Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back to us. Your refund will be automatically issued once you put it in the post.</span>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span className="ml-1 inline-flex items-center justify-center w-5.5 h-5.5 rounded-full bg-blue-600 text-white text-xs font-medium cursor-pointer">
                            <span className="transform translate-y-px">2</span>
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-0 animate-scale-in">
                          <div className="bg-white rounded-md border shadow-md">
                            <div className="p-4 pb-2">
                              <div className="flex items-center text-gray-500 text-xs mb-1">
                                <span className="mr-1 py-0.5 px-2 bg-gray-100 rounded">Public article</span>
                                <span>•</span>
                                <span className="ml-1">Amy Adams</span>
                                <span>•</span>
                                <span className="ml-1">1d ago</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm">We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. This guide outlines the simple steps to help you navigate the refund process and ensure a smooth resolution to your concern.</p>
                              </div>
                            </div>
                            <div className="border-t p-2">
                              <button className="flex items-center justify-center w-full px-5 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition-colors duration-200">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Add to composer
                              </button>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <button className="flex items-center px-5 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition-colors duration-200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Add to composer
                      </button>
                      <div className="flex items-center">
                        <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Relevant Sources Section */}
              <div className="px-4 py-3 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">15 relevant sources found</div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 bg-black text-white rounded-sm flex items-center justify-center text-xs">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="18" height="18" x="3" y="3" rx="2" stroke="white" strokeWidth="2" />
                        <path d="M9 12h6M12 9v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <a href="#" className="text-black font-medium hover:underline transition-all duration-200">Getting a refund</a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-sm flex items-center justify-center text-xs">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10h8M8 14h4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <rect width="16" height="18" x="4" y="3" rx="2" stroke="white" strokeWidth="2" />
                      </svg>
                    </span>
                    <a href="#" className="text-black hover:underline transition-all duration-200">Refund for an order placed by mistake</a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-sm flex items-center justify-center text-xs">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10h8M8 14h4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <rect width="16" height="18" x="4" y="3" rx="2" stroke="white" strokeWidth="2" />
                      </svg>
                    </span>
                    <a href="#" className="text-black hover:underline transition-all duration-200">Refund for an unwanted gift</a>
                  </div>
                  
                  <div className="mt-2">
                    <a href="#" className="text-sm text-gray-500 hover:underline flex items-center transition-all duration-200">
                      See all <ArrowUpRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Question Input */}
              <div className="px-4 py-3 border-t border-gray-200">
                <div className="relative">
                  <Input 
                    placeholder="Ask a follow up question..."
                    className="pr-10 rounded-full bg-gray-50 shadow-sm transition-all duration-200"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 20V4m-8 8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <p className="font-medium text-gray-800">Assignee</p>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-1">
                    <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Brian Byrne</span>
                </div>
              </div>
              
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center">
                  <p className="font-medium text-gray-800">Team</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-sm">Unassigned</span>
                </div>
              </div>
            </div>
            
            <DetailSection 
              title="LINKS" 
              items={[
                { name: "Tracker ticket", icon: "ticket" },
                { name: "Back-office tickets", icon: "ticket-alt" },
                { name: "Side conversations", icon: "message" }
              ]}
            />
            
            <DetailSection 
              title="USER DATA" 
              expanded={false}
            />
            
            <DetailSection 
              title="CONVERSATION ATTRIBUTES" 
              expanded={false}
            />
            
            <DetailSection 
              title="COMPANY DETAILS" 
              expanded={false}
            />
            
            <DetailSection 
              title="SALESFORCE" 
              expanded={false}
            />
            
            <DetailSection 
              title="STRIPE" 
              expanded={false}
            />
            
            <DetailSection 
              title="JIRA FOR TICKETS" 
              expanded={false}
            />
          </>
        )}
      </div>
    </div>
  )
}

interface DetailSectionProps {
  title: string
  items?: Array<{ name: string, icon: string }>
  expanded?: boolean
}

function DetailSection({ title, items = [], expanded = true }: DetailSectionProps) {
  const [isExpanded, setIsExpanded] = useState(expanded)
  
  return (
    <div className="border-b border-gray-200 py-2">
      <div 
        className="flex items-center justify-between px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-gray-50" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-xs font-medium text-gray-500">{title}</span>
        <ChevronDown 
          size={16} 
          className={cn(
            "transform transition-transform duration-300",
            isExpanded ? '' : '-rotate-90'
          )} 
        />
      </div>
      
      {isExpanded && items && items.length > 0 && (
        <div className="px-4 py-1 space-y-2 animate-fade-in">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="18" height="18" x="3" y="3" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 9h10M7 13h10M7 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{item.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              >
                <Plus size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      {...props}
    />
  )
}