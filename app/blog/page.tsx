import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import CardPost from "@/components/card-post";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Tag } from "lucide-react";

export const metadata = {
  title: "Blog - PureLanding",
  description: "Discover our latest articles, tutorials, and insights about web development, design, and technology.",
  openGraph: {
    title: "Blog - PureLanding",
    description: "Discover our latest articles, tutorials, and insights about web development, design, and technology.",
    url: "https://shadcn-landing-page.vercel.app/blog",
  },
};

export default function Blog() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Section>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl font-bold tracking-tight mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our latest articles, tutorials, and insights about web development, 
              design, and technology.
            </p>
          </div>
        </Section>

        <Section background="muted">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  <Tag className="h-3 w-3 mr-1" />
                  All
                </Badge>
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <CardPost key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  We're working on creating amazing content for you. Check back soon!
                </p>
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
