import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.tertiary} 0%,
    ${({ theme }) => theme.colors.background.secondary} 50%,
    ${({ theme }) => theme.colors.background.tertiary} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const SkeletonText = styled(SkeletonBase)<{ width?: string }>`
  height: 20px;
  width: ${({ width }) => width || '100%'};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonTitle = styled(SkeletonBase)<{ width?: string }>`
  height: 32px;
  width: ${({ width }) => width || '60%'};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SkeletonCard = styled(SkeletonBase)`
  height: 200px;
  width: 100%;
`;

export const SkeletonCircle = styled(SkeletonBase)<{ size?: string }>`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border-radius: 50%;
`;

export const SkeletonButton = styled(SkeletonBase)`
  height: 44px;
  width: 120px;
`;
