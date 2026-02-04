
"use client";

import { useState, type ReactNode } from "react";

interface TruncateWordsProps {
  children: ReactNode;
  maxWords?: number;
  ellipsis?: string;
  className?: string;
  showReadMore?: boolean;
  readMoreText?: string;
  readLessText?: string;
}

export default function TruncateWords({
  children,
  maxWords = 12,
  ellipsis = "...",
  className,
  showReadMore = false,
  readMoreText = "Read more",
  readLessText = "Read less",
}: TruncateWordsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isStringChild = typeof children === "string";
  const rawText = isStringChild ? (children as string) : "";
  const words = isStringChild ? rawText.trim().split(/\s+/) : [];
  const hasLineBreak = isStringChild ? /[\r\n]/.test(rawText) : false;
  const shouldTruncate = words.length > maxWords || hasLineBreak;

  const displayText: ReactNode = shouldTruncate && !isExpanded
    ? `${words.slice(0, maxWords).join(" ")}${ellipsis}`
    : children;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`${className ?? ""} break-all whitespace-pre-line`}>{displayText}</div>
      {showReadMore && shouldTruncate && (
        <button
          onClick={handleToggle}
          className="text-primary cursor-pointer hover:text-primary/80 text-h8-semibold mt-1 transition-colors break-all"
        >
          {isExpanded ? readLessText : readMoreText}
        </button>
      )}
    </div>
  );
}


