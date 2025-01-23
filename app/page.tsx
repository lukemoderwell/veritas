'use client';

import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PaperclipIcon, SendIcon } from 'lucide-react';
import { PastChats } from '@/components/past-chats';

const commonPrompts = [
  {
    title: 'Order new parts',
    description: 'Learn how to submit an order form for machine shop parts',
  },
  {
    title: 'Expense reports',
    description: 'Get guidance on submitting expense reports',
  },
  {
    title: 'IT support',
    description: 'Find out how to request IT support or equipment',
  },
  {
    title: 'HR processes',
    description: 'Learn about common HR procedures and policies',
  },
];

interface PastChat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export default function Chat() {
  const router = useRouter();
  const { input, handleInputChange } = useChat();
  const [userName, setUserName] = useState('Nate');
  const [pastChats, setPastChats] = useState<PastChat[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    const mockPastChats: PastChat[] = [
      {
        id: '1',
        title: 'Ordering new laptop',
        lastMessage: 'Thank you for your help!',
        timestamp: '2d ago',
      },
      {
        id: '2',
        title: 'Expense report question',
        lastMessage: 'I understand now, thanks.',
        timestamp: '5d ago',
      },
      {
        id: '3',
        title: 'HR policy clarification',
        lastMessage: 'That clears things up.',
        timestamp: '1w ago',
      },
    ];
    setPastChats(mockPastChats);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Generate a unique chat ID
    const chatId = Math.random().toString(36).substring(7);

    // In a real app, you'd save the new chat to your backend or local storage here
    const newChat: PastChat = {
      id: chatId,
      title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
      lastMessage: input,
      timestamp: 'Just now',
    };
    setPastChats([newChat, ...pastChats]);

    // Pass the initial message as a query parameter
    router.push(`/chat/${chatId}?message=${encodeURIComponent(input)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Hi there, <span className="text-primary">{userName}</span>
            </h1>
            <h2 className="text-2xl text-muted-foreground mt-2">
              What would you like to know?
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Ask about company processes or select a common topic below
            </p>
          </div>

          {/* Common Prompts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {commonPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2"
                onClick={() =>
                  handleInputChange({
                    target: { value: `Tell me about: ${prompt.title}` },
                  } as any)
                }
              >
                <span className="font-semibold">{prompt.title}</span>
                <span className="text-sm text-muted-foreground">
                  {prompt.description}
                </span>
              </Button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
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
              placeholder="Ask about any company process..."
              className="flex-1"
            />
            <Button type="submit" className="shrink-0">
              <SendIcon className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>

          {/* Past Chats */}
          <div>
            <h3 className="font-semibold mb-4">Past Conversations</h3>
            <PastChats chats={pastChats} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
