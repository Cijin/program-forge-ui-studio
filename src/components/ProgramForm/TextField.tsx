
import React from 'react';
import { cn } from "@/lib/utils";

interface TextFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  helpText?: string;
}

const TextField = ({ 
  id, 
  label, 
  placeholder = "", 
  required = false, 
  value, 
  onChange, 
  className,
  helpText 
}: TextFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-sm text-gray-300 flex items-center gap-1.5">
        {label}
        {required && <span className="text-xs text-program-accent">*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full bg-program-panel text-white rounded px-4 py-2 border border-program-border",
          "focus:outline-none focus:ring-1 focus:ring-program-accent"
        )}
      />
      {helpText && (
        <p className="text-xs text-gray-400 mt-1">{helpText}</p>
      )}
    </div>
  );
};

export default TextField;
