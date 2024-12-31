/*
if (userData.role === 'superAdmin' ||
      (userData.roles.length > 0 && userData.role === 'admin')
    ) {
      router.push('/admin/Courses');
    }
*/

const URLS = {
  admin_courses: '/admin/Courses',
  admin_landing: '/admin/Landing',
  admin_rewards: '/admin/Rewards',

  admin_coupons: '/admin/Coupons',
  admin_blogs: '/admin/Blog',
  admin_payments: '/admin/Pago',
  admin_users: '/admin/Users',
  admin_homeworks: '/admin/HomeWork',
  admin_comments: '/admin/Comments',
  admin_trivias: '/admin/Trivias',
  admin_forms: '/admin/Forms',
  admin_tickets_list: '/admin/Tickets',
  admin_memberships_list: '/admin/Memberships',
};

const getURLS = () => {
  const map = new Map<string, string>();
  map.set('admin_courses', '/admin/Courses');
  map.set('admin_landing', '/admin/Landing');
  map.set('admin_rewards', '/admin/Rewards');
  map.set('admin_coupons', '/admin/Coupons');
  map.set('admin_blogs', '/admin/Blog');
  map.set('admin_payments', '/admin/Pago');
  map.set('admin_users', '/admin/Users');
  map.set('admin_homeworks', '/admin/HomeWork');
  map.set('admin_comments', '/admin/Comments');
  map.set('admin_trivias', '/admin/Trivias');
  map.set('admin_forms', '/admin/Forms');
  map.set('admin_tickets_list', '/admin/Tickets');
  map.set('admin_memberships_list', '/admin/Memberships');
  return map;
};

export const getFirstLinkToAdmin = (sourceTablesOfUser: string[]) => {
  const sourceTables = getURLS();

  const keys = [...sourceTables.keys()];

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]!;
    const sourceTableOfUser = sourceTablesOfUser.find((st) => st === key);
    if (sourceTableOfUser !== undefined) {
      return sourceTables.get(key) || '/';
    }
  }

  return '/';
};
