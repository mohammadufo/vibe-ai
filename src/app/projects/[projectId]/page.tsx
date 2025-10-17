import { ProjectView } from '@/modules/projects/ui/views/project-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import React, { Suspense } from 'react'

interface Props {
  params: Promise<{
    projectId: string
  }>
}

const Page = async ({ params }: Props) => {
  const { projectId } = await params

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    })
  )

  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={'loading ...'}>
        <ProjectView projectId={projectId} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
