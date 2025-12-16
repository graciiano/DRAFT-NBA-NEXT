'use client';

import { useEffect } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Skeleton from '@/components/Skeleton';
import { logout } from '@/store/auth/duck';
import { selectIsAuthenticated, selectUser } from '@/store/auth/selector';
import { fetchDraftsRequest } from '@/store/drafts/duck';
import { selectDrafts, selectDraftsLoading, selectOpenDrafts } from '@/store/drafts/selector';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  max-width: 1280px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.glass.background};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const AuthButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Content = styled.main`
  max-width: 1280px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const StatusBadge = styled.span<{ $status: 'OPEN' | 'CLOSED' }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: ${({ theme, $status }) => ($status === 'OPEN' ? theme.colors.success : theme.colors.error)};
  color: ${({ theme }) => theme.colors.background.primary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const drafts = useSelector(selectDrafts);
  const openDrafts = useSelector(selectOpenDrafts);
  const loading = useSelector(selectDraftsLoading);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDraftsRequest());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleDraftClick = (draftId: number) => {
    router.push(`/drafts/${draftId}`);
  };

  return (
    <Container>
      <Header>
        <Logo>NBA 2K Draft System</Logo>
        {isAuthenticated && user ? (
          <UserInfo>
            <UserName>{user.nickname}</UserName>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </UserInfo>
        ) : (
          <AuthButtons>
            <Button variant="ghost" size="sm" onClick={handleLogin}>
              Entrar
            </Button>
            <Button variant="primary" size="sm" onClick={handleRegister}>
              Cadastrar
            </Button>
          </AuthButtons>
        )}
      </Header>

      <Content>
        <Title>Drafts Abertos</Title>

        {loading ? (
          <Grid>
            {[1, 2, 3].map(i => (
              <Skeleton key={i} type="card" />
            ))}
          </Grid>
        ) : openDrafts.length === 0 ? (
          <EmptyState>
            <h3>Nenhum draft aberto no momento</h3>
            <p>Aguarde novos drafts serem criados</p>
          </EmptyState>
        ) : (
          <Grid>
            {openDrafts.map(draft => (
              <Card
                key={draft.id}
                title={draft.title}
                subtitle={new Date(draft.createdAt).toLocaleDateString('pt-BR')}
                onClick={() => handleDraftClick(draft.id)}
                footer={<StatusBadge $status={draft.status}>{draft.status}</StatusBadge>}
              >
                <p>{draft.description}</p>
              </Card>
            ))}
          </Grid>
        )}

        {drafts.length > openDrafts.length && (
          <>
            <Title>Todos os Drafts</Title>
            <Grid>
              {drafts.map(draft => (
                <Card
                  key={draft.id}
                  title={draft.title}
                  subtitle={new Date(draft.createdAt).toLocaleDateString('pt-BR')}
                  onClick={() => handleDraftClick(draft.id)}
                  footer={<StatusBadge $status={draft.status}>{draft.status}</StatusBadge>}
                >
                  <p>{draft.description}</p>
                </Card>
              ))}
            </Grid>
          </>
        )}
      </Content>
    </Container>
  );
}
