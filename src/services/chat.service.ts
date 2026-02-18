import type {
  ApiResponse,
  ChatMessage,
  ChatSession,
  CreateChatSessionRequest,
  SendChatMessageRequest,
} from '@/interfaces/chat/chat.interface';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.smartbusiness.site/api/v1';

export async function createChatSession(
  data: CreateChatSessionRequest
): Promise<ApiResponse<ChatSession>> {
  const response = await fetch(`${API_BASE}/Chat/CreateSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function sendChatMessage(
  data: SendChatMessageRequest
): Promise<ApiResponse<ChatMessage>> {
  const response = await fetch(`${API_BASE}/Chat/SendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getChatMessages(
  sessionId: number
): Promise<ApiResponse<ChatMessage[]>> {
  const response = await fetch(`${API_BASE}/Chat/GetMessages/${sessionId}`);
  return response.json();
}

export async function getChatSessionByIdentifier(
  identifier: string
): Promise<ApiResponse<ChatSession | null>> {
  const response = await fetch(
    `${API_BASE}/Chat/GetSessionByIdentifier/${identifier}`
  );
  return response.json();
}
