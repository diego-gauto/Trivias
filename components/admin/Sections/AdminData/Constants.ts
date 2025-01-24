type RoleValue =
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
  | 'memberships_list'
  | 'subscriptions'
  | 'active_memberships'
  | 'distributors'
  | 'subscriptions'
  | 'active_memberships';

export interface AdminType {
  id: number;
  role: RoleValue;
  source_table: string;
  create?: 0 | 1;
  edit?: 0 | 1;
  delete?: 0 | 1;
  view: number;
  user_id: number;
  courses?: string;
  request?: 0 | 1;
  report?: 0 | 1;
  download?: 0 | 1;
  forms?: string;
}

export const DEFAULT_ADMIN_ROLES_VALUES: AdminType[] = [
  {
    id: 0,
    role: 'course',
    source_table: 'admin_courses',
    create: 0,
    edit: 0,
    delete: 0,
    view: 0,
    user_id: 0,
  },
  {
    id: 0,
    role: 'coupons',
    source_table: 'admin_coupons',
    create: 0,
    edit: 0,
    delete: 0,
    view: 0,
    user_id: 0,
  },
  {
    id: 0,
    role: 'blogs',
    source_table: 'admin_blogs',
    create: 0,
    edit: 0,
    delete: 0,
    view: 0,
    user_id: 0,
  },
  {
    id: 0,
    role: 'rewards',
    source_table: 'admin_rewards',
    create: 0,
    edit: 0,
    delete: 0,
    view: 0,
    user_id: 0,
    request: 0,
  },
  {
    id: 0,
    role: 'users',
    source_table: 'admin_users',
    edit: 0,
    delete: 0,
    view: 0,
    user_id: 0,
    report: 0,
  },
  {
    id: 0,
    role: 'landing',
    source_table: 'admin_landing',
    view: 0,
    user_id: 0,
  },
  {
    id: 0,
    role: 'payments',
    source_table: 'admin_payments',
    view: 0,
    user_id: 0,
  },
  {
    id: 0,
    role: 'homeworks',
    source_table: 'admin_homeworks',
    view: 0,
    user_id: 0,
    courses: '',
  },
  {
    id: 0,
    role: 'comments',
    source_table: 'admin_comments',
    create: 0,
    edit: 0,
    delete: 0,
    view: 0,
    user_id: 0,
    courses: '',
  },
  {
    id: 0,
    role: 'trivias',
    source_table: 'admin_trivias',
    create: 0,
    edit: 0,
    view: 0,
    user_id: 0,
  },
  {
    id: 0,
    role: 'trivias_list',
    source_table: 'admin_trivias_list',
    view: 0,
    user_id: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'forms',
    source_table: 'admin_forms',
    create: 0,
    edit: 0,
    view: 0,
    user_id: 0,
    forms: '',
  },
  {
    id: 0,
    role: 'forms_list',
    source_table: 'admin_forms_list',
    view: 0,
    user_id: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'tickets_list',
    source_table: 'admin_tickets_list',
    view: 0,
    user_id: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'memberships_list',
    source_table: 'admin_memberships_list',
    view: 0,
    user_id: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'distributors',
    source_table: 'admin_distributors',
    user_id: 0,
    view: 0,
    create: 0,
    delete: 0,
    edit: 0,
  },
  {
    id: 0,
    role: 'distributors',
    source_table: 'admin_active_memberships',
    user_id: 0,
    view: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'subscriptions',
    source_table: 'admin_subscriptions',
    user_id: 0,
    view: 0,
  },
];
