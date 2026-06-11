// Tipados globales para el SDK del Meta (Facebook) Pixel en el navegador.
// Permite llamar a window.fbq de forma type-safe (init, consent, track con eventID).
export {};

type FbqConsentAction = 'grant' | 'revoke';

interface FbqEventOptions {
  eventID?: string;
}

interface FbqAdvancedMatching {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
  external_id?: string;
  [key: string]: string | undefined;
}

interface Fbq {
  (command: 'init', pixelId: string, advancedMatching?: FbqAdvancedMatching): void;
  (command: 'consent', action: FbqConsentAction): void;
  (command: 'track', eventName: string, params?: Record<string, unknown>, options?: FbqEventOptions): void;
  (command: 'trackCustom', eventName: string, params?: Record<string, unknown>, options?: FbqEventOptions): void;
  (command: 'set', key: string, ...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: Fbq;
}

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}
