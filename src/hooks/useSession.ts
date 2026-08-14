import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  signIn,
  signOut,
  signUp,
  type SignInInput,
  type SignUpInput,
} from '@/services/auth.service'
import { queryKeys } from '@/services/query-keys'
import { sessionQueryOptions } from '@/services/queries'
import type { User } from '@/types'

export function useSession() {
  const { data: user, isPending } = useQuery(sessionQueryOptions)

  return {
    user: user ?? null,
    isAuthenticated: Boolean(user),
    isLoading: isPending,
  }
}

function useSessionWriter() {
  const queryClient = useQueryClient()

  return (user: User | null) => {
    queryClient.setQueryData(queryKeys.session, user)
    // Bookings and favourites are per-user; drop the previous account's cache.
    queryClient.removeQueries({ queryKey: queryKeys.bookings.all })
    queryClient.removeQueries({ queryKey: queryKeys.favourites.all })
  }
}

export function useSignUp() {
  const setSession = useSessionWriter()

  return useMutation({
    mutationFn: (input: SignUpInput) => signUp(input),
    onSuccess: setSession,
  })
}

export function useSignIn() {
  const setSession = useSessionWriter()

  return useMutation({
    mutationFn: (input: SignInInput) => signIn(input),
    onSuccess: setSession,
  })
}

export function useSignOut() {
  const setSession = useSessionWriter()

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => setSession(null),
  })
}
