type TaskValue =
  | 'Crear'
  | 'Editar'
  | 'Eliminar'
  | 'Solicitudes'
  | 'Generar Reporte'
  | 'Descargar'
  | 'ABM Productos'
  | 'ABM Vendedores'
  | 'Generar factura de productos'
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