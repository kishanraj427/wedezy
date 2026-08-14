import { ActionLink } from '@/components/ui/Action'
import { EmptyState } from '@/components/ui/EmptyState'

interface VenuesEmptyStateProps {
  title?: string
  description?: string
}

export function VenuesEmptyState({
  title = 'No venues match your search',
  description = 'Try changing the event type, guest range or clearing your filters.',
}: VenuesEmptyStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      action={
        <ActionLink to="/venues" search={{}} lift>
          Clear filters
        </ActionLink>
      }
    />
  )
}
