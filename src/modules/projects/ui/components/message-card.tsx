import Image from 'next/image'
import { format } from 'date-fns'
import { ChevronRightIcon, Code2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Fragment, MessageRole, MessageType } from '@/generated/prisma'

interface UserMessageProps {
  content: string
}

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex justify-end pb-4 pr-2 pl-10 animate-fade-in-up">
      <Card className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 p-3 shadow-none max-w-[80%] break-words">
        {content}
      </Card>
    </div>
  )
}

interface FragmentCardProps {
  fragment: Fragment
  isActiveFragment: boolean
  onFragmentClick: (fragment: Fragment) => void
}

const FragmentCard = ({
  fragment,
  isActiveFragment,
  onFragmentClick,
}: FragmentCardProps) => {
  return (
    <button
      className={cn(
        'group/fragment relative flex items-center text-start gap-2.5 border rounded-xl bg-card w-fit min-w-[240px] p-3 pr-2.5 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_8px_24px_-12px_var(--primary)]',
        isActiveFragment &&
          'bg-primary text-primary-foreground border-primary hover:bg-primary glow-primary'
      )}
      onClick={() => onFragmentClick(fragment)}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors',
          isActiveFragment
            ? 'bg-primary-foreground/15'
            : 'bg-primary/10 text-primary group-hover/fragment:bg-primary/15'
        )}
      >
        <Code2Icon className="size-4" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium line-clamp-1">
          {fragment.title}
        </span>
        <span
          className={cn(
            'text-xs',
            isActiveFragment
              ? 'text-primary-foreground/80'
              : 'text-muted-foreground'
          )}
        >
          Preview
        </span>
      </div>
      <div className="flex items-center justify-center">
        <ChevronRightIcon className="size-4 transition-transform duration-300 group-hover/fragment:translate-x-0.5" />
      </div>
    </button>
  )
}

interface AssistantMessageProps {
  content: string
  fragment: Fragment | null
  createdAt: Date
  isActiveFragment: boolean
  onFragmentClick: (fragment: Fragment) => void
  type: MessageType
}

const AssistantMessage = ({
  content,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: AssistantMessageProps) => {
  return (
    <div
      className={cn(
        'flex flex-col group px-2 pb-4 animate-fade-in-up',
        type === 'ERROR' && 'text-red-700 dark:text-red-500'
      )}
    >
      <div className="flex items-center gap-2 pl-2 mb-2">
        <div className="relative flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/30 blur-sm opacity-0 transition-opacity group-hover:opacity-100" />
          <Image
            src="/logo.svg"
            alt="Vibe"
            width={18}
            height={18}
            className="relative shrink-0"
          />
        </div>
        <span className="text-sm font-medium">Vibe</span>
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <span className="leading-relaxed">{content}</span>
        {fragment && type === 'RESULT' && (
          <FragmentCard
            fragment={fragment}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
          />
        )}
      </div>
    </div>
  )
}

interface MessageCardProps {
  content: string
  role: MessageRole
  fragment: Fragment | null
  createdAt: Date
  isActiveFragment: boolean
  onFragmentClick: (fragment: Fragment) => void
  type: MessageType
}

export const MessageCard = ({
  content,
  role,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: MessageCardProps) => {
  if (role === 'ASSISTANT') {
    return (
      <AssistantMessage
        content={content}
        fragment={fragment}
        createdAt={createdAt}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
        type={type}
      />
    )
  }

  return <UserMessage content={content} />
}
