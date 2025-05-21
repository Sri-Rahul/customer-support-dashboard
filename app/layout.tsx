import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CommandPalette } from '@/components/ui/CommandPalette'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Customer Support Chat | Intercom-like Interface',
  description: 'A modern customer support chatbot interface inspired by Intercom',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
        <CommandPalette />
      </body>
    </html>
  )
}