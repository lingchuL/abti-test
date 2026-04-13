import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastProvider } from '@/components/Toast';
import { LangProvider } from '@/i18n';

export const metadata: Metadata = {
  title: 'Animal Behavior Type Indicator',
  description: 'ABTI Animal Behavior Type Indicator — What personality does your furry friend have? 30 fun quiz questions, 27 pet personality outcomes.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🐾%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f8fafc',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 min-h-screen">
        <ThemeProvider>
          <ToastProvider>
            <LangProvider>
              {/* Background paws */}
              <div className="paw-bg top-20 -left-10 rotate-[-20deg]">🐾</div>
              <div className="paw-bg bottom-20 -right-10 rotate-[15deg]">🐾</div>
              {children}
              <Analytics />
            </LangProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
