export interface AssociatedCompanyDto {
  id: number;
  ecommerceUserId: string;
  name: string;
  rtn?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  creationDate: string;
  isActive: boolean;
}

export interface CreateAssociatedCompanyCommand {
  ecommerceUserId: string;
  name: string;
  rtn?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
}

export interface UpdateAssociatedCompanyCommand {
  id: number;
  name: string;
  rtn?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  isActive: boolean;
}

export interface AssociatedCompanyResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: AssociatedCompanyDto;
}

export interface AssociatedCompanyListResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: AssociatedCompanyDto[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
}

export interface DeleteAssociatedCompanyResponse {
  succeeded: boolean;
  message?: string;
  data?: string;
  errors?: string[];
}
