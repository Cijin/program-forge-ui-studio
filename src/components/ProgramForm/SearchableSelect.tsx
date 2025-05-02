
import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchableSelectProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  apiEndpoint: 'exercises' | 'addons';
  type?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

interface Option {
  id: string;
  name: string;
}

const SearchableSelect = ({ 
  id, 
  label, 
  placeholder = "Search...", 
  required = false,
  apiEndpoint,
  type,
  value,
  onChange,
  className 
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  // Fetch options when search changes
  useEffect(() => {
    const fetchOptions = async () => {
      if (!search.trim() && !open) return;

      setLoading(true);
      try {
        // In a real implementation, this would call your actual API
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          // Generate mock data based on apiEndpoint and search
          let mockData: Option[] = [];
          const searchLower = search.toLowerCase();
          
          if (apiEndpoint === 'exercises') {
            mockData = [
              { id: 'ex1', name: `${searchLower} Squat` },
              { id: 'ex2', name: `${searchLower} Deadlift` },
              { id: 'ex3', name: `${searchLower} Bench Press` },
              { id: 'ex4', name: `${searchLower} Push Up` },
            ];
          } else if (apiEndpoint === 'addons') {
            // Filter by type if provided
            if (type) {
              mockData = [
                { id: `${type}1`, name: `${type} ${searchLower} 1` },
                { id: `${type}2`, name: `${type} ${searchLower} 2` },
                { id: `${type}3`, name: `${type} ${searchLower} 3` },
              ];
            } else {
              mockData = [
                { id: 'addon1', name: `${searchLower} Addon 1` },
                { id: 'addon2', name: `${searchLower} Addon 2` },
              ];
            }
          }
          
          setOptions(mockData);
          setLoading(false);
        }, 500);
        
        // The actual API call would look something like this:
        // const params = new URLSearchParams({ search });
        // if (type) params.append('type', type);
        // const response = await fetch(`/api/${apiEndpoint}?${params.toString()}`);
        // const data = await response.json();
        // setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
        setLoading(false);
      }
    };

    fetchOptions();
  }, [search, apiEndpoint, type, open]);

  // Set the selected label when a value is selected
  useEffect(() => {
    if (value) {
      const selected = options.find(option => option.id === value);
      if (selected) {
        setSelectedLabel(selected.name);
      }
    } else {
      setSelectedLabel("");
    }
  }, [value, options]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-sm text-gray-300 flex items-center gap-1.5">
        {label}
        {required && <span className="text-xs text-program-accent">*</span>}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            className={cn(
              "w-full flex items-center justify-between bg-program-panel text-white rounded px-4 py-2 border border-program-border",
              "text-left appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-program-accent",
              !value && "text-gray-400"
            )}
            aria-expanded={open}
          >
            {value && selectedLabel ? selectedLabel : placeholder}
            {value ? (
              <X 
                className="h-4 w-4 text-gray-400 hover:text-white ml-2 shrink-0" 
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
              />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400 ml-2 shrink-0" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-full min-w-[200px] p-0 bg-program-panel border-program-border text-white"
          align="start"
        >
          <Command className="bg-transparent">
            <CommandInput 
              placeholder={`Search ${label.toLowerCase()}...`} 
              value={search}
              onValueChange={setSearch}
              className="border-b border-program-border text-white focus:ring-0"
            />
            {loading ? (
              <div className="py-6 text-center text-sm text-gray-400">Loading...</div>
            ) : (
              <>
                <CommandEmpty className="py-6 text-center text-sm text-gray-400">
                  No results found
                </CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {options.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.id}
                      onSelect={() => {
                        onChange(option.id);
                        setSelectedLabel(option.name);
                        setOpen(false);
                      }}
                      className="flex items-center justify-between cursor-default hover:bg-gray-700"
                    >
                      {option.name}
                      {value === option.id && <Check className="h-4 w-4 text-program-accent" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchableSelect;
