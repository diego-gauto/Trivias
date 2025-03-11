import styles from './DistributorsNew.module.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from 'react';
import { Modal } from '../DefaultComponents/Modal';
import {
  getUserAccessRoles,
  getNormalUserIdByEmail,
  getIsSuperAdmin,
  getSellersCount,
  getSellersList,
} from './Queries';
import Pagination from '../../Pagination/Pagination';
import { CreateSellerModalContent } from './CreateSellerModal';
import { UpdateSellerModalContent } from './UpdateSellerModal';
import { ShowSellerModalContent } from './ShowSellerModal';

type EntityParams = {
  offset: number,
  count: number,
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

export const DistributorsSellers = () => {
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [newSeller, setNewSeller] = useState<ISeller>({
    seller_id: 0,
    email: '',
    name: '',
    last_name: '',
    photo_url: '',
    postal_code: '',
    phone_number: '',
  });

  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);

  const [sellersParams, setSellersParams] = useState<EntityParams>({
    offset: 0,
    count: 0,
  });

  const [showCreateSeller, setShowCreateSeller] = useState(false);
  const [showUpdateSeller, setShowUpdateSeller] = useState(false);
  const [showPreviewSeller, setShowPreviewSeller] = useState(false);

  const [inputValue, setInputValue] = useState<string>('');

  const [adminAccess, setAdminAccess] = useState<IAdminDistributorsRole>(createAdminDistributorsRole());
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    getUserAccessRoleByDB();
  }, []);

  useEffect(() => {
    try {
      refreshSellersList();
    } catch (error) {
      console.error(error);
    }
  }, [sellersParams.offset]);

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

  async function refreshSellersList() {
    try {
      const { offset } = sellersParams;
      const sellersCount = await getSellersCount(inputValue);
      const sellersList = await getSellersList(offset, inputValue);
      setSellersParams({
        ...sellersParams,
        count: sellersCount
      });
      setSellers(sellersList);
    } catch (error) {
      console.error(error);
    }
  }

  const changePageSellersList = (page: number) => {
    setSellersParams({
      ...sellersParams,
      offset: page * 100,
    });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['data-container']}>
        <div className={styles['content-section']}>
          <div className={styles['main-header-section']}>
            <h2 className={styles['content-title']}>Listado de vendedores</h2>
            <div className={styles['pagination-section']}>
              <Pagination
                changePage={changePageSellersList}
                currentPage={sellersParams.offset / 100}
                totalPage={Math.ceil(sellersParams.count / 100)}
              />
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBlock: '8px',
              color: '#691ACA',
              fontWeight: '500',
              cursor: 'pointer'
            }}
              className='button'
              onClick={(e) => {
                setShowCreateSeller(true);
              }}
            >
              <IoIosAddCircleOutline
                size={25}
                color='#691ACA'
              />{' '}
              Agregar vendedor
            </div>
          </div>
          {
            sellers.length > 0 &&
            <div className={styles['table-content']}>
              <table className={styles['gonvar-table']}>
                <thead className={styles['gonvar-table__thead']}>
                  <tr className={styles['gonvar-table__row']}>
                    <th className={styles['gonvar-table__th']}>Vendedor</th>
                    <th className={styles['gonvar-table__th']}>Correo Eléctronico</th>
                    <th className={styles['gonvar-table__th']}>Numero telefonico</th>
                    <th className={styles['gonvar-table__th']}>Código postal</th>
                    <th className={styles['gonvar-table__th']}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sellers.map((seller, i) => {
                      const { name, last_name, email, phone_number, postal_code } = seller;
                      return <tr
                        className={styles['gonvar-table__row']}
                        key={`distributor_${i}`}
                      >
                        <td className={styles['gonvar-table__data']}>
                          {
                            name + ' ' + last_name
                          }
                        </td>
                        <td className={styles['gonvar-table__data']}>
                          {
                            email
                          }
                        </td>
                        <td className={styles['gonvar-table__data']}>
                          {
                            phone_number !== '' ? phone_number : 'Desconocido'
                          }
                        </td>
                        <td className={styles['gonvar-table__data']}>
                          {
                            postal_code !== '' ? postal_code : 'Desconocido'
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
                                setSelectedSeller(seller);
                                setShowPreviewSeller(true);
                              }}
                            >
                              Visualizar
                            </button>
                            <button
                              className={styles['gonvar-table__button']}
                              onClick={(e) => {
                                setSelectedSeller(seller);
                                setShowUpdateSeller(true);
                                console.log("Se establecio todo lo necesario!");
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
            sellers.length === 0 &&
            <div className={styles['empty-container']}>
              <div className={styles['empty-content']}>
                <p className={styles['empty-content-text']}>
                  No se encuentran distribuidores con los parametros dados.
                </p>
              </div>
            </div>
          }
        </div>
      </div>
      {
        showCreateSeller &&
        <Modal
          child={
            <CreateSellerModalContent
              onClose={() => {
                setShowCreateSeller(false);
              }}
              onCreate={(canCreate) => {
                if (canCreate) {
                  setNewSeller({
                    seller_id: 0,
                    email: '',
                    phone_number: '',
                    last_name: '',
                    name: '',
                    photo_url: '',
                    postal_code: ''
                  });
                  refreshSellersList();
                }
              }}
              newSeller={newSeller}
              modifyNewSeller={setNewSeller}
            />
          }
          onClose={() => {
            // setShowCreateSeller(false);
          }}
          show={showCreateSeller}
          compactSize={true}
        />
      }
      {
        (showUpdateSeller && selectedSeller !== null) &&
        <Modal
          child={
            <UpdateSellerModalContent
              onClose={() => {
                setShowUpdateSeller(false);
              }}
              onUpdate={(canUpdate) => {
                if (canUpdate) {
                  setSelectedSeller(null);
                  refreshSellersList();
                }
              }}
              seller={selectedSeller}
              modifySeller={setSelectedSeller}
            />
          }
          onClose={() => {
            // setShowUpdateSeller(false);
          }}
          show={showUpdateSeller}
          compactSize={true}
        />
      }
      {
        (showPreviewSeller && selectedSeller !== null) &&
        <Modal
          child={
            <ShowSellerModalContent
              onClose={() => {
                setShowPreviewSeller(false);
              }}
              seller={selectedSeller}
            />
          }
          onClose={() => {
            setShowPreviewSeller(false);
          }}
          show={showPreviewSeller}
          compactSize={true}
        />
      }
    </div>)
}