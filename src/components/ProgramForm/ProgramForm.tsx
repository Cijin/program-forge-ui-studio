
import React, { useState } from 'react';
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import TextField from './TextField';
import SelectField from './SelectField';
import ToggleField from './ToggleField';
import ProgramDay from './ProgramDay';

const ProgramForm: React.FC = () => {
  const [formData, setFormData] = useState({
    programId: '',
    name: '',
    fitnessLevel: '',
    minutesPerDay: '',
    daysPerWeek: '',
    healthCondition: '',
    equipmentRangeRequired: '',
    equipmentRequired: false,
    autoAssignAllowed: false
  });

  const [programDays, setProgramDays] = useState([
    { id: 1, workoutName: '', workoutType: '' }
  ]);

  const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const minutesOptions = ['15', '30', '45', '60', '90'];
  const daysOptions = ['2', '3', '4', '5', '6', '7'];
  const healthConditions = ['None', 'Back Pain', 'Knee Pain', 'Shoulder Pain', 'Pregnancy'];
  const equipmentRanges = ['None', 'Minimal', 'Basic', 'Full Gym'];

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProgramDayChange = (index: number, field: string, value: string) => {
    const updatedDays = [...programDays];
    updatedDays[index] = { ...updatedDays[index], [field]: value };
    setProgramDays(updatedDays);
  };

  const addProgramDay = () => {
    setProgramDays([...programDays, { 
      id: programDays.length + 1, 
      workoutName: '', 
      workoutType: '' 
    }]);
  };

  const removeProgramDay = (index: number) => {
    const updatedDays = [...programDays];
    updatedDays.splice(index, 1);
    setProgramDays(updatedDays);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', { ...formData, programDays });
    toast.success("Program created successfully!");
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              id="program_id"
              label="program_id"
              required
              placeholder="Enter program unique ID"
              value={formData.programId}
              onChange={(value) => handleInputChange('programId', value)}
            />

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
              program_week
              <span className="text-xs text-program-accent">*</span>
            </label>
            
            <div className="mt-2 border border-program-border rounded-lg">
              {programDays.map((day, index) => (
                <div key={day.id} className="mb-4">
                  <ProgramDay
                    dayIndex={day.id}
                    onDelete={() => removeProgramDay(index)}
                    data={{
                      workoutName: day.workoutName,
                      workoutType: day.workoutType
                    }}
                    onDataChange={(field, value) => 
                      handleProgramDayChange(index, field as string, value)
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
              value={formData.fitnessLevel}
              onChange={(value) => handleInputChange('fitnessLevel', value)}
            />

            <SelectField
              id="minutes_per_day"
              label="minutes_per_day"
              required
              options={minutesOptions}
              value={formData.minutesPerDay}
              onChange={(value) => handleInputChange('minutesPerDay', value)}
            />

            <SelectField
              id="days_per_week"
              label="days_per_week"
              required
              options={daysOptions}
              value={formData.daysPerWeek}
              onChange={(value) => handleInputChange('daysPerWeek', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SelectField
              id="health_condition"
              label="health_condition"
              required
              options={healthConditions}
              value={formData.healthCondition}
              onChange={(value) => handleInputChange('healthCondition', value)}
            />

            <SelectField
              id="equipment_range_required"
              label="equipment_range_required"
              required
              options={equipmentRanges}
              value={formData.equipmentRangeRequired}
              onChange={(value) => handleInputChange('equipmentRangeRequired', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ToggleField
              id="equipment_required"
              label="equipment_required"
              required
              value={formData.equipmentRequired}
              onChange={(value) => handleInputChange('equipmentRequired', value)}
            />

            <ToggleField
              id="auto_assign_allowed"
              label="auto_assign_allowed"
              required
              value={formData.autoAssignAllowed}
              onChange={(value) => handleInputChange('autoAssignAllowed', value)}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              type="submit"
              className="px-6 py-2 bg-program-accent text-white rounded hover:bg-opacity-80 transition-colors"
            >
              Create Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramForm;
