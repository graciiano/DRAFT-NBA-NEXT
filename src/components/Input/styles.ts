import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const InputStyled = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.glass.background};
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.glass.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.normal};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary.main)};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) => ($hasError ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255, 107, 53, 0.2)')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TextAreaStyled = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.glass.background};
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.glass.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.normal};
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary.main)};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) => ($hasError ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255, 107, 53, 0.2)')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const SelectStyled = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.glass.background};
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.glass.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary.main)};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) => ($hasError ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255, 107, 53, 0.2)')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  option {
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
