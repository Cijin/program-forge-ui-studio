
import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface RelationFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const RelationField = ({ 
  id, 
  label, 
  placeholder = "Add relation", 
  required = false, 
  className 
}: RelationFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-sm text-gray-300 flex items-center gap-1.5">
        {label}
        {required && <span className="text-xs text-program-accent">*</span>}
      </label>
      <div className="relative">
        <button
          id={id}
          className={cn(
            "w-full bg-program-panel text-gray-400 rounded px-4 py-2 border border-program-border",
            "text-left appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-program-accent"
          )}
        >
          {placeholder}
        </button>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default RelationField;
