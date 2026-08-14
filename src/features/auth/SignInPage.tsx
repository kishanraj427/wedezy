import { getRouteApi, useNavigate } from '@tanstack/react-router'

import { AppLink } from '@/components/ui/AppLink'
import { useToast } from '@/components/ui/toast-context'
import { useSignIn } from '@/hooks/useSession'

import { AuthForm, type AuthFormValues } from './components/AuthForm'

const route = getRouteApi('/signin/')

export function SignInPage() {
  const { redirect } = route.useSearch()
  const navigate = useNavigate()
  const signIn = useSignIn()
  const { toast } = useToast()

  const onSubmit = async ({ email, password }: AuthFormValues) => {
    const user = await signIn.mutateAsync({ email, password })
    toast({ title: `Welcome back, ${user.name.split(' ')[0]}`, tone: 'success' })
    navigate({ to: redirect ?? '/', replace: true })
  }

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Sign in to track your enquiries and saved venues."
      submitLabel="Sign in"
      isPending={signIn.isPending}
      onSubmit={onSubmit}
      footer={
        <>
          New to Wedezy?{' '}
          <AppLink
            to="/signup"
            search={redirect ? { redirect } : {}}
            className="font-semibold text-accent"
          >
            Create an account
          </AppLink>
        </>
      }
    />
  )
}
