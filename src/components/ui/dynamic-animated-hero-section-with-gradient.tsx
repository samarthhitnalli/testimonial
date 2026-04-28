import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import avatarJawed from "@/assets/avatar-jawed.jpg";
import avatarTanya from "@/assets/avatar-tanya.jpg";
import avatarSriharsha from "@/assets/avatar-sriharsha.jpg";
import avatarPioneer from "@/assets/avatar-pioneer.jpg";
import avatarSvr from "@/assets/avatar-svr.jpg";

import thumbJawed from "@/assets/thumb-jawed.jpg";
import thumbTanya from "@/assets/thumb-tanya.jpg";

const avatars = [
  { src: avatarJawed, alt: "Jawed Habib" },
  { src: avatarTanya, alt: "Tanya Grover" },
  { src: avatarSriharsha, alt: "Dr. Sriharsha Reddy" },
  { src: avatarPioneer, alt: "Dr. Mark Stevens" },
  { src: avatarSvr, alt: "Dr. Vikram Rao" },
];

/* Small testimonial preview card for the right column */
const PreviewCard = ({
  thumb,
  name,
  business,
  quote,
  delay,
}: {
  thumb: string;
  name: string;
  business: string;
  quote: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
  >
    <div className="overflow-hidden rounded-lg">
      <img
        src={thumb}
        alt={`${name} testimonial`}
        className="aspect-video w-full object-cover"
        loading="lazy"
        width={400}
        height={225}
      />
    </div>
    <div className="mt-3 flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="mt-2 text-sm leading-relaxed text-[#475569] line-clamp-2">
      &ldquo;{quote}&rdquo;
    </p>
    <div className="mt-3 flex items-center gap-2">
      <div className="h-7 w-7 overflow-hidden rounded-full border border-[#E2E8F0]">
        <img
          src={avatars.find((a) => a.alt === name)?.src}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-[#0F172A]">{name}</p>
        <p className="text-[11px] text-[#475569]">{business}</p>
      </div>
    </div>
  </motion.div>
);

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-white font-[Inter,sans-serif]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 sm:py-28 lg:flex-row lg:gap-16 lg:px-8 lg:py-32">
        {/* ---- Left Column ---- */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block rounded-full border border-[#E2E8F0] bg-[#F1F5F9] px-3 py-1 text-xs font-medium tracking-wide text-[#475569]">
              TRUSTED BY 500+ BUSINESSES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-5xl lg:text-[56px] lg:leading-[1.1]"
          >
            Real Results from{" "}
            <span className="text-[#2563EB]">Real Clients</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-5 max-w-lg text-base leading-relaxed text-[#475569] sm:text-lg lg:max-w-md"
          >
            Discover how salons, clinics, and hospitals trust Raysoft AI to
            automate operations, boost retention, and grow faster — in their own
            words.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="rounded-lg bg-[#2563EB] px-7 py-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1D4ED8] hover:-translate-y-0.5"
            >
              <a href="#book-demo">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg border-[#E2E8F0] px-7 py-6 text-sm font-semibold text-[#0F172A] shadow-sm transition-all duration-200 hover:bg-[#F8FAFC] hover:-translate-y-0.5"
            >
              <a href="#testimonials">See Testimonials</a>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2.5">
              {avatars.map((a, i) => (
                <img
                  key={i}
                  src={a.src}
                  alt={a.alt}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                  loading="lazy"
                />
              ))}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-0.5 sm:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-1.5 text-sm font-semibold text-[#0F172A]">
                  5.0
                </span>
              </div>
              <p className="text-xs text-[#475569]">
                Loved by 500+ businesses across India
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---- Right Column — Testimonial previews ---- */}
        <div className="hidden w-full max-w-md flex-1 lg:block">
          <div className="grid grid-cols-1 gap-4">
            <PreviewCard
              thumb={thumbJawed}
              name="Jawed Habib"
              business="Jawed Hair Studio"
              quote="Raysoft AI streamlined our appointment bookings and customer follow-ups. We've seen a 40% jump in repeat clients."
              delay={0.3}
            />
            <PreviewCard
              thumb={thumbTanya}
              name="Tanya Grover"
              business="Tanya Grover Consulting"
              quote="The automation tools are brilliant. I save hours every week on lead management and can finally focus on my clients."
              delay={0.5}
            />
          </div>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="h-px w-full bg-[#E2E8F0]" />
    </section>
  );
};

export default HeroSection;
