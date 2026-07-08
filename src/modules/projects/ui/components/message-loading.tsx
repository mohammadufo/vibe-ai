import Image from 'next/image'
import { useState, useEffect } from 'react'

const ShimmerMessages = () => {
  const messages = [
    'Thinking...',
    'Loading...',
    'Generating...',
    'Analyzing your request...',
    'Building your website...',
    'Crafting components...',
    'Optimizing layout...',
    'Adding final touches...',
    'Almost ready...',
  ]

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-primary animate-bounce-dot"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
        <span
          key={currentMessageIndex}
          className="animate-fade-in bg-[linear-gradient(90deg,var(--accent-rose)_0%,var(--primary)_35%,var(--accent-warm)_50%,var(--primary)_65%,var(--accent-rose)_100%)] bg-[length:200%_100%] bg-clip-text text-base font-medium text-transparent animate-shimmer"
        >
          {messages[currentMessageIndex]}
        </span>
      </div>
      <div className="relative h-1 w-44 max-w-full overflow-hidden rounded-full bg-primary/10">
        <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent animate-progress-sweep" />
      </div>
    </div>
  )
}

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4 animate-fade-in-up">
      <div className="flex items-center gap-2.5 pl-2 mb-2">
        <div className="relative flex size-6 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />
          <span className="absolute inset-0 rounded-full bg-primary/40 blur-sm animate-glow-pulse" />
          <Image
            src="/logo.svg"
            alt="Vibe"
            width={18}
            height={18}
            className="relative shrink-0 animate-float"
          />
        </div>
        <span className="bg-[linear-gradient(90deg,var(--primary),var(--accent-warm))] bg-clip-text text-sm font-semibold text-transparent">
          Vibe
        </span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages />
      </div>
    </div>
  )
}
