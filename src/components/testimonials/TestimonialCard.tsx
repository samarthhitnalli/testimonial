import { Play, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  quote: string;
  avatar: string;
  thumbnail: string;
  videoUrl?: string;
  rating: number;
}

interface Props {
  testimonial: Testimonial;
  onSelect: (t: Testimonial) => void;
}

const TestimonialCard = ({ testimonial, onSelect }: Props) => {
  const { name, business, quote, avatar, thumbnail, videoUrl, rating } =
    testimonial;
  const hasVideo = !!videoUrl;

  return (
    <div
      className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl p-5 font-[Inter,sans-serif] transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.15)";
      }}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(testimonial)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(testimonial);
        }
      }}
      aria-label={`View testimonial from ${name}`}
    >
      {/* ── Thumbnail (16:9, rounded) ── */}
      <div className="group relative overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={`${business} testimonial`}
          loading="lazy"
          width={800}
          height={450}
          className="aspect-video w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
        />
        {hasVideo && (
          <>
            <span className="absolute inset-0 bg-black/20 transition-colors duration-200 group-hover:bg-black/30" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform duration-200 group-hover:scale-110">
                <Play className="h-5 w-5 translate-x-0.5 fill-[#2EA8FF] text-[#2EA8FF]" />
              </span>
            </span>
          </>
        )}
      </div>

      {/* ── Quote (2–3 lines) ── */}
      <p
        className="mt-4 flex-1 text-[14px] leading-relaxed line-clamp-3"
        style={{ color: "#B8D4EA" }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* ── Author row ── */}
      <div
        className="mt-5 flex items-center gap-3 pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback
            className="text-[11px] font-medium"
            style={{ background: "rgba(255,255,255,0.12)", color: "#B8D4EA" }}
          >
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[13px] font-semibold"
            style={{ color: "#EAF4FF" }}
          >
            {name}
          </p>
          <p
            className="truncate text-[12px]"
            style={{ color: "#8AAFC4" }}
          >
            {business}
          </p>
        </div>

        {/* Rating (compact, right-aligned) */}
        <div
          className="flex shrink-0 items-center gap-px"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.15)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
