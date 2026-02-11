export interface PaymentMethodDto {
  id: number;
  ecommerceUserId: string;
  alias: string;
  cardholderName: string;
  last4Digits: string;
  expirationMonth: number;
  expirationYear: number;
  cardBrand: string;
  creationDate: string;
  isActive: boolean;
}

export interface CreatePaymentMethodCommand {
  ecommerceUserId: string;
  alias: string;
  cardholderName: string;
  cardNumber: string;
  expirationMonth: number;
  expirationYear: number;
  cardBrand: string;
}

export interface UpdatePaymentMethodCommand {
  id: number;
  alias: string;
  cardholderName: string;
  expirationMonth: number;
  expirationYear: number;
  isActive: boolean;
}

export interface PaymentMethodResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: PaymentMethodDto;
}

export interface PaymentMethodListResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: PaymentMethodDto[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
}

export interface DeletePaymentMethodResponse {
  succeeded: boolean;
  message?: string;
  data?: string;
  errors?: string[];
}
