# Customer Support Dashboard

![Customer Support Dashboard](https://raw.githubusercontent.com/Sri-Rahul/customer-support-dashboard/main/public/screenshot.png)

A modern, responsive customer support interface designed to streamline agent workflows, enhance customer experiences, and improve service efficiency through AI assistance.

## 🔗 Live Demo

[View Live Demo](https://customer-support-dashboard.netlify.app/)

## 🌟 Features

### For Support Agents
- **Real-time Chat Interface**: Communicate with customers in real-time with typing indicators and read receipts
- **Multi-conversation Management**: Switch between active customer conversations seamlessly
- **AI-powered Response Suggestions**: Get intelligent response suggestions based on conversation context
- **Customer Context**: View comprehensive customer details including previous interactions and account information
- **Knowledge Base Integration**: Access relevant support articles directly within conversations

### Interface Features
- **System Notifications**: Alerts for waiting customers and important events
- **Responsive Design**: Fully adaptive layout for both mobile and desktop use
- **Conversation Filtering**: Sort by priority, unread, or waiting time
- **Smart Status Indicators**: Visual cues for online status, priority levels, and read status

## 💻 Tech Stack

- **Frontend Framework**: Next.js with React 18
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: Radix UI with shadcn/ui
- **State Management**: React Hooks and Context API
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **Deployment**: Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sri-Rahul/customer-support-dashboard.git
   cd customer-support-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
customer-support-dashboard/
├── app/                  # Next.js application routes
├── components/           # React components
│   ├── layout/           # Layout components (ChatWindow, DetailPanel, etc.)
│   └── ui/               # UI components (Button, MessageBubble, etc.)
├── lib/                  # Utility functions and data
├── public/               # Static assets
└── styles/               # Global styles
```

## 📱 Mobile Support

The dashboard adapts to different screen sizes:
- **Desktop**: Full three-panel layout with conversations, chat window, and details panel
- **Tablet**: Collapsible panels with smooth transitions
- **Mobile**: Focus on essential features with intuitive navigation

## 🛠️ Development

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=your_api_url_here
```

### Building for Production

```bash
npm run build
# or
yarn build
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📸 Screenshots

- Main Dashboard Interface
- Mobile Responsive View
- AI Suggestion Interface
- Customer Details Panel

## 📝 Acknowledgements

- Design inspiration from modern customer support tools like Intercom, Zendesk, and Crisp
- Icons provided by [Lucide](https://lucide.dev/)
- UI components based on [shadcn/ui](https://ui.shadcn.com/)
