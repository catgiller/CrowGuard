type StarRatingProps = {
  rating: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  emptyColor?: string;
};

const SIZES = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

export default function StarRating({
  rating,
  size = "md",
  color = "#F59E0B",
  emptyColor = "#E5E7EB",
}: StarRatingProps) {
  const sz = SIZES[size];
  const clamped = Math.min(5, Math.max(0, rating));

  return (
    <div className="flex items-center gap-0.5" aria-label={`${clamped.toFixed(1)} / 5 yıldız`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, clamped - (i - 1)));
        return (
          <span key={i} className={`relative inline-block ${sz}`}>
            <svg className={`${sz} block`} viewBox="0 0 20 20" fill={emptyColor}>
              <path d={STAR_PATH} />
            </svg>
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <svg className={`${sz} block`} viewBox="0 0 20 20" fill={color}>
                  <path d={STAR_PATH} />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
