import { createFileRoute } from '@tanstack/react-router'

import { SignUpPage } from '@/features/auth/SignUpPage'
import { validateRedirectSearch } from '@/lib/guards'

export const Route = createFileRoute('/signup/')({
  validateSearch: validateRedirectSearch,
  component: SignUpPage,
})
