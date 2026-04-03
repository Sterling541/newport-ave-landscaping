/* ============================================================
   REVIEWS SECTION — Brand Refresh
   Large pull-quote format, clean white background
   Auto-rotating carousel with manual controls
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Michael Geers",
    text: "Great service! I had major irrigation problems and they fixed them for me way cheaper than I was quoted from 4 other businesses! Highly recommend!",
    rating: 5,
  },
  {
    name: "Gary LeFebvre",
    text: "I recently needed to have my sprinkler system winterized. I needed service ASAP as weather forecast was for freezing conditions. I called Janna at Newport and she was able to move heaven and earth to get me on the schedule. Aurora showed up the next day and did a very professional and thorough job. Thanks to your great staff I am very grateful and have signed up for your permanent service. I would highly recommend Newport Landscaping.",
    rating: 5,
  },
  {
    name: "Lisa Krynicki",
    text: "We spent all summer trying to find a landscaper to fix our broken sprinkler system. I called and emailed multiple companies and nobody would respond to me. Then I called Newport Ave Landscaping. They made an appointment for me immediately. They showed up exactly when they said they would (and even called to let me know they were on the way). The service technician was incredibly friendly, quick, and helpful. What we thought was going to be a huge repair job turned out to be one stuck valve. The tech cleaned it out (didn't try to sell me a new one), reprogrammed our box, adjusted some sprinkler heads, and everything worked great! He did it all in less than an hour.",
    rating: 5,
  },
  {
    name: "Kelly Meyer",
    text: "Highly recommend! We just can't say enough about how pleased we are with the work Newport Avenue Landscaping did for us. We had several landscaping needs. From design to tree removal, new SOD, irrigation, pavers and plants. Our yard looks amazing!",
    rating: 5,
  },
  {
    name: "Isah Cavallaro Rixe",
    text: "The ladies in the office are the best! They are always so helpful and get us on the schedule for any maintenance issues with our rental properties. I highly recommend them for all landscaping needs.",
    rating: 5,
  },
  {
    name: "Melanie Grandjacques",
    text: "Thanks to Newport Avenue Landscaping for our amazing yard transformation!! Nate, Chris, Francis and crew were so great to work with. Results are beautiful!!",
    rating: 5,
  },
  {
    name: "Jennifer Yarbrough",
    text: "We used Newport Landscaping for our lawn and could not be happier with the service provided. The quality of grass cutting was excellent. the gentleman was reliable and did a great job. I love their office staff! Mikaya is amazing!! Super efficient, helpful and kind. Kelly was also great to work with as well! They have a great team and we are thankful we found these folks!",
    rating: 5,
  },
];

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  const goNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % reviews.length);
      setAnimating(false);
    }, 300);
  };

  const goPrev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
      setAnimating(false);
    }, 300);
  };

  const review = reviews[current];

  return (
    <section
      id="reviews"
      className="py-24"
      style={{ backgroundColor: "oklch(1 0 0)" }}
    >
      <div className="container">
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="font-label mb-4 flex items-center justify-center gap-3"
              style={{ color: "oklch(0.46 0.20 25)" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
              Client Stories
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
            </div>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "oklch(0.22 0.005 0)",
                lineHeight: 1.1,
              }}
            >
              What Our Clients
              <br />
              <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                Are Saying
              </em>
            </h2>
          </div>

          {/* Featured review */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill="oklch(0.46 0.20 25)"
                  style={{ color: "oklch(0.46 0.20 25)" }}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="font-display font-light mb-8 transition-opacity duration-300"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                color: "oklch(0.22 0.005 0)",
                lineHeight: 1.5,
                fontStyle: "italic",
                opacity: animating ? 0 : 1,
              }}
            >
              "{review.text}"
            </blockquote>

            {/* Attribution */}
            <div
              className="font-label transition-opacity duration-300"
              style={{
                color: "oklch(0.46 0.20 25)",
                opacity: animating ? 0 : 1,
              }}
            >
              — {review.name}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={goPrev}
              className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{
                border: "1px solid oklch(0.90 0.003 0)",
                color: "oklch(0.38 0.005 0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.46 0.20 25)";
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(1 0 0)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.46 0.20 25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.38 0.005 0)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.90 0.003 0)";
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i === current
                        ? "oklch(0.46 0.20 25)"
                        : "oklch(0.80 0.003 0)",
                    transform: i === current ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{
                border: "1px solid oklch(0.90 0.003 0)",
                color: "oklch(0.38 0.005 0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.46 0.20 25)";
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(1 0 0)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.46 0.20 25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.38 0.005 0)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.90 0.003 0)";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Mini review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {reviews.slice(0, 3).map((r, i) => (
              <div
                key={r.name}
                className="p-6"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.003 0)",
                }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                    fill="oklch(0.46 0.20 25)"
                    style={{ color: "oklch(0.46 0.20 25)" }}
                    />
                  ))}
                </div>
                <p
                  className="font-body text-sm leading-relaxed mb-4 line-clamp-4"
                  style={{ color: "oklch(0.38 0.005 0)" }}
                >
                  "{r.text}"
                </p>
                <div
                  className="font-label"
                  style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.65rem" }}
                >
                  {r.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
