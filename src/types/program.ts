
import { UUID } from 'crypto';

export interface NewProgram {
  name: string;
  fitness_level: string;
  minutes_per_day: number;
  days_per_week: number;
  health_condition: string;
  equipment_range_required: number;
  auto_assign_allowed: boolean;
  program_days: NewProgramDay[];
}

export interface NewProgramDay {
  id?: string;
  name: string;
  unique_key: string;
  type: string;
  abs: string;
  warm_up_upper_body: string;
  warm_up_lower_body: string;
  cool_down_upper_body: string;
  cool_down_lower_body: string;
  cardio: string;
  exercise_groups: NewExerciseGroup[];
}

export interface NewExerciseGroup {
  id?: string;
  info: string;
  sets: number;
  is_optional: boolean;
  exercise_data: NewExerciseData[];
}

export interface NewExerciseData {
  exercise: string;
  sets_structure: string;
  reps: number;
  reps_type: string;
  reps_time: number;
  is_drop_set: boolean;
  is_pyramid_set: boolean;
  amrap: boolean;
}
