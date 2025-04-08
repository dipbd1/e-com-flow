'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReduxProvider>
        {children}
        <Toaster position="top-right" />
      </ReduxProvider>
    </ThemeProvider>
  );
} 