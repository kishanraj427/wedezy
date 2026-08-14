import { Callout, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { useState, type FormEvent, type ReactNode } from 'react'

import { ActionButton } from '@/components/ui/Action'
import { AppLink } from '@/components/ui/AppLink'
import { Card } from '@/components/ui/Card'
import { Field, invalidFieldClass } from '@/components/ui/Field'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import { isDomainError, toMessage } from '@/services/errors'

export interface AuthFormValues {
  name: string
  email: string
  password: string
}

interface AuthFormProps {
  title: string
  subtitle: string
  submitLabel: string
  /** Sign-up collects a name; sign-in does not. */
  withName?: boolean
  footer: ReactNode
  onSubmit: (values: AuthFormValues) => Promise<void>
  isPending: boolean
}

const MIN_PASSWORD = 6

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  withName = false,
  footer,
  onSubmit,
  isPending,
}: AuthFormProps) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const values: AuthFormValues = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
    }

    const errors: Record<string, string> = {}
    if (withName && values.name.trim().length < 2) errors.name = 'Tell us your name.'
    if (!values.email.includes('@')) errors.email = 'Enter a valid email address.'
    if (values.password.length < MIN_PASSWORD) {
      errors.password = `Use at least ${MIN_PASSWORD} characters.`
    }

    setFieldErrors(errors)
    setFormError(null)
    if (Object.keys(errors).length > 0) return

    try {
      await onSubmit(values)
    } catch (error) {
      if (isDomainError(error) && error.field) setFieldErrors({ [error.field]: error.message })
      else setFormError(toMessage(error))
    }
  }

  return (
    <Section space="lg">
      <Card pad="xl" className="mx-auto max-w-[27.5rem] animate-rise motion-reduce:animate-none">
        <Heading as="h1" className="text-h2 font-extrabold text-fg">
          {title}
        </Heading>
        <Text as="p" className="mt-2 text-body-lg text-fg-muted">
          {subtitle}
        </Text>

        <Flex asChild direction="column" gap="4" className="mt-7">
          <form onSubmit={handleSubmit} noValidate>
            {formError ? (
              <Callout.Root color="crimson" variant="soft" className="animate-rise">
                <Callout.Text>{formError}</Callout.Text>
              </Callout.Root>
            ) : null}

            {withName ? (
              <Field label="Full name" htmlFor="name" error={fieldErrors.name}>
                <TextField.Root
                  id="name"
                  name="name"
                  size="3"
                  autoComplete="name"
                  placeholder="Priya Sharma"
                  className={cn(fieldErrors.name && invalidFieldClass)}
                />
              </Field>
            ) : null}

            <Field label="Email" htmlFor="email" error={fieldErrors.email}>
              <TextField.Root
                id="email"
                name="email"
                type="email"
                size="3"
                autoComplete="email"
                placeholder="you@example.com"
                className={cn(fieldErrors.email && invalidFieldClass)}
              />
            </Field>

            <Field label="Password" htmlFor="password" error={fieldErrors.password}>
              <TextField.Root
                id="password"
                name="password"
                type="password"
                size="3"
                autoComplete={withName ? 'new-password' : 'current-password'}
                placeholder="••••••••"
                className={cn(fieldErrors.password && invalidFieldClass)}
              />
            </Field>

            <ActionButton type="submit" size="lg" block loading={isPending} className="mt-2">
              {submitLabel}
            </ActionButton>
          </form>
        </Flex>

        <Text as="p" className="mt-6 text-center text-body-sm text-fg-muted">
          {footer}
        </Text>
      </Card>

      <Text as="p" className="mt-6 text-center text-body-sm text-fg-muted">
        Looking to add a space?{' '}
        <AppLink to="/list-your-venue" className="font-semibold text-accent">
          List your venue
        </AppLink>
      </Text>
    </Section>
  )
}
