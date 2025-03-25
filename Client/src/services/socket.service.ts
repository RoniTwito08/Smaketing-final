import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../components/Chat/types';
import { User } from '../types/user';
import { Message } from '../types/message';

// Add interface for Socket.IO error type
interface SocketError extends Error {
  description?: string;
  type?: string;
}

class SocketService {
  private _socket: Socket | null = null;
  private messageHandlers: ((message: ChatMessage) => void)[] = [];
  private typingHandlers: ((userId: string) => void)[] = [];
  private readHandlers: ((userId: string) => void)[] = [];
  private onlineUsersHandlers: ((users: User[]) => void)[] = [];
  private chatHistoryHandlers: ((messages: ChatMessage[]) => void)[] = [];
  private isSettingUpListeners: boolean = false;

  // Add a static map to store chat messages
  private chatMessages: Map<string, Message[]> = new Map();

  get socket(): Socket | null {
    return this._socket;
  }

  connect(token: string): void {


    if (this._socket?.connected) {
      return;
    }

    const baseURL = import.meta.env.VITE_API_URL;
    
    try {
  

      this._socket = io(baseURL, {
        auth: {
          token: token
        },
        transports: ['polling', 'websocket'],
        path: '/socket.io/',
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        forceNew: true
      });

      // Monitor socket state changes
      this._socket.on('connect_error', (error: SocketError) => {
        console.error('[Socket] Connection error:', {
          message: error.message,
          description: error.description || 'No description',
          type: error.type || 'Unknown'
        });
      });



    

      // Monitor engine state
      this._socket.io.engine.on('error', (err: string | Error) => {
        console.error('[Socket] Engine error:', 
          typeof err === 'string' ? err : err.message
        );
      });

   

    } catch (error) {
      console.error('[Socket] Initialization error:', error);
    }

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this._socket) {
      return;
    }

    if (this.isSettingUpListeners) {
      return;
    }

    this.isSettingUpListeners = true;

    this._socket.removeAllListeners('onlineUsers');
    this._socket.removeAllListeners('new_message');
    this._socket.removeAllListeners('message_sent');
    this._socket.removeAllListeners('chat_history');
    this._socket.removeAllListeners('user_typing');
    this._socket.removeAllListeners('messages_read');

    this._socket.on('onlineUsers', (users: User[]) => {
      this.onlineUsersHandlers.forEach(handler => {
        try {
          handler(users);
        } catch (error) {
        }
      });
    });

    this._socket.on('new_message', (data: { message: ChatMessage, sender: string }) => {
      this.messageHandlers.forEach(handler => handler(data.message));
    });

    this._socket.on('message_sent', (message: ChatMessage) => {
      this.messageHandlers.forEach(handler => handler(message));
    });

    this._socket.on('chat_history', (messages: ChatMessage[]) => {
      this.chatHistoryHandlers.forEach(handler => handler(messages));
    });

    this._socket.on('user_typing', (data: { userId: string }) => {
      this.typingHandlers.forEach(handler => handler(data.userId));
    });

    this._socket.on('messages_read', (data: { by: string }) => {
      this.readHandlers.forEach(handler => handler(data.by));
    });

    this.isSettingUpListeners = false;
  }

  sendMessage(recipientId: string, content: string) {
    if (!this._socket?.connected) {
      return;
    }

    this._socket.emit('private_message', { recipientId, content });
  }

  sendTyping(recipientId: string) {
    if (!this._socket?.connected) return;
    this._socket.emit('typing', { recipientId });
  }

  markAsRead(senderId: string) {
    if (!this._socket?.connected) return;
    this._socket.emit('mark_read', { senderId });
  }

  onMessage(handler: (message: ChatMessage) => void) {
    console.log('[SocketService] Registering message handler');
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  onTyping(handler: (userId: string) => void) {
    this.typingHandlers.push(handler);
    return () => {
      this.typingHandlers = this.typingHandlers.filter(h => h !== handler);
    };
  }

  onMessagesRead(handler: (userId: string) => void) {
    this.readHandlers.push(handler);
    return () => {
      this.readHandlers = this.readHandlers.filter(h => h !== handler);
    };
  }

  onOnlineUsers(handler: (users: User[]) => void) {
    this.onlineUsersHandlers.push(handler);
    return () => {
      this.onlineUsersHandlers = this.onlineUsersHandlers.filter(h => h !== handler);
    };
  }

  onChatHistory(handler: (messages: ChatMessage[]) => void) {
    this.chatHistoryHandlers.push(handler);
    return () => {
      this.chatHistoryHandlers = this.chatHistoryHandlers.filter(h => h !== handler);
    };
  }

  disconnect(): void {
    if (this._socket) {
      this._socket.disconnect();
      this._socket = null;
    }
  }

  // Add methods to manage chat messages
  public setChatMessages(userId: string, messages: Message[]) {
    this.chatMessages.set(userId, messages);
  }

  public getChatMessages(userId: string): Message[] {
    return this.chatMessages.get(userId) || [];
  }

  // Add method to add a single message
  public addMessage(userId: string, message: Message) {
    const messages = this.getChatMessages(userId);
    this.chatMessages.set(userId, [...messages, message]);
  }

  // Add method to clear cache
  clearCache(userId: string) {
    console.log('[SocketService] Clearing cache for user:', userId);
    // Clear the cache for this user
    // this.messageCache.delete(userId);
  }

  removeAllHandlers() {
    console.log('[SocketService] Removing all handlers');
    this.messageHandlers = [];
    this.typingHandlers = [];
    this.readHandlers = [];
    this.onlineUsersHandlers = [];
    this.chatHistoryHandlers = [];
  }
}

export const socketService = new SocketService(); 