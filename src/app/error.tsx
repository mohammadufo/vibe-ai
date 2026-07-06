'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AlertTriangleIcon, RotateCcwIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = ({ error, reset }: Props) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-destructive/20 blur-[120px] animate-glow-pulse" />
      </div>

      <div className="flex max-w-md flex-col items-center gap-6 text-center animate-fade-in-up">
        <div className="relative flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-destructive/30 blur-lg animate-glow-pulse" />
          <div className="relative flex size-16 items-center justify-center rounded-2xl border border-border/60 bg-background/50 backdrop-blur-sm">
            <AlertTriangleIcon className="size-7 text-destructive" />
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-80">
          <Image src="/logo.svg" alt="Vibe" width={20} height={20} />
          <span className="font-semibold">Vibe</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground">
            {error.message ||
              'An unexpected error occurred. Please try again in a moment.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={reset}
            className="rounded-full sheen transition-transform hover:scale-105 hover:glow-primary"
          >
            <RotateCcwIcon /> Try again
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
