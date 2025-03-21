
import { useEffect, useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import s2 from './CreateInvoiceProductModal.module.css';

import { createProductInvoice, getAllProducts, getAllSellers, getProducts, updateProductInvoice } from './Queries';
import Image from 'next/image';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { getGenericQueryResponse } from '../../api/admin';

type CreateInvoiceAccessModalProps = {
  productInvoice: IProductInvoice
  modifyProductInvoice: (productInvoice: IProductInvoice) => void
  onClose: () => void
  onCreate: (canCreate: boolean) => void
  productInvoiceOption: 'create' | 'update'
}

export const CreateInvoiceProductModal = ({
  productInvoice,
  onClose,
  onCreate,
  modifyProductInvoice,
  productInvoiceOption,
}: CreateInvoiceAccessModalProps) => {

  const [userUseRegisterButton, setUserUseRegisterButton] = useState(false);
  const [productsRequestIsFinish, setProductsRequestIsFinish] = useState(false);
  const [haveSuccessAtFinish, setHaveSuccessAtFinish] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([]);

  const { distributorId, sellerId, products: invoiceProducts, is_confirmed, send_cost, date, discount } = productInvoice;

  const [productName, setProductName] = useState('');
  const [productNameDebounced, setProductNameDebounced] = useState('');

  useEffect(() => {
    const today = new Date().toJSON().slice(0, 10);
    modifyProductInvoice({
      ...productInvoice,
      date: today,
      distributorId
    });
    getUserData();
    refreshListOfProducts();
    loadAllProducts();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setProductNameDebounced(productName);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [productName]);

  useEffect(() => {
    try {
      refreshListOfProducts();
    } catch (error) {
      console.error(error);
    }
  }, [productNameDebounced]);

  const isValidRequestValues = () => {
    const validProductsNumber = invoiceProducts.some((d) => d.count > 0);
    const validDate = date !== '';
    const validSellerId = sellerId !== 0;
    return validDate && validProductsNumber && validSellerId;
  };

  async function getUserData() {
    try {
      const email = localStorage.getItem('email') || '';
      if (email === '') {
        return;
      }
      const query = `SELECT CONCAT(name, ' ', last_name) AS name, id AS user_id FROM users WHERE email LIKE '${email}'`;
      const response = await getGenericQueryResponse(query);
      const data = response.data.data as { name: string, user_id: number }[];
      if (data.length > 0) {
        const name = data[0]?.name || '';
        setUsername(name);
        const id = data[0]?.user_id || 0;
        modifyProductInvoice({
          ...productInvoice,
          sellerId: id
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const total = (invoiceProducts.reduce((pv, cv) => {
    return pv + (cv.price * cv.count);
  }, 0) * (1 - (discount / 100))) + send_cost; // + send_cost

  function getEnableToAddProducts(): IProduct[] {
    const selectedProducIds = invoiceProducts.map(p => p.productId);
    return searchedProducts.filter(p => !selectedProducIds.includes(p.product_id));
  }

  const enabledToAddProducts = getEnableToAddProducts();

  function addProductToSelectedProductList(product: IProduct) {
    modifyProductInvoice({
      ...productInvoice,
      products: [...invoiceProducts, {
        count: 0,
        productId: product.product_id,
        price: product.default_price
      }]
    })
  }

  function removeProductToSelectedProductList(productId: number) {
    const newSelectedProducts = invoiceProducts.filter(sp => sp.productId !== productId);
    modifyProductInvoice({
      ...productInvoice,
      products: newSelectedProducts
    });
  }

  async function loadAllProducts() {
    try {
      const products = await getAllProducts();
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshListOfProducts() {
    try {
      const products = await getProducts(productName);
      setSearchedProducts(products);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value === "" ? 0 : Number(e.target.value);

    if (newValue !== 0 && (newValue < 0 || newValue > 100)) {
      return;
    }

    modifyProductInvoice({
      ...productInvoice,
      discount: newValue
    });
  };

  return (
    <div className={s['main-container']}>
      <div className={`${s['views']} ${productsRequestIsFinish ? s['transition-active'] : ''}`}>
        <div className={s['container']}>
          <div className={s['header']}>
            <h2 className={s['title']}>Registrar presupuesto</h2>
            <h3 className={s['subtitle']}>Estos son los detalles del presupuesto</h3>
          </div>
          <div className={s['body']}>
            <div className={s2['product-sell-data-container']}>
              <div className={s2['product-sell-data-item']}>
                <div className={s2['product-sell-data-label']}>
                  Fecha
                </div>
                <div className={s2['product-sell-data-value']}>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '4px',
                      borderRadius: '16px',
                      paddingLeft: '12px'
                    }}
                    value={date}
                    onChange={(e) => {
                      const { value } = e.target;

                      modifyProductInvoice({
                        ...productInvoice,
                        date: value
                      });
                    }}
                  />
                </div>
              </div>
              <div className={s2['product-sell-data-item']}>
                <div className={s2['product-sell-data-label']}>
                  Responsable
                </div>
                <div className={s2['product-sell-data-value']}>
                  <label
                    htmlFor=""
                    style={{
                      padding: '8px 2px 4px'
                    }}>
                    {
                      username
                    }
                  </label>
                </div>
              </div>

              <div className={s2['product-sell-data-item']}>
                <div className={s2['product-sell-data-label']}>
                  Estado
                </div>
                <div className={s2['product-sell-data-value']}>
                  <label
                    htmlFor="is_confirmed"
                    style={{
                      paddingRight: '8px',
                      paddingTop: '4px',
                      userSelect: 'none'
                    }}
                  >
                    Confirmado
                  </label>
                  <input
                    type="checkbox"
                    className='form-check-input'
                    checked={is_confirmed}
                    id='is_confirmed'
                    style={{
                      width: '24px',
                      height: '24px'
                    }}
                    onChange={(e) => {
                      const { checked } = e.target;
                      console.log({ is_confirmed });
                      modifyProductInvoice({
                        ...productInvoice,
                        is_confirmed: checked
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <hr />
            <h3 className={s2['product-search-title']}>
              Busca un producto
            </h3>
            <div>
              <input
                type="text"
                value={productName}
                onChange={(e) => {
                  const { value } = e.target;
                  setProductName(value);
                }}
                className='form-control'
                style={{
                  marginBlock: '8px'
                }}
                placeholder='Ingrese el nombre del producto'
              />
            </div>
            {
              enabledToAddProducts.length > 0 &&
              <div className={s2['product-search-container']}>
                <div className={s2['product-search-catalog']}>
                  {
                    (products.length === 0 && enabledToAddProducts.length === 0) &&
                    <div>
                      <div>
                        No existen productos para vender.
                      </div>
                    </div>
                  }
                  {
                    enabledToAddProducts.length > 0 &&
                    <table style={{
                      width: '100%'
                    }}>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          enabledToAddProducts.map((p, index) => {
                            return <tr
                              key={`enabled-to-add-product-${p.product_id}-${index}`}
                            >
                              <td>
                                {
                                  p.name
                                }
                              </td>
                              <td>
                                {
                                  p.default_price
                                }
                              </td>
                              <td>
                                <button
                                  // button--small
                                  className={`${s['button']} ${s['button--small']}`}
                                  onClick={(e) => {
                                    addProductToSelectedProductList(p);
                                  }}
                                >
                                  Agregar
                                </button>
                              </td>
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                  }
                </div>
              </div>
            }
            {
              enabledToAddProducts.length === 0 &&
              <p style={{
                padding: '16px',
                border: '1px solid gray',
                borderRadius: '12px',
                textAlign: 'center',
                margin: '0'
              }}>No hay más productos por buscar</p>
            }
            <hr />
            {
              invoiceProducts.length === 0 &&
              <div>
                <div>
                  Seleccione un producto
                </div>
              </div>
            }
            {
              invoiceProducts.length > 0 &&
              <div
                className={s['table-content']}
                style={{
                  overflowY: 'scroll',
                  maxHeight: '300px',
                  marginBottom: '10px',
                  paddingRight: '10px'
                }}
              >
                <table className={s['gonvar-table']}>
                  <thead className={s['gonvar-table__thead']}>
                    <tr className={s['gonvar-table__row']}>
                      <th className={s['gonvar-table__th']}>Producto</th>
                      <th className={s['gonvar-table__th']}>Cantidad</th>
                      <th className={s['gonvar-table__th']}>Precio</th>
                      <th className={s['gonvar-table__th']}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      invoiceProducts.map((sp, index, array) => {
                        const currentProduct = products.find(p => p.product_id === sp.productId);
                        if (currentProduct === undefined) {
                          return <></>;
                        }
                        const { product_id, name, default_price } = currentProduct;
                        const { count, price } = sp;
                        return (
                          <tr
                            className={s['gonvar-table__row']}
                            key={`table-row-detail-${sp.productId}`}
                          >
                            <td className={s['product']}>
                              <p style={{
                                margin: '0',
                                textAlign: 'center',
                              }}>
                                {
                                  name
                                }
                              </p>
                            </td>
                            <td
                              className={`${s['gonvar-table__data']}`}
                              style={{
                                padding: '0px 5px'
                              }}
                            >
                              <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px'
                              }}>
                                <input
                                  type="number"
                                  className='form-control'
                                  style={{
                                    width: '50%',
                                    borderRadius: '24px',
                                    padding: '0px 8px'
                                  }}
                                  value={`${count}`}
                                  onChange={(e) => {
                                    const { value } = e.target;
                                    modifyProductInvoice({
                                      ...productInvoice,
                                      products: productInvoice.products.map(p => {
                                        if (p.productId !== sp.productId) {
                                          return p;
                                        }
                                        return {
                                          ...p,
                                          count: value === '' ? 0 : parseInt(value)
                                        }
                                      })
                                    })
                                  }}
                                  min={0}
                                />
                              </div>
                            </td>
                            <td>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 'min-content'
                              }}>
                                <input
                                  style={{
                                    minWidth: '0',
                                    width: '90px',
                                    border: '1px solid gray',
                                    borderRadius: '16px',
                                    padding: '0px 14px'
                                  }}
                                  placeholder='precio'
                                  type="number"
                                  value={`${price}`}
                                  min={0}
                                  onChange={(e) => {
                                    const { value } = e.target;

                                    const newProductsList = invoiceProducts.map(p => {
                                      if (p.productId !== sp.productId) {
                                        return p;
                                      }
                                      return {
                                        ...p,
                                        price: value === '' ? 0 : parseFloat(value)
                                      }
                                    })

                                    modifyProductInvoice({
                                      ...productInvoice,
                                      products: newProductsList
                                    });
                                  }}
                                />
                                <span
                                  style={{
                                    paddingLeft: '8px'
                                  }}
                                >MXN</span>
                              </div>
                            </td>
                            <td>
                              <div
                                className={`${s2['button']} ${s['button--small']} ${s2['button--red']} ${s2['button-circle']}`}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: '16px',
                                  padding: '0px',
                                  gap: '8px'
                                }}
                                onClick={(e) => {
                                  removeProductToSelectedProductList(sp.productId);
                                }}
                              >
                                <IoIosRemoveCircleOutline
                                  size={25}
                                />{' '}
                                <p
                                  style={{
                                    margin: '0',
                                    fontWeight: '500',
                                  }}
                                >Remover</p>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            paddingBottom: '16px'
          }}>
            {
              // TODO
            }
            <div className={s2['product-sell-data-item']}>
              <div className={s2['product-sell-data-label']}>
                Descuento
              </div>
              <div className={s2['product-sell-data-value']}>
                <input
                  type="number"
                  style={{
                    width: 'calc(100% - 120px)',
                    padding: '4px',
                    borderRadius: '16px',
                    paddingLeft: '12px'
                  }}
                  value={`${discount}`}
                  onChange={handleDiscountChange}
                  min={0}
                  max={100}
                  maxLength={3}
                />
                <span style={{
                  paddingLeft: '15px'
                }} >Por ciento</span>
              </div>
            </div>
            <div className={s2['product-sell-data-item']}>
              <div className={s2['product-sell-data-label']}>
                Costo de envio
              </div>
              <div className={s2['product-sell-data-value']}>
                <input
                  type="number"
                  style={{
                    width: '100%',
                    padding: '4px',
                    borderRadius: '16px',
                    paddingLeft: '12px'
                  }}
                  value={`${send_cost}`}
                  onChange={(e) => {
                    const { value } = e.target;

                    modifyProductInvoice({
                      ...productInvoice,
                      send_cost: value === '' ? 0 : parseFloat(value)
                    });
                  }}
                  min={0}
                  max={100}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
          <div
            className={s['footer']}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <p style={{
              textAlign: 'center',
              color: 'gray',
              fontWeight: 'bold',
              fontSize: '20px',
              paddingRight: '24px',
              margin: '0',
              paddingTop: '6px'
            }}>Total:{' '}
              <span>
                {
                  Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total).slice(1) + ' MXN'
                }</span></p>
            <div className={s['buttons']}>
              <button
                className={s['button']}
                onClick={(e) => {
                  onClose();
                  setUserUseRegisterButton(false);
                }}
              >
                Cerrar
              </button>
              <div
                className={`${s['button']} ${(!isValidRequestValues() || userUseRegisterButton === true)
                  ? s['button--purple-disable']
                  : s['button--purple']}`
                }
                onClick={async (e) => {
                  if (!isValidRequestValues()) {
                    return;
                  }
                  if (userUseRegisterButton) {
                    return;
                  }
                  let result = false;
                  if (productInvoiceOption === 'create') {
                    result = await createProductInvoice(productInvoice);
                  } else {
                    result = await updateProductInvoice(productInvoice);
                  }
                  setHaveSuccessAtFinish(result);
                  setProductsRequestIsFinish(true);
                }}
              >
                {
                  productInvoiceOption === 'create' ? 'Crear' : 'Actualizar'
                }
              </div>
            </div>
          </div>
        </div>
        <div className={s['result-petition-section']}>
          <div className={s['result-petition-container']}>
            <div className={`${s['result-petition-icon']} ${s[`result-petition-icon--${haveSuccessAtFinish ? 'approve' : 'not-approve'}`]}`}>
              {
                haveSuccessAtFinish === true ? '✔' : '!'
              }
            </div>
            <h3 className={s['result-petition-title']}>
              {
                haveSuccessAtFinish ?
                  '¡Se ha registrado la factura con exito!'
                  : '¡No se ha logrado crear la factura de los productos!'
              }
            </h3>
            <h4 className={s['result-petition-subtitle']}>
              {
                haveSuccessAtFinish ?
                  'Ahora el distribuidor tiene una nueva factura de productos'
                  : 'Intente de nuevo esta acción'
              }
            </h4>
            <div className={s['result-petition-buttons']}>
              <button
                className={s['result-petition-button']}
                onClick={(e) => {
                  onCreate(haveSuccessAtFinish);
                  onClose();
                }}
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}