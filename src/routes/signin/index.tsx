import { createFileRoute } from '@tanstack/react-router'

import { SignInPage } from '@/features/auth/SignInPage'
import { validateRedirectSearch } from '@/lib/guards'

export const Route = createFileRoute('/signin/')({
  validateSearch: validateRedirectSearch,
  component: SignInPage,
})
