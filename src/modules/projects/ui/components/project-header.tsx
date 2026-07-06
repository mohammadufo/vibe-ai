import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ChevronDownIcon, ChevronLeftIcon, SunMoonIcon } from 'lucide-react'

import { useTRPC } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  projectId: string
}

export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC()
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  )

  const { setTheme, theme } = useTheme()

  return (
    <header className="p-2 flex justify-between items-center border-b bg-sidebar/60 backdrop-blur-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="group focus-visible:ring-0 hover:bg-accent/60 transition-all pl-2! rounded-lg"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-primary/40 blur-sm opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/logo.svg"
                alt="Vibe"
                width={18}
                height={18}
                className="relative"
              />
            </div>
            <span className="text-sm font-medium">{project.name}</span>
            <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuItem asChild>
            <Link href="/">
              <ChevronLeftIcon />
              <span>Go to Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <SunMoonIcon className="size-4 text-muted-foreground" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    <span>Light</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <span>Dark</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <span>System</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
