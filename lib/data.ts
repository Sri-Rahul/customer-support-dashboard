// Sample data for the customer support chatbot

export const conversations = [
  {
    id: '1',
    name: 'Luis Easton',
    company: 'GitHub',
    lastMessage: 'I bought a product from your store in November as a Christmas gift for a member of my family...',
    time: '45m',
    isUnread: true,
    priority: 'normal',
    online: true,
    email: 'luis@github.com',
    firstSeen: '2023-12-10T10:35:00Z',
    location: 'San Francisco, CA',
    browser: 'Chrome on macOS'
  },
  {
    id: '2',
    name: 'Ivan',
    company: 'Nike',
    lastMessage: 'Hi there, I have a question about my order #12345. It says delivered but I haven\'t received it yet.',
    time: '30m',
    isUnread: 3,
    priority: 'high',
    typing: true
  },
  {
    id: '3',
    name: 'Lead from New York',
    lastMessage: 'Good morning, let me know when you have time to discuss the new project requirements.',
    time: '40m',
    priority: 'normal'
  },
  {
    id: '4',
    name: 'Booking API problems',
    company: 'Small Crafts',
    lastMessage: 'Bug report',
    time: '45m',
    isUnread: false,
    priority: 'normal'
  },
  {
    id: '5',
    name: 'Miracle',
    company: 'Exemplary Bank',
    lastMessage: 'Hey there, I\'m here to discuss our partnership opportunities for next quarter.',
    time: '45m',
    isUnread: false,
    priority: 'normal'
  },
  {
    id: '6',
    name: 'Nikola Tesla',
    lastMessage: 'I placed the order over 60 days ago 😢. Could you make an exception, please?',
    time: '21m',
    isUnread: true,
    priority: 'high',
    online: true
  }
]

export function getConversationById(id: string) {
  return conversations.find(conv => conv.id === id)
}

export const messages = {
  '1': [
    {
      id: '1-1',
      text: 'I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you\'d be able to refund me, as it is un-opened.',
      sender: 'customer',
      timestamp: '2023-01-28T14:23:45Z',
      status: 'read'
    },
    {
      id: '1-2',
      text: 'Let me just look into this for you, Luis.',
      sender: 'agent',
      timestamp: '2023-01-28T14:25:45Z',
      status: 'seen',
      name: 'Support Agent'
    }
  ],
  '3': [
    {
      id: '3-1',
      text: 'Good morning, let me know when you have time to discuss the new project requirements.',
      sender: 'customer',
      timestamp: '2023-01-28T14:50:45Z',
      status: 'read'
    },
    {
      id: '3-2',
      text: 'Hi there! I\'m available for a discussion about the project requirements. Would tomorrow at 2 PM work for you?',
      sender: 'agent',
      timestamp: '2023-01-28T14:55:30Z',
      status: 'sent',
      name: 'Sales Rep'
    }
  ],
  '4': [
    {
      id: '4-1',
      text: 'We\'ve been experiencing some issues with the booking API for the last two days. The requests are timing out intermittently.',
      sender: 'customer',
      timestamp: '2023-01-28T13:21:10Z',
      status: 'read'
    },
    {
      id: '4-2',
      text: 'I\'ll escalate this to our engineering team right away. Can you provide any specific error codes or logs that might help us diagnose the issue?',
      sender: 'agent',
      timestamp: '2023-01-28T13:25:22Z',
      status: 'seen',
      name: 'Tech Support'
    },
    {
      id: '4-3',
      text: 'Here\'s the error log from our server: Error: Request timed out after 30000ms',
      sender: 'customer',
      timestamp: '2023-01-28T13:32:45Z',
      status: 'read'
    }
  ],
  '5': [
    {
      id: '5-1',
      text: 'Hey there, I\'m here to discuss our partnership opportunities for next quarter.',
      sender: 'customer',
      timestamp: '2023-01-28T12:05:30Z',
      status: 'read'
    },
    {
      id: '5-2',
      text: 'Hello Miracle! We\'re excited to explore partnership opportunities with Exemplary Bank. I\'ve reviewed your previous collaborations and have some ideas that might interest you.',
      sender: 'agent',
      timestamp: '2023-01-28T12:10:15Z',
      status: 'seen',
      name: 'Partnership Manager'
    },
    {
      id: '5-3',
      text: 'Based on your financial services focus, we could offer a specialized integration that would benefit your customers while expanding our reach.',
      sender: 'agent',
      timestamp: '2023-01-28T12:12:00Z',
      status: 'seen',
      name: 'Partnership Manager'
    }
  ],
  '2': [
    {
      id: '2-1',
      text: 'Hi there, I have a question about my order #12345. It says delivered but I haven\'t received it yet.',
      sender: 'customer',
      timestamp: '2023-01-28T15:10:22Z',
      status: 'read'
    },
    {
      id: '2-2',
      text: 'I\'m sorry to hear that your order hasn\'t arrived. Let me check the tracking information for you.',
      sender: 'agent',
      timestamp: '2023-01-28T15:12:05Z',
      status: 'read'
    },
    {
      id: '2-3',
      text: 'According to the shipping carrier, the package was delivered to your front porch yesterday at 2:35 PM. Could someone else have received it? Or perhaps it was left in a different location?',
      sender: 'agent',
      timestamp: '2023-01-28T15:14:30Z',
      status: 'read'
    }
  ],
  '6': [
    {
      id: '6-1',
      text: 'Thanks, passing you to the right team now.',
      sender: 'agent',
      timestamp: '2023-01-28T16:05:00Z',
      status: 'seen',
      name: 'Support Agent'
    },
    {
      id: '6-2',
      text: 'Let me just look into this for you, Nikola.',
      sender: 'agent',
      timestamp: '2023-01-28T16:07:30Z',
      status: 'seen',
      name: 'Brian Byrne'
    },
    {
      id: '6-3',
      text: 'We understand if your purchase didn\'t quite meet your expectations. To help you with a refund, please provide your order ID and proof of purchase.\n\nJust a heads-up:\nWe can only refund orders from the last 60 days.\nYour item must meet our return condition requirements.\n\nOnce confirmed, I\'ll send you a returns QR code for easy processing.\n\nThanks for your cooperation!',
      sender: 'agent',
      timestamp: '2023-01-28T16:10:00Z',
      status: 'seen',
      name: 'Brian Byrne'
    },
    {
      id: '6-4',
      text: 'I placed the order over 60 days ago 😢. Could you make an exception, please?',
      sender: 'customer',
      timestamp: '2023-01-28T16:15:30Z',
      status: 'sent'
    },
    {
      id: '6-5',
      text: 'This customer has been waiting for 5 minutes.',
      sender: 'system',
      timestamp: '2023-01-28T16:20:30Z'
    },
  ]
}

export function getMessagesForConversation(conversationId: string) {
  return messages[conversationId as keyof typeof messages] || []
}