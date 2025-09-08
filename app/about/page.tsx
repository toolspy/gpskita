import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import Section from "@/components/section";

export const metadata = {
  title: "About Us - PureLanding",
  description: "Learn more about our mission to create beautiful, modern web experiences with Next.js and Tailwind CSS.",
  openGraph: {
    title: "About Us - PureLanding",
    description: "Learn more about our mission to create beautiful, modern web experiences with Next.js and Tailwind CSS.",
    url: "https://shadcn-landing-page.vercel.app/about",
  },
};

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Section>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl font-bold tracking-tight mb-6">
              About PureLanding
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're passionate about creating beautiful, modern web experiences that make a difference.
            </p>
          </div>
        </Section>

        <Section background="muted">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  At PureLanding, we believe that great design and user experience go hand in hand. 
                  Our mission is to provide developers and designers with the tools and resources 
                  they need to create exceptional web experiences.
                </p>
                <p className="text-lg text-muted-foreground">
                  We focus on modern technologies like Next.js 15, Tailwind CSS 4, and Shadcn UI 
                  to deliver fast, accessible, and beautiful websites that users love.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Modern, responsive design
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Fast performance optimization
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    SEO-friendly structure
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Accessibility-first approach
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Technology Stack</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We use the latest and greatest technologies to ensure your website is fast, 
              secure, and future-proof.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-background border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Next.js 15</h3>
                <p className="text-sm text-muted-foreground">React framework</p>
              </div>
              <div className="bg-background border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Tailwind CSS 4</h3>
                <p className="text-sm text-muted-foreground">Utility-first CSS</p>
              </div>
              <div className="bg-background border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Shadcn UI</h3>
                <p className="text-sm text-muted-foreground">Component library</p>
              </div>
              <div className="bg-background border rounded-lg p-6">
                <h3 className="font-semibold mb-2">TypeScript</h3>
                <p className="text-sm text-muted-foreground">Type safety</p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
