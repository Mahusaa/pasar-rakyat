import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-black"></div>
    </div>
  );
};

export default Loading;
