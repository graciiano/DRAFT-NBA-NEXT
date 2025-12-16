import React from 'react';
import { LoadingContainer, Spinner, LoadingText } from './styles';

interface LoadingProps {
  text?: string;
}

/**
 * Loading spinner component
 */
const Loading: React.FC<LoadingProps> = ({ text = 'Carregando...' }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
