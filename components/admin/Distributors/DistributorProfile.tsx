import styles from './DistributorsNew.module.css';
import { useEffect, useState } from 'react';
import { Modal } from '../../admin/DefaultComponents/Modal';
import {
  getDistributorCodesById,
  getProductHistoryByDistributorId,
  getUserAccessRoles,
  getNormalUserIdByEmail,
  getIsSuperAdmin,
  getAllAdmins,
  getDistributorIdByEmail,
  getDistributorById,
} from './Queries';
import { InvoiceAccessModal } from './InvoiceAccessModal';
import { InvoiceProductModal } from './InvoiceProductModal';

type DistributorDetailsSection = 'product-history' | 'access-history';

function createAdminDistributorsRole(): IAdminDistributorsRole {
  return {
    user_id: 0,
    admin_distributor_id: 0,
    create: 0,
    download: 0,
    edit: 0,
    view: 0,
    abm_products: 0,
    abm_sellers: 0,
    create_access_invoices: 0,
    create_products_invoices: 0,
  }
}

export const DistributorsNew = () => {
  const [selectedDistributor, setSelectedDistributor] = useState<IDistributor | null>(null);
  const [accessHistory, setAccessHistory] = useState<IAccessHistory[]>([]);
  const [selectedAccessInvoice, setSelectedAccessInvoice] = useState<ICodeSell | null>(null);
  const [selectedProductInvoice, setSelectedProductInvoice] = useState<IProductSellHistory | null>(null);

  const [productHistory, setProductHistory] = useState<IProductSellHistory[]>([]);
  const [admins, setAdmins] = useState<IAdmin[]>([]);

  const [distributorDetailsSection, setDistributorDetailsSection] = useState<DistributorDetailsSection>('product-history');

  const [showAccessInvoiceModal, setShowAccessInvoiceModal] = useState(false);
  const [showProductInvoiceModal, setShowProductInvoiceModal] = useState(false);

  const [adminAccess, setAdminAccess] = useState<IAdminDistributorsRole>(createAdminDistributorsRole());
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    getUserAccessRoleByDB();
    getDistributorIdByEmail(localStorage.getItem('email') || '').then(id => {
      console.log({ id });
      if (id === 0) {
        window.location.href = '/preview';
      }
      getDistributorById(id).then(data => {
        setSelectedDistributor(data);
      });
      refreshProductHistoryById(id);
      refreshAccessHistoryById(id);
    });
    refreshAdminList();
  }, []);

  async function getUserAccessRoleByDB() {
    try {
      const userId = await getNormalUserIdByEmail(localStorage.getItem('email') || '');
      const roleAccess = await getUserAccessRoles(userId);
      const isSuperAdmin = await getIsSuperAdmin(localStorage.getItem('email') || '');
      setAdminAccess(roleAccess);
      setIsSuperAdmin(isSuperAdmin);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshAccessHistoryById(selectedDistributorId: number) {
    try {
      const codeSells = await getDistributorCodesById(selectedDistributorId);

      const result: IAccessHistory[] = codeSells.map((cs, index) => {
        const { admin_id, code_sell_id, created_sell_at, details, distributor_id } = cs;

        const adminEmail = admins.find((admin) => admin.admin_id === admin_id)?.email || 'Desconocido';
        const accessCount = details.reduce((pv, cv) => {
          return pv + cv.count
        }, 0);
        const amountNumber = details.reduce((pv, cv) => {
          return pv + (cv.amount * cv.count)
        }, 0);
        const date = new Date(created_sell_at * 1000).toJSON().slice(0, 10);

        const amount = Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amountNumber);
        const codeSellId = code_sell_id;
        const data = cs;

        return {
          codeSellId,
          adminEmail,
          accessCount,
          amount,
          date,
          data
        }
      });
      setAccessHistory(result);
    } catch (error) {
      console.error(error);
      setAccessHistory([]);
    }
  }

  async function refreshAdminList() {
    try {
      const response = await getAllAdmins();
      setAdmins(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshProductHistoryById(selectedDistributorId: number) {
    try {
      const response = await getProductHistoryByDistributorId(selectedDistributorId);
      setProductHistory(response);
    } catch (error) {
      console.error(error);
      setProductHistory([]);
    }
  }

  return (
    <div className={styles['container']}>
      <div className={styles['data-container']}>
        <div className={styles['user-main-header']}>
          <div className={styles['user-profile']}>
            <div className={styles['user-image']}>
              <img src={`${selectedDistributor?.photo || ''}`} alt="user profile photo" />
            </div>
            <div className={styles['user-name']}>
              {
                selectedDistributor?.name
              }
            </div>
          </div>
          <div className={styles['user-properties']}>
            <div className={styles['user-property']}>
              <div className={styles['user-property-header']}>Correo electrónico</div>
              <div className={styles['user-property-value']}>
                {
                  selectedDistributor?.email
                }
              </div>
            </div>
            <div className={styles['user-property']}>
              <div className={styles['user-property-header']}>Teléfono</div>
              <div className={styles['user-property-value']}>
                {
                  selectedDistributor?.phone_number
                }
              </div>
            </div>
            <div className={styles['user-property']}>
              <div className={styles['user-property-header']}>Estado</div>
              <div className={styles['user-property-value']}>
                {
                  selectedDistributor?.phone_number
                }
              </div>
            </div>
            <div className={styles['user-property']}>
              <div className={styles['user-property-header']}>Codigo postal</div>
              <div className={styles['user-property-value']}>
                {
                  selectedDistributor?.postal_code
                }
              </div>
            </div>
          </div>
        </div>
        {
          selectedDistributor !== null &&
          <div className={styles['sections-container']}>
            <div
              className={`${styles['section-title']} ${distributorDetailsSection === 'product-history' ? styles['section-title--active'] : ''}`}
              onClick={(e) => {
                setDistributorDetailsSection('product-history');
              }}
            >
              Historial de producto
            </div>
            <div
              className={`${styles['section-title']} ${distributorDetailsSection === 'access-history' ? styles['section-title--active'] : ''}`}
              onClick={(e) => {
                setDistributorDetailsSection('access-history');
              }}
            >
              Historial de acceso
            </div>
          </div>
        }
        <div className={styles['content-section']}>
          {
            distributorDetailsSection === 'product-history' &&
            <>
              <div className={styles['distributor-details-header']}>
                <div className={styles['distributor-details-titles-container']}>
                  <h2 className={styles['distributor-details-title']}>
                    Historial de productos
                  </h2>
                  <h3 className={styles['distributor-details-subtitle']}>
                    Estos son los productos comprados por ti
                  </h3>
                </div>
              </div>
              <div className={styles['distributor-details-content']}>
                {
                  productHistory.length > 0 &&
                  <div className={styles['table-content']}>
                    <table className={styles['gonvar-table']}>
                      <thead className={styles['gonvar-table__thead']}>
                        <tr className={styles['gonvar-table__row']}>
                          <th className={styles['gonvar-table__th']}>Fecha</th>
                          <th className={styles['gonvar-table__th']}>Cantidad de productos</th>
                          <th className={styles['gonvar-table__th']}>Monto total</th>
                          <th className={styles['gonvar-table__th']}>Vendedor</th>
                          <th className={styles['gonvar-table__th']}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          productHistory.map((ph, i) => {
                            return <tr
                              className={styles['gonvar-table__row']}
                              key={`user_${i}`}
                            >
                              <td className={styles['gonvar-table__data']}>
                                {ph.sell_at}
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {ph.product_count}
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {
                                  Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(ph.product_total_amount)
                                }
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {ph.seller_email}
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                <button
                                  className={styles['gonvar-table__button']}
                                  onClick={(e) => {
                                    setShowProductInvoiceModal(true);
                                    setSelectedProductInvoice(ph);
                                  }}
                                >
                                  Ver factura
                                </button>
                              </td>
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                }
                {
                  productHistory.length === 0 &&
                  <div className={styles['empty-container']}>
                    <div className={styles['empty-content']}>
                      <p className={styles['empty-content-text']}>
                        No cuenta con un historial de productos
                      </p>
                    </div>
                  </div>
                }
              </div>
            </>
          }
          {
            distributorDetailsSection === 'access-history' &&
            <>
              <div className={styles['distributor-details-header']}>
                <div className={styles['distributor-details-titles-container']}>
                  <h2 className={styles['distributor-details-title']}>
                    Historial de acceso
                  </h2>
                  <h3 className={styles['distributor-details-subtitle']}>
                    Estos son los accesos comprados por ti
                  </h3>
                </div>
              </div>
              <div className={styles['distributor-details-content']}>
                {
                  accessHistory.length > 0 &&
                  <div className={styles['table-content']}>
                    <table className={styles['gonvar-table']}>
                      <thead className={styles['gonvar-table__thead']}>
                        <tr className={styles['gonvar-table__row']}>
                          <th className={styles['gonvar-table__th']}>Fecha</th>
                          <th className={styles['gonvar-table__th']}>Cantidad de accesos</th>
                          <th className={styles['gonvar-table__th']}>Monto total</th>
                          <th className={styles['gonvar-table__th']}>Responsable</th>
                          <th className={styles['gonvar-table__th']}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          accessHistory.map((ah, i) => {
                            return <tr
                              className={styles['gonvar-table__row']}
                              key={`user_${i}`}
                            >
                              <td className={styles['gonvar-table__data']}>
                                {ah.date}
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {ah.accessCount}
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {ah.amount}
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {ah.adminEmail}
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                <button
                                  className={styles['gonvar-table__button']}
                                  onClick={(e) => {
                                    setShowAccessInvoiceModal(true);
                                    setSelectedAccessInvoice(ah.data);
                                  }}
                                >
                                  Ver factura
                                </button>
                              </td>
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                }
                {
                  accessHistory.length === 0 &&
                  <div className={styles['empty-container']}>
                    <div className={styles['empty-content']}>
                      <p className={styles['empty-content-text']}>
                        No cuenta con un historial de accesos
                      </p>
                    </div>
                  </div>
                }
              </div>
            </>
          }
        </div>
      </div>
      {
        (showAccessInvoiceModal && selectedAccessInvoice !== null) &&
        <Modal
          child={
            <InvoiceAccessModal
              accessInvoiceRecord={selectedAccessInvoice}
              onClose={() => {
                setShowAccessInvoiceModal(false);
              }}
              onShare={() => {

              }}
            />
          }
          show={showAccessInvoiceModal}
          onClose={() => {
            setShowAccessInvoiceModal(false);
          }}
          compactSize={false}
        />
      }
      {
        (showProductInvoiceModal && selectedProductInvoice !== null) &&
        <Modal
          child={
            <InvoiceProductModal
              productInvoiceRecord={selectedProductInvoice}
              onClose={() => {
                setShowProductInvoiceModal(false);
              }}
              onShare={() => {

              }}
            />
          }
          show={showProductInvoiceModal}
          onClose={() => {
            setShowProductInvoiceModal(false);
          }}
          compactSize={false}
        />
      }
    </div>)
}