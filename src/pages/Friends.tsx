import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  UserPlus, 
  MessageCircle, 
  MoreHorizontal,
  Users,
  UserCheck,
  Clock,
  X,
  Check
} from "lucide-react";

const friendRequests = [
  {
    id: 1,
    name: "Emma Wilson",
    avatar: "/placeholder-avatar-4.jpg",
    mutualFriends: 5,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    name: "David Park",
    avatar: "/placeholder-avatar-5.jpg",
    mutualFriends: 12,
    timestamp: "1 day ago"
  }
];

const friends = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder-avatar-1.jpg",
    status: "online",
    lastActive: "Active now"
  },
  {
    id: 2,
    name: "Alex Chen",
    avatar: "/placeholder-avatar-2.jpg",
    status: "away",
    lastActive: "Active 30 minutes ago"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    avatar: "/placeholder-avatar-3.jpg",
    status: "offline",
    lastActive: "Active 2 hours ago"
  }
];

const suggestions = [
  {
    id: 1,
    name: "John Smith",
    avatar: "/placeholder-avatar-6.jpg",
    mutualFriends: 8,
    workplace: "TechCorp Inc."
  },
  {
    id: 2,
    name: "Lisa Brown",
    avatar: "/placeholder-avatar-7.jpg",
    mutualFriends: 3,
    workplace: "Design Studio"
  }
];

export default function Friends() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-online";
      case "away": return "bg-away";
      default: return "bg-offline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">Friends</h1>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search friends..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>All Friends</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Requests</span>
                {friendRequests.length > 0 && (
                  <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                    {friendRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="online" className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-online rounded-full"></div>
                <span>Online</span>
              </TabsTrigger>
            </TabsList>

            {/* All Friends */}
            <TabsContent value="all">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {friends.map((friend) => (
                  <Card key={friend.id} className="gradient-card border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="relative">
                          <Avatar className="border-2 border-border/30">
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback className="bg-muted">
                              {friend.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(friend.status)}`}></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{friend.name}</h3>
                          <p className="text-sm text-muted-foreground">{friend.lastActive}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Friend Requests */}
            <TabsContent value="requests">
              <div className="space-y-4">
                {friendRequests.map((request) => (
                  <Card key={request.id} className="gradient-card border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="border-2 border-border/30">
                            <AvatarImage src={request.avatar} alt={request.name} />
                            <AvatarFallback className="bg-muted">
                              {request.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{request.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {request.mutualFriends} mutual friends • {request.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="gradient-primary">
                            <Check className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Friend Suggestions */}
            <TabsContent value="suggestions">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="gradient-card border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="border-2 border-border/30">
                          <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                          <AvatarFallback className="bg-muted">
                            {suggestion.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{suggestion.name}</h3>
                          <p className="text-sm text-muted-foreground">{suggestion.workplace}</p>
                          <p className="text-sm text-muted-foreground">
                            {suggestion.mutualFriends} mutual friends
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 gradient-primary">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Add Friend
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Online Friends */}
            <TabsContent value="online">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {friends.filter(friend => friend.status === "online").map((friend) => (
                  <Card key={friend.id} className="gradient-card border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="relative">
                          <Avatar className="border-2 border-primary/30">
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback className="bg-muted">
                              {friend.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-online rounded-full border-2 border-background"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{friend.name}</h3>
                          <p className="text-sm text-online font-medium">Active now</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full gradient-primary">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Start Chat
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}