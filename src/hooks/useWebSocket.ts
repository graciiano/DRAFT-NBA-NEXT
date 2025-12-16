import { useEffect, useRef } from 'react';

import { waitlistUpdated } from '@/store/waitlist/duck';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

/**
 * Hook para gerenciar conexão WebSocket
 */
export const useWebSocket = (draftId?: number) => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!draftId) return;

    // Connect to WebSocket
    const socket = io(process.env.WS_URL || 'http://localhost:8080', {
      path: '/ws',
      transports: ['websocket'],
    });

    socketRef.current = socket;

    // Subscribe to draft topic
    socket.on('connect', () => {
      console.log('WebSocket connected');
      socket.emit('subscribe', `/topic/drafts/${draftId}`);
    });

    // Listen for events
    socket.on(`/topic/drafts/${draftId}`, (message: any) => {
      console.log('WebSocket message:', message);

      if (message.type === 'WAITLIST_UPDATED') {
        dispatch(waitlistUpdated(message.payload));
      }

      if (message.type === 'PLAYER_APPROVED') {
        // You can show a notification here
        console.log('Player approved:', message.payload);
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
    });

    // Cleanup
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [draftId, dispatch]);

  return socketRef.current;
};
