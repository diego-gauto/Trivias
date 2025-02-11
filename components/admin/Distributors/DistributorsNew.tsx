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
  createCodesForDistributor,
} from './Queries';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Pagination from '../../../components/Pagination/Pagination';
import { InvoiceAccessModal } from './InvoiceAccessModal';
import { CreateInvoiceAccessModal } from './CreateInvoiceAccessModal';

type MainSection = 'distributors' | 'common-users' | 'sells';

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

export const DistributorsNew = () => {
  const [adminId, setAdminId] = useState<number>(0);
  const [distributors, setDistributors] = useState<IDistributor[]>([]);
  const [selectedDistributor, setSelectedDistributor] = useState<IDistributor | null>(null);
  const [accessHistory, setAccessHistory] = useState<IAccessHistory[]>([]);
  const [selectedAccessInvoice, setSelectedAccessInvoice] = useState<ICodeSell | null>(null);
  const [productHistory, setProductHistory] = useState<IAccessHistory[]>([]);
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
  const [distributorDetailsSection, setDistributorDetailsSection] = useState<DistributorDetailsSection>('product-history');

  const [showAccessInvoiceModal, setShowAccessInvoiceModal] = useState(false);
  const [showCreateAccessInoviceModal, setShowCreateAccessInoviceModal] = useState(false);
  const [showCreateAccessInoviceSuccessModal, setShowCreateAccessInoviceSuccessModal] = useState<boolean>(false);
  const [newAccessInvoice, setNewAccessInvoice] = useState<IAccessInvoice>(createAccessInvoiceDefaultValue(0, 0));

  const [inputValue, setInputValue] = useState<string>('');

  const [canMakeUserADistributor, setCanMakeUserADistributor] = useState<boolean | null>(null);

  const [showAddDistributorButton, setShowAddDistributorButton] = useState(true);

  useEffect(() => {
    refreshDistributorIds();
    getAdminId();
    refreshAdminList();
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
      console.log('Esta cambiando el offset');
      refreshNormalUsersList();
    } catch (error) {
      console.error(error);
    }
  }, [commonUsersParams.offset]);

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
      const distributorsListCount = await getAllDistributorUsersCount(inputValue);
      const distributorsList = await getAllDistributorUsersArray(offset, inputValue);
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
      console.log({ usersList });
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
    const canCreateDistributor = await createANewDistributor(user_id, adminId);
    if (canCreateDistributor) {
      setCanMakeUserADistributor(true);
    } else {
      setCanMakeUserADistributor(false);
    }
  }

  async function refreshAccessHistoryById(selectedDistributor: number) {
    try {
      const codeSells = await getDistributorCodesById(selectedDistributor);

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
                    if (mainSection === 'distributors') {
                      refreshDistributorsList();
                    } else if (mainSection === 'common-users') {
                      refreshNormalUsersList();
                    }
                  }}
                >
                  <CiFilter
                    size={25}
                  />Filtrar
                </div>
                {
                  showAddDistributorButton &&
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
                      selectedDistributor?.phone_number
                    }
                  </div>
                </div>
                <div className={styles['user-property']}>
                  <div className={styles['user-property-header']}>Codigo postal</div>
                  <div className={styles['user-property-value']}>
                    {
                      selectedDistributor?.phone_number
                    }
                  </div>
                </div>
                {
                  /*
                  <div className={styles['user-property']}>
                  <div className={`${styles['user-property-header']} ${styles['user-property-header--small-text']}`}>Fecha de creación</div>
                  <div className={styles['user-property-value']}>{'getFormatedDate(new Date(userMainProperties.createdAt))'}</div>
                </div>
                  */
                }
              </div>
            </>
          }
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
            (mainSection === 'distributors' && distributorsSubSection === 'distributors-list') &&
            <>
              <div className={styles['main-header-section']}>
                <h2 className={styles['content-title']}>Listado de distribuidores</h2>
                <div className={styles['pagination-section']}>
                  <Pagination
                    /*
                    <Pagination
                      changePage={changePage}
                      currentPage={userFilters.offset / 100}
                      totalPage={Math.ceil(totalAssignments / 100)}
                    />
                    */
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
                        <th className={styles['gonvar-table__th']}>Correo eléctronico</th>
                        <th className={styles['gonvar-table__th']}>Número de celular</th>
                        <th className={styles['gonvar-table__th']}>Estado de origen</th>
                        <th className={styles['gonvar-table__th']}>Codigo postal</th>
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
                              {d.email}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {d.phone_number}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {d.origin_state}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {d.postal_code}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              <button
                                className={styles['gonvar-table__button']}
                                onClick={(e) => {
                                  setDistributorsSubSection('distributor-details');
                                  setSelectedDistributor(d);
                                  setDistributorDetailsSection('product-history');
                                  refreshAccessHistoryById(d.distributor_id);
                                }}
                              >
                                Ver perfil
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
            (mainSection === 'distributors' && distributorsSubSection === 'distributor-details') &&
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
                    Historial de acceso
                  </h2>
                  <h3 className={styles['distributor-details-subtitle']}>
                    Estos son los accesos comprados por el distribuidor
                  </h3>
                </div>
                <div
                  className={styles['distributor-details-create-access-button']}
                  onClick={(e) => {
                    // TODO
                    setShowCreateAccessInoviceModal(true);
                    setNewAccessInvoice({
                      ...newAccessInvoice,
                      distributorId: selectedDistributor?.distributor_id || 0,
                      adminId
                    });
                    console.log({ newAccessInvoice });
                  }}
                >
                  <IoIosAddCircleOutline size={30} />
                  <span>Registrar accesos</span>
                </div>
              </div>
              <div className={styles['distributor-details-content']}>
                {
                  /* TODO: Colocar las ventas del usuario distribuidor  */
                }
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
                        <th className={styles['gonvar-table__th']}>Correo eléctronico</th>
                        <th className={styles['gonvar-table__th']}>Número de celular</th>
                        <th className={styles['gonvar-table__th']}>Pais</th>
                        <th className={styles['gonvar-table__th']}>Estado de origen</th>
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
                              {cu.name}
                            </td>
                            <td className={styles['gonvar-table__data']}>
                              {cu.email}
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
                                distributorUserIds.find(d => d.user_id === cu.user_id) === undefined &&
                                <button
                                  className={styles['gonvar-table__button']}
                                  onClick={(e) => {
                                    tryToMakeUserDistributor(cu.user_id);
                                  }}
                                >
                                  Hacer distribuidor
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
                                  Es distribuidor
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
          {
            mainSection === 'sells' &&
            <>
              <div className={styles['sells-section']}>
                <h2 className={styles['content-title']}>Listado de ventas</h2>
                <div className={styles['pagination-section']}>
                  <Pagination
                    changePage={changePageCommonUsersList}
                    currentPage={commonUsersParams.offset / 100}
                    totalPage={Math.ceil(commonUsersParams.count / 100)}
                  />
                </div>
              </div>
            </>
          }
          {
            mainSection === 'sells' &&
            <div style={{
              display: 'none',
              justifyContent: 'center',
              padding: '64px 16px',
              fontWeight: '600',
              backgroundColor: 'rgb(230, 230, 230)',
              borderRadius: '32px'
            }}>
              <div style={{
              }}>
                Pendiente
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
    </div>)
}