'use client';

import { useChat } from 'ai/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, PaperclipIcon, SendIcon, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ChatInfo {
  id: string;
  title: string;
}

export default function ChatDetail() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
  const initialMessage = searchParams.get('message');

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    id: params.id as string,
    initialMessages: initialMessage
      ? [{ id: '0', role: 'user', content: initialMessage }]
      : [],
  });

  useEffect(() => {
    // In a real app, fetch the chat info from an API or local storage
    const mockChatInfo: ChatInfo = {
      id: params.id as string,
      title: initialMessage
        ? initialMessage.slice(0, 30) +
          (initialMessage.length > 30 ? '...' : '')
        : `Chat #${params.id}`,
    };
    setChatInfo(mockChatInfo);

    // If there's an initial message, trigger the AI response
    if (initialMessage && messages.length === 1) {
      handleInputChange({ target: { value: initialMessage } } as any);
      handleSubmit(new Event('submit') as any);
    }
  }, [params.id, initialMessage, messages.length, handleSubmit]);

  if (!chatInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">{chatInfo.title}</h1>
              <p className="text-sm text-muted-foreground">
                Continue your conversation
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Chat Messages */}
          <div className="space-y-4 mb-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0"
            >
              <PaperclipIcon className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Continue the conversation..."
              className="flex-1"
            />
            <Button type="submit" className="shrink-0">
              <SendIcon className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
