
import React, { useState } from 'react';
import { Trash2 } from "lucide-react";
import TextField from './TextField';
import SearchableSelect from './SearchableSelect';
import SelectField from './SelectField';
import ToggleField from './ToggleField';

interface ExerciseEntryProps {
  index: number;
  entryData: {
    exercise: string;
    sets_structure: string;
    reps: number;
    reps_type: string;
    reps_time: number;
    is_drop_set: boolean;
    is_pyramid_set: boolean;
    amrap: boolean;
  };
  onDataChange: (field: string, value: any) => void;
  onDelete: () => void;
}

const ExerciseEntry = ({ 
  index, 
  entryData, 
  onDataChange, 
  onDelete 
}: ExerciseEntryProps) => {
  const repTypes = ['Count', 'Time', 'To Failure'];

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
          value={entryData.exercise}
          onChange={(value) => onDataChange('exercise', value)}
        />
        
        <TextField
          id={`sets_structure_${index}`}
          label="sets_structure"
          required
          placeholder="e.g., 3x10"
          value={entryData.sets_structure}
          onChange={(value) => onDataChange('sets_structure', value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <TextField
          id={`reps_${index}`}
          label="reps"
          required
          type="number"
          placeholder="Number of reps"
          value={entryData.reps.toString()}
          onChange={(value) => onDataChange('reps', parseInt(value) || 0)}
        />
        
        <SelectField
          id={`reps_type_${index}`}
          label="reps_type"
          required
          options={repTypes}
          value={entryData.reps_type}
          onChange={(value) => onDataChange('reps_type', value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        <ToggleField
          id={`is_drop_set_${index}`}
          label="is_drop_set"
          value={entryData.is_drop_set}
          onChange={(value) => onDataChange('is_drop_set', value)}
        />
        
        <ToggleField
          id={`is_pyramid_set_${index}`}
          label="is_pyramid_set"
          value={entryData.is_pyramid_set}
          onChange={(value) => onDataChange('is_pyramid_set', value)}
        />
        
        <ToggleField
          id={`amrap_${index}`}
          label="amrap"
          value={entryData.amrap}
          onChange={(value) => onDataChange('amrap', value)}
        />
      </div>
      
      {entryData.reps_type === 'Time' && (
        <div className="mt-3">
          <TextField
            id={`reps_time_${index}`}
            label="reps_time"
            required
            type="number"
            placeholder="Time in seconds"
            value={entryData.reps_time.toString()}
            onChange={(value) => onDataChange('reps_time', parseInt(value) || 0)}
          />
        </div>
      )}
    </div>
  );
};

export default ExerciseEntry;
