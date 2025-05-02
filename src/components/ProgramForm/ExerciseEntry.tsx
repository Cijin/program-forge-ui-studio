
import React from 'react';
import { Trash2 } from "lucide-react";
import TextField from './TextField';
import SearchableSelect from './SearchableSelect';

interface ExerciseEntryProps {
  index: number;
  entryData: {
    sets: string;
    info: string;
  };
  onDataChange: (field: keyof ExerciseEntryProps['entryData'], value: string) => void;
  onDelete: () => void;
}

const ExerciseEntry = ({ 
  index, 
  entryData, 
  onDataChange, 
  onDelete 
}: ExerciseEntryProps) => {
  return (
    <div className="flex flex-col border border-program-border rounded-lg p-3 mb-3 bg-program-dark">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-program-accent flex items-center justify-center">
            <span className="text-xs text-white">{index}</span>
          </div>
          <h4 className="text-white text-sm">entry ({index})</h4>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="text-program-accent hover:text-red-300"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelect
          id={`exercise_${index}`}
          label="exercise"
          required
          apiEndpoint="exercises"
          value={entryData.info}
          onChange={(value) => onDataChange('info', value)}
        />
        
        <TextField
          id={`sets_${index}`}
          label="sets"
          required
          placeholder="Enter sets x reps"
          value={entryData.sets}
          onChange={(value) => onDataChange('sets', value)}
        />
      </div>
    </div>
  );
};

export default ExerciseEntry;
