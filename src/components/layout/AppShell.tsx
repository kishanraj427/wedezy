import { Outlet } from '@tanstack/react-router'
import { Box, Theme } from '@radix-ui/themes'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { useStorageSync } from '@/hooks/useStorageSync'

/** Chrome shared by every route: theme, toasts, header, footer. */
export function AppShell() {
  // Keeps this tab in step with bookings or sign-outs made in another one.
  useStorageSync()

  return (
    <Theme
      accentColor="crimson"
      grayColor="mauve"
      radius="large"
      scaling="100%"
      className="bg-canvas"
    >
      <ToastProvider>
        <Header />
        <Box asChild>
          <main>
            <Outlet />
          </main>
        </Box>
        <Footer />
      </ToastProvider>
    </Theme>
  )
}
