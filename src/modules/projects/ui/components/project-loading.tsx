import Image from 'next/image'

export const ProjectLoading = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px] animate-glow-pulse" />
        <div
          className="absolute left-[38%] top-[42%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm/20 blur-[110px] animate-aurora"
          style={{ animationDuration: '20s' }}
        />
        <div
          className="absolute left-[62%] top-[58%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-rose/20 blur-[110px] animate-aurora"
          style={{ animationDelay: '-8s', animationDuration: '24s' }}
        />
      </div>

      <div className="flex flex-col items-center gap-7 animate-fade-in-up">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-24 rounded-full bg-[conic-gradient(from_0deg,transparent,var(--accent-rose),var(--primary),var(--accent-warm),transparent)] animate-spin-slow [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />
          <div className="absolute size-24 animate-orbit">
            <span className="block size-2.5 rounded-full bg-primary shadow-[0_0_12px_2px_var(--primary)]" />
          </div>
          <span className="absolute inset-0 m-auto size-16 rounded-full bg-primary/35 blur-md animate-glow-pulse" />
          <div className="relative flex size-16 items-center justify-center rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm animate-float glow-primary">
            <Image src="/logo.svg" alt="Vibe" width={30} height={30} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="bg-[linear-gradient(90deg,var(--accent-rose),var(--primary),var(--accent-warm))] bg-clip-text text-base font-semibold text-transparent">
            Loading your workspace
          </p>
          <div className="relative h-1 w-40 overflow-hidden rounded-full bg-primary/10">
            <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent animate-progress-sweep" />
          </div>
        </div>
      </div>
    </div>
  )
}
