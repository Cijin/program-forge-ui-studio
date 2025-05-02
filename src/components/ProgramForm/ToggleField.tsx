
import React from 'react';
import { cn } from "@/lib/utils";

interface ToggleFieldProps {
  id: string;
  label: string;
  required?: boolean;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

const ToggleField = ({ 
  id, 
  label, 
  required = false, 
  value, 
  onChange, 
  className 
}: ToggleFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="text-sm text-gray-300 flex items-center gap-1.5">
        {label}
        {required && <span className="text-xs text-program-accent">*</span>}
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          className={cn(
            "flex-1 py-2 border text-center",
            !value 
              ? "bg-program-panel text-white border-program-accent" 
              : "bg-transparent text-gray-400 border-program-border"
          )}
          onClick={() => onChange(false)}
        >
          FALSE
        </button>
        <button
          type="button"
          className={cn(
            "flex-1 py-2 border text-center",
            value 
              ? "bg-program-panel text-white border-program-accent" 
              : "bg-transparent text-gray-400 border-program-border"
          )}
          onClick={() => onChange(true)}
        >
          TRUE
        </button>
      </div>
    </div>
  );
};

export default ToggleField;
