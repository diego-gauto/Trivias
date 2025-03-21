import styles from './DistributorsNew.module.css';
import { IoIosAddCircleOutline, IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { Modal } from '../../admin/DefaultComponents/Modal';
import {
  createANewDistributor,
  getAdminUserIdByEmail,
  getDistributorCodesById,
  getAllDistributorUserIds,
  getAllDistributorUsersArray,
  getAllDistributorUsersCount,
  getAllUsersArray,
  getAllUsersCount,
  getAllAdmins,
  getProductHistoryByDistributorId,
  getUserAccessRoles,
  getNormalUserIdByEmail,
  getIsSuperAdmin,
  getAllPostalCodesFromDistributors
} from './Queries';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Pagination from '../../../components/Pagination/Pagination';
import { InvoiceAccessModal } from './InvoiceAccessModal';
import { CreateInvoiceAccessModal } from './CreateInvoiceAccessModal';
import { InvoiceProductModal } from './InvoiceProductModal';
import { CreateInvoiceProductModal } from './CreateInvoiceProductModal';
import { UpdateDistributorModal } from './UpdateDistributorModal';
import { ORIGIN_STATES } from './Constants';

type MainSection = 'distributors' | 'common-users';

type DistributorsSubSection = 'distributors-list' | 'distributor-details';

type DistributorDetailsSection = 'product-history' | 'access-history';

type EntityParams = {
  offset: number,
  count: number,
}

function createAccessInvoiceDefaultValue(distributorId: number, adminId: number): IAccessInvoice {
  return {
    distributorId,
    adminId,
    details: [
      {
        accessType: 'M',
        count: 0,
        price: 0
      },
      {
        accessType: 'C',
        count: 0,
        price: 0
      },
      {
        accessType: 'A',
        count: 0,
        price: 0
      }
    ]
  }
}

function createProductInvoiceDefaultValue(distributorId: number, sellerId: number): IProductInvoice {
  return {
    product_sell_id: 0,
    distributorId,
    sellerId,
    products: [],
    date: '',
    is_confirmed: false,
    send_cost: 0,
    discount: 0
  }
}

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
  const [adminId, setAdminId] = useState<number>(0);
  const [distributors, setDistributors] = useState<IDistributor[]>([]);
  const [selectedDistributor, setSelectedDistributor] = useState<IDistributor | null>(null);
  const [accessHistory, setAccessHistory] = useState<IAccessHistory[]>([]);
  const [selectedAccessInvoice, setSelectedAccessInvoice] = useState<ICodeSell | null>(null);
  const [selectedProductInvoice, setSelectedProductInvoice] = useState<IProductSellHistory | null>(null);

  const [productHistory, setProductHistory] = useState<IProductSellHistory[]>([]);
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [distributorsParams, setDistributorsParams] = useState<EntityParams>({
    offset: 0,
    count: 0,
  });
  const [commonUsers, setCommonUsers] = useState<IUser[]>([]);
  const [commonUsersParams, setCommonUsersParams] = useState<EntityParams>({
    offset: 0,
    count: 0,
  });
  const [distributorUserIds, setDistributorUserIds] = useState<IDistributorIdsWithUserId[]>([]);
  const [mainSection, setMainSection] = useState<MainSection>('distributors');
  const [distributorsSubSection, setDistributorsSubSection] = useState<DistributorsSubSection>('distributors-list');
  const [distributorDetailsSection, setDistributorDetailsSection] = useState<DistributorDetailsSection>('access-history');

  const [showAccessInvoiceModal, setShowAccessInvoiceModal] = useState(false);
  const [showProductInvoiceModal, setShowProductInvoiceModal] = useState(false);
  const [showUpdateDistributorModal, setShowUpdateDistributorModal] = useState(false);
  const [showCreateAccessInoviceModal, setShowCreateAccessInoviceModal] = useState(false);
  const [showCreateProductInoviceModal, setShowCreateProductInoviceModal] = useState(false);
  const [productInvoiceOption, setProductInvoiceOption] = useState<'create' | 'update'>('create');
  const [newAccessInvoice, setNewAccessInvoice] = useState<IAccessInvoice>(createAccessInvoiceDefaultValue(0, 0));
  const [newProductInvoice, setNewProductInvoice] = useState<IProductInvoice>(createProductInvoiceDefaultValue(0, 0));

  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');
  const [debouncedMinAmount, setDebouncedMinAmount] = useState<string>('');
  const [debouncedMaxAmount, setDebouncedMaxAmount] = useState<string>('');
  const [canMakeUserADistributor, setCanMakeUserADistributor] = useState<boolean | null>(null);

  const [showAddDistributorButton, setShowAddDistributorButton] = useState(true);

  const [adminAccess, setAdminAccess] = useState<IAdminDistributorsRole>(createAdminDistributorsRole());
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [isFilterParamsActivated, setIsFilterParamsActivated] = useState(false);
  const [distributorFilterParams, setDistributorFilterParams] = useState<IDistributorFilterParams>({
    postal_code: '',
    origin_state: '',
    minAmount: '',
    maxAmount: ''
  });

  const [postalCodes, setPostalCodes] = useState<string[]>([]);

  useEffect(() => {
    refreshDistributorIds();
    getAdminId();
    refreshAdminList();
    getUserAccessRoleByDB();
    refreshPostalCodesFromDistributors();
  }, []);

  useEffect(() => {
    try {
      refreshDistributorsList();
    } catch (error) {
      console.error(error);
    }
  }, [distributorsParams.offset]);

  useEffect(() => {
    try {
      refreshNormalUsersList();
    } catch (error) {
      console.error(error);
    }
  }, [commonUsersParams.offset]);

  useEffect(() => {
    // Establecer un temporizador de 1 segundo antes de actualizar `debouncedInputValue`
    const handler = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 1000);

    // Limpiar el temporizador si el usuario sigue escribiendo
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMinAmount(distributorFilterParams.minAmount);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [distributorFilterParams.minAmount]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMaxAmount(distributorFilterParams.maxAmount);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [distributorFilterParams.maxAmount]);

  useEffect(() => {
    try {
      if (mainSection === 'distributors') {
        refreshDistributorsList();
      } else if (mainSection === 'common-users') {
        refreshNormalUsersList();
      }
    } catch (error) {
      console.error(error);
    }
  }, [debouncedInputValue, debouncedMinAmount, debouncedMaxAmount]);

  useEffect(() => {
    refreshDistributorsList();
  }, [distributorFilterParams.postal_code, distributorFilterParams.origin_state]);


  async function refreshPostalCodesFromDistributors() {
    try {
      const postalCodes = await getAllPostalCodesFromDistributors();
      setPostalCodes(postalCodes);
    } catch (error) {
      console.error(error);
    }
  }

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

  async function getAdminId() {
    try {
      const adminId = await getAdminUserIdByEmail(localStorage.getItem('email') || '');
      setAdminId(adminId);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshDistributorsList() {
    try {
      const { offset } = distributorsParams;
      const distributorsListCount = await getAllDistributorUsersCount(inputValue, {
        ...distributorFilterParams,
        maxAmount: debouncedMaxAmount,
        minAmount: debouncedMinAmount,
      });

      const distributorsList = await getAllDistributorUsersArray(offset, inputValue, {
        ...distributorFilterParams,
        maxAmount: debouncedMaxAmount,
        minAmount: debouncedMinAmount,
      });
      setDistributorsParams({
        ...distributorsParams,
        count: distributorsListCount
      })
      setDistributors(distributorsList);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshNormalUsersList() {
    try {
      const { offset } = commonUsersParams;
      const usersListCount = await getAllUsersCount(inputValue);
      const usersList = await getAllUsersArray(offset, inputValue);
      setCommonUsersParams({
        ...commonUsersParams,
        count: usersListCount
      });
      setCommonUsers(usersList);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshDistributorIds() {
    try {
      const ids = await getAllDistributorUserIds();
      setDistributorUserIds(ids);
    } catch (error) {
      console.error(error);
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

  const changePageDistributorList = (page: number) => {
    setDistributorsParams({
      ...distributorsParams,
      offset: page * 100,
    });
  };

  const changePageCommonUsersList = (page: number) => {
    setCommonUsersParams({
      ...commonUsersParams,
      offset: page * 100,
    });
  };

  async function tryToMakeUserDistributor(user_id: number) {
    // Actualizar el listado de distribuidores
    const canCreateDistributor = await createANewDistributor(user_id, adminId);
    if (canCreateDistributor) {
      setCanMakeUserADistributor(true);
      refreshDistributorIds();
      refreshDistributorsList();
    } else {
      setCanMakeUserADistributor(false);
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
          {
            distributorsSubSection !== 'distributor-details' &&
            <>
              <div className={styles['search-container']}>
                <IoMdSearch
                  className={styles['search-icon']}
                  size={25}
                  color='#858585' />
                <input
                  className={styles['search-distributor']}
                  type="text"
                  placeholder='Buscar'
                  value={
                    inputValue
                  }
                  onChange={(e) => {
                    const { value } = e.target;
                    setInputValue(value);
                  }}
                />
              </div>
              <div className={styles['search-bar-elements']}>
                <div
                  className={styles['search-bar-element']}
                  onClick={(e) => {
                    setIsFilterParamsActivated(!isFilterParamsActivated);
                  }}
                >
                  <CiFilter
                    size={25}
                  />Filtrar
                </div>
                {
                  (showAddDistributorButton
                    && (adminAccess.create === 1 || isSuperAdmin)) &&
                  <div
                    className={styles['search-bar-element']}
                    onClick={(e) => {
                      setShowAddDistributorButton(false);
                      setMainSection('common-users');
                    }}
                  >
                    <IoMdAddCircleOutline
                      size={25}
                    /> Agregar distribuidor
                  </div>
                }
              </div>
            </>
          }
          {
            distributorsSubSection === 'distributor-details' &&
            <>
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
            </>
          }
        </div>
        {
          (isFilterParamsActivated && mainSection === 'distributors') &&
          <div className={styles['filters-params']}>
            <div className={styles['pair-params-container']}>
              <div className="mb-3">
                <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
                <select
                  className="form-select"
                  id="codigoPostal"
                  value={distributorFilterParams.postal_code}
                  onChange={(e) => {
                    const { value } = e.target;
                    setDistributorFilterParams({
                      ...distributorFilterParams,
                      postal_code: value
                    })
                  }}
                >
                  <option value={''}>(Sin especificar)</option>
                  {
                    postalCodes.map((pc) => {
                      return <option
                        value={pc}
                        key={`postal_code_${pc}`}
                      >
                        {
                          pc
                        }
                      </option>
                    })
                  }
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="estado" className="form-label">Estado</label>
                <select
                  className="form-select"
                  id="estado"
                  value={distributorFilterParams.origin_state}
                  onChange={(e) => {
                    const { value } = e.target;
                    setDistributorFilterParams({
                      ...distributorFilterParams,
                      origin_state: value
                    })
                  }}
                >
                  <option value={''}>(Sin especificar)</option>
                  {
                    ORIGIN_STATES.map((os) => {
                      return <option
                        value={os}
                        key={`origin_state_${os}`}
                      >
                        {
                          os
                        }
                      </option>
                    })
                  }
                </select>
              </div>
            </div>

            <div className={styles['pair-params-container']} >
              <div className="mb-3">
                <label htmlFor="precioMin" className="form-label">Monto mínimo</label>
                <input
                  type="number"
                  className="form-control"
                  id="precioMin"
                  placeholder="Ingrese el monto mínimo"
                  value={distributorFilterParams.minAmount}
                  onChange={(e) => {
                    const { value } = e.target;
                    setDistributorFilterParams({
                      ...distributorFilterParams,
                      minAmount: value
                    })
                  }}
                  min={0}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="precioMax" className="form-label">Monto máximo</label>
                <input
                  type="number"
                  className="form-control"
                  id="precioMax"
                  placeholder="Ingrese el monto máximo"
                  value={distributorFilterParams.maxAmount}
                  onChange={(e) => {
                    const { value } = e.target;
                    setDistributorFilterParams({
                      ...distributorFilterParams,
                      maxAmount: value
                    })
                  }}
                  min={0}
                />
              </div>
            </div>
          </div>
        }
        {
          (isFilterParamsActivated && mainSection === 'common-users') &&
          <div className={styles['filters-params']}>
            {
              /*
              <div className={styles['pair-params-container']}>
              <div className="mb-3">
                <label htmlFor="numeroCelular" className="form-label">Número de celular</label>
                <input
                  type="tel"
                  id="numeroCelular"

                />
                <select
                  className="form-select"
                  id="codigoPostal"
                >
                  <option selected>Seleccione un código postal</option>
                  <option value="12345">12345</option>
                  <option value="67890">67890</option>
                  <option value="54321">54321</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="estado" className="form-label">Estado</label>
                <select className="form-select" id="estado">
                  <option selected>Seleccione un estado</option>
                  <option value="CDMX">Ciudad de México</option>
                  <option value="Jalisco">Jalisco</option>
                  <option value="Nuevo Leon">Nuevo León</option>
                </select>
              </div>
            </div>

            <div className={styles['pair-params-container']} >
              <div className="mb-3">
                <label htmlFor="precioMin" className="form-label">Monto mínimo</label>
                <input
                  type="number"
                  className="form-control"
                  id="precioMin"
                  placeholder="Ingrese el monto mínimo"
                  onInput={(e) => {
                    // oninput="formatearMoneda(this)" 
                  }}
                  min={0}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="precioMax" className="form-label">Monto máximo</label>
                <input
                  type="number"
                  className="form-control"
                  id="precioMax"
                  placeholder="Ingrese el monto máximo"
                  onInput={(e) => {
                    // oninput="formatearMoneda(this)" 
                  }}
                  min={0}
                />
              </div>
            </div>
              */
            }
          </div>
        }
        {
          selectedDistributor !== null &&
          <div className={styles['sections-container']}>
            <div
              className={`${styles['section-title']} ${distributorDetailsSection === 'access-history' ? styles['section-title--active'] : ''}`}
              onClick={(e) => {
                setDistributorDetailsSection('access-history');
              }}
            >
              Accesos
            </div>
            <div
              className={`${styles['section-title']} ${distributorDetailsSection === 'product-history' ? styles['section-title--active'] : ''}`}
              onClick={(e) => {
                setDistributorDetailsSection('product-history');
              }}
            >
              Presupuestos
            </div>
          </div>
        }
        <div className={styles['content-section']}>
          {
            (mainSection === 'distributors' && distributorsSubSection === 'distributors-list') &&
            <>
              <div className={styles['main-header-section']}>
                <h2 className={styles['content-title']}>Listado de distribuidores</h2>
                <div className={styles['pagination-section']}>
                  <Pagination
                    changePage={changePageDistributorList}
                    currentPage={distributorsParams.offset / 100}
                    totalPage={Math.ceil(distributorsParams.count / 100)}
                  />
                </div>
              </div>
              {
                distributors.length > 0 &&
                <div className={styles['table-content']}>
                  <table className={styles['gonvar-table']}>
                    <thead className={styles['gonvar-table__thead']}>
                      <tr className={styles['gonvar-table__row']}>
                        <th className={styles['gonvar-table__th']}>Distribuidor</th>
                        <th className={styles['gonvar-table__th']}>Email</th>
                        <th className={styles['gonvar-table__th']}>Celular</th>
                        <th className={styles['gonvar-table__th']}>Estado</th>
                        <th className={styles['gonvar-table__th']}>CP</th>
                        <th className={styles['gonvar-table__th']}>Inversión</th>
                        <th className={styles['gonvar-table__th']}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        distributors.map((d, i) => {
                          return <tr
                            className={styles['gonvar-table__row']}
                            key={`distributor_${i}`}
                          >
                            <td className={styles['gonvar-table__data']}>
                              {d.name}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {
                                d.email === '' ? 'Desconocido' : d.email
                              }
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {
                                d.phone_number === '' ? 'Desconocido' : d.phone_number
                              }
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {
                                d.origin_state === '' ? 'Desconocido' : d.origin_state
                              }
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {
                                d.postal_code === '' ? 'Desconocido' : d.postal_code
                              }
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {
                                d.total_sales
                              }
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '8px'
                              }}>
                                <button
                                  className={styles['gonvar-table__button']}
                                  onClick={(e) => {
                                    setDistributorsSubSection('distributor-details');
                                    setSelectedDistributor(d);
                                    setDistributorDetailsSection('access-history');
                                    refreshAccessHistoryById(d.distributor_id);
                                    refreshProductHistoryById(d.distributor_id);
                                  }}
                                >
                                  Ver
                                </button>
                                <button
                                  className={styles['gonvar-table__button']}
                                  onClick={(e) => {
                                    setSelectedDistributor(d);
                                    setShowUpdateDistributorModal(true);
                                  }}
                                >
                                  Editar
                                </button>
                              </div>

                            </td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              }
              {
                distributors.length === 0 &&
                <div className={styles['empty-container']}>
                  <div className={styles['empty-content']}>
                    <p className={styles['empty-content-text']}>
                      No se encuentran distribuidores con los parametros dados.
                    </p>
                  </div>
                </div>
              }
            </>
          }
          {
            (mainSection === 'distributors' &&
              distributorsSubSection === 'distributor-details' &&
              distributorDetailsSection === 'product-history'
            ) &&
            <>
              <div className={styles['go-back-container']}>
                {/* GO BACK */}
                <div
                  className={styles['go-back']}
                  onClick={(e) => {
                    setDistributorsSubSection('distributors-list');
                    setSelectedDistributor(null);
                  }}
                >
                  <FaLongArrowAltLeft size={30} />
                  <span className={styles['']}>Atrás</span>
                </div>
              </div>
              <div className={styles['distributor-details-header']}>
                <div className={styles['distributor-details-titles-container']}>
                  <h2 className={styles['distributor-details-title']}>
                    Presupuestos
                  </h2>
                  <h3 className={styles['distributor-details-subtitle']}>
                    Estos son los presupuestos del distribuidor
                  </h3>
                </div>
                {
                  (isSuperAdmin || adminAccess.create === 1) &&
                  <div
                    className={styles['distributor-details-create-access-button']}
                    onClick={(e) => {
                      setShowCreateProductInoviceModal(true);
                      setProductInvoiceOption('create');
                      setNewProductInvoice(createProductInvoiceDefaultValue(0, 0));
                    }}
                  >
                    <IoIosAddCircleOutline size={30} />
                    <span>Registrar presupuesto</span>
                  </div>
                }
              </div>
              <div className={styles['distributor-details-content']}>
                {
                  productHistory.length > 0 &&
                  <div className={styles['table-content']}>
                    <table className={styles['gonvar-table']}>
                      <thead className={styles['gonvar-table__thead']}>
                        <tr className={styles['gonvar-table__row']}>
                          <th className={styles['gonvar-table__th']}>N°</th>
                          <th className={styles['gonvar-table__th']}>Fecha</th>
                          <th className={styles['gonvar-table__th']}>Monto total</th>
                          <th className={styles['gonvar-table__th']}>Responsable</th>
                          <th className={styles['gonvar-table__th']}>Envio</th>
                          <th className={styles['gonvar-table__th']}>Descuento</th>
                          <th className={styles['gonvar-table__th']}>Confirmado</th>
                          {
                            (isSuperAdmin || adminAccess.view === 1) &&
                            <th className={styles['gonvar-table__th']}></th>
                          }
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
                                {
                                  `${ph.product_sell_id}`.padStart(6, '0')
                                }
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {ph.sell_at}
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
                                {
                                  Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(ph.send_cost)
                                }
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {
                                  `${ph.discount}%`
                                }
                              </td>
                              <td className={styles['gonvar-table__data']}>
                                {
                                  ph.is_confirmed ? 'Si' : 'No'
                                }
                              </td>
                              {
                                (isSuperAdmin || adminAccess.view === 1) &&
                                <td className={styles['gonvar-table__data']}>
                                  <button
                                    className={styles['gonvar-table__button']}
                                    onClick={(e) => {
                                      setShowProductInvoiceModal(true);
                                      setSelectedProductInvoice(ph);
                                    }}
                                  >
                                    Ver
                                  </button>
                                  {
                                    !ph.is_confirmed &&
                                    <button
                                      className={styles['gonvar-table__button']}
                                      onClick={(e) => {
                                        setSelectedProductInvoice(ph);
                                        setProductInvoiceOption('update');
                                        setShowCreateProductInoviceModal(true);
                                        setNewProductInvoice({
                                          date: ph.sell_at,
                                          distributorId: ph.distributor_id,
                                          is_confirmed: ph.is_confirmed,
                                          product_sell_id: ph.product_sell_id,
                                          products: ph.products.map(p => {
                                            return {
                                              count: p.count,
                                              price: p.price,
                                              productId: p.product_id
                                            }
                                          }),
                                          sellerId: ph.seller_id,
                                          send_cost: ph.send_cost,
                                          discount: ph.discount
                                        })
                                      }}
                                      style={{
                                        marginLeft: '8px'
                                      }}
                                    >
                                      Editar
                                    </button>
                                  }
                                </td>
                              }
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
                        Este distribuidor no cuenta con un historial de presupuestos
                      </p>
                    </div>
                  </div>
                }
              </div>
            </>
          }
          {
            (mainSection === 'distributors' &&
              distributorsSubSection === 'distributor-details' &&
              distributorDetailsSection === 'access-history'
            ) &&
            <>
              <div className={styles['go-back-container']}>
                {/* GO BACK */}
                <div
                  className={styles['go-back']}
                  onClick={(e) => {
                    setDistributorsSubSection('distributors-list');
                    setSelectedDistributor(null);
                  }}
                >
                  <FaLongArrowAltLeft size={30} />
                  <span className={styles['']}>Atrás</span>
                </div>
              </div>
              <div className={styles['distributor-details-header']}>
                <div className={styles['distributor-details-titles-container']}>
                  <h2 className={styles['distributor-details-title']}>
                    Accesos
                  </h2>
                  <h3 className={styles['distributor-details-subtitle']}>
                    Estos son los accesos comprados por el distribuidor
                  </h3>
                </div>
                {
                  (isSuperAdmin || adminAccess.create === 1) &&
                  <div
                    className={styles['distributor-details-create-access-button']}
                    onClick={(e) => {
                      setShowCreateAccessInoviceModal(true);
                      setNewAccessInvoice({
                        ...newAccessInvoice,
                        distributorId: selectedDistributor?.distributor_id || 0,
                        adminId
                      });
                    }}
                  >
                    <IoIosAddCircleOutline size={30} />
                    <span>Registrar accesos</span>
                  </div>
                }
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
                        Este distribuidor no cuenta con un historial de accesos
                      </p>
                    </div>
                  </div>
                }
              </div>
            </>
          }
          {
            (mainSection === 'common-users' && canMakeUserADistributor === null) &&
            <>
              <div className={styles['go-back-container']}>
                {/* GO BACK */}
                <div
                  className={styles['go-back']}
                  onClick={(e) => {
                    setMainSection('distributors');
                    setShowAddDistributorButton(true);
                  }}
                >
                  <FaLongArrowAltLeft size={30} />
                  <span className={styles['']}>Atrás</span>
                </div>
              </div>
              <div className={styles['main-header-section']}>
                <h2 className={styles['content-title']}>Listado de usuarios</h2>
                <div className={styles['pagination-section']}>
                  <Pagination
                    changePage={changePageCommonUsersList}
                    currentPage={commonUsersParams.offset / 100}
                    totalPage={Math.ceil(commonUsersParams.count / 100)}
                  />
                </div>
              </div>
              {
                commonUsers.length > 0 &&
                <div className={styles['table-content']}>
                  <table className={styles['gonvar-table']}>
                    <thead className={styles['gonvar-table__thead']}>
                      <tr className={styles['gonvar-table__row']}>
                        <th className={styles['gonvar-table__th']}>Nombre</th>
                        <th className={styles['gonvar-table__th']}>Email</th>
                        <th className={styles['gonvar-table__th']}>Celular</th>
                        <th className={styles['gonvar-table__th']}>Pais</th>
                        <th className={styles['gonvar-table__th']}>Estado</th>
                        <th className={styles['gonvar-table__th']}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        commonUsers.map((cu, i) => {
                          return <tr
                            className={styles['gonvar-table__row']}
                            key={`user_${i}`}
                          >
                            <td className={styles['gonvar-table__data']}>
                              {
                                cu.name.length > 15 ?
                                  `${cu.name.slice(0, 15)}...`
                                  : cu.name
                              }
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {
                                cu.email.length > 15 ?
                                  `${cu.email.slice(0, 15)}...`
                                  : cu.email
                              }
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {cu.phone_number}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {cu.country}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {cu.origin_state}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {
                                (isSuperAdmin || adminAccess.create === 1) &&
                                distributorUserIds.find(d => d.user_id === cu.user_id) === undefined &&
                                <button
                                  className={styles['gonvar-table__button']}
                                  onClick={(e) => {
                                    tryToMakeUserDistributor(cu.user_id);
                                  }}
                                >
                                  Asignar
                                </button>
                              }
                              {
                                distributorUserIds.find(d => d.user_id === cu.user_id) !== undefined &&
                                <p style={{
                                  margin: '0',
                                  fontWeight: 'bold',
                                  border: '1px solid black',
                                  borderRadius: '12px',
                                  padding: '6px',
                                  userSelect: 'none',
                                  fontSize: '12px'
                                }}>
                                  Listo
                                </p>
                              }
                            </td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              }
              {
                commonUsers.length === 0 &&
                <div className={styles['empty-container']}>
                  <div className={styles['empty-content']}>
                    <p className={styles['empty-content-text']}>
                      No se encuentran usuarios con los parametros dados.
                    </p>
                  </div>
                </div>
              }
            </>
          }
          {
            (mainSection === 'common-users' && canMakeUserADistributor !== null) &&
            <div className={styles['result-petition-section']}>
              <div className={styles['result-petition-container']}>
                <div className={`${styles['result-petition-icon']} ${styles[`result-petition-icon--${canMakeUserADistributor ? 'approve' : 'not-approve'}`]}`}>
                  {
                    canMakeUserADistributor === true ? '✔' : '!'
                  }
                </div>
                <h3 className={styles['result-petition-title']}>
                  {
                    canMakeUserADistributor ?
                      '¡Se ha asignado como distribudor con exito!'
                      : '¡No se ha asignado como distribudor con exito!'
                  }
                </h3>
                <h4 className={styles['result-petition-subtitle']}>
                  {
                    canMakeUserADistributor ?
                      'Ahora el usuario puede distribuir productos'
                      : 'Intente de nuevo esta acción, quizas tambien el usuario ya sea distribuidor'
                  }
                </h4>
                <div className={styles['result-petition-buttons']}>
                  <button
                    className={styles['result-petition-button']}
                    onClick={(e) => {
                      setCanMakeUserADistributor(null);
                      refreshDistributorIds();
                    }}
                  >
                    Regresar a usuarios
                  </button>
                </div>
              </div>
            </div>
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
                const codes = selectedAccessInvoice.details.map(d => {
                  const { duration_type, codes } = d;
                  const duration = duration_type === 'M' ? 'Mensuales' : duration_type === 'A' ? 'Anuales' : 'Cuatrimestrales';
                  const codeList = codes.map(c => c.code.toUpperCase());
                  return `${duration}\n${codeList.join('\n')}`;
                }).join('\n');
                navigator.clipboard.writeText(codes);
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
        (showCreateAccessInoviceModal) &&
        <Modal
          child={
            <CreateInvoiceAccessModal
              accessInvoice={newAccessInvoice}
              modifyAccessInvoice={setNewAccessInvoice}
              onClose={() => {
                setShowCreateAccessInoviceModal(false);
              }}
              onCreate={(canCreate) => {
                if (canCreate) {
                  if (selectedDistributor !== null) {
                    refreshAccessHistoryById(selectedDistributor.distributor_id);
                  }
                }
                setShowCreateAccessInoviceModal(false);
                // createAccessInvoiceDefaultValue
                setNewAccessInvoice(createAccessInvoiceDefaultValue(0, 0));
              }}
            />
          }
          show={showCreateAccessInoviceModal}
          onClose={() => {
            setShowCreateAccessInoviceModal(false);
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
          compactSize={false}
        />
      }
      {
        (showCreateProductInoviceModal && selectedDistributor !== null) &&
        <Modal
          child={
            <CreateInvoiceProductModal
              onClose={() => {
                setShowCreateProductInoviceModal(false);
              }}
              onCreate={(canCreate) => {
                if (canCreate) {
                  refreshProductHistoryById(selectedDistributor.distributor_id);
                }
              }}
              productInvoice={
                {
                  ...newProductInvoice,
                  distributorId: selectedDistributor.distributor_id
                }
              }
              modifyProductInvoice={setNewProductInvoice}
              productInvoiceOption={productInvoiceOption}
            />
          }
          onClose={() => {
            setShowCreateProductInoviceModal(false);
          }}
          show={showCreateProductInoviceModal}
          compactSize={false}
        />
      }
      {
        (showUpdateDistributorModal && selectedDistributor !== null) &&
        <Modal
          child={<UpdateDistributorModal
            distributor={selectedDistributor}
            modifyDistributor={setSelectedDistributor}
            onClose={() => {
              setShowUpdateDistributorModal(false);
              setSelectedDistributor(null);
            }}
            onUpdate={(success) => {
              if (success) {
                refreshDistributorsList();
                refreshPostalCodesFromDistributors();
              }
            }}
          />}
          show={showUpdateDistributorModal}
          compactSize={true}
        />
      }
    </div>)
}