'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Code-split the chat widget out of the initial bundle; it never renders on the server.
const ChatWidget = dynamic(() => import('./chat-widget.component'), {
  ssr: false,
  loading: () => null,
});

/**
 * Defers mounting of the SignalR-backed chat widget until the browser is idle,
 * so its localStorage access, network fetches and the @microsoft/signalr chunk
 * do not compete for the main thread during initial load / hydration (improves INP).
 */
export default function ChatWidgetLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (typeof w.requestIdleCallback === 'function') {
      const handle = w.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => w.cancelIdleCallback?.(handle);
    }

    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return ready ? <ChatWidget /> : null;
}
