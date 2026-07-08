import Image from 'next/image'

import { ProjectForm } from '@/modules/home/ui/components/project-form'
import { ProjectsList } from '@/modules/home/ui/components/project-list'

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-7 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center animate-fade-in-up">
          <div className="relative hidden md:flex items-center justify-center">
            <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 animate-pulse-ring" />
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/50 blur-2xl animate-glow-pulse" />
            <div className="relative rounded-2xl border border-border/60 bg-background/50 p-3 backdrop-blur-sm animate-float glow-primary">
              <Image src="/logo.svg" alt="Vibe" width={52} height={52} />
            </div>
          </div>
        </div>

        <div
          className="space-y-5 animate-fade-in-up"
          style={{ animationDelay: '80ms' }}
        >
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Powered by AI · Build in seconds
          </div>
          <h1 className="text-balance text-5xl md:text-7xl font-bold text-center tracking-tight leading-[1.05]">
            Build something <span className="text-gradient">with Vibe</span>
          </h1>
          <p className="text-pretty text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            Create apps and websites by chatting with AI — describe your idea
            and watch it come to life.
          </p>
        </div>

        <div
          className="max-w-3xl mx-auto w-full animate-fade-in-up"
          style={{ animationDelay: '160ms' }}
        >
          <ProjectForm />
        </div>
      </section>

      <div
        aria-hidden
        className="mx-auto mb-10 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <ProjectsList />
    </div>
  )
}

export default Page
