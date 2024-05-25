export type RoleName =
  | 'course'
  | 'coupons'
  | 'blogs'
  | 'rewards'
  | 'users'
  | 'landing'
  | 'payments'
  | 'homeworks'
  | 'comments'
  | 'trivias'
  | 'trivias_list'
  | 'forms'
  | 'forms_list'
  | 'tickets_list'
  | 'memberships_list';

export interface Role {
  id: number;
  role: RoleName;
  source_table: string;
  create?: number;
  edit?: number;
  delete?: number;
  view: number;
  user_id: number;
  courses?: string | null;
  request?: number;
  report?: number;
  download?: number;
  forms?: string | null;
}

export type UserLevelValue = 'admin' | 'superAdmin' | 'user';
