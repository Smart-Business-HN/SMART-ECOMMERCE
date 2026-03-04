'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import type { ChatMessage } from '@/interfaces/chat/chat.interface';

const SIGNALR_URL =
  process.env.NEXT_PUBLIC_SIGNALR_CHAT_URL ||
  'https://api.smartbusiness.site/hub/chat';

export function useChatSignalR(
  sessionIdentifier: string | null,
  accessToken?: string
) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const accessTokenRef = useRef(accessToken);
  accessTokenRef.current = accessToken;
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<string>('Disconnected');

  const connect = useCallback(async () => {
    if (!sessionIdentifier || connectionRef.current) return;

    const builder = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALR_URL, {
        ...(accessTokenRef.current ? { accessTokenFactory: () => accessTokenRef.current! } : {}),
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    builder.onreconnecting(() => {
      setConnectionState('Reconnecting');
      setIsConnected(false);
    });

    builder.onreconnected(() => {
      setConnectionState('Connected');
      setIsConnected(true);
      builder.invoke('JoinSession', sessionIdentifier);
    });

    builder.onclose(() => {
      setConnectionState('Disconnected');
      setIsConnected(false);
      connectionRef.current = null;
    });

    connectionRef.current = builder;

    try {
      await builder.start();
      await builder.invoke('JoinSession', sessionIdentifier);
      setIsConnected(true);
      setConnectionState('Connected');
    } catch (err) {
      console.error('SignalR connection error:', err);
      setConnectionState('Error');
    }
  }, [sessionIdentifier]);

  const disconnect = useCallback(async () => {
    const conn = connectionRef.current;
    connectionRef.current = null;
    setIsConnected(false);
    if (conn) {
      try { await conn.stop(); } catch { /* connection already stopped */ }
    }
  }, []);

  const onReceiveMessage = useCallback(
    (callback: (message: ChatMessage) => void) => {
      connectionRef.current?.on('ReceiveMessage', callback);
      return () => connectionRef.current?.off('ReceiveMessage', callback);
    },
    []
  );

  const onAdminJoined = useCallback(
    (callback: (data: { adminName: string }) => void) => {
      connectionRef.current?.on('AdminJoined', callback);
      return () => connectionRef.current?.off('AdminJoined', callback);
    },
    []
  );

  const onUserTyping = useCallback(
    (callback: (senderType: string, isTyping: boolean) => void) => {
      connectionRef.current?.on('UserTyping', callback);
      return () => connectionRef.current?.off('UserTyping', callback);
    },
    []
  );

  const onSessionClosed = useCallback(
    (callback: (data: { id: number; sessionIdentifier: string }) => void) => {
      connectionRef.current?.on('SessionClosed', callback);
      return () => connectionRef.current?.off('SessionClosed', callback);
    },
    []
  );

  const sendTypingIndicator = useCallback(
    (isTyping: boolean) => {
      if (connectionRef.current && sessionIdentifier) {
        connectionRef.current.invoke(
          'TypingIndicator',
          sessionIdentifier,
          'visitor',
          isTyping
        );
      }
    },
    [sessionIdentifier]
  );

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connect,
    disconnect,
    isConnected,
    connectionState,
    onReceiveMessage,
    onAdminJoined,
    onUserTyping,
    onSessionClosed,
    sendTypingIndicator,
  };
}
