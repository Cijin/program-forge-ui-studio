
import React from 'react';
import SearchableSelect from './SearchableSelect';

interface RelationFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const RelationField = ({ 
  id, 
  label, 
  placeholder = "Add relation", 
  required = false,
  type,
  value,
  onChange,
  className 
}: RelationFieldProps) => {
  const getApiEndpoint = () => {
    if (label.includes('warm_up') || label.includes('cool_down') || 
        label.includes('cardio') || label.includes('abs')) {
      return 'addons';
    }
    return 'exercises';
  };

  return (
    <SearchableSelect
      id={id}
      label={label}
      placeholder={placeholder}
      required={required}
      apiEndpoint={getApiEndpoint()}
      type={type}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default RelationField;
