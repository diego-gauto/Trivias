export const generateUserIdQuery = (email: string) => {
  const query = `SELECT id FROM users WHERE email like '${email}';`;
  return query;
};

export const generateUserRoleAccessQuery = (userId: number) => {
  const query = `SELECT id, \`role\`, 'admin_courses' AS source_table, admin_courses.create, admin_courses.edit, admin_courses.delete, admin_courses.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_courses
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_coupons' AS source_table, admin_coupons.create, admin_coupons.edit, admin_coupons.delete, admin_coupons.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_coupons
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_blogs' AS source_table, admin_blogs.create, admin_blogs.edit, admin_blogs.delete, admin_blogs.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_blogs
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_rewards' AS source_table, admin_rewards.create, admin_rewards.edit, admin_rewards.delete, admin_rewards.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, admin_rewards.request AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_rewards
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_users' AS source_table, NULL AS 'create', admin_users.edit, admin_users.report, admin_users.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, admin_users.report, NULL AS download, NULL AS forms
      FROM admin_users
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_landing' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_landing.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_landing
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_payments' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_payments.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_payments
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_homeworks' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_homeworks.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, admin_homeworks.courses AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_homeworks
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_comments' AS source_table, admin_comments.create, admin_comments.edit, admin_comments.delete, admin_comments.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, admin_comments.courses AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_comments
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_trivias' AS source_table, admin_trivias.create, admin_trivias.edit, NULL AS 'delete', admin_trivias.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_trivias
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_trivias_list' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_trivias_list.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, admin_trivias_list.download, NULL AS forms
      FROM admin_trivias_list
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_forms' AS source_table, admin_forms.create, admin_forms.edit, NULL AS 'delete', admin_forms.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, NULL AS download, admin_forms.forms
      FROM admin_forms
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_forms_list' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_forms_list.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, admin_forms_list.download, NULL AS forms
      FROM admin_forms_list
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_tickets_list' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_tickets_list.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, admin_tickets_list.download, NULL AS forms
      FROM admin_tickets_list
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_memberships_list' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_memberships_list.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, admin_memberships_list.download, NULL AS forms
      FROM admin_memberships_list
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_active_memberships' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_active_memberships.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, admin_active_memberships.download, NULL AS forms
      FROM admin_active_memberships
      WHERE user_id = ${userId}
      UNION

      SELECT id, \`role\`, 'admin_subscriptions' AS source_table, NULL AS 'create', NULL AS 'edit', NULL AS 'delete', admin_subscriptions.view, NULL AS abm_products, NULL AS abm_sellers, NULL AS create_products_invoices, NULL AS create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, NULL AS download, NULL AS forms
      FROM admin_subscriptions
      WHERE user_id = ${userId}
      UNION

      SELECT admin_distributor_id AS id, 'distributors' AS \`role\`, 'admin_distributors' AS source_table, admin_distributors.create, NULL AS 'delete', admin_distributors.edit, admin_distributors.view, admin_distributors.abm_products, admin_distributors.abm_sellers, admin_distributors.create_products_invoices, admin_distributors.create_access_invoices, user_id, NULL AS courses, NULL AS request, NULL AS report, admin_distributors.download, NULL AS forms
      FROM admin_distributors
      WHERE user_id = ${userId}`;
  return query;
};

export const generateUserRolesLevelQuery = (userId: number) => {
  const query = `select \`role\` from users where id = ${userId};`;
  return query;
};
