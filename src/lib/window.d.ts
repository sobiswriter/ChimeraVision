import type { ChatMessage } from './types';

// This declares a global interface for the `chimeraApi` object
// that will be exposed on the `window` object by the preload script
// in the main application.
declare global {
  interface Window {
    chimeraApi: {
      send: (channel: string, ...args: any[]) => void;
      on: (channel: string, listener: (message: ChatMessage) => void) => void;
      removeListener: (channel: string, listener: (...args: any[]) => void) => void;
    };
  }
}

// This empty export is needed to treat the file as a module.
export {};
