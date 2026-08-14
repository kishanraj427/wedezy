import { redirect } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

import { sessionQueryOptions } from '@/services/queries'
import type { User } from '@/types'

/**
 * Route guard for `beforeLoad`. Resolves the session through the query cache so
 * a guarded route never renders for a signed-out visitor, and returns them to
 * where they were headed after signing in.
 */
export async function requireSession(
  queryClient: QueryClient,
  redirectTo: string,
): Promise<{ user: User }> {
  const user = await queryClient.ensureQueryData(sessionQueryOptions)

  if (!user) {
    throw redirect({ to: '/signin', search: { redirect: redirectTo } })
  }

  return { user }
}

/** Validates `?redirect=` — only same-origin paths, never an external URL. */
export function validateRedirectSearch(search: Record<string, unknown>): { redirect?: string } {
  const value = search.redirect
  if (typeof value !== 'string') return {}
  return value.startsWith('/') && !value.startsWith('//') ? { redirect: value } : {}
}
