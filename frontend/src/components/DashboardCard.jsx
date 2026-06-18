import React from "react";

export default function DashboardCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
}) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      hover:shadow-lg
      transition
      duration-300
      p-6
      border
      border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="
            text-gray-500
            text-sm
            uppercase
            tracking-wide"
          >
            {title}
          </p>

          <h2
            className="
            text-3xl
            font-bold
            text-gray-800
            mt-2"
          >
            {value}
          </h2>
        </div>

        <div
          className={`
            ${color}
            h-14
            w-14
            rounded-full
            flex
            items-center
            justify-center
            text-white
            text-2xl
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}