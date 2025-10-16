import { openai, createAgent } from '@inngest/agent-kit'
import { Sandbox } from '@e2b/code-interpreter'

import { inngest } from './client'
import { getSandbox } from './utils'

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    const sandboxId = await step.run('get-sandbox-id', async () => {
      const sandbox = await Sandbox.create('vibe-nextjs-test-761253812381')
      return sandbox.sandboxId
    })

    const codeAgent = createAgent({
      name: 'code-agent',
      system:
        'You are an expert nextjs developer. you write readable , maintainable code. you write simple nextjs and react snippets.',
      model: openai({ model: 'gpt-4' }),
    })

    const { output } = await codeAgent.run(
      `Write the following snippets: ${event.data.value}`
    )

    console.log('output ===>', output)

    const sandboxUrl = await step.run('get-sandbox-url', async () => {
      const sandbox = await getSandbox(sandboxId)
      const host = sandbox.getHost(3000)
      return `https://${host}`
    })

    return { output, sandboxUrl }
  }
)
