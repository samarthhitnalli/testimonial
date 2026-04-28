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

// Duplicate items so the -50% translateX trick creates a seamless infinite loop
const marqueeItems = [...testimonials, ...testimonials];

/** Pixels scrolled per frame at 60 fps — increase for faster scroll */
const SCROLL_SPEED = 0.7;

const TestimonialsSection = () => {
  const [active, setActive] = useState<Testimonial | null>(null);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidth = useRef(0);
  const dragging = useRef(false);

  /* ---- Measure half the track (= one full set of items) ---- */
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

  /* ---- Wrap x into [-halfWidth, 0) for seamless looping ---- */
  const wrap = useCallback((v: number) => {
    const hw = halfWidth.current;
    if (hw <= 0) return v;
    return ((v % hw) + hw) % hw - hw;
  }, []);

  /* ---- Continuous auto-scroll (only pauses during active drag) ---- */
  useAnimationFrame((_, delta) => {
    if (dragging.current || halfWidth.current <= 0) return;
    x.set(wrap(x.get() - SCROLL_SPEED * (delta / 16)));
  });

  return (
    <section
      id="testimonials"
      className="bg-background py-20 sm:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            TESTIMONIALS
          </span>
          <h2
            id="testimonials-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]"
          >
            Trusted by Real Businesses
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hear from the founders, doctors, and entrepreneurs who use Raysoft AI
            every day to grow faster and serve their customers better.
          </p>
        </motion.div>
      </div>

      {/* Marquee — full-bleed, continuous, seamless, draggable */}
      <div
        className="relative mt-14 overflow-hidden"
        aria-label="Continuously scrolling customer testimonials"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />

        <motion.div
          ref={trackRef}
          className="flex w-max cursor-grab gap-5 select-none active:cursor-grabbing sm:gap-6"
          style={{ x }}
          drag="x"
          dragElastic={0}
          dragMomentum={false}
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
              className="w-[300px] shrink-0 sm:w-[340px] lg:w-[380px]"
            >
              <TestimonialCard testimonial={t} onSelect={setActive} />
            </div>
          ))}
        </motion.div>
      </div>

      <TestimonialModal testimonial={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default TestimonialsSection;
