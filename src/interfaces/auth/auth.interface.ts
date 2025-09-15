export interface LoginEcommerceUserCommand {
  userName?: string;
  email?: string;
  password: string;
}

export interface CustomerType {
  id: number;
  name: string;
  isActive: boolean;
}

export interface SessionEcommerceUserDto {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  photo?: string;
  token: string;
  expirationDate: string;
  customerType?: CustomerType;
}

export interface LoginResponse {
  succeeded: boolean;
  message: string;
  data?: SessionEcommerceUserDto;
  errors?: string[];
}

// Interfaces para registro de usuarios
export interface CreateEcommerceUserCommand {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  genderId: number;
  departmentId?: number;
}

export interface GenderDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface EcommerceUserDto {
  id: string;
  email: string;
  userName: string;
  fullName: string;
  firstName: string;
  lastName: string;
  photo?: string;
  phoneNumber: string;
  departmentId?: number;
  department?: DepartmentDto;
  genderId: number;
  gender?: GenderDto;
  creationDate: string;
  isActive: boolean;
  birthDay?: string;
  lastPasswordChange?: string;
  modificationDate?: string;
  customerTypeId: number;
  customerType?: CustomerType;
}

export interface DepartmentDto {
  id: number;
  name: string;
  isActive: boolean;
  regionId?: number;
  countryId: number;
  cities?: CityDto[];
}

export interface CityDto {
  id: number;
  name: string;
  isActive: boolean;
  departmentId: number;
}

export interface CreateUserResponse {
  succeeded: boolean;
  message: string;
  data?: EcommerceUserDto;
  errors?: string[];
}

export interface UserProfileResponse {
  succeeded: boolean;
  message: string;
  data?: EcommerceUserDto;
  errors?: string[];
}

export interface UpdateUserCommand {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  genderId: number;
  departmentId?: number;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface UpdateUserResponse {
  succeeded: boolean;
  message: string;
  data?: EcommerceUserDto;
  errors?: string[];
}

export interface UpdateProfileImageResponse {
  succeeded: boolean;
  message: string;
  data?: string; // URL de la nueva imagen
  errors?: string[];
}

// Mantener compatibilidad con el código existente
export type LoginUserCommand = LoginEcommerceUserCommand;
export type SessionUserDto = SessionEcommerceUserDto; 