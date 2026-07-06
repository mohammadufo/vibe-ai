import { useState } from 'react'
import { CheckIcon, ExternalLinkIcon, RefreshCcwIcon } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Fragment } from '@/generated/prisma'
import { Button } from '@/components/ui/button'

interface Props {
  data: Fragment
}

export function FragmentWeb({ data }: Props) {
  const [copied, setCopied] = useState(false)
  const [fragmentKey, setFragmentKey] = useState(0)

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandboxUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-2 border-b bg-sidebar/80 backdrop-blur-sm flex items-center gap-x-2">
        <Hint text="Refresh" side="bottom" align="start">
          <Button
            size="sm"
            variant="outline"
            onClick={onRefresh}
            className="transition-transform hover:rotate-90 hover:text-primary"
          >
            <RefreshCcwIcon />
          </Button>
        </Hint>
        <Hint text="Click to copy" side="bottom">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!data.sandboxUrl || copied}
            className="flex-1 justify-start text-start font-normal rounded-full transition-colors hover:border-primary/50 disabled:opacity-100"
          >
            <span className="mr-1 size-1.5 shrink-0 rounded-full bg-emerald-500 animate-glow-pulse" />
            <span className="truncate">{data.sandboxUrl}</span>
            {copied && (
              <CheckIcon className="ml-auto size-3.5 shrink-0 text-emerald-500" />
            )}
          </Button>
        </Hint>
        <Hint text="Open in a new tab" side="bottom" align="start">
          <Button
            size="sm"
            disabled={!data.sandboxUrl}
            variant="outline"
            onClick={() => {
              if (!data.sandboxUrl) return
              window.open(data.sandboxUrl, '_blank')
            }}
            className="transition-colors hover:text-primary hover:-translate-y-0.5"
          >
            <ExternalLinkIcon />
          </Button>
        </Hint>
      </div>
      <iframe
        key={fragmentKey}
        className="h-full w-full animate-fade-in"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
      />
    </div>
  )
}
