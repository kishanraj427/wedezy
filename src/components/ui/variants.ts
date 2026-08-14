import { cn } from '@/lib/cn'

type VariantMap = Record<string, Record<string, string>>

type Selected<M extends VariantMap> = {
  [K in keyof M]?: keyof M[K]
}

interface RecipeConfig<M extends VariantMap> {
  base: string
  variants: M
  defaults: { [K in keyof M]: keyof M[K] }
}

/**
 * Minimal variant resolver — the dependency-free half of `cva`. Keeps styling
 * decisions in one table per component instead of inline class soup.
 */
export function recipe<M extends VariantMap>({ base, variants, defaults }: RecipeConfig<M>) {
  return (selected: Selected<M> = {}, className?: string) => {
    const parts = Object.keys(variants).map((key) => {
      const chosen = selected[key as keyof M] ?? defaults[key as keyof M]
      return variants[key][chosen as string]
    })

    return cn(base, ...parts, className)
  }
}
