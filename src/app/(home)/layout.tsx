import { Navbar } from '@/modules/home/ui/components/navbar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen max-h-screen">
      <Navbar />
      <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* todo: h-screen overflow-y-scroll */}
      <div className="flex-1 flex flex-col px-4 pb-4">{children}</div>

      <p className="text-xs w-full flex justify-center py-2">
        Created with 🤍 by{'  '}
        <a
          href="https://github.com/mohammadufo"
          target="_blank"
          className="font-bold text-primary"
        >
          &nbsp;Muhammad UFO
        </a>
      </p>
    </main>
  )
}

export default Layout
