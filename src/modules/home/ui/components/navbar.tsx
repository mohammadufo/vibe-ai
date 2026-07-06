'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { useScroll } from '@/hooks/use-scroll'
import { Button } from '@/components/ui/button'
import { UserControl } from '@/components/user-control'

export const Navbar = () => {
  const isScrolled = useScroll()

  return (
    <nav
      className={cn(
        'p-3 fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled &&
          'glass border-border/60 shadow-[0_4px_30px_-12px_rgba(0,0,0,0.25)]'
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative transition-transform duration-300 group-hover:scale-110">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Image src="/logo.svg" alt="Vibe" width={26} height={26} />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Vibe
          </span>
        </Link>
        <SignedOut>
          <div className="flex gap-2">
            <SignUpButton>
              <Button variant="outline" size="sm" className="rounded-full">
                Sign up
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button
                size="sm"
                className="rounded-full sheen shadow-sm transition-shadow hover:glow-primary"
              >
                Sign in
              </Button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserControl showName />
        </SignedIn>
      </div>
    </nav>
  )
}
