import { Star } from "lucide-react";

interface Review {
  rating: number;
  comment: string;
}

/**
 * Renders star icons for a given rating.
 * @param {number} rating
 * @param {string} size
 * @returns {JSX.Element[]}
 */
export const renderStars = (rating: number, size: string = "w-4 h-4") => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`${size} ${
        i < rating
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300 dark:text-stone-700"
      }`}
    />
  ));
};

/**
 * Shares a review using the Web Share API or clipboard fallback.
 * @param {object} review
 */
export const handleShareReview = (review: Review) => {
  const shareText = `Check out this ${
    review.rating
  }-star review for a recipe! "${review.comment.substring(0, 100)}..."`;

  if (navigator.share) {
    navigator.share({
      title: "Recipe Review",
      text: shareText,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(shareText);
    alert("Review link copied to clipboard!");
  }
};
