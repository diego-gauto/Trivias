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
  | 'distributors'
  | 'subscriptions'
  | 'active_memberships';

interface AdminType {
  id: number;
  role: RoleValue;
  source_table: string;
  create?: number;
  edit?: number;
  delete?: number;
  view: number;
  user_id: number;
  courses?: string;
  request?: number;
  report?: number;
  download?: number;
  abm_products?: number;
  abm_sellers?: number;
  create_access_invoices?: number;
  create_products_invoices?: number;
}

const tableSourceByAdminRole = new Map<string, string>();
tableSourceByAdminRole.set('course', 'admin_courses');
tableSourceByAdminRole.set('coupons', 'admin_coupons');
tableSourceByAdminRole.set('blogs', 'admin_blogs');
tableSourceByAdminRole.set('rewards', 'admin_rewards');
tableSourceByAdminRole.set('users', 'admin_users');
tableSourceByAdminRole.set('landing', 'admin_landing');
tableSourceByAdminRole.set('payments', 'admin_payments');
tableSourceByAdminRole.set('homeworks', 'admin_homeworks');
tableSourceByAdminRole.set('comments', 'admin_comments');
tableSourceByAdminRole.set('trivias', 'admin_trivias');
tableSourceByAdminRole.set('trivias_list', 'admin_trivias_list');
tableSourceByAdminRole.set('forms', 'admin_forms');
tableSourceByAdminRole.set('forms_list', 'admin_forms_list');
tableSourceByAdminRole.set('tickets_list', 'admin_tickets_list');
tableSourceByAdminRole.set('memberships_list', 'admin_memberships_list');
tableSourceByAdminRole.set('distributors', 'admin_distributors');

export const defaultValues: AdminType[] = [
  {
    id: 0,
    role: 'course',
    source_table: 'admin_courses',
    view: 0,
    create: 0,
    edit: 0,
    delete: 0,
    user_id: 0,
  },
  {
    id: 0,
    role: 'coupons',
    source_table: 'admin_coupons',
    user_id: 0,
    view: 0,
    create: 0,
    delete: 0,
  },
  {
    id: 0,
    role: 'blogs',
    source_table: 'admin_blogs',
    user_id: 0,
    view: 0,
    create: 0,
    delete: 0,
  },
  {
    id: 0,
    role: 'rewards',
    source_table: 'admin_rewards',
    user_id: 0,
    view: 0,
    create: 0,
    delete: 0,
    edit: 0,
    request: 0,
  },
  {
    id: 0,
    role: 'users',
    source_table: 'admin_users',
    user_id: 0,
    view: 0,
    report: 0,
  },
  {
    id: 0,
    role: 'landing',
    source_table: 'admin_landing',
    user_id: 0,
    view: 0,
  },
  {
    id: 0,
    role: 'payments',
    source_table: 'admin_payments',
    user_id: 0,
    view: 0,
  },
  {
    id: 0,
    role: 'homeworks',
    source_table: 'admin_homeworks',
    user_id: 0,
    view: 0,
    courses: '',
  },
  {
    id: 0,
    role: 'comments',
    source_table: 'admin_comments',
    user_id: 0,
    view: 0,
    create: 0,
    delete: 0,
    courses: '',
  },
  {
    id: 0,
    role: 'trivias',
    source_table: 'admin_trivias',
    user_id: 0,
    view: 0,
    create: 0,
    edit: 0,
  },
  {
    id: 0,
    role: 'trivias_list',
    source_table: 'admin_trivias_list',
    user_id: 0,
    view: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'forms',
    source_table: 'admin_forms',
    user_id: 0,
    view: 0,
    create: 0,
    edit: 0,
  },
  {
    id: 0,
    role: 'forms_list',
    source_table: 'admin_forms_list',
    user_id: 0,
    view: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'tickets_list',
    source_table: 'admin_tickets_list',
    user_id: 0,
    view: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'memberships_list',
    source_table: 'admin_memberships_list',
    user_id: 0,
    view: 0,
    download: 0,
  },
  {
    id: 0,
    role: 'distributors',
    source_table: 'admin_distributors',
    user_id: 0,
    view: 0,
    create: 0,
    edit: 0,
    download: 0,
    abm_products: 0,
    abm_sellers: 0,
    create_access_invoices: 0,
    create_products_invoices: 0,
  },
  {
    id: 0,
    role: 'subscriptions',
    source_table: 'admin_subscriptions',
    user_id: 0,
    view: 0,
  },
  {
    id: 0,
    role: 'active_memberships',
    source_table: 'admin_active_memberships',
    user_id: 0,
    view: 0,
    download: 0,
  },
];
