'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import Skeleton from '@/components/Skeleton';
import { useWebSocket } from '@/hooks/useWebSocket';
import { selectIsAdmin, selectIsAuthenticated, selectIsOrganizer, selectUser } from '@/store/auth/selector';
import { fetchDraftDetailRequest, signupDraftRequest } from '@/store/drafts/duck';
import { selectCurrentDraft, selectDraftsLoading, selectSignupLoading } from '@/store/drafts/selector';
import { fetchWaitlistRequest } from '@/store/waitlist/duck';
import { Position } from '@/types/api';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import WaitlistManager from './WaitlistManager';

const Container = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  max-width: 1280px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BackButton = styled(Button)`
  min-width: auto;
`;

const Content = styled.main`
  max-width: 1280px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.glass.background};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const InfoLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InfoValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.glass.background};
  border: 2px solid ${({ theme }) => theme.colors.glass.border};
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

  input {
    cursor: pointer;
  }
`;

export default function DraftDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const draftId = Number(params.id);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const draft = useSelector(selectCurrentDraft);
  const loading = useSelector(selectDraftsLoading);
  const signupLoading = useSelector(selectSignupLoading);
  const isAdmin = useSelector(selectIsAdmin);
  const isOrganizer = useSelector(selectIsOrganizer);

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);

  // Verifica se o usuário pode gerenciar a waitlist (admin ou organizador)
  const canManageWaitlist = isAdmin || isOrganizer;

  // Enable WebSocket for real-time updates
  useWebSocket(draftId);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      dispatch(fetchDraftDetailRequest(draftId));

      if (canManageWaitlist) {
        dispatch(fetchWaitlistRequest(draftId));
      }
    }
  }, [isAuthenticated, draftId, dispatch, router, canManageWaitlist]);

  const handlePositionToggle = (position: Position) => {
    setSelectedPositions((prev: Position[]) =>
      prev.includes(position) ? prev.filter((p: Position) => p !== position) : [...prev, position]
    );
  };

  const handleSignup = () => {
    if (selectedPositions.length === 0) {
      alert('Selecione pelo menos uma posição');
      return;
    }

    dispatch(signupDraftRequest(draftId, selectedPositions));
    setShowSignupModal(false);
    setSelectedPositions([]);
  };

  const positions: Position[] = ['PG', 'SG', 'SF', 'PF', 'C'];

  if (!isAuthenticated || !user) {
    return <Loading text="Verificando autenticação..." />;
  }

  return (
    <Container>
      <Header>
        <BackButton variant="ghost" onClick={() => router.push('/drafts')}>
          ← Voltar
        </BackButton>
      </Header>

      <Content>
        {loading || !draft ? (
          <>
            <Skeleton type="title" />
            <InfoGrid>
              <Skeleton type="card" />
              <Skeleton type="card" />
              <Skeleton type="card" />
            </InfoGrid>
          </>
        ) : (
          <>
            <Title>{draft.title}</Title>

            <InfoGrid>
              <InfoCard>
                <InfoLabel>Organizador</InfoLabel>
                <InfoValue>{draft.organizer.nickname}</InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoLabel>Máximo de Jogadores</InfoLabel>
                <InfoValue>{draft.rules.maxPlayers}</InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoLabel>Rounds</InfoLabel>
                <InfoValue>{draft.rules.rounds}</InfoValue>
              </InfoCard>
            </InfoGrid>

            <Card>
              <h3>Sobre o Draft</h3>
              <p style={{ marginTop: '16px', lineHeight: 1.8 }}>
                Este é um draft oficial de NBA 2K. Participe inscrevendo-se e aguarde a aprovação do organizador.
                Selecione suas posições preferidas e prepare-se para o draft!
              </p>

              <div style={{ marginTop: '24px' }}>
                <Button onClick={() => setShowSignupModal(true)}>Inscrever-se no Draft</Button>
              </div>
            </Card>

            {canManageWaitlist && (
              <div style={{ marginTop: '32px' }}>
                <WaitlistManager draftId={draftId} />
              </div>
            )}
          </>
        )}
      </Content>

      <Modal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        title="Inscrever-se no Draft"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowSignupModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSignup} loading={signupLoading}>
              Confirmar Inscrição
            </Button>
          </>
        }
      >
        <p style={{ marginBottom: '16px' }}>Selecione as posições em que você deseja jogar:</p>

        <CheckboxGroup>
          {positions.map(position => (
            <CheckboxLabel key={position}>
              <input
                type="checkbox"
                checked={selectedPositions.includes(position)}
                onChange={() => handlePositionToggle(position)}
              />
              <span>{position}</span>
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </Modal>
    </Container>
  );
}
