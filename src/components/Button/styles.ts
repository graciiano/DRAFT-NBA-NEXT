import styled, { css } from 'styled-components';

interface ButtonStyledProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $loading?: boolean;
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;

  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
          min-height: 36px;
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.fontSizes.lg};
          min-height: 52px;
        `;
      default:
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.md};
          min-height: 44px;
        `;
    }
  }}

  /* Color variants */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background: ${theme.gradients.secondary};
          color: ${theme.colors.text.primary};
          box-shadow: ${theme.shadows.glow.secondary};

          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.glow.secondary}, ${theme.shadows.lg};
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.colors.primary.main};
          border-color: ${theme.colors.primary.main};

          &:hover:not(:disabled) {
            background: ${theme.colors.primary.main};
            color: ${theme.colors.text.primary};
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.text.secondary};

          &:hover:not(:disabled) {
            background: ${theme.colors.glass.background};
            color: ${theme.colors.text.primary};
          }
        `;
      default: // primary
        return css`
          background: ${theme.gradients.primary};
          color: ${theme.colors.text.primary};
          box-shadow: ${theme.shadows.glow.primary};

          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.glow.primary}, ${theme.shadows.lg};
          }
        `;
    }
  }}

  /* Full width */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Loading state */
  ${({ $loading }) =>
    $loading &&
    css`
      cursor: wait;
      opacity: 0.8;
    `}

  /* Ripple effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }
`;

export const LoadingSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
