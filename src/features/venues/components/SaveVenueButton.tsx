import { IconButton } from '@radix-ui/themes'
import { useNavigate } from '@tanstack/react-router'
import { useState, type MouseEvent } from 'react'

import { Icon } from '@/components/ui/Icon'
import { useToast } from '@/components/ui/toast-context'
import { useFavourites, useToggleFavourite } from '@/hooks/useFavourites'
import { useSession } from '@/hooks/useSession'
import { cn } from '@/lib/cn'
import { toMessage } from '@/services/errors'

interface SaveVenueButtonProps {
  venueId: string
  venueName: string
  /** `overlay` sits on a photo; `plain` sits on a surface. */
  variant?: 'overlay' | 'plain'
  className?: string
}

export function SaveVenueButton({
  venueId,
  venueName,
  variant = 'overlay',
  className,
}: SaveVenueButtonProps) {
  const { user, isAuthenticated } = useSession()
  const { data: favourites } = useFavourites(user?.id)
  const toggle = useToggleFavourite(user?.id)
  const navigate = useNavigate()
  const { toast } = useToast()
  const [pulse, setPulse] = useState(false)

  const saved = (favourites ?? []).some((favourite) => favourite.venueId === venueId)

  const onClick = async (event: MouseEvent) => {
    // The button often sits inside a card link.
    event.preventDefault()
    event.stopPropagation()

    if (!isAuthenticated) {
      toast({ title: 'Sign in to save venues', tone: 'info' })
      navigate({ to: '/signin', search: { redirect: `/venues/${venueId}` } })
      return
    }

    setPulse(true)
    window.setTimeout(() => setPulse(false), 350)

    try {
      const nowSaved = await toggle.mutateAsync(venueId)
      toast({
        title: nowSaved ? 'Saved' : 'Removed',
        description: nowSaved ? `${venueName} is in your saved venues.` : `${venueName} removed.`,
        tone: nowSaved ? 'success' : 'info',
        duration: 2600,
      })
    } catch (error) {
      toast({ title: 'Could not update', description: toMessage(error), tone: 'error' })
    }
  }

  return (
    <IconButton
      type="button"
      radius="full"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${venueName} from saved` : `Save ${venueName}`}
      onClick={onClick}
      className={cn(
        'bg-sheet transition-smooth active:scale-90 hover:bg-sheet',
        variant === 'overlay' ? 'shadow-pill' : 'border border-border',
        className,
      )}
    >
      <Icon
        name="heart"
        filled={saved}
        className={cn(
          'size-4.5 transition-smooth-fast',
          saved ? 'text-accent' : 'text-fg-muted',
          pulse && 'animate-pop motion-reduce:animate-none',
        )}
      />
    </IconButton>
  )
}
