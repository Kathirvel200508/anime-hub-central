import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChatView from "@/components/chat/ChatView";
import { chatService } from "@/services/api";
import { type Conversation } from "@/mocks/data";

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    const data = await chatService.getConversations();
    setConversations(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 lg:p-6">
        <div className="flex h-[calc(100vh-8rem)] lg:h-[calc(100vh-2rem)] glass-card overflow-hidden animate-pulse">
          <div className="w-80 border-r border-border/50 p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-secondary/60" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded bg-secondary/40" />
                  <div className="h-2.5 w-32 rounded bg-secondary/30" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-6">
      <ChatView conversations={conversations} />
    </div>
  );
}
