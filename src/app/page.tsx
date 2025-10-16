'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const Page = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const trpc = useTRPC()

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        toast.success('Project created!')
        router.push(`/projects/${data?.id}`)
      },
      onError: (err) => {
        toast.error(err.message)
      },
    })
  )

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          onClick={() => createProject.mutate({ value })}
          disabled={createProject.isPending}
        >
          submit
        </Button>
      </div>
    </div>
  )
}

export default Page
