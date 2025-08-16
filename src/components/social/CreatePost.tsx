import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Image, 
  Video, 
  Smile, 
  MapPin, 
  Users,
  X,
  Camera
} from "lucide-react";

export function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const postOptions = [
    { icon: Image, label: "Photo", color: "text-green-500" },
    { icon: Video, label: "Video", color: "text-red-500" },
    { icon: Smile, label: "Feeling", color: "text-yellow-500" },
    { icon: MapPin, label: "Location", color: "text-blue-500" },
    { icon: Users, label: "Tag Friends", color: "text-purple-500" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...imageUrls]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="gradient-card border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="border-2 border-border/30">
            <AvatarImage src="/placeholder-avatar.jpg" alt="You" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              You
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="resize-none border-none bg-transparent p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
              rows={3}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image Preview */}
        {selectedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-smooth"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Post Options */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {postOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="transition-bounce hover:shadow-sm"
                  onClick={() => {
                    if (option.label === "Photo") {
                      document.getElementById('image-upload')?.click();
                    }
                  }}
                >
                  <Icon className={`w-4 h-4 mr-1 ${option.color}`} />
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              );
            })}
          </div>

          <Button 
            className="gradient-primary shadow-glow transition-bounce"
            disabled={!postContent.trim() && selectedImages.length === 0}
          >
            <Camera className="w-4 h-4 mr-2" />
            Post
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
      </CardContent>
    </Card>
  );
}