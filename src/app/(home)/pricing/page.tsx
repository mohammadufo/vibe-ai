'use client'

import Image from 'next/image'
import { dark } from '@clerk/themes'
import { PricingTable } from '@clerk/nextjs'

import { useCurrentTheme } from '@/hooks/use-current-theme'

const Page = () => {
  const currentTheme = useCurrentTheme()

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center animate-fade-in-up">
          <div className="relative hidden md:flex items-center justify-center">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl animate-glow-pulse" />
            <div className="relative rounded-2xl border border-border/60 bg-background/40 p-3 backdrop-blur-sm animate-float">
              <Image src="/logo.svg" alt="Vibe" width={50} height={50} />
            </div>
          </div>
        </div>
        <div
          className="space-y-3 animate-fade-in-up"
          style={{ animationDelay: '80ms' }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-center tracking-tight">
            Simple, transparent{' '}
            <span className="text-gradient">pricing</span>
          </h1>
          <p className="text-muted-foreground text-center text-sm md:text-base">
            Choose the plan that fits your needs
          </p>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '160ms' }}>
          <PricingTable
            appearance={{
              baseTheme: currentTheme === 'dark' ? dark : undefined,
              elements: {
                pricingTableCard: 'border! shadow-none! rounded-xl!',
              },
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default Page
