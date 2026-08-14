import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/AppShell'
import { RouteNotFound } from '@/components/layout/NotFound'

export interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: AppShell,
  notFoundComponent: RouteNotFound,
})
