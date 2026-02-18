export interface CreateContactMessageCommand {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  messageContent: string;
  countryId: number;
  departmentId: number;
  customerId?: string; // Opcional
}

export interface ContactMessageResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: {
    sentAt: string;
  };
}

export interface CountryDto {
  id: number;
  name: string;
}

export interface DepartmentDto {
  id: number;
  name: string;
}

export interface CountriesResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: CountryDto[];
}

export interface DepartmentsResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: DepartmentDto[];
}
