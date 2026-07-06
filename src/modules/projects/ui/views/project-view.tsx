'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Suspense, useState } from 'react'
import {
  EyeIcon,
  CodeIcon,
  CrownIcon,
  AlertTriangleIcon,
  MonitorIcon,
  FileCode2Icon,
} from 'lucide-react'

import { Fragment } from '@/generated/prisma'
import { Button } from '@/components/ui/button'
import { UserControl } from '@/components/user-control'
import { FileExplorer } from '@/components/file-explorer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

import { ProjectHeader } from '../components/project-header'
import { MessagesContainer } from '../components/messages-container'
import { ErrorBoundary } from 'react-error-boundary'
import { FragmentWeb } from '../components/fragment-component'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  projectId: string
}

export const ProjectView = ({ projectId }: Props) => {
  const { has } = useAuth()
  const hasProAccess = has?.({ plan: 'pro' })

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null)
  const [tabState, setTabState] = useState<'preview' | 'code'>('preview')

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0 bg-sidebar/30"
        >
          <ErrorBoundary fallback={<PanelError label="project header" />}>
            <Suspense fallback={<ProjectHeaderSkeleton />}>
              <ProjectHeader projectId={projectId} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<PanelError label="messages" />}>
            <Suspense fallback={<MessagesContainerSkeleton />}>
              <MessagesContainer
                projectId={projectId}
                activeFragment={activeFragment}
                setActiveFragment={setActiveFragment}
              />
            </Suspense>
          </ErrorBoundary>
        </ResizablePanel>
        <ResizableHandle className="w-px bg-border transition-colors hover:bg-primary data-[resize-handle-state=drag]:bg-primary" />
        <ResizablePanel defaultSize={65} minSize={50}>
          <Tabs
            className="h-full gap-y-0"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) => setTabState(value as 'preview' | 'code')}
          >
            <div className="w-full flex items-center p-2 border-b gap-x-2 bg-sidebar/60 backdrop-blur-sm">
              <TabsList className="h-8 p-0.5 border rounded-lg bg-muted/50">
                <TabsTrigger
                  value="preview"
                  className="rounded-md data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all"
                >
                  <EyeIcon /> <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="rounded-md data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all"
                >
                  <CodeIcon /> <span>Code</span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2">
                {!hasProAccess && (
                  <Button
                    asChild
                    size="sm"
                    variant="tertiary"
                    className="rounded-full sheen transition-transform hover:scale-105"
                  >
                    <Link href="/pricing">
                      <CrownIcon /> Upgrade
                    </Link>
                  </Button>
                )}
                <UserControl />
              </div>
            </div>
            <TabsContent value="preview" className="animate-fade-in">
              {!!activeFragment ? (
                <FragmentWeb data={activeFragment} />
              ) : (
                <TabEmptyState
                  icon={<MonitorIcon className="size-7 text-primary" />}
                  title="No preview yet"
                  description="Describe what you want to build and your live preview will appear here."
                />
              )}
            </TabsContent>
            <TabsContent value="code" className="min-h-0 animate-fade-in">
              {!!activeFragment?.files ? (
                <FileExplorer
                  files={activeFragment.files as { [path: string]: string }}
                />
              ) : (
                <TabEmptyState
                  icon={<FileCode2Icon className="size-7 text-primary" />}
                  title="No code yet"
                  description="Once Vibe generates your app, the source files will show up here."
                />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

interface TabEmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
}

const TabEmptyState = ({ icon, title, description }: TabEmptyStateProps) => {
  return (
    <div className="flex h-[calc(100vh-3.25rem)] flex-col items-center justify-center gap-4 px-6 text-center animate-fade-in-up">
      <div className="relative flex items-center justify-center">
        <span className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-glow-pulse" />
        <div className="relative flex size-16 items-center justify-center rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm animate-float">
          {icon}
        </div>
      </div>
      <div className="space-y-1.5 max-w-xs">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

const PanelError = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-2 p-4 text-sm text-destructive">
      <AlertTriangleIcon className="size-4 shrink-0" />
      <span>Failed to load {label}. Try refreshing the page.</span>
    </div>
  )
}

const MessagesContainerSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-4 pr-1 space-y-6">
          <div className="flex justify-end px-3">
            <div className="w-[50%] space-y-2">
              <Skeleton className="h-3 w-24 ml-auto" />
              <Skeleton className="h-20 w-full rounded-2xl rounded-tr-sm" />
            </div>
          </div>

          <div className="flex justify-start px-3">
            <div className="w-[70%] space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>

          <div className="flex justify-end px-3">
            <div className="w-[60%] space-y-2">
              <Skeleton className="h-3 w-24 ml-auto" />
              <Skeleton className="h-16 w-full rounded-2xl rounded-tr-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-3 pt-1">
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  )
}

const ProjectHeaderSkeleton = () => {
  return (
    <header className="p-2 py-3.5 flex justify-between items-center border-b bg-sidebar/60">
      <div className="flex items-center gap-2 pl-2">
        <Skeleton className="size-[18px] rounded-md" />
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="size-4 rounded-md" />
      </div>
    </header>
  )
}
