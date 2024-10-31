import React, { useEffect } from 'react';
import { CircleCheckBig } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const SuccessAlert = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <Alert className="border-green-600 fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full mx-auto bg-white shadow-lg p-4 rounded-md z-50">
      <CircleCheckBig className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-600">{message}</AlertDescription>
    </Alert>
  );
};
