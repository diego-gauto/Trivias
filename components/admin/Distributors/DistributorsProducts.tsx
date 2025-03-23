import styles from './DistributorsNew.module.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from 'react';
import { Modal } from '../../admin/DefaultComponents/Modal';
import {
  getUserAccessRoles,
  getNormalUserIdByEmail,
  getIsSuperAdmin,
  getAllProductsCount,
  getAllProductsArray,
} from './Queries';
import Pagination from '../../../components/Pagination/Pagination';
import { CreateProductModal } from './CreateProductModal';
import { ShowProductModal } from './ShowProductModal';
import { UpdateProductModal } from './UpdateProductModal';

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

export const DistributorsProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [newProduct, setNewProduct] = useState<IProduct>({
    product_id: 0,
    name: '',
    default_price: 0
  });

  const [productsParams, setProductsParams] = useState<EntityParams>({
    offset: 0,
    count: 0,
  });

  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showPreviewProduct, setShowPreviewProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const [adminAccess, setAdminAccess] = useState<IAdminDistributorsRole>(createAdminDistributorsRole());
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    getUserAccessRoleByDB();
  }, []);

  useEffect(() => {
    try {
      refreshProductsList();
    } catch (error) {
      console.error(error);
    }
  }, [productsParams.offset]);

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

  async function refreshProductsList() {
    try {
      const { offset } = productsParams;
      const productsCount = await getAllProductsCount(inputValue);
      const productsList = await getAllProductsArray(offset, inputValue);
      setProductsParams({
        ...productsParams,
        count: productsCount
      });
      setProducts(productsList);
    } catch (error) {
      console.error(error);
    }
  }

  const changePageProductsList = (page: number) => {
    setProductsParams({
      ...productsParams,
      offset: page * 100,
    });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['data-container']}>
        <div className={styles['content-section']}>
          <div className={styles['main-header-section']}>
            <h2 className={styles['content-title']}>Listado de productos</h2>
            <div className={styles['pagination-section']}>
              <Pagination
                changePage={changePageProductsList}
                currentPage={productsParams.offset / 100}
                totalPage={Math.ceil(productsParams.count / 100)}
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
                setShowCreateProduct(true);
              }}
            >
              <IoIosAddCircleOutline
                size={25}
                color='#691ACA'
              />{' '}
              Agregar producto
            </div>
          </div>
          {
            products.length > 0 &&
            <div className={styles['table-content']}>
              <table className={styles['gonvar-table']}>
                <thead className={styles['gonvar-table__thead']}>
                  <tr className={styles['gonvar-table__row']}>
                    <th className={styles['gonvar-table__th']}>Producto</th>
                    <th className={styles['gonvar-table__th']}>Precio por defecto</th>
                    <th className={styles['gonvar-table__th']}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((p, i) => {
                      return <tr
                        className={styles['gonvar-table__row']}
                        key={`distributor_${i}`}
                      >
                        <td className={styles['gonvar-table__data']}>
                          {
                            p.name
                          }
                        </td>
                        <td className={styles['gonvar-table__data']}>
                          {
                            Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(p.default_price)
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
                                setSelectedProduct(p);
                                setShowPreviewProduct(true);
                              }}
                            >
                              Visualizar
                            </button>
                            <button
                              className={styles['gonvar-table__button']}
                              onClick={(e) => {
                                setSelectedProduct(p);
                                setShowUpdateProduct(true);
                              }}
                            >
                              Modificar
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
            products.length === 0 &&
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
        showCreateProduct &&
        <Modal
          child={
            <CreateProductModal
              onClose={() => {
                setShowCreateProduct(false)
              }}
              onCreate={(canCreate) => {
                if (canCreate) {
                  setNewProduct({
                    name: '',
                    default_price: 0,
                    product_id: 0
                  });
                  refreshProductsList();
                }
              }}
              newProduct={newProduct}
              modifyNewProduct={setNewProduct}
            />
          }
          show={showCreateProduct}
          compactSize={true}
        />
      }
      {
        (showPreviewProduct && selectedProduct !== null) &&
        <Modal
          child={
            <ShowProductModal
              onClose={() => {
                setShowPreviewProduct(false);
              }}
              product={selectedProduct}
            />
          }
          onClose={() => {
            setShowPreviewProduct(false);
          }}
          show={showPreviewProduct}
          compactSize={true}
        />
      }
      {
        (showUpdateProduct && selectedProduct !== null) &&
        <Modal
          child={<UpdateProductModal
            modifyProduct={setSelectedProduct}
            onClose={() => {
              setShowUpdateProduct(false);
            }}
            onUpdate={(success) => {
              if (success) {
                refreshProductsList();
                setSelectedProduct(null);
              }
            }}
            product={selectedProduct}
          />}
          show={showUpdateProduct}
          compactSize={true}
        />
      }
    </div>)
}