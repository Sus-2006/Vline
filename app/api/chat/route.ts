import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-5-mini",
    system: `You are a helpful AI tutor called "LearnBot". Your role is to help students learn effectively.

Guidelines:
- Break down complex concepts into simple, digestible explanations
- Use analogies and examples to make ideas clearer
- Encourage curiosity and ask follow-up questions to check understanding
- When creating quizzes, provide a mix of question types (multiple choice, short answer, etc.)
- When summarizing notes, highlight key concepts and important connections
- Be patient, encouraging, and supportive
- If you don't know something, admit it and suggest resources where they can learn more

Remember: Your goal is to foster understanding, not just provide answers.`,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
