import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/Header'
import ThemesProvider from '@/providers/ThemesProvider'
import '@/styles/globals.scss'
import '@/styles/theme-config.css'
import AppWalletProvider from '@/components/AppWalletProvider'

export const metadata = {
  title: {
    default: 'NCN Portal',
    template: `%s - Claude Lite`
  },
  description: 'AI assistant powered by Claude',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>
          <ThemesProvider>
            <Header />
            {children}
            <Toaster />
          </ThemesProvider>
        </AppWalletProvider>
        <Analytics />
      </body>
    </html>
  )
}
