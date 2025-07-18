export interface LoginUserCommand {
  userName?: string;
  email?: string;
  password: string;
}

export interface SessionUserDto {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  photo?: string;
  role: string;
  token: string;
  branchOfficeId?: number;
  expirationDate: string;
  mainBranchOfficeId: number;
}

export interface LoginResponse {
  succeeded: boolean;
  message: string;
  data?: SessionUserDto;
  errors?: string[];
} 