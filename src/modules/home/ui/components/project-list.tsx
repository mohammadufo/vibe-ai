'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { ArrowRightIcon } from 'lucide-react'

import { useTRPC } from '@/trpc/client'
import { useUser } from '@clerk/nextjs'

export const ProjectsList = () => {
  const trpc = useTRPC()
  const { user } = useUser()
  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions())

  if (!user || !projects?.length) return null

  return (
    <div className="w-full rounded-2xl p-6 sm:p-8 border border-border/60 bg-background/60 backdrop-blur-md shadow-sm flex flex-col gap-y-6 sm:gap-y-5">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/40" />
        <h2 className="text-2xl font-semibold tracking-tight">
          {user?.firstName}&apos;s Vibes
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">No projects found</p>
          </div>
        )}
        {projects?.map((project, i) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/70 p-4 lift hover:border-primary/50 hover:shadow-[0_12px_40px_-16px_var(--primary)] animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Hover gradient wash */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-center gap-x-4">
              <div className="relative shrink-0 rounded-lg border border-border/60 bg-background/70 p-2 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="Vibe"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <h3 className="truncate font-medium transition-colors group-hover:text-primary">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(project.updatedAt, {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <ArrowRightIcon className="ml-auto size-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
