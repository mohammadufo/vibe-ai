import Image from 'next/image'

import { ProjectForm } from '@/modules/home/ui/components/project-form'
import { ProjectsList } from '@/modules/home/ui/components/project-list'

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-7 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center animate-fade-in-up">
          <div className="relative hidden md:flex items-center justify-center">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl animate-glow-pulse" />
            <div className="relative rounded-2xl border border-border/60 bg-background/40 p-3 backdrop-blur-sm animate-float">
              <Image src="/logo.svg" alt="Vibe" width={52} height={52} />
            </div>
          </div>
        </div>

        <div
          className="space-y-4 animate-fade-in-up"
          style={{ animationDelay: '80ms' }}
        >
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Powered by AI · Build in seconds
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
            Build something <span className="text-gradient">with Vibe</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
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
      <ProjectsList />
    </div>
  )
}

export default Page
