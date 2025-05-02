
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
import { v4 as uuidv4 } from 'uuid';
import { NewExerciseGroup, NewExerciseData } from '@/types/program';

interface ProgramDayProps {
  dayIndex: number;
  onDelete: () => void;
  data: {
    name: string;
    type: string;
    warm_up_upper_body: string;
    warm_up_lower_body: string;
    cool_down_upper_body: string;
    cool_down_lower_body: string;
    cardio: string;
    abs: string;
    unique_key: string;
    exercise_groups: NewExerciseGroup[];
  };
  onDataChange: (field: string, value: any) => void;
}

const ProgramDay: React.FC<ProgramDayProps> = ({ 
  dayIndex, 
  onDelete, 
  data, 
  onDataChange 
}) => {
  const workoutTypes = ['Strength', 'Cardio', 'Flexibility', 'HIIT', 'Recovery'];
  
  const addExerciseGroup = (isOptional: boolean) => {
    const newGroup: NewExerciseGroup = {
      info: '',
      sets: 0,
      is_optional: isOptional,
      exercise_data: []
    };
    
    const updatedGroups = [...data.exercise_groups];
    updatedGroups.push(newGroup);
    onDataChange('exercise_groups', updatedGroups);
  };

  const updateExerciseGroup = (index: number, field: string, value: any) => {
    const updatedGroups = [...data.exercise_groups];
    updatedGroups[index] = { ...updatedGroups[index], [field]: value };
    onDataChange('exercise_groups', updatedGroups);
  };

  const removeExerciseGroup = (index: number) => {
    const updatedGroups = [...data.exercise_groups];
    updatedGroups.splice(index, 1);
    onDataChange('exercise_groups', updatedGroups);
  };

  const addExerciseData = (groupIndex: number) => {
    const newExercise: NewExerciseData = {
      exercise: '',
      sets_structure: '',
      reps: 0,
      reps_type: 'Count',
      reps_time: 0,
      is_drop_set: false,
      is_pyramid_set: false,
      amrap: false
    };

    const updatedGroups = [...data.exercise_groups];
    const exerciseData = [...(updatedGroups[groupIndex].exercise_data || [])];
    exerciseData.push(newExercise);
    updatedGroups[groupIndex] = { ...updatedGroups[groupIndex], exercise_data: exerciseData };
    
    onDataChange('exercise_groups', updatedGroups);
  };

  const updateExerciseData = (groupIndex: number, exerciseIndex: number, field: string, value: any) => {
    const updatedGroups = [...data.exercise_groups];
    const exerciseData = [...updatedGroups[groupIndex].exercise_data];
    exerciseData[exerciseIndex] = { ...exerciseData[exerciseIndex], [field]: value };
    updatedGroups[groupIndex].exercise_data = exerciseData;
    
    onDataChange('exercise_groups', updatedGroups);
  };

  const removeExerciseData = (groupIndex: number, exerciseIndex: number) => {
    const updatedGroups = [...data.exercise_groups];
    const exerciseData = [...updatedGroups[groupIndex].exercise_data];
    exerciseData.splice(exerciseIndex, 1);
    updatedGroups[groupIndex].exercise_data = exerciseData;
    
    onDataChange('exercise_groups', updatedGroups);
  };
  
  // Group exercises by is_optional
  const mandatoryGroups = data.exercise_groups.filter(group => !group.is_optional);
  const optionalGroups = data.exercise_groups.filter(group => group.is_optional);
  
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
          label="name"
          required
          placeholder="Enter workout name"
          value={data.name}
          onChange={(value) => onDataChange('name', value)}
        />
        
        <SelectField 
          id={`workout_type_${dayIndex}`}
          label="type"
          required
          options={workoutTypes}
          value={data.type}
          onChange={(value) => onDataChange('type', value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <RelationField 
          id={`warm_up_upper_body_${dayIndex}`}
          label="warm_up_upper_body"
          type="warmup"
          value={data.warm_up_upper_body}
          onChange={(value) => onDataChange('warm_up_upper_body', value)}
        />
        
        <RelationField 
          id={`warm_up_lower_body_${dayIndex}`}
          label="warm_up_lower_body"
          type="warmup"
          value={data.warm_up_lower_body}
          onChange={(value) => onDataChange('warm_up_lower_body', value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <RelationField 
          id={`cool_down_upper_body_${dayIndex}`}
          label="cool_down_upper_body"
          type="cooldown"
          value={data.cool_down_upper_body}
          onChange={(value) => onDataChange('cool_down_upper_body', value)}
        />
        
        <RelationField 
          id={`cool_down_lower_body_${dayIndex}`}
          label="cool_down_lower_body"
          type="cooldown"
          value={data.cool_down_lower_body}
          onChange={(value) => onDataChange('cool_down_lower_body', value)}
        />
      </div>
      
      <div className="mt-4">
        <RelationField 
          id={`cardio_${dayIndex}`}
          label="cardio"
          type="cardio"
          value={data.cardio}
          onChange={(value) => onDataChange('cardio', value)}
        />
      </div>
      
      <div className="mt-4">
        <Accordion type="single" collapsible className="border-none">
          <AccordionItem value="exercise_groups_mandatory" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-sm text-gray-300">mandatory_exercises ({mandatoryGroups.length})</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border border-program-border rounded mt-1">
                {mandatoryGroups.length > 0 ? (
                  <div className="p-2">
                    {mandatoryGroups.map((group, groupIndex) => (
                      <div key={groupIndex} className="mb-4 border border-program-border rounded-lg p-3 bg-program-dark">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-white text-sm">Group {groupIndex + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeExerciseGroup(data.exercise_groups.indexOf(group))}
                            className="text-program-accent hover:text-red-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TextField
                            id={`group_info_${groupIndex}`}
                            label="info"
                            required
                            placeholder="Group information"
                            value={group.info}
                            onChange={(value) => updateExerciseGroup(data.exercise_groups.indexOf(group), 'info', value)}
                          />
                          
                          <TextField
                            id={`group_sets_${groupIndex}`}
                            label="sets"
                            required
                            type="number"
                            placeholder="Number of sets"
                            value={group.sets.toString()}
                            onChange={(value) => updateExerciseGroup(data.exercise_groups.indexOf(group), 'sets', parseInt(value) || 0)}
                          />
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="text-sm text-gray-300 mb-2">Exercises</h5>
                          {group.exercise_data && group.exercise_data.length > 0 ? (
                            <div className="space-y-3">
                              {group.exercise_data.map((exerciseData, exerciseIndex) => (
                                <ExerciseEntry
                                  key={exerciseIndex}
                                  index={exerciseIndex + 1}
                                  entryData={exerciseData}
                                  onDataChange={(field, value) => updateExerciseData(
                                    data.exercise_groups.indexOf(group),
                                    exerciseIndex,
                                    field,
                                    value
                                  )}
                                  onDelete={() => removeExerciseData(data.exercise_groups.indexOf(group), exerciseIndex)}
                                />
                              ))}
                            </div>
                          ) : (
                            <ExerciseEntryPlaceholder label="exercise" />
                          )}
                          <button
                            type="button"
                            className="w-full py-2 flex items-center justify-center gap-2 text-program-accent hover:bg-program-panel mt-2"
                            onClick={() => addExerciseData(data.exercise_groups.indexOf(group))}
                          >
                            <Plus size={18} />
                            <span>Add Exercise</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-400">No mandatory exercise groups added yet</div>
                )}
                <button
                  type="button"
                  className="w-full py-3 flex items-center justify-center gap-2 text-program-accent hover:bg-program-panel"
                  onClick={() => addExerciseGroup(false)}
                >
                  <Plus size={18} />
                  <span>Add Group</span>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="mt-4">
        <Accordion type="single" collapsible className="border-none">
          <AccordionItem value="exercise_groups_optional" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-sm text-gray-300">optional_exercises ({optionalGroups.length})</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border border-program-border rounded mt-1">
                {optionalGroups.length > 0 ? (
                  <div className="p-2">
                    {optionalGroups.map((group, groupIndex) => (
                      <div key={groupIndex} className="mb-4 border border-program-border rounded-lg p-3 bg-program-dark">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-white text-sm">Optional Group {groupIndex + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeExerciseGroup(data.exercise_groups.indexOf(group))}
                            className="text-program-accent hover:text-red-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TextField
                            id={`optional_group_info_${groupIndex}`}
                            label="info"
                            required
                            placeholder="Group information"
                            value={group.info}
                            onChange={(value) => updateExerciseGroup(data.exercise_groups.indexOf(group), 'info', value)}
                          />
                          
                          <TextField
                            id={`optional_group_sets_${groupIndex}`}
                            label="sets"
                            required
                            type="number"
                            placeholder="Number of sets"
                            value={group.sets.toString()}
                            onChange={(value) => updateExerciseGroup(data.exercise_groups.indexOf(group), 'sets', parseInt(value) || 0)}
                          />
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="text-sm text-gray-300 mb-2">Exercises</h5>
                          {group.exercise_data && group.exercise_data.length > 0 ? (
                            <div className="space-y-3">
                              {group.exercise_data.map((exerciseData, exerciseIndex) => (
                                <ExerciseEntry
                                  key={exerciseIndex}
                                  index={exerciseIndex + 1}
                                  entryData={exerciseData}
                                  onDataChange={(field, value) => updateExerciseData(
                                    data.exercise_groups.indexOf(group),
                                    exerciseIndex,
                                    field,
                                    value
                                  )}
                                  onDelete={() => removeExerciseData(data.exercise_groups.indexOf(group), exerciseIndex)}
                                />
                              ))}
                            </div>
                          ) : (
                            <ExerciseEntryPlaceholder label="exercise" />
                          )}
                          <button
                            type="button"
                            className="w-full py-2 flex items-center justify-center gap-2 text-program-accent hover:bg-program-panel mt-2"
                            onClick={() => addExerciseData(data.exercise_groups.indexOf(group))}
                          >
                            <Plus size={18} />
                            <span>Add Exercise</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-400">No optional exercise groups added yet</div>
                )}
                <button
                  type="button"
                  className="w-full py-3 flex items-center justify-center gap-2 text-program-accent hover:bg-program-panel"
                  onClick={() => addExerciseGroup(true)}
                >
                  <Plus size={18} />
                  <span>Add Group</span>
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
          value={data.abs}
          onChange={(value) => onDataChange('abs', value)}
        />
      </div>
    </div>
  );
};

export default ProgramDay;
