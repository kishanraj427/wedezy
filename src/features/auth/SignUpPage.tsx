import { getRouteApi, useNavigate } from '@tanstack/react-router'

import { AppLink } from '@/components/ui/AppLink'
import { useToast } from '@/components/ui/toast-context'
import { useSignUp } from '@/hooks/useSession'

import { AuthForm, type AuthFormValues } from './components/AuthForm'

const route = getRouteApi('/signup/')

export function SignUpPage() {
  const { redirect } = route.useSearch()
  const navigate = useNavigate()
  const signUp = useSignUp()
  const { toast } = useToast()

  const onSubmit = async ({ name, email, password }: AuthFormValues) => {
    const user = await signUp.mutateAsync({ name, email, password })
    toast({
      title: 'Account created',
      description: `You're signed in as ${user.email}.`,
      tone: 'success',
    })
    navigate({ to: redirect ?? '/', replace: true })
  }

  return (
    <AuthForm
      title="Create your account"
      subtitle="Save venues, compare shortlists and send enquiries in one place."
      submitLabel="Create account"
      withName
      isPending={signUp.isPending}
      onSubmit={onSubmit}
      footer={
        <>
          Already have an account?{' '}
          <AppLink
            to="/signin"
            search={redirect ? { redirect } : {}}
            className="font-semibold text-accent"
          >
            Sign in
          </AppLink>
        </>
      }
    />
  )
}
