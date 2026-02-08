import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Smile, ArrowLeft } from "lucide-react";
import { type Conversation, type Message } from "@/mocks/data";
import { chatService } from "@/services/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface ChatViewProps {
  conversations: Conversation[];
  onBack?: () => void;
}

export default function ChatView({ conversations, onBack }: ChatViewProps) {
  const { user } = useAuth();
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    if (selectedConv) {
      loadMessages(selectedConv.id);
    }
  }, [selectedConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async (convId: string) => {
    setLoading(true);
    const msgs = await chatService.getMessages(convId);
    setMessages(msgs);
    setLoading(false);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedConv) return;
    const content = newMessage;
    setNewMessage("");
    const msg = await chatService.sendMessage(selectedConv.id, content);
    setMessages((prev) => [...prev, msg]);
  };

  const handleSelectConv = (conv: Conversation) => {
    setSelectedConv(conv);
    setShowList(false);
  };

  const handleBack = () => {
    setShowList(true);
    setSelectedConv(null);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] lg:h-[calc(100vh-2rem)] glass-card overflow-hidden">
      {/* Conversation List */}
      <div className={cn(
        "w-full md:w-80 border-r border-border/50 flex flex-col",
        !showList && "hidden md:flex"
      )}>
        <div className="p-4 border-b border-border/50">
          <h2 className="text-lg font-display font-bold text-foreground">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv, i) => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelectConv(conv)}
              className={cn(
                "w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-all text-left border-b border-border/20",
                selectedConv?.id === conv.id && "bg-secondary/50"
              )}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conv.user.avatar}
                  alt={conv.user.displayName}
                  className="w-11 h-11 rounded-full bg-secondary"
                />
                {conv.user.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground truncate">{conv.user.displayName}</h4>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{conv.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                  {conv.unreadCount}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className={cn(
        "flex-1 flex flex-col",
        showList && "hidden md:flex"
      )}>
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border/50">
              <button
                onClick={handleBack}
                className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img
                src={selectedConv.user.avatar}
                alt={selectedConv.user.displayName}
                className="w-9 h-9 rounded-full bg-secondary"
              />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{selectedConv.user.displayName}</h3>
                <p className="text-[10px] text-muted-foreground">
                  {selectedConv.user.isOnline ? (
                    <span className="text-success">Online</span>
                  ) : (
                    "Offline"
                  )}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.senderId === user.id;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex", isMine ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm",
                          isMine
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-secondary text-secondary-foreground rounded-bl-md"
                        )}
                      >
                        <p>{msg.content}</p>
                        <p className={cn(
                          "text-[10px] mt-1",
                          isMine ? "text-primary-foreground/60" : "text-muted-foreground"
                        )}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
                  <Smile className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-lg font-display font-semibold text-foreground">Select a conversation</h3>
              <p className="text-sm text-muted-foreground mt-1">Choose someone to start chatting with</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
