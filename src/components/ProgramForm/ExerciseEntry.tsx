
import React from 'react';
import { Trash2, Plus } from "lucide-react";
import TextField from './TextField';
import { cn } from "@/lib/utils";

interface ExerciseEntryProps {
  index: number;
  onDelete?: () => void;
  entryData?: {
    sets: string;
    info: string;
  };
  onDataChange?: (field: string, value: string) => void;
}

const ExerciseEntry: React.FC<ExerciseEntryProps> = ({ 
  index, 
  onDelete,
  entryData = { sets: '', info: '' },
  onDataChange
}) => {
  const handleChange = (field: string, value: string) => {
    if (onDataChange) {
      onDataChange(field, value);
    }
  };
  
  return (
    <div className="border border-program-border rounded-lg overflow-hidden bg-program-panel p-4 mb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-program-accent flex items-center justify-center">
            <span className="text-xs text-white">{index}</span>
          </div>
          <h3 className="text-white text-sm">exercise ({index})</h3>
        </div>
        {onDelete && (
          <button 
            onClick={onDelete}
            className="text-program-accent hover:text-red-300"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <TextField 
          id={`sets_${index}`}
          label="sets"
          placeholder="Enter sets information"
          value={entryData.sets}
          onChange={(value) => handleChange('sets', value)}
        />
        
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">info</label>
          <textarea
            id={`info_${index}`}
            className={cn(
              "w-full bg-program-panel text-white rounded px-4 py-2 border border-program-border min-h-24",
              "focus:outline-none focus:ring-1 focus:ring-program-accent"
            )}
            placeholder="Enter exercise information"
            value={entryData.info}
            onChange={(e) => handleChange('info', e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm text-gray-300">exercises (0)</label>
          <div className="border border-program-border rounded mt-1 p-6 flex flex-col items-center justify-center">
            <div className="text-program-accent text-center">
              <span className="block">No entry yet. Click on the button below to add one.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseEntry;
