import { CreatePost } from "@/components/social/CreatePost";
import { PostCard } from "@/components/social/PostCard";

const samplePosts = [
  {
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-avatar-1.jpg",
      verified: true
    },
    content: "Just launched my new startup! Excited to share this journey with everyone. Building the future of social connections 🚀",
    image: "/placeholder-post-1.jpg",
    timestamp: "2 hours ago",
    likes: 42,
    comments: 8,
    shares: 3,
    isLiked: false
  },
  {
    author: {
      name: "Alex Chen",
      avatar: "/placeholder-avatar-2.jpg"
    },
    content: "Beautiful sunset from my hiking trip today. Nature never fails to amaze me! 🌅",
    image: "/placeholder-post-2.jpg",
    timestamp: "4 hours ago",
    likes: 128,
    comments: 15,
    shares: 7,
    isLiked: true
  },
  {
    author: {
      name: "Maria Rodriguez",
      avatar: "/placeholder-avatar-3.jpg",
      verified: true
    },
    content: "Grateful for an amazing team meeting today. We're building something incredible together! Collaboration and innovation at its finest.",
    timestamp: "6 hours ago",
    likes: 67,
    comments: 12,
    shares: 5,
    isLiked: false
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Create Post */}
          <CreatePost />

          {/* Posts Feed */}
          <div className="space-y-6">
            {samplePosts.map((post, index) => (
              <PostCard
                key={index}
                author={post.author}
                content={post.content}
                image={post.image}
                timestamp={post.timestamp}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
                isLiked={post.isLiked}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center py-8">
            <button className="text-primary hover:text-primary-glow transition-smooth">
              Load more posts...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}