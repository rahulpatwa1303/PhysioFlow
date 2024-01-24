import React from "react";
import { Check, UserRound } from "lucide-react";

function ApiSubmission() {
  return (
    <div className="flex items-center justify-center flex-col gap-4 mt-4">
      <div className="h-60 w-60 relative bg-emerald-400 rounded-full overflow-hidden flex items-center justify-center">
        <Check size={'84px'} className="text-gray-800"/>
        <div className="absolute inset-0 border-[2rem] border-emerald-100 rounded-full animate-pulse"></div>
      </div>
      <span className="text-center">
      New patient has been successful onborded...
      </span>
    </div>
  );
}

export { ApiSubmission };
