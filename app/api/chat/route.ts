import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  // System prompt to help guide the AI's responses
  const systemPrompt = `You are a helpful assistant with access to company knowledge and processes.
Your goal is to help employees understand company procedures and processes.
Base your responses on the provided context and company interviews.
If you're unsure about something, acknowledge that and suggest reaching out to the relevant department.`

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: systemPrompt,
    messages,
    maxSteps: 5,
  })

  return result.toDataStreamResponse()
}

