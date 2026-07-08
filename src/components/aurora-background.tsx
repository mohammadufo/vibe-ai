import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const AuroraBackground = ({ className }: Props) => {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="absolute -top-40 left-1/4 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/30 blur-[120px] animate-aurora" />
      <div
        className="absolute top-10 right-0 h-[34rem] w-[34rem] rounded-full bg-accent-rose/25 blur-[120px] animate-aurora"
        style={{ animationDelay: '-6s', animationDuration: '22s' }}
      />
      <div
        className="absolute bottom-0 left-10 h-[30rem] w-[30rem] rounded-full bg-accent-warm/25 blur-[110px] animate-aurora"
        style={{ animationDelay: '-12s', animationDuration: '26s' }}
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent" />
    </div>
  )
}
