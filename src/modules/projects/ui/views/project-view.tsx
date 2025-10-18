'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Suspense, useState } from 'react'
import { EyeIcon, CodeIcon, CrownIcon } from 'lucide-react'

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
          className="flex flex-col min-h-0"
        >
          <ErrorBoundary fallback={<p>Project header error</p>}>
            <Suspense fallback={<ProjectHeaderSkeleton />}>
              <ProjectHeader projectId={projectId} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<p>Messages container error</p>}>
            <Suspense fallback={<MessagesContainerSkeleton />}>
              <MessagesContainer
                projectId={projectId}
                activeFragment={activeFragment}
                setActiveFragment={setActiveFragment}
              />
            </Suspense>
          </ErrorBoundary>
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors" />
        <ResizablePanel defaultSize={65} minSize={50}>
          <Tabs
            className="h-full gap-y-0"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) => setTabState(value as 'preview' | 'code')}
          >
            <div className="w-full flex items-center p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger value="preview" className="rounded-md">
                  <EyeIcon /> <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-md">
                  <CodeIcon /> <span>Code</span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2">
                {!hasProAccess && (
                  <Button asChild size="sm" variant="tertiary">
                    <Link href="/pricing">
                      <CrownIcon /> Upgrade
                    </Link>
                  </Button>
                )}
                <UserControl />
              </div>
            </div>
            <TabsContent value="preview">
              {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>
            <TabsContent value="code" className="min-h-0">
              {!!activeFragment?.files && (
                <FileExplorer
                  files={activeFragment.files as { [path: string]: string }}
                />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

const MessagesContainerSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-1 space-y-4">
          <div className="flex justify-end px-3">
            <div className="w-[50%] space-y-2">
              <Skeleton className="h-4 w-24 ml-auto" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </div>

          <div className="flex justify-start px-3">
            <div className="w-[70%] space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>

          <div className="flex justify-end px-3">
            <div className="w-[60%] space-y-2">
              <Skeleton className="h-4 w-24 ml-auto" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}

const ProjectHeaderSkeleton = () => {
  return (
    <header className="p-2 py-4 flex justify-between items-center border-b">
      <div className="flex items-center gap-2 pl-2">
        <Skeleton className="size-[18px] rounded-sm" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="size-4 rounded-sm" />
      </div>
    </header>
  )
}
