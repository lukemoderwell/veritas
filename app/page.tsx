'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PastChats } from '@/components/past-chats';
import { MessageSquarePlus } from 'lucide-react';

interface PastChat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export default function Chat() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleNewConversation = () => {
    const chatId = Math.random().toString(36).substring(7);
    router.push(`/chat/${chatId}`);
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
              Start a new conversation or select a common topic below
            </p>
          </div>

          {/* New Conversation CTA */}
          <Button
            onClick={handleNewConversation}
            className="w-full mb-8"
            size="lg"
          >
            <MessageSquarePlus className="mr-2 h-5 w-5" />
            New Conversation
          </Button>

          {/* Common Prompts */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {commonPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2"
                onClick={() => {
                  const chatId = Math.random().toString(36).substring(7);
                  router.push(
                    `/chat/${chatId}?message=${encodeURIComponent(
                      `Tell me about: ${prompt.title}`
                    )}`
                  );
                }}
              >
                <span className="font-semibold">{prompt.title}</span>
                <span className="text-sm text-muted-foreground">
                  {prompt.description}
                </span>
              </Button>
            ))}
          </div> */}

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
