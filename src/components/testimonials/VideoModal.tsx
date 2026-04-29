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
      <DialogContent className="max-w-2xl gap-0 overflow-hidden border-[#E2E8F0] p-0 font-[Inter,sans-serif] sm:rounded-xl">
        <DialogTitle className="sr-only">
          {testimonial
            ? `Testimonial from ${testimonial.name}`
            : "Testimonial"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {testimonial ? `${testimonial.business} testimonial` : ""}
        </DialogDescription>

        {testimonial && (
          <>
            {/* ── Media: video or image (prominent, 16:9) ── */}
            <div className="aspect-video w-full bg-[#F1F5F9]">
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

            {/* ── Details ── */}
            <div className="space-y-5 px-6 py-6">
              {/* Author row */}
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback className="bg-[#F1F5F9] text-xs font-medium text-[#475569]">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-[#0F172A]">
                    {testimonial.name}
                  </p>
                  <p className="text-[13px] text-[#475569]">
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
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-[#E2E8F0] text-[#E2E8F0]"
                    }`}
                  />
                ))}
              </div>

              {/* Full quote (expanded, not truncated) */}
              <p className="text-[15px] leading-relaxed text-[#475569]">
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
