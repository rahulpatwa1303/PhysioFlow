import React from "react";
import "./stepper.css";

const CircleStepper = ({ progress, steps }) => {
  const dashOffset = Math.round(
    // circumference - (circumference * progress) / 100
    400 - (400 * progress) / 100
  );

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-300 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className="text-DodgerBlue  progress-ring__circle stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDashoffset={dashOffset}
          //   stroke-dashoffset="calc(400 - (400 * 70) / 100)"
        ></circle>

        <text
          x="50"
          y="50"
          fontFamily="Verdana"
          fontSize="12"
          textAnchor="middle"
          alignmentBaseline="middle"
          className="font-semibold text-xl"
        >
          {steps}
        </text>
      </svg>
    </div>
  );
};

export default CircleStepper;
