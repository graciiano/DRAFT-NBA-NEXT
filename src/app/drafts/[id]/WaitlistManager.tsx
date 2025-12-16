'use client';

import React, { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { Select } from '@/components/Input';
import Skeleton from '@/components/Skeleton';
import { assignPositionRequest, fetchWaitlistRequest } from '@/store/waitlist/duck';
import {
  selectApprovedEntries,
  selectPendingEntries,
  selectWaitlistEntries,
  selectWaitlistLoading,
} from '@/store/waitlist/selector';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Section = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PlayerCard = styled.div`
  background: ${({ theme }) => theme.colors.glass.background};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PlayerPositions = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const PositionBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.glass.background};
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatusBadge = styled.span<{ $approved?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: ${({ theme, $approved }) => ($approved ? theme.colors.success : theme.colors.warning)};
  color: ${({ theme }) => theme.colors.background.primary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

interface WaitlistManagerProps {
  draftId: number;
}

const WaitlistManager: React.FC<WaitlistManagerProps> = ({ draftId }) => {
  const dispatch = useDispatch();
  const entries = useSelector(selectWaitlistEntries);
  const loading = useSelector(selectWaitlistLoading);
  const pendingEntries = useSelector(selectPendingEntries);
  const approvedEntries = useSelector(selectApprovedEntries);

  const [assigningPosition, setAssigningPosition] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    dispatch(fetchWaitlistRequest(draftId));
  }, [draftId, dispatch]);

  const handleAssignPosition = (signupId: number) => {
    const position = assigningPosition[signupId];
    if (!position) {
      alert('Selecione uma posição');
      return;
    }

    dispatch(assignPositionRequest(draftId, signupId, position));
    setAssigningPosition(prev => ({ ...prev, [signupId]: '' }));
  };

  const positions = [
    { value: '', label: 'Selecione...' },
    { value: 'PG', label: 'PG' },
    { value: 'SG', label: 'SG' },
    { value: 'SF', label: 'SF' },
    { value: 'PF', label: 'PF' },
    { value: 'C', label: 'C' },
  ];

  if (loading) {
    return (
      <Section>
        <SectionTitle>Gerenciar Waitlist</SectionTitle>
        <Grid>
          {[1, 2, 3].map(i => (
            <Skeleton key={i} type="card" />
          ))}
        </Grid>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <SectionTitle>Aguardando Aprovação ({pendingEntries.length})</SectionTitle>

        {pendingEntries.length === 0 ? (
          <EmptyState>Nenhum jogador aguardando aprovação</EmptyState>
        ) : (
          <Grid>
            {pendingEntries.map(entry => (
              <PlayerCard key={entry.signupId}>
                <PlayerInfo>
                  <PlayerName>{entry.user.nickname}</PlayerName>
                  <PlayerPositions>
                    Posições desejadas:
                    {entry.desiredPositions.map(pos => (
                      <PositionBadge key={pos}>{pos}</PositionBadge>
                    ))}
                  </PlayerPositions>
                </PlayerInfo>

                <Actions>
                  <div style={{ width: '120px' }}>
                    <Select
                      options={positions}
                      value={assigningPosition[entry.signupId] || ''}
                      onChange={e =>
                        setAssigningPosition(prev => ({
                          ...prev,
                          [entry.signupId]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button size="sm" onClick={() => handleAssignPosition(entry.signupId)}>
                    Aprovar
                  </Button>
                </Actions>
              </PlayerCard>
            ))}
          </Grid>
        )}
      </Section>

      <Section>
        <SectionTitle>Jogadores Aprovados ({approvedEntries.length})</SectionTitle>

        {approvedEntries.length === 0 ? (
          <EmptyState>Nenhum jogador aprovado ainda</EmptyState>
        ) : (
          <Grid>
            {approvedEntries.map(entry => (
              <PlayerCard key={entry.signupId}>
                <PlayerInfo>
                  <PlayerName>{entry.user.nickname}</PlayerName>
                  <PlayerPositions>
                    Posição atribuída:
                    <PositionBadge>{entry.assignedPosition}</PositionBadge>
                  </PlayerPositions>
                </PlayerInfo>

                <StatusBadge $approved>APROVADO</StatusBadge>
              </PlayerCard>
            ))}
          </Grid>
        )}
      </Section>
    </>
  );
};

export default WaitlistManager;
