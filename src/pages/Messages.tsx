import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  MoreHorizontal,
  Circle
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder-avatar-1.jpg",
    lastMessage: "Hey! How's your day going?",
    timestamp: "2 min",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Alex Chen", 
    avatar: "/placeholder-avatar-2.jpg",
    lastMessage: "Thanks for sharing that article!",
    timestamp: "1h",
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    avatar: "/placeholder-avatar-3.jpg",
    lastMessage: "Let's catch up soon 😊",
    timestamp: "3h", 
    unread: 1,
    online: false
  }
];

const messages = [
  { id: 1, sender: "Sarah Johnson", content: "Hey! How's your day going?", timestamp: "2:30 PM", isOwn: false },
  { id: 2, sender: "You", content: "Pretty good! Just working on some projects. How about you?", timestamp: "2:32 PM", isOwn: true },
  { id: 3, sender: "Sarah Johnson", content: "Same here! I'm excited about the new features we're building", timestamp: "2:33 PM", isOwn: false },
  { id: 4, sender: "You", content: "That's awesome! Can't wait to see what you come up with", timestamp: "2:35 PM", isOwn: true }
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card className="gradient-card border-border/50 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <Badge variant="secondary" className="px-2 py-1">
                      {conversations.filter(c => c.unread > 0).length} new
                    </Badge>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Search conversations..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-muted/50 border-border/50"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer transition-smooth hover:bg-muted/30 ${
                          selectedChat?.id === conversation.id ? 'bg-muted/50' : ''
                        }`}
                        onClick={() => setSelectedChat(conversation)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={conversation.avatar} alt={conversation.name} />
                              <AvatarFallback className="bg-muted">
                                {conversation.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.online && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online rounded-full border-2 border-background"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold truncate">{conversation.name}</h3>
                              <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          </div>
                          
                          {conversation.unread > 0 && (
                            <Badge variant="destructive" className="px-2 py-1 text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              <Card className="gradient-card border-border/50 h-full flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <CardHeader className="pb-3 border-b border-border/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                              <AvatarFallback className="bg-muted">
                                {selectedChat.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {selectedChat.online && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online rounded-full border-2 border-background"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{selectedChat.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedChat.online ? "Active now" : "Last seen 3h ago"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="transition-bounce">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="transition-bounce">
                            <Video className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-last' : ''}`}>
                              {!message.isOwn && (
                                <div className="flex items-center space-x-2 mb-1">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                                    <AvatarFallback className="bg-muted text-xs">
                                      {selectedChat.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                </div>
                              )}
                              <div
                                className={`rounded-2xl px-4 py-2 ${
                                  message.isOwn
                                    ? 'gradient-primary text-primary-foreground'
                                    : 'bg-muted text-foreground'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                              {message.isOwn && (
                                <div className="text-right mt-1">
                                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    {/* Message Input */}
                    <div className="p-4 border-t border-border/30">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Type a message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            className="pr-20 bg-muted/50 border-border/50"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                // Handle send message
                                setMessageText("");
                              }
                            }}
                          />
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Smile className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="gradient-primary"
                          disabled={!messageText.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Send className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}