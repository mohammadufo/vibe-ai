import { Button } from '@/components/ui/button'
import { caller } from '@/trpc/server'
import React from 'react'

const page = async () => {
  const greeting = await caller.hello({ text: 'Alaa 💕' })

  return (
    <div className="font-bold text-red-500">
      <Button>I love Alaa {greeting.greeting} </Button>
    </div>
  )
}

export default page
