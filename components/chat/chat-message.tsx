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

  const renderContent = () => {
    if (typeof message.content === "string") {
      return <span style={{ whiteSpace: "pre-wrap" }}>{message.content}</span>
    }

    // Handle array of content parts (multimodal message)
    if (Array.isArray(message.content)) {
      return message.content.map((part, index) => {
        if (part.type === "text") {
          return (
            <span key={index} style={{ whiteSpace: "pre-wrap" }}>
              {part.text}
            </span>
          )
        }
        if (part.type === "image" && typeof part.image === "string") {
          // Assuming part.image is a data URL
          return (
            <div key={index} className="my-2 relative block w-full max-w-xs">
              <Image
                src={part.image || "/placeholder.svg"}
                alt={`User uploaded content ${index + 1}`}
                width={300} // Provide a base width for aspect ratio calculation
                height={200} // Provide a base height
                className="rounded-md object-contain max-h-64" // Constrain height, object-contain preserves aspect
                style={{ width: "auto", height: "auto", maxWidth: "100%" }} // Responsive styling
              />
            </div>
          )
        }
        // Add handling for other part types if necessary in the future
        return null
      })
    }
    return null // Should not happen if content is string or array
  }

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
        <div className="flex flex-col gap-1 w-full">
          {" "}
          {/* Reduced gap for tighter content parts */}
          {/* Content (text and/or images) */}
          {message.content && (
            <div
              className={cn(
                "rounded-2xl px-4 py-3 text-sm shadow-sm",
                isUser ? "bg-gray-900 text-white ml-auto max-w-md" : "bg-gray-50 text-gray-900",
              )}
            >
              {renderContent()}
            </div>
          )}
          {/* Tool invocations (video search results) - for assistant messages */}
          {isAssistant &&
            message.toolInvocations?.map((toolInvocation) => {
              if (toolInvocation.toolName === "searchVideos" && toolInvocation.result) {
                return (
                  <div key={toolInvocation.toolCallId} className="w-full mt-2">
                    {" "}
                    {/* Added mt-2 for spacing */}
                    <VideoSearchResults
                      searchResult={toolInvocation.result}
                      query={(toolInvocation.args as any)?.query || "your request"}
                    />
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
