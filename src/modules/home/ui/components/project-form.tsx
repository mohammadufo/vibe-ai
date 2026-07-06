'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { useClerk } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import TextareaAutosize from 'react-textarea-autosize'
import { ArrowUpIcon, Loader2Icon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cn } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'

import { PROJECT_TEMPLATES } from '../../constants'

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: 'Value is required' })
    .max(10000, { message: 'Value is too long' }),
})

export const ProjectForm = () => {
  const router = useRouter()
  const trpc = useTRPC()
  const clerk = useClerk()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
    },
  })

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.projects.getMany.queryOptions())
        queryClient.invalidateQueries(trpc.usage.status.queryOptions())
        router.push(`/projects/${data.id}`)
      },
      onError: (error) => {
        toast.error(error.message)

        if (error.data?.code === 'UNAUTHORIZED') {
          clerk.openSignIn()
        }

        if (error.data?.code === 'TOO_MANY_REQUESTS') {
          router.push('/pricing')
        }
      },
    }),
  )

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value,
    })
  }

  const onSelect = (value: string) => {
    form.setValue('value', value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    })
  }

  const [isFocused, setIsFocused] = useState(false)
  const isPending = createProject.isPending
  const isButtonDisabled = isPending || !form.formState.isValid

  return (
    <Form {...form}>
      <section className="space-y-6">
        <div
          className={cn(
            'group relative rounded-2xl p-[1.5px] transition-all duration-500',
            isFocused
              ? 'bg-gradient-to-r from-primary/70 via-primary/30 to-primary/70'
              : 'bg-border/60',
          )}
        >
          <div
            className={cn(
              'pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-primary/20 blur-xl transition-opacity duration-500',
              isFocused ? 'opacity-100' : 'opacity-0',
            )}
          />
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative rounded-2xl bg-sidebar dark:bg-sidebar p-4 pt-1 transition-all"
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
                disabled={isButtonDisabled}
                className={cn(
                  'size-9 rounded-full transition-all duration-300 sheen',
                  isButtonDisabled
                    ? 'bg-muted-foreground border'
                    : 'hover:scale-105 hover:glow-primary active:scale-95',
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
        <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl mx-auto">
          {PROJECT_TEMPLATES.map((template, i) => (
            <Button
              key={template.title}
              variant="outline"
              size="sm"
              className="rounded-full bg-background/60 backdrop-blur-sm border-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-background hover:text-primary hover:shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${240 + i * 60}ms` }}
              onClick={() => onSelect(template.prompt)}
            >
              <span className="mr-1">{template.emoji}</span> {template.title}
            </Button>
          ))}
        </div>
      </section>
    </Form>
  )
}
