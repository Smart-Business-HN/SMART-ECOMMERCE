import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { loginUser } from '@/services/auth.service';
import { LoginEcommerceUserCommand } from '@/interfaces/auth/auth.interface';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        userName: { label: 'Usuario', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
        loginMethod: { label: 'Método de login', type: 'text' },
        customerTypeId: { label: 'Tipo de cliente', type: 'number' }
      },
      async authorize(credentials) {
        if (!credentials?.password) {
          return null;
        }

        const loginData: LoginEcommerceUserCommand = {
          password: credentials.password,
          ...(credentials.loginMethod === 'email' 
            ? { email: credentials.email }
            : { userName: credentials.userName }
          )
        };

        try {
          const response = await loginUser(loginData);
          
          if (response.succeeded && response.data) {
            return {
              id: response.data.id,
              name: response.data.fullName,
              email: response.data.email,
              image: response.data.photo,
              token: response.data.token,
              expirationDate: response.data.expirationDate,
              customerType: response.data.customerType,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              userName: response.data.userName,
              activeCartId: response.data.activeCartId
            };
          }
          
          // Si no es exitoso, devolver null pero con un mensaje personalizado
          console.error('Login failed:', response.message);
          return null;
        } catch (error) {
          console.error('Error en autorización:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.expirationDate = user.expirationDate;
        token.customerType = user.customerType;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.image = token.picture;
        session.accessToken = token.accessToken as string;
        session.expirationDate = token.expirationDate as string;
        session.customerType = token.customerType;
        session.firstName = token.firstName as string;
        session.lastName = token.lastName as string;
        session.userName = token.userName as string;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Permitir el inicio de sesión si hay un usuario válido
      return !!user;
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth-error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
};
