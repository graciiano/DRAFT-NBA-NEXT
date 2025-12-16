'use client';

import { useEffect } from 'react';

import { selectIsAuthenticated } from '@/store/auth/selector';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Hero = styled.div`
  text-align: center;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    // Redirect based on authentication
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.push('/drafts');
      } else {
        router.push('/login');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  return (
    <Container>
      <Hero>
        <Title>NBA 2K Draft System</Title>
        <Subtitle>Sistema de Draft Profissional para NBA 2K</Subtitle>
        <LoadingText>Carregando...</LoadingText>
      </Hero>
    </Container>
  );
}
