import { getGenericQueryResponse } from "../../api/admin";

export const getDistributorsAdminAccess = async (userId: number): Promise<AdminRole> => {
  try {
    const query = `SELECT * FROM admin_distributors WHERE user_id = ${userId};`;
    const response = await getGenericQueryResponse(query);
    const result = response.data.data as IAdminDistributorRole[];

    if (result.length === 0) {
      throw new Error('No existe');
    }

    const element = result[0]!;

    const { abm_products, abm_sellers, create, create_access_invoices, create_products_invoices, delete: remove, download, edit, user_id, view, view_access_invoices, view_products_invoices } = element;

    return {
      active: view === 1,
      name: "distributors",
      role: 'Distribuidoras',
      tasks: [
        {
          active: create === 1,
          task: 'Crear'
        },
        {
          task: 'Editar',
          active: edit === 1,
        },
        {
          task: 'Descargar',
          active: download === 1,
        },
        {
          task: 'Eliminar',
          active: remove === 1,
        },
        {
          task: 'ABM Productos',
          active: abm_products === 1,
        },
        {
          task: 'ABM Vendedores',
          active: abm_sellers === 1,
        },
        {
          task: 'Ver factura de accesos',
          active: view_access_invoices === 1,
        },
        {
          task: 'Ver factura de productos',
          active: view_products_invoices === 1,
        },
        {
          task: 'Generar factura de accesos',
          active: create_access_invoices === 1,
        },
        {
          task: 'Generar factura de productos',
          active: create_products_invoices === 1,
        },
      ],
    }
  } catch (error) {
    console.error(error);
    return {
      active: false,
      name: "distributors",
      role: 'Distribuidoras',
      tasks: [
        {
          active: false,
          task: 'Crear'
        },
        {
          task: 'Editar',
          active: false,
        },
        {
          task: 'Descargar',
          active: false,
        },
        {
          task: 'Eliminar',
          active: false,
        },
        {
          task: 'ABM Productos',
          active: false,
        },
        {
          task: 'ABM Vendedores',
          active: false,
        },
        {
          task: 'Ver factura de accesos',
          active: false,
        },
        {
          task: 'Ver factura de productos',
          active: false,
        },
        {
          task: 'Generar factura de accesos',
          active: false,
        },
        {
          task: 'Generar factura de productos',
          active: false,
        },
      ],
    };
  }
}