export const backendRoleEditMethod = (admin: {
  user_id: any;
  id: number;
  role: string;
  source_table: string;
  create?: number;
  edit?: number;
  delete?: number;
  view: number;
  courses?: string;
  request?: number;
  report?: number;
  download?: number;
  forms?: string;
}) => {
  let query: string = '';
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
  tableSourceByAdminRole.set('subscriptions', 'admin_subscriptions');
  tableSourceByAdminRole.set('active_memberships', 'admin_active_memberships');

  const tableColumnsByTableName = new Map<string, string[]>();
  tableColumnsByTableName.set('admin_courses', [
    'create',
    'edit',
    'delete',
    'view',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_coupons', [
    'create',
    'edit',
    'delete',
    'view',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_blogs', [
    'create',
    'edit',
    'delete',
    'view',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_rewards', [
    'create',
    'edit',
    'delete',
    'request',
    'view',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_users', [
    'edit',
    'report',
    'view',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_landing', ['view', 'user_id']);
  tableColumnsByTableName.set('admin_payments', ['view', 'user_id']);
  tableColumnsByTableName.set('admin_homeworks', [
    'courses',
    'view',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_comments', [
    'create',
    'edit',
    'delete',
    'courses',
    'view',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_trivias', [
    'view',
    'create',
    'edit',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_trivias_list', [
    'view',
    'download',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_forms', [
    'view',
    'create',
    'edit',
    'user_id',
    'forms',
  ]);
  tableColumnsByTableName.set('admin_forms_list', [
    'view',
    'download',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_tickets_list', [
    'view',
    'download',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_memberships_list', [
    'view',
    'download',
    'user_id',
  ]);
  tableColumnsByTableName.set('admin_distributors', [
    'view',
    'create',
    'edit',
    'delete',
    'user_id',
    'download',
    'abm_products',
    'abm_sellers',
    'view_access_invoices',
    'create_access_invoices',
    'view_products_invoices',
    'create_products_invoices',
  ]);
  tableColumnsByTableName.set('admin_subscriptions', ['view', 'user_id']);
  tableColumnsByTableName.set('admin_active_memberships', [
    'view',
    'download',
    'user_id',
  ]);

  const getValidColumsByTableName = (tableName: string) => {
    return tableColumnsByTableName.get(tableName);
  };

  const tableName = tableSourceByAdminRole.get(admin.role);

  const filterInvalids = (array: [string, unknown][], tableName: string) => {
    const validColumns = getValidColumsByTableName(tableName);
    if (validColumns === undefined) {
      throw new Error(`No existen columnas para la tabla "${tableName}"`);
    }

    return array.filter(
      (element) =>
        element[1] !== null &&
        element[1] !== undefined &&
        validColumns.includes(element[0]),
    );
  };

  const generateHeader = (obj: any, tableName: string) => {
    const array = Object.entries(obj);
    console.log({ array, tableName });
    return filterInvalids(array, tableName).map(
      (element) => `\`${element[0]}\``,
    );
  };

  const generateValues = (obj: any, tableName: string) => {
    const array = Object.entries(obj);
    return filterInvalids(array, tableName).map((element) => {
      const value =
        typeof element[1] === 'string' ? `'${element[1]}'` : element[1];
      return `${value}`;
    });
  };

  const generateSetValues = (obj: any, tableName: string) => {
    const array = Object.entries(obj);
    return filterInvalids(array, tableName).map((element) => {
      const value =
        typeof element[1] === 'string' ? `'${element[1]}'` : element[1];
      return `\`${element[0]}\` = ${value}`;
    });
  };

  try {
    query = `INSERT INTO ${tableName} 
    (${generateHeader(admin, tableName || '').join(', ')}) 
    VALUES (${generateValues(admin, tableName || '').join(', ')}) 
    ON DUPLICATE KEY UPDATE ${generateSetValues(admin, tableName || '').join(', ')};`;
    return query;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return error.stack || '';
    }
    return `Error desconocido ${JSON.stringify(error)}`;
  }
};
