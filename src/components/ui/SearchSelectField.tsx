import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'

import { Icon, type IconName } from './Icon'

interface SearchSelectFieldProps<T extends string> {
  icon: IconName
  label: string
  value: T
  options: readonly T[]
  onChange: (value: T) => void
}

/** A labelled field that opens a single-choice menu — used across search bars. */
export function SearchSelectField<T extends string>({
  icon,
  label,
  value,
  options,
  onChange,
}: SearchSelectFieldProps<T>) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="ghost"
          color="gray"
          highContrast
          aria-label={label}
          className="group m-0 h-auto min-w-0 flex-1 justify-start gap-4 rounded-card px-5 py-4 text-left transition-smooth-fast hover:bg-accent-softer"
        >
          <Icon name={icon} className="size-5.5 text-accent" />
          <Flex direction="column" gap="1" align="start" className="min-w-0">
            <Text as="span" className="text-eyebrow font-bold text-fg-muted uppercase">
              {label}
            </Text>
            <Text as="span" className="truncate text-body-lg font-semibold text-fg">
              {value}
            </Text>
          </Flex>
          <Icon
            name="chevron"
            className="ml-auto size-4 text-fg-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content variant="soft" color="gray" align="start" className="min-w-50">
        <DropdownMenu.RadioGroup value={value} onValueChange={(next) => onChange(next as T)}>
          {options.map((option) => (
            <DropdownMenu.RadioItem key={option} value={option}>
              <Text className="text-body-sm font-medium">{option}</Text>
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
