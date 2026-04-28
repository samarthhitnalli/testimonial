import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "./TestimonialCard";

interface Props {
  testimonial: Testimonial | null;
  onClose: () => void;
}

const TestimonialModal = ({ testimonial, onClose }: Props) => {
  const open = !!testimonial;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-xl">
        <DialogTitle className="sr-only">
          {testimonial
            ? `Testimonial from ${testimonial.name}`
            : "Testimonial"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {testimonial
            ? `${testimonial.business} testimonial`
            : ""}
        </DialogDescription>

        {testimonial && (
          <>
            {/* ---- Media: video or image ---- */}
            <div className="aspect-video w-full bg-muted">
              {testimonial.videoUrl ? (
                testimonial.videoUrl.endsWith(".mp4") ? (
                  <video
                    src={testimonial.videoUrl}
                    title={`Testimonial from ${testimonial.name}`}
                    controls
                    autoPlay
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <iframe
                    src={`${testimonial.videoUrl}?autoplay=1&rel=0`}
                    title={`Testimonial from ${testimonial.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                )
              ) : (
                <img
                  src={testimonial.thumbnail}
                  alt={`${testimonial.business} testimonial`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* ---- Details ---- */}
            <div className="space-y-4 px-6 py-5">
              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback className="text-sm font-medium">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.business}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div
                className="flex items-center gap-0.5"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-[18px] w-[18px] ${
                      i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Full quote */}
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialModal;
