import Image from 'next/image'

export const ProjectLoading = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] animate-glow-pulse" />
      </div>

      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-20 rounded-full bg-[conic-gradient(from_0deg,transparent,var(--primary))] animate-spin-slow [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />
          <span className="absolute inset-0 m-auto size-16 rounded-full bg-primary/30 blur-md animate-glow-pulse" />
          <div className="relative flex size-16 items-center justify-center rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm animate-float">
            <Image src="/logo.svg" alt="Vibe" width={30} height={30} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-medium">Loading your workspace</p>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-primary animate-bounce-dot"
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
