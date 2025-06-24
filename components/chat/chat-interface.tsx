"use client"

import type React from "react"

import { useChat, type Message } from "ai/react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch" // Added Switch import
import { Label } from "@/components/ui/label" // Added Label import
import { SendHorizonalIcon, Loader2Icon, PlusIcon, ImageIcon, MicIcon } from "lucide-react" // Removed SearchIcon
import ChatMessage from "./chat-message"
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function ChatInterface() {
  const initialMessages: Message[] = []
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [webSearchEnabled, setWebSearchEnabled] = useState(false) // Defaults to off
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setInput } = useChat({
    api: "/api/chat",
    initialMessages,
    maxToolRoundtrips: 5,
    onToolCall: ({ toolCall }) => {
      console.log("Tool call initiated:", toolCall)
    },
    onFinish: (message) => {
      console.log("Message finished:", message)
    },
  })

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (messages.length > 0 && !hasStartedChat) {
      setHasStartedChat(true)
    }
  }, [messages.length, hasStartedChat])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const customHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    handleSubmit(e)
    setUploadedImages([]) // Clear uploaded images after sending
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.form
        if (form) {
          handleSubmit(new Event("submit") as any)
          setUploadedImages([])
        }
      }
    }
  }

  const handleQuickAction = (text: string) => {
    setInput(text)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedImages((prev) => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleMicButtonClick = () => {
    console.log("Microphone button clicked. Voice input not yet implemented.")
    // Future: Add voice input functionality here
  }

  // Check for different types of AI activity
  const lastMessage = messages[messages.length - 1]
  const isThinking = isLoading && (!lastMessage || lastMessage.role === "user")
  const isSearching = messages.some(
    (m) =>
      m.role === "assistant" && m.toolInvocations?.some((t) => t.toolName === "searchVideos" && t.state === "call"),
  )
  const hasActiveToolCalls = lastMessage?.toolInvocations?.some((t) => t.state === "call")

  // Centered initial state
  if (!hasStartedChat && messages.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl mx-auto space-y-12">
          {/* Logo and greeting */}
          <div className="text-center space-y-6">
            <div className="relative w-16 h-16 mx-auto">
              <Image
                src="/veritas-logo.jpg"
                alt="Veritas Logo"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Good morning, Dave</h1>
              <p className="text-xl text-gray-600 font-normal">How can I help you find information today?</p>
            </div>
          </div>

          {/* Main input */}
          <form onSubmit={customHandleSubmit} className="relative">
            <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              {/* Uploaded images preview */}
              {uploadedImages.length > 0 && (
                <div className="p-4 border-b border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white rounded-full text-xs flex items-center justify-center hover:bg-gray-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about procedures, equipment, or training..."
                className="w-full px-6 py-5 text-lg border-0 rounded-2xl focus-visible:ring-0 bg-transparent resize-none min-h-[60px] max-h-[200px] placeholder:text-gray-400"
                disabled={isLoading}
              />

              {/* Bottom toolbar */}
              <div className="flex items-center justify-between p-4 pt-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={handleMicButtonClick}
                    aria-label="Use voice input"
                  >
                    <MicIcon className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                {/*
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="web-search-toggle-initial"
                      checked={webSearchEnabled}
                      onCheckedChange={setWebSearchEnabled}
                      aria-label="Toggle web search"
                    />
                    <Label
                      htmlFor="web-search-toggle-initial"
                      className="text-sm font-medium text-gray-600 cursor-pointer"
                    >
                      Use web results
                    </Label>
                  </div>
                  */}
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="h-9 w-9 p-0 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2Icon className="w-4 h-4 animate-spin" />
                    ) : (
                      <SendHorizonalIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Quick actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              className="rounded-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-normal"
              onClick={() => handleQuickAction("How does the wiring on the boiler hydraulic arm work?")}
            >
              🔧 Equipment Help
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-normal"
              onClick={() => handleQuickAction("Show me safety procedures for Zone A")}
            >
              🛡️ Safety Procedures
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-normal"
              onClick={() => handleQuickAction("Training videos for new employees")}
            >
              📚 Training
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Full chat interface - no header, minimal design
  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white transition-all duration-500 ease-out",
        hasStartedChat ? "opacity-100" : "opacity-0",
      )}
    >
      <main className="flex-grow overflow-y-auto p-6 pb-32">
        <div className="max-w-4xl mx-auto">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}

          {/* Thinking/Tool Call Indicators */}
          {(isLoading || isSearching || hasActiveToolCalls) && (
            <div className="flex justify-start mb-6">
              <div className="flex items-start gap-3 max-w-[80%] md:max-w-[70%]">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                  <Image
                    src="/veritas-logo.jpg"
                    alt="Veritas Assistant"
                    layout="fill"
                    objectFit="contain"
                    className="p-1"
                  />
                </div>
                <div className="space-y-2">
                  {/* Main thinking indicator */}
                  {isThinking && (
                    <div className="rounded-2xl px-4 py-3 text-sm bg-gray-50 text-gray-800 border border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-75" />
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-150" />
                        </div>
                        <span className="text-gray-600 italic">Thinking...</span>
                      </div>
                    </div>
                  )}

                  {/* Tool call indicators */}
                  {lastMessage?.toolInvocations?.map((toolInvocation) => {
                    if (toolInvocation.state === "call") {
                      return (
                        <div
                          key={toolInvocation.toolCallId}
                          className="rounded-2xl px-4 py-3 text-sm bg-blue-50 text-blue-800 border border-blue-100"
                        >
                          <div className="flex items-center gap-2">
                            <Loader2Icon className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="italic">
                              {toolInvocation.toolName === "searchVideos"
                                ? `Searching video library for "${toolInvocation.args.query}"...`
                                : `Using ${toolInvocation.toolName}...`}
                            </span>
                          </div>
                        </div>
                      )
                    }
                    return null
                  })}

                  {/* Generic loading fallback */}
                  {isLoading && !isThinking && !hasActiveToolCalls && (
                    <div className="rounded-2xl px-4 py-3 text-sm bg-gray-50 text-gray-800">
                      <div className="flex items-center gap-2">
                        <Loader2Icon className="w-4 h-4 animate-spin text-gray-600" />
                        <span className="text-gray-600 italic">Processing...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {error && (
        <div className="max-w-4xl mx-auto px-6 pb-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            <p>
              <strong>Error:</strong> {error.message || "An unexpected error occurred."}
            </p>
          </div>
        </div>
      )}

      {/* Debug info */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded max-w-xs">
          <div>Loading: {isLoading.toString()}</div>
          <div>Messages: {messages.length}</div>
          <div>Last message role: {lastMessage?.role || "none"}</div>
          <div>Tool invocations: {lastMessage?.toolInvocations?.length || 0}</div>
          <div>Active tool calls: {hasActiveToolCalls?.toString()}</div>
        </div>
      )}

      {/* Floating input - not in a footer */}
      <div className="fixed bottom-6 left-6 right-6 z-10">
        <form onSubmit={customHandleSubmit} className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg focus-within:border-gray-300 transition-colors">
            {/* Uploaded images preview */}
            {uploadedImages.length > 0 && (
              <div className="p-3 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white rounded-full text-xs flex items-center justify-center hover:bg-gray-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up question..."
              className="w-full px-4 py-3 pr-20 border-0 rounded-2xl focus-visible:ring-0 bg-transparent resize-none min-h-[50px] max-h-[150px] placeholder:text-gray-400"
              disabled={isLoading}
            />

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between px-4 pb-3">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Add attachment"
                >
                  <PlusIcon className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload image"
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  onClick={handleMicButtonClick}
                  aria-label="Use voice input"
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                {" "}
                {/* Increased gap for better spacing */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="web-search-toggle-floating"
                    checked={webSearchEnabled}
                    onCheckedChange={setWebSearchEnabled}
                    aria-label="Toggle web search"
                  />
                  <Label
                    htmlFor="web-search-toggle-floating"
                    className="text-xs font-medium text-gray-500 cursor-pointer"
                  >
                    Use web results
                  </Label>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="h-8 w-8 p-0 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : (
                    <SendHorizonalIcon className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  )
}
