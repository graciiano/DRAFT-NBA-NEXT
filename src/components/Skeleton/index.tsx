import React from 'react';

import { SkeletonButton, SkeletonCard, SkeletonCircle, SkeletonText, SkeletonTitle } from './styles';

interface SkeletonProps {
  type?: 'text' | 'title' | 'card' | 'circle' | 'button';
  width?: string;
  size?: string;
}

/**
 * Skeleton loading component
 */
const Skeleton: React.FC<SkeletonProps> = ({ type = 'text', width, size }) => {
  switch (type) {
    case 'title':
      return <SkeletonTitle width={width} />;
    case 'card':
      return <SkeletonCard />;
    case 'circle':
      return <SkeletonCircle size={size} />;
    case 'button':
      return <SkeletonButton />;
    default:
      return <SkeletonText width={width} />;
  }
};

export default Skeleton;
