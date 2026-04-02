import Navbar from "@/components/Navbar";
import { useLocation } from "wouter";

const posts = [
  {
    slug: "/blog/climate-change-landscaping",
    title: "The Impact of Climate Change on Landscaping",
    excerpt: "As global climate patterns shift, the landscape around us must adapt to new environmental stresses and weather conditions. Learn how Newport Ave Landscaping is staying ahead of these changes.",
    date: "January 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    category: "Lawn Care Tips",
  },
  {
    slug: "/blog/seasonal-landscaping-guide",
    title: "Your Seasonal Guide to Landscaping Maintenance",
    excerpt: "A comprehensive guide to keeping your Central Oregon landscape healthy through every season — from spring activation to fall blowout and winter prep.",
    date: "February 2024",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    category: "Seasonal Tips",
  },
  {
    slug: "/services/lawn-fungus",
    title: "Lawn Fungus in Bend, Oregon",
    excerpt: "Got lawn fungus? Learn about the most common types of lawn fungus in Central Oregon, how to identify them, and how our licensed spray technicians can treat and prevent them.",
    date: "January 2023",
    image: "https://newportavelandscaping.com/wp-content/uploads/2023/01/brown-patch-lawn-fungus-1024x681.jpg",
    category: "Lawn Care",
  },
];

export default function Blog() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <Navbar />
      <div style={{ paddingTop: "328px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: "260px", backgroundColor: "oklch(0.15 0.005 0)" }}
        >
          <div className="text-center">
            <p className="font-label mb-2" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              RESOURCES
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Landscaping Tips &amp; Insights
            </h1>
            <p className="mt-3 font-body" style={{ color: "oklch(0.70 0.003 0)", fontSize: "0.95rem" }}>
              Expert advice for Central Oregon homeowners and property managers
            </p>
          </div>
        </div>

        {/* Posts grid */}
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group cursor-pointer"
                onClick={() => { navigate(post.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <div className="overflow-hidden mb-4" style={{ borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ height: "220px" }}
                  />
                </div>
                <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                  {post.category.toUpperCase()} &nbsp;·&nbsp; {post.date}
                </p>
                <h2
                  className="font-display mb-3 group-hover:text-red-700 transition-colors"
                  style={{ fontSize: "1.25rem", color: "oklch(0.15 0.005 0)", lineHeight: 1.3 }}
                >
                  {post.title}
                </h2>
                <p className="font-body" style={{ color: "oklch(0.40 0.005 0)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {post.excerpt}
                </p>
                <button
                  className="mt-4 font-label transition-colors duration-200"
                  style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.7rem", letterSpacing: "0.12em" }}
                >
                  READ MORE →
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
