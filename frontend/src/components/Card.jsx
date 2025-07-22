import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  id,
  image,
  title,
  description,
  tags,
  date,
  size = "md", // options: sm, md, lg
  orientation = "vert", // options: vert, horiz
}) {
  const baseCard = "rounded-xl overflow-hidden shadow-md bg-white";
  const sizeClasses = {
    sm: "w-75 h-80",
    md: "w-110 h-full",
    lg: "w-full h-auto",
    hsm: "h-30 w-108",
  };

  const isHorizontal = orientation === "horiz";

  return (
    <div
      className={`${baseCard} ${sizeClasses[size]} ${
        isHorizontal ? "flex flex-row" : "flex flex-col"
      }`}
    >
      <img
        src={image}
        alt={title}
        className={`object-cover ${isHorizontal ? "w-1/2 h-full" : "w-full "} ${
          size === "md" ? "h-65" : "h-70"
        }`}
      />
      <div
        className={`p-4 flex flex-col justify-between ${
          size === "hsm" ? "pt-0.5" : ""
        }`}
      >
        <div>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          {size === "hsm" && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {description}
            </p>
          )}
        </div>

        <div className="mt-3 space-y-1">
          {size != "sm" &&
            tags.map((tag) => (
              <span className="inline-block text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 mr-1">
                {tag}
              </span>
            ))}
          {size === "sm" && (
            <div className="text-xs text-gray-400 italic">{date}</div>
          )}
        </div>
      </div>
    </div>
  );
}
