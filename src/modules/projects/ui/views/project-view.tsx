'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { MessagesContainer } from '../components/messages-container'
import { Suspense, useState } from 'react'
import { Fragment } from '@/generated/prisma'
import { ErrorBoundary } from 'react-error-boundary'
import { ProjectHeader } from '../components/project-header'

interface Props {
  projectId: string
}

export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null)

  //   const trpc = useTRPC()

  //   const { data: project } = useSuspenseQuery(
  //     trpc.projects.getOne.queryOptions({ id: projectId })
  //   )

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <ErrorBoundary fallback={<p>Project header error</p>}>
            <Suspense fallback={<p>Loading project...</p>}>
              <ProjectHeader projectId={projectId} />
            </Suspense>
          </ErrorBoundary>
          <Suspense fallback={<p>loading messages ...</p>}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="hover:bg-primary transition-colors"
        />
        <ResizablePanel defaultSize={65} minSize={50}>
          projects ...
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
