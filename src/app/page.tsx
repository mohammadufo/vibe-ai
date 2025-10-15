'use client'

import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

const page = () => {
  const trpc = useTRPC()
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success('bg job started!')
      },
    })
  )

  return (
    <div className="font-bold text-red-500 m-10">
      <Button onClick={() => invoke.mutate({ text: 'Alaa Majed 💕' })}>
        I love Alaa
      </Button>
    </div>
  )
}

export default page
