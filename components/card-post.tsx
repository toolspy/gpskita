import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Tag } from 'lucide-react';
import { Post } from '@/lib/posts';
import DateFormatter from '@/components/date-formatter';

interface CardPostProps {
  post: Post;
  className?: string;
}

const CardPost: React.FC<CardPostProps> = ({ post, className }) => {

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-lg ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <DateFormatter dateString={post.date} />
          <User className="h-4 w-4 ml-2" />
          <span>{post.author}</span>
        </div>
        <CardTitle className="line-clamp-2">
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPost;
