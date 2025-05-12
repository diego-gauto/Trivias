type TaskValue =
  | 'Crear'
  | 'Editar'
  | 'Eliminar'
  | 'Solicitudes'
  | 'Generar Reporte'
  | 'Descargar'
  | 'ABM Productos'
  | 'ABM Vendedores'
  | 'Generar presupuesto'
  | 'Generar factura de accesos'
  | 'Ver factura de productos'
  | 'Ver factura de accesos'
  | 'Generar Reporte';

interface AdminRole {
  role: string;
  active: boolean;
  name: string;
  tasks: { active: boolean; task: TaskValue }[];
  courses?: number[];
  forms?: number[]
}

interface IAdminDistributorRole {
  admin_distributor_id: number
  user_id: number
  view: number
  create: number
  edit: number
  delete: number
  download: number
  abm_products: number
  abm_sellers: number
  view_access_invoices: number
  create_access_invoices: number
  view_products_invoices: number
  create_products_invoices: number
}

interface BackendRoleStructure {
  user_id: number;
  id: number;
  role: string;
  source_table: string;
  create?: 0 | 1;
  edit?: 0 | 1;
  delete?: 0 | 1;
  view: 0 | 1;
  courses?: string;
  request?: 0 | 1;
  report?: 0 | 1;
  download?: 0 | 1;
  forms?: string;
  abm_products?: 0 | 1
  abm_sellers?: 0 | 1
  view_access_invoices?: 0 | 1
  create_access_invoices?: 0 | 1
  view_products_invoices?: 0 | 1
  create_products_invoices?: 0 | 1
}