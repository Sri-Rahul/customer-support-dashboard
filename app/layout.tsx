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
      <body className={inter.className}>
        {children}
        <CommandPalette />
      </body>
    </html>
  )
}