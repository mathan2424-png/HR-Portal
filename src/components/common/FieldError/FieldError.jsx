import React from 'react';
import { AlertCircle } from 'lucide-react';

export const FieldError = ({ error }) => {
  if (!error) return null;
  return (
    <span className="field-error-text" role="alert">
      <AlertCircle size={13} strokeWidth={2.2} />
      <span>{error}</span>
    </span>
  );
};
