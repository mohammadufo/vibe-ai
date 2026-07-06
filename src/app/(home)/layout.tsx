import { Navbar } from '@/modules/home/ui/components/navbar'
import { AuroraBackground } from '@/components/aurora-background'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen max-h-screen">
      <Navbar />
      <AuroraBackground />

      <div className="flex-1 flex flex-col px-4 pb-4 h-screen overflow-y-scroll fancy-scrollbar">
        {children}
      </div>

      <p className="text-xs w-full flex justify-center items-center py-2.5 bg-transparent text-muted-foreground">
        Created with{' '}
        <span className="mx-1 inline-block animate-glow-pulse text-primary">
          🤍
        </span>{' '}
        by
        <a
          href="https://github.com/mohammadufo"
          target="_blank"
          className="ml-1 font-semibold text-primary transition-colors hover:text-primary/80 hover:underline underline-offset-4"
        >
          Muhammad UFO
        </a>
      </p>
    </main>
  )
}

export default Layout
