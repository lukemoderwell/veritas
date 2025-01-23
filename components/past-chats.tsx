import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface PastChat {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

interface PastChatsProps {
  chats: PastChat[]
}

export function PastChats({ chats }: PastChatsProps) {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <Button variant="ghost" className="w-full justify-start text-left h-auto py-3">
              <MessageCircle className="mr-2 h-4 w-4 flex-shrink-0" />
              <div className="flex flex-col items-start">
                <p className="font-medium">{chat.title}</p>
                <p className="text-sm text-muted-foreground truncate max-w-[250px]">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-muted-foreground ml-auto pl-2">{chat.timestamp}</span>
            </Button>
          </Link>
        ))}
      </div>
    </ScrollArea>
  )
}

