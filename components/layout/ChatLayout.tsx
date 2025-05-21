"use client"

import React, { useState, useEffect } from 'react'
import ConversationList from './ConversationList'
import ChatWindow from './ChatWindow'
import DetailPanel from './DetailPanel'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

export default function ChatLayout() {
  const [activeConversation, setActiveConversation] = useState<string | null>('1')
  const [showConversations, setShowConversations] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [panelTransitioning, setPanelTransitioning] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Handle smooth transitions when panels are toggled
  useEffect(() => {
    if (showConversations || showDetails) {
      setPanelTransitioning(true)
      const timer = setTimeout(() => {
        setPanelTransitioning(false)
      }, 300) // Match this with the CSS transition duration
      
      return () => clearTimeout(timer)
    }
  }, [showConversations, showDetails])

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id)
    if (isMobile) {
      setShowConversations(false)
    }
  }

  const toggleConversations = () => {
    setShowConversations(!showConversations)
    if (isMobile && !showConversations) {
      setShowDetails(false)
    }
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
    if (isMobile && !showDetails) {
      setShowConversations(false)
    }
  }

  return (
    <div className="chat-layout" style={{ 
      background: "linear-gradient(180deg, #ebebfb 0%, #d8dbfa 100%)",
      height: "100vh",
      width: "100%", 
      display: "flex",
      overflow: "hidden"
    }}>
      <div className="chat-container" style={{
        margin: "0",
        maxWidth: "100%",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        height: "100vh"
      }}>
        {/* Conversation list - hidden on mobile when not active */}
        <div className={cn(
            "conversation-list transition-all duration-500 ease-in-out",
            showConversations && isMobile ? 'open animate-slide-in-left' : '',
            !showConversations && isMobile ? 'hidden' : '',
            panelTransitioning && isMobile ? 'opacity-90 scale-[0.98]' : ''
          )} style={{
          width: isMobile ? "100%" : "320px",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}>
          <ConversationList 
            activeId={activeConversation} 
            onSelectConversation={handleSelectConversation} 
          />
        </div>

        {/* Main chat window */}
        <div className={cn(
            "chat-window transition-all duration-300",
            panelTransitioning ? 'opacity-95' : 'opacity-100'
          )} style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          overflow: "hidden"
        }}>
          <ChatWindow 
            conversationId={activeConversation} 
            onToggleConversations={toggleConversations}
            onToggleDetails={toggleDetails}
            showConversationsButton={isMobile}
          />
        </div>

        {/* Detail panel - hidden on mobile when not active */}
        <div className={cn(
            "detail-panel transition-all duration-500 ease-in-out",
            showDetails && isMobile ? 'open animate-slide-in-right' : '',
            !showDetails && isMobile ? 'hidden' : '',
            panelTransitioning && isMobile ? 'opacity-90 scale-[0.98]' : ''
          )} style={{
          width: isMobile ? (showDetails ? "100%" : "0") : "320px",
          borderLeft: "1px solid #e5e7eb",
          flexShrink: 0,
          height: "100%",
          overflow: "auto",
        }}>
          <DetailPanel 
            conversationId={activeConversation}
            onClose={isMobile ? () => setShowDetails(false) : undefined}
          />
        </div>
      </div>
    </div>
  )
}