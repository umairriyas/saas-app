import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  isRestricted?: boolean; // Pass this from parent component
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  isRestricted = false,
}: CompanionCardProps) => {
  return (
    <article
      className="companion-card relative"
      style={{ backgroundColor: color }}
    >
      {/* Lock Overlay for Users Who Hit 3 Companion Limit */}
      {isRestricted && (
        <div className="absolute inset-0 bg-black/50 rounded-lg z-10 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-xs">
            <div className="text-red-500 text-3xl mb-2">🔒</div>
            <h3 className="font-bold text-sm mb-2">Upgrade Required</h3>
            <p className="text-xs text-gray-600 mb-3">
              You've reached your 3 companion limit. Upgrade to use this
              companion.
            </p>
            <Link href="/subscription">
              <Button
                size="sm"
                className="w-full text-xs bg-red-600 hover:bg-red-700"
              >
                Upgrade to Basic Plan
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Restriction Badge */}
      {isRestricted && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-sm z-20">
          LOCKED
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2
        className={`text-2xl font-bold ${isRestricted ? "text-gray-500" : ""}`}
      >
        {name}
      </h2>
      <p className={`text-sm ${isRestricted ? "text-gray-400" : ""}`}>
        {topic}
      </p>

      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
          className={isRestricted ? "opacity-50" : ""}
        />
        <p className={`text-sm ${isRestricted ? "text-gray-500" : ""}`}>
          {duration} minutes
        </p>
      </div>

      {/* Warning Message for Restricted Users */}
      {isRestricted && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs mt-3">
          ⚠️ You've reached your limit of 3 companions. Upgrade to Basic or Pro
          plan to use this companion.
        </div>
      )}

      <Link
        href={isRestricted ? `/subscription` : `/companions/${id}`}
        className="w-full mt-3 block"
      >
        <Button
          className={`w-full justify-center ${
            isRestricted
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "btn-primary"
          }`}
        >
          {isRestricted ? "Upgrade to Use" : "Launch Lesson"}
        </Button>
      </Link>
    </article>
  );
};

export default CompanionCard;
