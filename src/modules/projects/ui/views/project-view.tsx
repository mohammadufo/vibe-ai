'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { MessagesContainer } from '../components/messages-container'
import { Suspense } from 'react'

interface Props {
  projectId: string
}

export const ProjectView = ({ projectId }: Props) => {
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
          <Suspense fallback={<p>loading messages ...</p>}>
            <MessagesContainer projectId={projectId} />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="hover:bg-primary transition-colors"
        />
        <ResizablePanel defaultSize={65} minSize={50}>
          {/* {JSON.stringify(project)} */}
          projects ...
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
