import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-9 h-9 border-4 border-dashed rounded-full animate-spin border-white"></div>
    </div>
  );
};

export default Loader;
