import CTABanner from "@/components/cta-banner";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HLRLookup from "@/components/hlr-lookup";
import { Navbar } from "@/components/navbar";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import Section from "@/components/section";
import CardPost from "@/components/card-post";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Hero />
        <HLRLookup />
        <Features />
        
        {/* Latest Blog Posts Section */}
        <Section id="blog" background="muted">
          <div className="text-center mb-12">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight">
              Latest Articles
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest insights, tutorials, and best practices in web development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestPosts.map((post) => (
              <CardPost key={post.slug} post={post} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/blog">
                View All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
        
        <Pricing />
        <FAQ />
        <Testimonials />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
