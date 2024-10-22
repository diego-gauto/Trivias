export interface FemsaCreateOrderResponse {
  data: Data;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
}

export interface Data {
  order_response: OrderResponse;
  order_request: string;
}

export interface OrderResponse {
  livemode: boolean;
  amount: number;
  currency: string;
  payment_status: string;
  amount_refunded: number;
  customer_info: CustomerInfo;
  shipping_contact: any;
  channel: any;
  fiscal_entity: any;
  object: string;
  id: string;
  metadata: Metadata;
  is_refundable: boolean;
  created_at: number;
  updated_at: number;
  line_items: LineItems;
  shipping_lines: any;
  tax_lines: any;
  discount_lines: any;
  charges: Charges;
}

export interface CustomerInfo {
  email: string;
  phone: string;
  name: string;
  corporate: boolean;
  customer_id: string;
  object: string;
  customer_custom_reference: any;
}

export interface Metadata {
  type: string;
  course_id: number;
  frecuency: string;
  duration: number;
}

export interface LineItems {
  object: string;
  has_more: boolean;
  total: number;
  data: Daum[];
}

export interface Daum {
  name: string;
  description: any;
  unit_price: number;
  quantity: number;
  sku: any;
  tags: any;
  brand: any;
  type: any;
  object: string;
  id: string;
  parent_id: string;
  metadata: Metadata2;
  antifraud_info: AntifraudInfo;
}

export interface Metadata2 {}

export interface AntifraudInfo {}

export interface Charges {
  object: string;
  has_more: boolean;
  total: number;
  data: Daum2[];
}

export interface Daum2 {
  id: string;
  livemode: boolean;
  created_at: number;
  currency: string;
  failure_code: any;
  failure_message: any;
  channel: any;
  payment_method: PaymentMethod;
  object: string;
  device_fingerprint: string;
  description: string;
  is_refundable: boolean;
  reference_id: any;
  status: string;
  amount: number;
  paid_at: any;
  customer_id: string;
  order_id: string;
  refunds: any;
}

export interface PaymentMethod {
  service_name: string;
  barcode_url: string;
  store: any;
  auth_code: any;
  object: string;
  type: string;
  expires_at: number;
  store_name: string;
  reference: string;
  cashier_id: any;
}

export interface Headers {
  'content-length': string;
  'content-type': string;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers2;
  method: string;
  url: string;
  data: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Env {}

export interface Headers2 {
  Accept: string;
  'Content-Type': string;
}

export interface Request {}
