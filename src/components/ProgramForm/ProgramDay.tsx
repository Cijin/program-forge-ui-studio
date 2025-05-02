
import React from 'react';
import { Trash2 } from "lucide-react";
import TextField from './TextField';
import SelectField from './SelectField';
import RelationField from './RelationField';
import ExerciseEntryPlaceholder from './ExerciseEntryPlaceholder';

interface ProgramDayProps {
  dayIndex: number;
  onDelete: () => void;
  data: {
    workoutName: string;
    workoutType: string;
  };
  onDataChange: (field: keyof ProgramDayProps['data'], value: string) => void;
}

const ProgramDay: React.FC<ProgramDayProps> = ({ 
  dayIndex, 
  onDelete, 
  data, 
  onDataChange 
}) => {
  const workoutTypes = ['Strength', 'Cardio', 'Flexibility', 'HIIT', 'Recovery'];
  
  return (
    <div className="border border-program-border rounded-lg overflow-hidden bg-program-panel p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-program-accent flex items-center justify-center">
            <span className="text-xs text-white">{dayIndex}</span>
          </div>
          <h3 className="text-white text-sm">program_day ({dayIndex})</h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onDelete}
            className="text-program-accent hover:text-red-300"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField 
          id={`workout_name_${dayIndex}`}
          label="workout_name"
          required
          placeholder="Enter workout name"
          value={data.workoutName}
          onChange={(value) => onDataChange('workoutName', value)}
        />
        
        <SelectField 
          id={`workout_type_${dayIndex}`}
          label="workout_type"
          required
          options={workoutTypes}
          value={data.workoutType}
          onChange={(value) => onDataChange('workoutType', value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <RelationField 
          id={`warm_up_upper_body_${dayIndex}`}
          label="warm_up_upper_body"
        />
        
        <RelationField 
          id={`warm_up_lower_body_${dayIndex}`}
          label="warm_up_lower_body"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <RelationField 
          id={`cool_down_upper_body_${dayIndex}`}
          label="cool_down_upper_body"
        />
        
        <RelationField 
          id={`cool_down_lower_body_${dayIndex}`}
          label="cool_down_lower_body"
        />
      </div>
      
      <div className="mt-4">
        <RelationField 
          id={`cardio_${dayIndex}`}
          label="cardio"
        />
      </div>
      
      <div className="mt-4">
        <label className="text-sm text-gray-300">program_exercise (0)</label>
        <div className="border border-program-border rounded mt-1">
          <ExerciseEntryPlaceholder label="program_exercise" />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="text-sm text-gray-300">optional_exercise (0)</label>
        <div className="border border-program-border rounded mt-1">
          <ExerciseEntryPlaceholder label="optional_exercise" />
        </div>
      </div>
      
      <div className="mt-4">
        <RelationField 
          id={`abs_${dayIndex}`}
          label="abs"
        />
      </div>
    </div>
  );
};

export default ProgramDay;
