import { Play, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
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
    <Card
      className="flex h-full cursor-pointer flex-col rounded-2xl border border-border/60 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
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
      {/* Thumbnail — play icon overlay on video cards */}
      <div className="group relative overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={`${business} testimonial`}
          loading="lazy"
          width={800}
          height={450}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hasVideo && (
          <>
            <span className="absolute inset-0 bg-foreground/10 transition-colors duration-300 group-hover:bg-foreground/20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="h-6 w-6 translate-x-0.5 fill-primary text-primary" />
              </span>
            </span>
          </>
        )}
      </div>

      {/* Rating */}
      <div
        className="mt-4 flex items-center gap-0.5"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground line-clamp-3">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-xs font-medium">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{business}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
