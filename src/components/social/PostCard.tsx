import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  ThumbsUp,
  Laugh,
  Send
} from "lucide-react";

interface PostCardProps {
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

export function PostCard({
  author,
  content,
  image,
  timestamp,
  likes,
  comments,
  shares,
  isLiked = false
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const reactions = [
    { icon: ThumbsUp, label: "Like", color: "text-primary" },
    { icon: Heart, label: "Love", color: "text-red-500" },
    { icon: Laugh, label: "Haha", color: "text-yellow-500" },
  ];

  return (
    <Card className="gradient-card border-border/50 shadow-lg transition-smooth hover:shadow-glow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="border-2 border-border/30">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="bg-muted">
                {author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{author.name}</h3>
                {author.verified && (
                  <Badge variant="secondary" className="px-1 py-0 text-xs">
                    ✓
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-foreground mb-4 leading-relaxed">{content}</p>
        {image && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full h-auto transition-smooth hover:scale-105"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 flex-col space-y-3">
        {/* Reaction Stats */}
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>{likes} likes</span>
            <span>{comments} comments</span>
            <span>{shares} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-1">
            {reactions.map((reaction, index) => {
              const Icon = reaction.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`transition-bounce hover:shadow-sm ${
                    liked && index === 0 ? reaction.color : ""
                  }`}
                  onClick={() => index === 0 && setLiked(!liked)}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {reaction.label}
                </Button>
              );
            })}
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="transition-bounce"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Comment
            </Button>
            <Button variant="ghost" size="sm" className="transition-bounce">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="w-full space-y-3 border-t border-border/30 pt-3">
            {/* Add Comment */}
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-muted text-xs">
                  You
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-muted/50 border-border/50"
                />
                <Button size="sm" className="gradient-primary">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-3">
              {[1, 2].map((_, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-muted text-xs">
                      U{index + 1}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <p className="text-sm font-medium">User {index + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        Great post! Really inspiring content.
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                      <button className="hover:text-foreground transition-smooth">Like</button>
                      <button className="hover:text-foreground transition-smooth">Reply</button>
                      <span>2h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}