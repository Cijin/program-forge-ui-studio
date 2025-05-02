import React, { useState } from 'react';
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import TextField from './TextField';
import SelectField from './SelectField';
import ToggleField from './ToggleField';
import ProgramDay from './ProgramDay';
import { v4 as uuidv4 } from 'uuid';
import { NewProgram, NewProgramDay, NewExerciseGroup } from '@/types/program';

const ProgramForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<NewProgram, 'program_days'>>({
    name: '',
    fitness_level: '',
    minutes_per_day: 0,
    days_per_week: 0,
    health_condition: '',
    equipment_range_required: 0,
    auto_assign_allowed: false
  });

  const [programDays, setProgramDays] = useState<NewProgramDay[]>([
    { 
      unique_key: uuidv4(),
      name: '', 
      type: '',
      warm_up_upper_body: '',
      warm_up_lower_body: '',
      cool_down_upper_body: '',
      cool_down_lower_body: '',
      cardio: '',
      abs: '',
      exercise_groups: [] 
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const minutesOptions = ['15', '30', '45', '60', '90'];
  const daysOptions = ['2', '3', '4', '5', '6', '7'];
  const healthConditions = ['None', 'Back Pain', 'Knee Pain', 'Shoulder Pain', 'Pregnancy'];
  const equipmentRanges = ['0', '1', '2', '3'];
  const equipmentRangeLabels = {
    '0': 'None',
    '1': 'Minimal',
    '2': 'Basic',
    '3': 'Full Gym'
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProgramDayChange = (index: number, field: string, value: any) => {
    const updatedDays = [...programDays];
    updatedDays[index] = { ...updatedDays[index], [field]: value };
    setProgramDays(updatedDays);
  };

  const addProgramDay = () => {
    setProgramDays([...programDays, { 
      unique_key: uuidv4(),
      name: '', 
      type: '',
      warm_up_upper_body: '',
      warm_up_lower_body: '',
      cool_down_upper_body: '',
      cool_down_lower_body: '',
      cardio: '',
      abs: '',
      exercise_groups: []
    }]);
  };

  const removeProgramDay = (index: number) => {
    const updatedDays = [...programDays];
    updatedDays.splice(index, 1);
    setProgramDays(updatedDays);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create the final program object
      const program: NewProgram = {
        ...formData,
        program_days: programDays
      };
      
      console.log('Sending program data:', program);
      
      // Make the POST API request
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(program),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response:', data);
      
      toast.success("Program created successfully!");
    } catch (error) {
      console.error('Error creating program:', error);
      toast.error("Failed to create program. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // This would typically navigate back
    toast.info("Back navigation clicked");
  };

  return (
    <div className="min-h-screen bg-program-dark text-white">
      <header className="border-b border-program-border py-4 px-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-gray-400 hover:text-white">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-medium">Create an entry</h1>
            <p className="text-sm text-gray-400">API ID: program</p>
          </div>
        </div>
      </header>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1">
            <TextField
              id="name"
              label="name"
              required
              placeholder="Enter program title"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
            />
          </div>

          <div className="mt-6">
            <label className="text-sm text-gray-300 flex items-center gap-1.5">
              program_days
              <span className="text-xs text-program-accent">*</span>
            </label>
            
            <div className="mt-2 border border-program-border rounded-lg">
              {programDays.map((day, index) => (
                <div key={day.unique_key} className="mb-4">
                  <ProgramDay
                    dayIndex={index + 1}
                    onDelete={() => removeProgramDay(index)}
                    data={day}
                    onDataChange={(field, value) => 
                      handleProgramDayChange(index, field, value)
                    }
                  />
                </div>
              ))}
              
              <button
                type="button"
                className="w-full py-3 flex items-center justify-center gap-2 text-program-accent hover:bg-program-panel"
                onClick={addProgramDay}
              >
                <Plus size={18} />
                <span>Add an entry</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <SelectField
              id="fitness_level"
              label="fitness_level"
              required
              options={fitnessLevels}
              value={formData.fitness_level}
              onChange={(value) => handleInputChange('fitness_level', value)}
            />

            <SelectField
              id="minutes_per_day"
              label="minutes_per_day"
              required
              options={minutesOptions}
              value={formData.minutes_per_day.toString()}
              onChange={(value) => handleInputChange('minutes_per_day', parseInt(value) || 0)}
            />

            <SelectField
              id="days_per_week"
              label="days_per_week"
              required
              options={daysOptions}
              value={formData.days_per_week.toString()}
              onChange={(value) => handleInputChange('days_per_week', parseInt(value) || 0)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SelectField
              id="health_condition"
              label="health_condition"
              required
              options={healthConditions}
              value={formData.health_condition}
              onChange={(value) => handleInputChange('health_condition', value)}
            />

            <SelectField
              id="equipment_range_required"
              label="equipment_range_required"
              required
              options={Object.keys(equipmentRangeLabels)}
              optionLabels={equipmentRangeLabels}
              value={formData.equipment_range_required.toString()}
              onChange={(value) => handleInputChange('equipment_range_required', parseInt(value) || 0)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
            <ToggleField
              id="auto_assign_allowed"
              label="auto_assign_allowed"
              required
              value={formData.auto_assign_allowed}
              onChange={(value) => handleInputChange('auto_assign_allowed', value)}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              type="submit"
              className="px-6 py-2 bg-program-accent text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramForm;
