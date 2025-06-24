import type { Message } from "ai"
import { cn } from "@/lib/utils"
import VideoSearchResults from "./video-search-results"
import Image from "next/image"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  const isAssistant = message.role === "assistant"

  return (
    <div className={cn("flex mb-8", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn("flex items-start gap-4 max-w-[90%] md:max-w-[85%]", isUser ? "flex-row-reverse" : "flex-row")}
      >
        {isAssistant && (
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
            <Image src="/veritas-logo.jpg" alt="Veritas Assistant" layout="fill" objectFit="contain" className="p-1" />
          </div>
        )}
        <div className="flex flex-col gap-4 w-full">
          {/* Text content */}
          {message.content && (
            <div
              className={cn(
                "rounded-2xl px-4 py-3 text-sm shadow-sm",
                isUser ? "bg-gray-900 text-white ml-auto max-w-md" : "bg-gray-50 text-gray-900",
              )}
            >
              <span style={{ whiteSpace: "pre-wrap" }}>{message.content}</span>
            </div>
          )}

          {/* Tool invocations (video search results) */}
          {message.toolInvocations?.map((toolInvocation) => {
            if (toolInvocation.toolName === "searchVideos" && toolInvocation.result) {
              return (
                <div key={toolInvocation.toolCallId} className="w-full">
                  <VideoSearchResults searchResult={toolInvocation.result} query={toolInvocation.args.query} />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
