
import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SelectField = ({ 
  id, 
  label, 
  placeholder = "Choose here", 
  required = false, 
  options, 
  value, 
  onChange, 
  className 
}: SelectFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-sm text-gray-300 flex items-center gap-1.5">
        {label}
        {required && <span className="text-xs text-program-accent">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full bg-program-panel text-white rounded px-4 py-2 border border-program-border",
            "appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-program-accent"
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SelectField;
