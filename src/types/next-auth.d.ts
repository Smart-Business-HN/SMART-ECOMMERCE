import NextAuth from 'next-auth';
import { CustomerType } from '@/interfaces/auth/auth.interface';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    expirationDate?: string;
    customerType?: CustomerType;
    firstName?: string;
    lastName?: string;
    userName?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: string;
    expirationDate?: string;
    customerType?: CustomerType;
    firstName?: string;
    lastName?: string;
    userName?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    expirationDate?: string;
    customerType?: CustomerType;
    firstName?: string;
    lastName?: string;
    userName?: string;
  }
}
