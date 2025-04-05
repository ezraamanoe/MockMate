import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const InteractiveHoverButton = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold transition-all duration-300 hover:bg-black", // Background color change on hover
          className
        )}
        {...props}
      >
        {/* Original Text Sliding Out */}
        <div className="flex items-center justify-center">
          <span className="inline-block transition-all duration-300 group-hover:translate-x-35 group-hover:opacity-0">
            {children}
          </span>
        </div>

        {/* Hover Text + Arrow Sliding In */}
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-35 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span className="transition-all duration-300 group-hover:translate-x-[-20px]">
            {children} {/* Text shifted to the left on hover */}
          </span>
          <ArrowRight className="text-white w-5 h-5 transition-all duration-300 group-hover:translate-x-[-25px]" /> {/* Arrow moved to the left on hover */}
        </div>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";