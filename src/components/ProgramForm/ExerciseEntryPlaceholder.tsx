
import React from 'react';

interface ExerciseEntryPlaceholderProps {
  label: string;
}

const ExerciseEntryPlaceholder: React.FC<ExerciseEntryPlaceholderProps> = ({ label }) => {
  return (
    <div className="h-24 flex flex-col items-center justify-center gap-2 text-program-accent">
      <p className="text-sm">No entry yet. Click on the button below to add one.</p>
    </div>
  );
};

export default ExerciseEntryPlaceholder;
