import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import TextareaAutosize from 'react-textarea-autosize'
import { ArrowUpIcon, Loader2Icon } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { cn } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'

import { Usage } from './usage'

interface Props {
  projectId: string
}

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: 'Value is required' })
    .max(10000, { message: 'Value is too long' }),
})

export const MessageForm = ({ projectId }: Props) => {
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: usage } = useQuery(trpc.usage.status.queryOptions())

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
    },
  })

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        form.reset()
        queryClient.invalidateQueries(
          trpc.messages.getMany.queryOptions({ projectId })
        )
        queryClient.invalidateQueries(trpc.usage.status.queryOptions())
      },
      onError: (error) => {
        toast.error(error.message)

        if (error.data?.code === 'TOO_MANY_REQUESTS') {
          router.push('/pricing')
        }
      },
    })
  )

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createMessage.mutateAsync({
      value: values.value,
      projectId,
    })
  }

  const [isFocused, setIsFocused] = useState(false)
  const isPending = createMessage.isPending
  const isButtonDisabled = isPending || !form.formState.isValid
  const showUsage = !!usage

  return (
    <Form {...form}>
      {showUsage && (
        <Usage
          points={usage.remainingPoints}
          msBeforeNext={usage.msBeforeNext}
        />
      )}
      <div
        className={cn(
          'group relative rounded-2xl p-[1.5px] transition-all duration-500',
          isFocused
            ? 'bg-gradient-to-r from-primary/70 via-primary/30 to-primary/70'
            : 'bg-border/60',
          showUsage && 'rounded-t-none'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-primary/20 blur-xl transition-opacity duration-500',
            isFocused ? 'opacity-100' : 'opacity-0'
          )}
        />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            'relative rounded-2xl bg-sidebar dark:bg-sidebar p-4 pt-1 transition-all',
            showUsage && 'rounded-t-none'
          )}
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                disabled={isPending}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={2}
                maxRows={8}
                className="pt-4 resize-none border-none w-full outline-none bg-transparent placeholder:text-muted-foreground/70"
                placeholder="What would you like to build?"
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing || e.keyCode === 229) return
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)(e)
                  }
                }}
              />
            )}
          />
          <div className="flex gap-x-2 items-end justify-between pt-2">
            <div className="text-[10px] text-muted-foreground font-mono">
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span>&#8984;</span>Enter
              </kbd>
              &nbsp;to submit
            </div>
            <Button
              type="submit"
              aria-label="Send message"
              disabled={isButtonDisabled}
              className={cn(
                'size-9 rounded-full transition-all duration-300 sheen',
                isButtonDisabled
                  ? 'bg-muted-foreground border'
                  : 'hover:scale-105 hover:glow-primary active:scale-95'
              )}
            >
              {isPending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <ArrowUpIcon />
              )}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}
