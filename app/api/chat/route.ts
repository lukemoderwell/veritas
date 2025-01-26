import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  // Define schema for messages
  const MessageSchema = z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  });

  const RequestSchema = z.object({
    messages: z.array(MessageSchema),
  });

  // Validate request body
  const body = await req.json();
  console.log('body', body);
  const { messages } = RequestSchema.parse(body);
  console.log('messages', messages);
  // System prompt to help guide the AI's responses
  const systemPrompt = `You are a helpful assistant with access to company knowledge and processes for the company "Veritas Professional Services".
Your goal is to help employees understand company procedures and processes.
Base your responses on the provided context and company interviews.
If you're unsure about something, acknowledge that and suggest reaching out to the relevant department.`;

  const context = `
  Veritas Professional Services is a company that provides professional services to clients.
  The company is located in the United States.
  The company was founded by Nate Jebb in 2024.
  Companies trust Veritas to help them collect company knowledge and processes, organize them, and make them available to employees in the form of training.
  Here is an example of how Veritas has helped a company: Acme Widgets had 3 engineers retiring. Veritas came on site to document their workflow and processes with a series of in-depth interviews.
  Veritas also scanned related documents and created a comprehensive training program for the new engineers. They also built out a portal so that employees could chat with the interview data to better learn Acme's unique processes.
`;

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt + context,
    messages,
    maxSteps: 5,
  });

  return result.toDataStreamResponse();
}
