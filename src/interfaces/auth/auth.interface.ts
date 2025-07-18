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
  phoneNumber?: string;
  role: string;
  token: string;
  departmentId?: number;
  genderId?: number;
  expirationDate: string;
  branchOfficeId?: number;
  mainBranchOfficeId: number;
}

export interface LoginResponse {
  succeeded: boolean;
  message: string;
  data?: SessionUserDto;
  errors?: string[];
} 