import { useEffect, useRef } from 'react'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { MessageCard } from './message-card'
import { MessageForm } from './message-form'
import { Fragment } from '@/generated/prisma'
import { MessageLoading } from './message-loading'

interface Props {
  projectId: string
  activeFragment: Fragment | null
  setActiveFragment: (fragment: Fragment | null) => void
}

export const MessagesContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) => {
  const trpc = useTRPC()

  const lastAssistantMessageIdRef = useRef<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions(
      {
        projectId: projectId,
      },
      {
        refetchInterval: 2000,
      }
    )
  )

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      (message) => message.role === 'ASSISTANT'
    )

    if (
      lastAssistantMessage?.fragment &&
      lastAssistantMessage.id !== lastAssistantMessageIdRef.current
    ) {
      setActiveFragment(lastAssistantMessage.fragment)
      lastAssistantMessageIdRef.current = lastAssistantMessage.id
    }
  }, [messages, setActiveFragment])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const lastMessage = messages[messages.length - 1]
  const isLastMessageUser = lastMessage?.role === 'USER'

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      {/* Top fade so messages dissolve under the header */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-6 bg-gradient-to-b from-background to-transparent" />
      <div className="flex-1 min-h-0 overflow-y-auto fancy-scrollbar">
        <div className="pt-4 pr-1">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={activeFragment?.id === message.fragment?.id}
              onFragmentClick={() => setActiveFragment(message.fragment)}
              type={message.type}
            />
          ))}
          {isLastMessageUser && <MessageLoading />}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <MessageForm projectId={projectId} />
      </div>
    </div>
  )
}
