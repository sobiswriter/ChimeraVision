export interface ChatMessage {
  id: string;
  author: 'user' | 'ai';
  text: string;
}
