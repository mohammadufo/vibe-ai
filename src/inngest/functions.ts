import { openai, createAgent } from '@inngest/agent-kit'
import { inngest } from './client'

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
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

    return { output }
  }
)
