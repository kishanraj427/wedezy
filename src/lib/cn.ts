type ClassValue = string | number | false | null | undefined

/** Minimal class-name joiner — keeps the dependency surface at zero. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
