/* TSX Layout Interfaces */

type DistributorsSubSection = 'distributors-list' | 'distributor-details';

/* State Interfaces */
interface IAdmin {
  admin_id: number;
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
}

interface IDistributor {
  distributor_id: number;
  name: string;
  phone_number: string;
  photo: string;
  user_created_at: number;
  distributor_created_at: number;
  admin_user_id: number;
  country: string | null;
  email: string;
  origin_state: string;
  postal_code: string | null;
}

interface IUser {
  user_id: number;
  name: string;
  phone_number: string;
  photo: string;
  user_created_at: number;
  country: string;
  email: string;
  origin_state: string;
}

interface ICodeSell {
  distributor_id: number;
  admin_id: number;
  code_sell_id: number;
  created_sell_at: number;
  details: ICodeSellDetail[];
}

interface ICodeSellDetail {
  code_sell_id: number;
  code_sell_detail_id: number;
  amount: number;
  count: number;
  duration_type: 'M' | 'C' | 'A';
  codes: ICode[];
}

interface ICode {
  code: string;
  sell_at: number | null;
  user_id: number | null;
  code_sell_detail_id: number;
  email: string | null;
  username: string | null;
}

interface IDistributorIdsWithUserId {
  distributor_id: number;
  user_id: number;
}

interface IAccessHistory {
  codeSellId: number;
  date: string;
  accessCount: number;
  amount: string;
  adminEmail: string;
  data: ICodeSell;
}

interface IAccessInvoice {
  distributorId: number;
  adminId: number;
  details: IAccessInvoiceDetails[];
}

interface IAccessInvoiceDetails {
  accessType: 'M' | 'C' | 'A';
  count: number;
  price: number;
}

interface IProductInvoice {
  distributorId: number;
  sellerId: number;
  date: string;
  products: { productId: number, count: number, price: number }[];
}

type SubscriptionValue = 'M' | 'C' | 'A';

interface IDetail {
  duration_type: SubscriptionValue;
  count: number;
  amount: number;
}

interface ICreateCodeSell {
  admin_id: number;
  distributor_id: number;
  details: IDetail[];
}

interface IProductHistoryRecord {
  seller_id: number
  distributor_id: number
  sell_at: string
  product_sell_id: number
  product_id: number
  count: number
  price: number
  product_name: string
  product_image: string
  seller_email: string
}

interface IProductSellHistory {
  seller_id: number
  distributor_id: number
  sell_at: string
  seller_email: string
  product_count: number
  product_total_amount: number
  products: IProductSell[]
}

interface IProductSell {
  product_sell_id: number
  product_id: number
  count: number
  price: number
  product_name: string
  product_image: string
}

interface ISeller {
  seller_id: number
  name: string
  last_name: string
  email: string
  phone_number: string
  photo_url: string
  postal_code: string
}

interface IProduct {
  product_id: number
  name: string
  image: string | null
  default_price: number
}

interface IAdminDistributorsRole {
  admin_distributor_id: number
  user_id: number
  view: 0 | 1
  create: 0 | 1
  edit: 0 | 1
  download: 0 | 1
  abm_products: 0 | 1
  abm_sellers: 0 | 1
  create_access_invoices: 0 | 1
  create_products_invoices: 0 | 1
}