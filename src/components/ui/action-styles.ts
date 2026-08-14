import { recipe } from './variants'

/**
 * One definition of what a button looks like in this app, shared by real
 * buttons and by links that should look like buttons.
 */
const actionRecipe = recipe({
  base: 'h-auto justify-center font-bold transition-smooth active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
  variants: {
    tone: {
      accent: 'bg-accent text-fg-on-accent hover:bg-accent-hover hover:shadow-accent',
      outline:
        'border border-border bg-surface text-fg shadow-subtle hover:border-border-hover hover:shadow-raised',
      soft: 'bg-accent-soft text-accent hover:bg-accent-border',
      ghost: 'bg-transparent text-fg-muted hover:bg-surface-muted hover:text-fg',
    },
    size: {
      sm: 'px-4 py-2 text-body-sm',
      md: 'px-6 py-3 text-body',
      lg: 'px-7 py-3.5 text-body-lg',
    },
    lift: {
      true: 'hover:-translate-y-px',
      false: '',
    },
    block: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaults: { tone: 'accent', size: 'md', lift: 'false', block: 'false' },
})

export interface ActionStyleProps {
  tone?: 'accent' | 'outline' | 'soft' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  lift?: boolean
  block?: boolean
  className?: string
}

export function actionClass({ tone, size, lift, block, className }: ActionStyleProps) {
  return actionRecipe(
    { tone, size, lift: lift ? 'true' : 'false', block: block ? 'true' : 'false' },
    className,
  )
}
