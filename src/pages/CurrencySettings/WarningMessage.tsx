import React from 'react';

interface WarningMessageProps {
  message: string;
}

const WarningMessage: React.FC<WarningMessageProps> = ({ message }) => {
  return <div>⚠️ {message}</div>;
};

export default WarningMessage;
