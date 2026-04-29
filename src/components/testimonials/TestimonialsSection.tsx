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

/** Pixels per frame at ~60 fps */
const SCROLL_SPEED = 0.7;
/** Min px moved to count as drag (prevents accidental drag on tap) */
const DRAG_THRESHOLD = 5;

const TestimonialsSection = () => {
  const [active, setActive] = useState<Testimonial | null>(null);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidth = useRef(0);

  /* Drag state (refs to avoid re-renders) */
  const pointerDown = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);
  const startVal = useRef(0);
  const velocity = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const momentumRaf = useRef(0);

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

  /* ── Continuous auto-scroll ── */
  useAnimationFrame((_, delta) => {
    if (pointerDown.current || halfWidth.current <= 0) return;
    x.set(wrap(x.get() - SCROLL_SPEED * (delta / 16)));
  });

  /* ── Manual pointer-based drag ── */
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      /* Cancel any running momentum */
      if (momentumRaf.current) {
        cancelAnimationFrame(momentumRaf.current);
        momentumRaf.current = 0;
      }

      pointerDown.current = true;
      didDrag.current = false;
      startX.current = e.clientX;
      startVal.current = x.get();
      velocity.current = 0;
      lastPointerX.current = e.clientX;
      lastPointerTime.current = performance.now();

      /* Capture pointer so we get move/up even outside the element */
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [x]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerDown.current) return;

      const dx = e.clientX - startX.current;

      /* Mark as drag once past threshold */
      if (!didDrag.current && Math.abs(dx) > DRAG_THRESHOLD) {
        didDrag.current = true;
      }

      /* Track velocity for momentum */
      const now = performance.now();
      const dt = now - lastPointerTime.current;
      if (dt > 0) {
        velocity.current = (e.clientX - lastPointerX.current) / dt; // px/ms
      }
      lastPointerX.current = e.clientX;
      lastPointerTime.current = now;

      /* Move the track — direct, no spring, 1:1 with finger */
      x.set(wrap(startVal.current + dx));
    },
    [x, wrap]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerDown.current) return;
      pointerDown.current = false;

      (e.target as HTMLElement).releasePointerCapture(e.pointerId);

      /* Apply momentum (decelerate naturally) */
      const v0 = velocity.current; // px/ms
      if (Math.abs(v0) > 0.1) {
        const friction = 0.95;
        let vel = v0 * 16; // convert to px/frame (~16ms)

        const step = () => {
          vel *= friction;
          if (Math.abs(vel) < 0.3) {
            momentumRaf.current = 0;
            return;
          }
          x.set(wrap(x.get() + vel));
          momentumRaf.current = requestAnimationFrame(step);
        };
        momentumRaf.current = requestAnimationFrame(step);
      }
    },
    [x, wrap]
  );

  /* Card click handler — ignore if it was a drag */
  const handleSelect = useCallback(
    (t: Testimonial) => {
      if (didDrag.current) return;
      setActive(t);
    },
    []
  );

  /* Cleanup momentum on unmount */
  useEffect(() => {
    return () => {
      if (momentumRaf.current) cancelAnimationFrame(momentumRaf.current);
    };
  }, []);

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

        {/* Track — NO drag="x", just motion.div for reactive translateX */}
        <motion.div
          ref={trackRef}
          className="flex w-max cursor-grab gap-5 select-none px-4 active:cursor-grabbing sm:gap-6"
          style={{ x, touchAction: "pan-y", willChange: "transform" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {marqueeItems.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="w-[300px] shrink-0 sm:w-[340px] lg:w-[370px]"
            >
              <TestimonialCard testimonial={t} onSelect={handleSelect} />
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
