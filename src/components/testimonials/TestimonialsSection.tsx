import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";
import TestimonialModal from "./VideoModal";

import avatarJawed from "@/assets/avatar-jawed.jpg";
import avatarTanya from "@/assets/avatar-tanya.jpg";
import avatarSriharsha from "@/assets/avatar-sriharsha.jpg";
import avatarPioneer from "@/assets/avatar-pioneer.jpg";
import avatarSvr from "@/assets/avatar-svr.jpg";

import thumbJawed from "@/assets/thumb-jawed.jpg";
import thumbTanya from "@/assets/thumb-tanya.jpg";
import thumbSriharsha from "@/assets/thumb-sriharsha.jpg";
import thumbPioneer from "@/assets/thumb-pioneer.jpg";
import thumbSvr from "@/assets/thumb-svr.jpg";

const SAMPLE_VIDEO = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const testimonials: Testimonial[] = [
  {
    id: "jawed",
    name: "Jawed Habib",
    business: "Jawed Hair Studio",
    quote:
      "Raysoft AI streamlined our appointment bookings and customer follow-ups. We've seen a 40% jump in repeat clients within just three months.",
    avatar: avatarJawed,
    thumbnail: thumbJawed,
    videoUrl: "/videos/sample-10s.mp4",
    rating: 5,
  },
  {
    id: "tanya",
    name: "Tanya Grover",
    business: "Tanya Grover Consulting",
    quote:
      "The automation tools are brilliant. I save hours every week on lead management and can finally focus on what truly matters — my clients.",
    avatar: avatarTanya,
    thumbnail: thumbTanya,
    videoUrl: "/videos/sample-15s.mp4",
    rating: 5,
  },
  {
    id: "sriharsha",
    name: "Dr. Sriharsha Reddy",
    business: "Sriharsha Eye Hospital",
    quote:
      "Patient onboarding used to be tedious. With Raysoft AI, our front desk runs effortlessly and our patients get faster, smoother care.",
    avatar: avatarSriharsha,
    thumbnail: thumbSriharsha,
    videoUrl: SAMPLE_VIDEO,
    rating: 5,
  },
  {
    id: "pioneer",
    name: "Dr. Mark Stevens",
    business: "Pioneer Medical Associates",
    quote:
      "A reliable, intuitive platform that has genuinely transformed our operations. The support team is exceptional and always responsive.",
    avatar: avatarPioneer,
    thumbnail: thumbPioneer,
    rating: 5,
  },
  {
    id: "svr",
    name: "Dr. Vikram Rao",
    business: "SVR Dental",
    quote:
      "From reminders to reviews, Raysoft AI handles it all. Our no-show rate dropped dramatically and patient satisfaction is at an all-time high.",
    avatar: avatarSvr,
    thumbnail: thumbSvr,
    rating: 5,
  },
];

// Duplicate items for seamless infinite loop
const marqueeItems = [...testimonials, ...testimonials];

/** Pixels scrolled per frame at 60 fps */
const SCROLL_SPEED = 0.7;

const TestimonialsSection = () => {
  const [active, setActive] = useState<Testimonial | null>(null);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidth = useRef(0);
  const dragging = useRef(false);

  /* Measure half the track (= one set of items) */
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidth.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Wrap x into [-halfWidth, 0) for seamless looping */
  const wrap = useCallback((v: number) => {
    const hw = halfWidth.current;
    if (hw <= 0) return v;
    return ((v % hw) + hw) % hw - hw;
  }, []);

  /* Continuous auto-scroll (only pauses during active drag) */
  useAnimationFrame((_, delta) => {
    if (dragging.current || halfWidth.current <= 0) return;
    x.set(wrap(x.get() - SCROLL_SPEED * (delta / 16)));
  });

  return (
    <section
      id="testimonials"
      className="font-[Inter,sans-serif] relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0E4A7B, #0A2540)",
      }}
      aria-labelledby="testimonials-heading"
    >
      {/* ── Subtle decorative glow ── */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2"
        style={{
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(46,168,255,0.1) 0%, transparent 70%)",
        }}
      />

      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wide"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#B8D4EA",
            }}
          >
            TESTIMONIALS
          </span>
          <h2
            id="testimonials-heading"
            className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.1]"
            style={{ color: "#EAF4FF" }}
          >
            Trusted by Real Businesses
          </h2>
          <p
            className="mt-4 text-base leading-relaxed sm:text-lg"
            style={{ color: "#B8D4EA" }}
          >
            Hear from the founders, doctors, and entrepreneurs who use Raysoft AI
            every day to grow faster and serve their customers better.
          </p>
        </motion.div>
      </div>

      {/* ── Marquee ── */}
      <div
        className="relative mt-10 overflow-hidden pb-16 sm:pb-20"
        aria-label="Continuously scrolling customer testimonials"
      >
        {/* Edge fades (gradient-matched) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24"
          style={{
            background:
              "linear-gradient(to right, #0E4A7B, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24"
          style={{
            background:
              "linear-gradient(to left, #0A2540, transparent)",
          }}
        />

        <motion.div
          ref={trackRef}
          className="flex w-max cursor-grab gap-5 select-none px-4 active:cursor-grabbing sm:gap-6"
          style={{ x, touchAction: "pan-y" }}
          drag="x"
          dragElastic={0.08}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          dragConstraints={{ left: -999999, right: 999999 }}
          onDragStart={() => {
            dragging.current = true;
          }}
          onDragEnd={() => {
            dragging.current = false;
            x.set(wrap(x.get()));
          }}
        >
          {marqueeItems.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="w-[300px] shrink-0 sm:w-[340px] lg:w-[370px]"
            >
              <TestimonialCard testimonial={t} onSelect={setActive} />
            </div>
          ))}
        </motion.div>
      </div>

      <TestimonialModal
        testimonial={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
};

export default TestimonialsSection;
