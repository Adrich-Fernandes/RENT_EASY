import React from 'react';

const Skeleton = ({ className, variant = 'rectangle', width, height, borderRadius }) => {
  const baseClass = "animate-shimmer";
  const variantClass = variant === 'circle' ? 'rounded-full' : 'rounded-md';
  
  const style = {
    width: width || '100%',
    height: height || '1rem',
    borderRadius: borderRadius,
  };

  return (
    <div 
      className={`${baseClass} ${variantClass} ${className || ''}`} 
      style={style}
    />
  );
};

export default Skeleton;
