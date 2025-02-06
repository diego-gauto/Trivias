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
  date: string;
  accessCount: number;
  amount: string;
  adminEmail: string;
}

/*
{
"select distributor_id, user_id from distributors": [
	{
		"distributor_id" : 1,
		"user_id" : 49519
	},
	{
		"distributor_id" : 3,
		"user_id" : 49678
	}
]}

*/
