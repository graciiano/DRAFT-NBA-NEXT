'use client';

import React, { useState } from 'react';

import Button from '@/components/Button';
import Input, { Select } from '@/components/Input';
import { registerRequest } from '@/store/auth/duck';
import { selectAuthError, selectAuthLoading } from '@/store/auth/selector';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const RegisterBox = styled.div`
  background: ${({ theme }) => theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  max-width: 600px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.colors.glass.shadow};
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorBox = styled.div`
  background: rgba(255, 51, 102, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const SuccessBox = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.success};
  text-align: center;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.light};
    }
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.glass.background};
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  input:checked + span {
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    nickname: '',
    email: '',
    password: '',
    number: '',
    platform: 'PS5',
    positions: [] as string[],
    registerCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerRequest(formData));
    setSuccess(true);

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePositionChange = (position: string) => {
    setFormData({
      ...formData,
      positions: formData.positions.includes(position)
        ? formData.positions.filter(p => p !== position)
        : [...formData.positions, position],
    });
  };

  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];

  return (
    <Container>
      <RegisterBox>
        <Logo>Cadastro</Logo>
        <Subtitle>Crie sua conta para participar dos drafts</Subtitle>

        {success ? (
          <SuccessBox>Cadastro realizado com sucesso! Redirecionando...</SuccessBox>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Input
                label="Nome"
                name="name"
                placeholder="Diogo"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Sobrenome"
                name="lastname"
                placeholder="Souza"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </Row>

            <Input
              label="Nickname"
              name="nickname"
              placeholder="Graciiano"
              value={formData.nickname}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="email@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Row>
              <Input
                label="Número"
                name="number"
                placeholder="23"
                value={formData.number}
                onChange={handleChange}
                required
              />
              <Select
                label="Plataforma"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                options={[
                  { value: 'PS5', label: 'PlayStation 5' },
                  { value: 'XBOX', label: 'Xbox' },
                  { value: 'PC', label: 'PC' },
                ]}
                required
              />
            </Row>

            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block' }}>
                Posições
              </label>
              <CheckboxGroup>
                {positions.map(pos => (
                  <CheckboxLabel key={pos}>
                    <input
                      type="checkbox"
                      checked={formData.positions.includes(pos)}
                      onChange={() => handlePositionChange(pos)}
                    />
                    <span>{pos}</span>
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </div>

            <Input
              label="Código de Registro"
              name="registerCode"
              placeholder="Código fornecido pelo organizador"
              value={formData.registerCode}
              onChange={handleChange}
              required
            />

            {error && <ErrorBox>{error}</ErrorBox>}

            <Button type="submit" fullWidth loading={loading}>
              Cadastrar
            </Button>
          </Form>
        )}

        <Footer>
          Já tem uma conta? <Link href="/login">Faça login</Link>
        </Footer>
      </RegisterBox>
    </Container>
  );
}
