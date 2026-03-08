export interface QuotationPreview {
  id: number;
  quotationCode: string;
  creationDate: string;
  dueDate: string;
  statusName: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerRtn: string;
  userFullName: string;
  observations: string;
  termsAndConditions: string;
  productsOffered: ProductOfferedPreview[];
  subTotal: number;
  total: number;
  totalShippingCost: number;
  subTotalWithoutShipping: number;
  comments: QuotationComment[];
}

export interface ProductOfferedPreview {
  id: number;
  productCode: string;
  productDescription: string;
  quantity: number;
  unitPrice: number;
  taxId: number;
  taxRate: number;
  taxes: number;
  totalLine: number;
  observations: QuotationItemObservation[];
}

export interface QuotationComment {
  id: number;
  quotationId: number;
  authorName: string;
  authorEmail?: string;
  message: string;
  isFromClient: boolean;
  userId?: string;
  userFullName?: string;
  creationDate: string;
}

export interface QuotationItemObservation {
  id: number;
  productOfferedId: number;
  quotationId: number;
  authorName: string;
  observation: string;
  creationDate: string;
}

export interface QuotationPreviewResponse {
  succeeded: boolean;
  message: string;
  data: QuotationPreview;
  errors?: string[];
}

export interface QuotationCommentsResponse {
  succeeded: boolean;
  message: string;
  data: QuotationComment[];
  errors?: string[];
}

export interface QuotationCommentResponse {
  succeeded: boolean;
  message: string;
  data: QuotationComment;
  errors?: string[];
}

export interface QuotationItemObservationResponse {
  succeeded: boolean;
  message: string;
  data: QuotationItemObservation;
  errors?: string[];
}
