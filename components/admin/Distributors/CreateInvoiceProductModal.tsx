
import { useEffect, useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import s2 from './CreateInvoiceProductModal.module.css';

import { createProductInvoice, generateSellOfAccess, getAllSellers, getSellersList } from './Queries';
import Image from 'next/image';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { Product } from '../Landing/ProductsSection/IProductsSection';

type CreateInvoiceAccessModalProps = {
  productInvoice: IProductInvoice
  modifyProductInvoice: (productInvoice: IProductInvoice) => void
  onClose: () => void
  onCreate: (canCreate: boolean) => void
}

export const CreateInvoiceProductModal = ({
  productInvoice,
  onClose,
  onCreate,
  modifyProductInvoice
}: CreateInvoiceAccessModalProps) => {

  const [userUseRegisterButton, setUserUseRegisterButton] = useState(false);
  const [productsRequestIsFinish, setProductsRequestIsFinish] = useState(false);
  const [haveSuccessAtCreate, setHaveSuccessAtCreate] = useState(false);
  const [sellers, setSellers] = useState<{ email: string; seller_id: number; }[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);


  const { distributorId, sellerId, products: invoiceProducts, date } = productInvoice;

  useEffect(() => {
    const today = new Date().toJSON().slice(0, 10);
    modifyProductInvoice({
      ...productInvoice,
      date: today
    });
    refreshSellersList();
  }, []);

  const isValidRequestValues = () => {
    const validProductsNumber = invoiceProducts.some((d) => d.count > 0);
    const validDate = date !== '';
    const validSellerId = sellerId !== 0;
    return validDate && validProductsNumber && validSellerId;
  };

  const refreshSellersList = async () => {
    const sellers = await getAllSellers();
    setSellers(sellers);
  }

  const total = invoiceProducts.reduce((pv, cv) => {
    return pv + (cv.price * cv.count);
  }, 0);

  function getEnableToAddProducts(): IProduct[] {
    const selectedProducIds = invoiceProducts.map(p => p.productId);
    return products.filter(p => !selectedProducIds.includes(p.product_id));
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

  return (
    <div className={s['main-container']}>
      <div className={`${s['views']} ${productsRequestIsFinish ? s['transition-active'] : ''}`}>
        <div className={s['container']}>
          <div className={s['header']}>
            <h2 className={s['title']}>Registrar compra de producto</h2>
            <h3 className={s['subtitle']}>Estos son los detalles de la venta</h3>
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
                  Vendedor
                </div>
                <div className={s2['product-sell-data-value']}>
                  <select
                    style={{
                      width: '100%',
                      padding: '4px',
                      borderRadius: '16px',
                      paddingLeft: '12px'
                    }}
                    value={sellerId}
                    onChange={(e) => {
                      const { value } = e.target;
                      const selectedSellerId = parseInt(value) || 0;
                      modifyProductInvoice({
                        ...productInvoice,
                        sellerId: selectedSellerId
                      });
                    }}
                  >
                    <option value="0" disabled>Escoge un vendedor</option>
                    {
                      sellers.map((s, index) => {
                        const { email, seller_id } = s;
                        return <option
                          value={seller_id}
                          key={`seller_${seller_id}`}
                        >
                          {email}</option>
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
            <hr />
            {
              enabledToAddProducts.length > 0 &&
              <div className={s2['product-search-container']}>
                <h3 className={s2['product-search-title']}>
                  Busca un producto
                </h3>
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
                    <div className={s2['product-search-catalog-container']}>
                      {
                        enabledToAddProducts.map((p, index) => {
                          return (<div
                            key={`product-item-${p.product_id + '' + index}`}
                            className={s2['product-search-catalog-item']}
                          >
                            <div className={s2['product-search-catalog-item-image-container']}>
                              {
                                p.image !== null &&
                                <Image
                                  src={p.image}
                                  width={100}
                                  height={100}
                                />
                              }
                            </div>
                            <div className={s2['']}>
                              <p
                                className={s2['product-search-catalog-item-text']}
                              >{
                                  p.name
                                }</p>
                              <button
                                className={s2['button']}
                                onClick={(e) => {
                                  addProductToSelectedProductList(p);
                                }}
                              >Agregar</button>
                            </div>
                          </div>);
                        })
                      }
                    </div>
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
                        return (
                          <tr
                            className={s['gonvar-table__row']}
                            key={`table-row-detail-${sp.productId}`}
                          >
                            <td className={s['product']}>
                              <div className={s2['product-search-catalog-item-image-container']}>
                                {
                                  products.find(p => p.product_id === sp.productId)?.image !== null &&
                                  <Image
                                    src={products.find(p => p.product_id === sp.productId)?.image || ''}
                                    width={80}
                                    height={80}
                                  />
                                }
                              </div>
                              <p style={{
                                margin: '0',
                                textAlign: 'center',
                                marginTop: '8px'
                              }}>
                                {
                                  products.find(p => p.product_id === sp.productId)?.name
                                }
                              </p>
                            </td>
                            <td className={`${s['gonvar-table__data']}`}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px'
                              }}>
                                <button
                                  className={s['count-button']}
                                  onClick={(e) => {
                                    if (userUseRegisterButton) {
                                      return;
                                    }

                                    const newProducts = invoiceProducts.map(p => {
                                      if (p.productId !== sp.productId) {
                                        return p;
                                      }
                                      if (p.count === 0) {
                                        return p;
                                      }
                                      return {
                                        ...p,
                                        count: p.count - 1
                                      }
                                    });

                                    modifyProductInvoice({
                                      ...productInvoice,
                                      products: newProducts
                                    });
                                  }}
                                >
                                  -
                                </button>
                                <span>
                                  {
                                    invoiceProducts.find(cp => cp.productId === sp.productId)?.count
                                  }
                                </span>
                                <button
                                  className={s['count-button']}
                                  onClick={(e) => {
                                    if (userUseRegisterButton) {
                                      return;
                                    }
                                    const newProducts = invoiceProducts.map(p => {
                                      if (p.productId !== sp.productId) {
                                        return p;
                                      }
                                      return {
                                        ...p,
                                        count: p.count + 1
                                      }
                                    });

                                    modifyProductInvoice({
                                      ...productInvoice,
                                      products: newProducts
                                    });
                                  }}
                                >
                                  +
                                </button>
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
                                    padding: '4px',
                                    paddingLeft: '14px'
                                  }}
                                  placeholder='precio'
                                  type="number"
                                  value={`${sp.price}`}
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
                                    })
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
                                className={`${s2['button']} ${s2['button--red']} ${s2['button-circle']}`}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: '16px',
                                  padding: '4px',
                                  gap: '8px'
                                }}
                                onClick={(e) => {
                                  console.log({
                                    sp
                                  });
                                  // TODO
                                  removeProductToSelectedProductList(sp.productId);
                                }}
                              >
                                <IoIosRemoveCircleOutline
                                  size={25}
                                />{' '}
                                <p
                                  style={{
                                    margin: '0',
                                    fontWeight: '500'
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
              textAlign: 'end',
              color: 'gray',
              fontWeight: 'bold',
              fontSize: '20px',
              paddingRight: '24px',
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
                  const canCreateInvoice = await createProductInvoice(productInvoice);
                  setHaveSuccessAtCreate(canCreateInvoice);
                  setProductsRequestIsFinish(true);
                }}
              >
                Registrar
              </div>
            </div>
          </div>
        </div>
        <div className={s['result-petition-section']}>
          <div className={s['result-petition-container']}>
            <div className={`${s['result-petition-icon']} ${s[`result-petition-icon--${haveSuccessAtCreate ? 'approve' : 'not-approve'}`]}`}>
              {
                haveSuccessAtCreate === true ? '✔' : '!'
              }
            </div>
            <h3 className={s['result-petition-title']}>
              {
                haveSuccessAtCreate ?
                  '¡Se ha registrado la factura con exito!'
                  : '¡No se ha logrado crear la factura de los productos!'
              }
            </h3>
            <h4 className={s['result-petition-subtitle']}>
              {
                haveSuccessAtCreate ?
                  'Ahora el distribuidor tiene una nueva factura de productos'
                  : 'Intente de nuevo esta acción'
              }
            </h4>
            <div className={s['result-petition-buttons']}>
              <button
                className={s['result-petition-button']}
                onClick={(e) => {
                  onCreate(haveSuccessAtCreate);
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