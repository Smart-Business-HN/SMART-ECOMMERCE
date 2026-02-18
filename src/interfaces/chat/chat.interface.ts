export interface ChatSession {
  id: number;
  sessionIdentifier: string;
  visitorName: string;
  visitorEmail?: string;
  isAuthenticated: boolean;
  ecommerceUserId?: string;
  assignedAdminUserId?: string;
  assignedAdminName?: string;
  status: number;
  createdAt: string;
  closedAt?: string;
  lastMessagePreview?: string;
  lastMessageAt?: string;
  unreadAdminCount: number;
}

export interface ChatMessage {
  id: number;
  chatSessionId: number;
  content: string;
  senderType: 'visitor' | 'admin';
  senderAdminUserId?: string;
  senderName: string;
  sentAt: string;
  isRead: boolean;
}

export interface CreateChatSessionRequest {
  sessionIdentifier: string;
  visitorName: string;
  visitorEmail?: string;
  isAuthenticated: boolean;
  ecommerceUserId?: string;
}

export interface SendChatMessageRequest {
  chatSessionId: number;
  content: string;
  senderType: 'visitor';
  senderName: string;
  sessionIdentifier: string;
}

export interface ApiResponse<T> {
  succeeded: boolean;
  message: string;
  errors: string[];
  data: T;
}
