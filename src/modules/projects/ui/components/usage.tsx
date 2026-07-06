import Link from 'next/link'
import { useMemo } from 'react'
import { useAuth } from '@clerk/nextjs'
import { CrownIcon, SparklesIcon } from 'lucide-react'
import { formatDuration, intervalToDuration } from 'date-fns'

import { Button } from '@/components/ui/button'

interface Props {
  points: number
  msBeforeNext: number
}

export const Usage = ({ points, msBeforeNext }: Props) => {
  const { has } = useAuth()
  const hasProAccess = has?.({ plan: 'pro' })

  const resetTime = useMemo(() => {
    try {
      return formatDuration(
        intervalToDuration({
          start: new Date(),
          end: new Date(Date.now() + msBeforeNext),
        }),
        { format: ['months', 'days', 'hours'] }
      )
    } catch (error) {
      console.error('Error formatting duration ', error)
      return 'unknown'
    }
  }, [msBeforeNext])

  return (
    <div className="rounded-t-2xl bg-background/80 backdrop-blur-sm border border-b-0 border-border/60 p-3">
      <div className="flex items-center gap-x-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <SparklesIcon className="size-4" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium">
            <span className="text-primary">{points}</span>{' '}
            {hasProAccess ? '' : 'free'} credits remaining
          </p>
          <p className="text-xs text-muted-foreground">Resets in {resetTime}</p>
        </div>
        {!hasProAccess && (
          <Button
            asChild
            size="sm"
            variant="tertiary"
            className="ml-auto rounded-full sheen transition-transform hover:scale-105"
          >
            <Link href="/pricing">
              <CrownIcon /> Upgrade
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
