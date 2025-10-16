'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'sonner'

const page = () => {
  const [value, setValue] = useState('')
  const trpc = useTRPC()

  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions())

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success('Message created!')
      },
    })
  )

  return (
    <div className="font-bold text-red-500 m-10">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => createMessage.mutate({ value })}>
        Invoke background job!
      </Button>

      {JSON.stringify(messages, null, 2)}
    </div>
  )
}

export default page
