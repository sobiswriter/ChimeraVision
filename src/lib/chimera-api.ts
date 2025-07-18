/**
 * @file This file defines the communication bridge between the React UI (Renderer)
 * and the main application backend. It provides a typed API for sending messages
 * to the backend and listening for events from it.
 */
import type { ChatMessage } from './types';

export const chimeraApi = {
  /**
   * Sends a user-created message to the main application backend.
   * @param text The content of the user's message.
   */
  sendUserMessage: (text: string) => {
    // 'chimera:user-message' is the channel name the backend will listen on.
    window.chimeraApi?.send('chimera:user-message', text);
  },

  /**
   * Subscribes to new AI messages sent from the main application backend.
   * @param callback The function to execute when a new AI message is received.
   *                 It receives the message object as an argument.
   * @returns A function to unsubscribe the listener.
   */
  onNewMessage: (callback: (message: ChatMessage) => void) => {
    const handler = (message: ChatMessage) => {
      callback(message);
    };
    
    // Subscribe to the 'chimera:new-ai-message' channel.
    window.chimeraApi?.on('chimera:new-ai-message', handler);

    // Return a cleanup function to remove the listener.
    return () => {
      window.chimeraApi?.removeListener('chimera:new-ai-message', handler);
    };
  },
};
