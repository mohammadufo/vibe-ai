'use client'

import Image from 'next/image'
import { dark } from '@clerk/themes'
import { SignUp } from '@clerk/nextjs'

import { useCurrentTheme } from '@/hooks/use-current-theme'

const Page = () => {
  const currentTheme = useCurrentTheme()

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[14vh] 2xl:pt-40">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 text-center animate-fade-in-up">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl animate-glow-pulse" />
              <div className="relative rounded-2xl border border-border/60 bg-background/40 p-3 backdrop-blur-sm animate-float">
                <Image src="/logo.svg" alt="Vibe" width={44} height={44} />
              </div>
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Start building with <span className="text-gradient">Vibe</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Create your account and ship your first app in minutes
              </p>
            </div>
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '120ms' }}
          >
            <SignUp
              appearance={{
                baseTheme: currentTheme === 'dark' ? dark : undefined,
                elements: {
                  cardBox: 'border! shadow-none! rounded-xl!',
                },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
