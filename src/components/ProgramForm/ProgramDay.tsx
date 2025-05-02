
import React, { useState } from 'react';
import { Trash2, ChevronDown, Plus } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import TextField from './TextField';
import SelectField from './SelectField';
import RelationField from './RelationField';
import ExerciseEntryPlaceholder from './ExerciseEntryPlaceholder';
import ExerciseEntry from './ExerciseEntry';

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
  const [programExercises, setProgramExercises] = useState<Array<{ sets: string; info: string }>>([]);
  const [optionalExercises, setOptionalExercises] = useState<Array<{ sets: string; info: string }>>([]);
  
  const [warmUpUpperBody, setWarmUpUpperBody] = useState("");
  const [warmUpLowerBody, setWarmUpLowerBody] = useState("");
  const [coolDownUpperBody, setCoolDownUpperBody] = useState("");
  const [coolDownLowerBody, setCoolDownLowerBody] = useState("");
  const [cardioAddon, setCardioAddon] = useState("");
  const [absAddon, setAbsAddon] = useState("");
  
  const addProgramExercise = () => {
    setProgramExercises([...programExercises, { sets: '', info: '' }]);
  };

  const addOptionalExercise = () => {
    setOptionalExercises([...optionalExercises, { sets: '', info: '' }]);
  };

  const updateProgramExercise = (index: number, field: string, value: string) => {
    const updatedExercises = [...programExercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setProgramExercises(updatedExercises);
  };

  const updateOptionalExercise = (index: number, field: string, value: string) => {
    const updatedExercises = [...optionalExercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setOptionalExercises(updatedExercises);
  };

  const removeProgramExercise = (index: number) => {
    const updatedExercises = [...programExercises];
    updatedExercises.splice(index, 1);
    setProgramExercises(updatedExercises);
  };

  const removeOptionalExercise = (index: number) => {
    const updatedExercises = [...optionalExercises];
    updatedExercises.splice(index, 1);
    setOptionalExercises(updatedExercises);
  };
  
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
          type="warmup"
          value={warmUpUpperBody}
          onChange={setWarmUpUpperBody}
        />
        
        <RelationField 
          id={`warm_up_lower_body_${dayIndex}`}
          label="warm_up_lower_body"
          type="warmup"
          value={warmUpLowerBody}
          onChange={setWarmUpLowerBody}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <RelationField 
          id={`cool_down_upper_body_${dayIndex}`}
          label="cool_down_upper_body"
          type="cooldown"
          value={coolDownUpperBody}
          onChange={setCoolDownUpperBody}
        />
        
        <RelationField 
          id={`cool_down_lower_body_${dayIndex}`}
          label="cool_down_lower_body"
          type="cooldown"
          value={coolDownLowerBody}
          onChange={setCoolDownLowerBody}
        />
      </div>
      
      <div className="mt-4">
        <RelationField 
          id={`cardio_${dayIndex}`}
          label="cardio"
          type="cardio"
          value={cardioAddon}
          onChange={setCardioAddon}
        />
      </div>
      
      <div className="mt-4">
        <Accordion type="single" collapsible className="border-none">
          <AccordionItem value="program_exercise" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-sm text-gray-300">program_exercise ({programExercises.length})</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border border-program-border rounded mt-1">
                {programExercises.length > 0 ? (
                  <div className="p-2">
                    {programExercises.map((exercise, index) => (
                      <ExerciseEntry 
                        key={index} 
                        index={index + 1}
                        entryData={exercise}
                        onDataChange={(field, value) => updateProgramExercise(index, field, value)}
                        onDelete={() => removeProgramExercise(index)}
                      />
                    ))}
                  </div>
                ) : (
                  <ExerciseEntryPlaceholder label="program_exercise" />
                )}
                <button
                  type="button"
                  className="w-full py-3 flex items-center justify-center gap-2 text-program-accent hover:bg-program-panel"
                  onClick={addProgramExercise}
                >
                  <Plus size={18} />
                  <span>Add an entry</span>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="mt-4">
        <Accordion type="single" collapsible className="border-none">
          <AccordionItem value="optional_exercise" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-sm text-gray-300">optional_exercise ({optionalExercises.length})</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border border-program-border rounded mt-1">
                {optionalExercises.length > 0 ? (
                  <div className="p-2">
                    {optionalExercises.map((exercise, index) => (
                      <ExerciseEntry 
                        key={index} 
                        index={index + 1}
                        entryData={exercise}
                        onDataChange={(field, value) => updateOptionalExercise(index, field, value)}
                        onDelete={() => removeOptionalExercise(index)}
                      />
                    ))}
                  </div>
                ) : (
                  <ExerciseEntryPlaceholder label="optional_exercise" />
                )}
                <button
                  type="button"
                  className="w-full py-3 flex items-center justify-center gap-2 text-program-accent hover:bg-program-panel"
                  onClick={addOptionalExercise}
                >
                  <Plus size={18} />
                  <span>Add an entry</span>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="mt-4">
        <RelationField 
          id={`abs_${dayIndex}`}
          label="abs"
          type="abs"
          value={absAddon}
          onChange={setAbsAddon}
        />
      </div>
    </div>
  );
};

export default ProgramDay;
