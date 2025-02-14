
import { useEffect, useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import s2 from './CreateInvoiceProductModal.module.css';

import { generateSellOfAccess } from './Queries';
import Image from 'next/image';
import { IoIosRemoveCircleOutline } from "react-icons/io";

type Product = {
  product_id: number,
  product_name: string,
  default_price: number,
  image_url: string,
}

const PRODUCTS_LIST: Product[] = [
  {
    product_id: 1,
    product_name: 'pintura purpura',
    default_price: 100,
    image_url: '/images/profile/default_img.png'
  },
  {
    product_id: 2,
    product_name: 'pintura negra',
    default_price: 100,
    image_url: '/images/profile/default_img.png'
  },
  {
    product_id: 3,
    product_name: 'pintura roja',
    default_price: 100,
    image_url: '/images/profile/default_img.png'
  },
  {
    product_id: 4,
    product_name: 'pintura azul',
    default_price: 100,
    image_url: '/images/profile/default_img.png'
  }
]

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
  const [codesRequestIsFinish, setCodesRequestIsFinish] = useState(false);
  const [haveSuccessAtCreate, setHaveSuccessAtCreate] = useState(false);

  const { distributorId, sellerId, products, date } = productInvoice;

  const isValidRequestValues = () => {
    const validProductsNumber = products.some((d) => d.count > 0);
    const validDate = date !== '';
    return validDate && validProductsNumber;
  };

  const total = products.reduce((pv, cv) => {
    return pv + (cv.price * cv.count);
  }, 0);

  function getEnableToAddProducts(): Product[] {
    const selectedProducIds = products.map(p => p.productId);
    return PRODUCTS_LIST.filter(p => !selectedProducIds.includes(p.product_id));
  }

  const enabledToAddProducts = getEnableToAddProducts();

  function addProductToSelectedProductList(product: Product) {
    modifyProductInvoice({
      ...productInvoice,
      products: [...products, {
        count: 0,
        productId: product.product_id,
        price: product.default_price
      }]
    })
  }

  function removeProductToSelectedProductList(productId: number) {
    const newSelectedProducts = products.filter(sp => sp.productId !== productId);
    modifyProductInvoice({
      ...productInvoice,
      products: newSelectedProducts
    });
  }

  return (
    <div className={s['main-container']}>
      <div className={`${s['views']} ${codesRequestIsFinish ? s['transition-active'] : ''}`}>
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
                  >
                    <option value="">Leo</option>
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
                    (PRODUCTS_LIST.length === 0 && enabledToAddProducts.length === 0) &&
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
                              <Image
                                src={p.image_url}
                                width={100}
                                height={100}
                              />
                            </div>
                            <div className={s2['']}>
                              <p
                                className={s2['product-search-catalog-item-text']}
                              >{p.product_name}</p>
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
              products.length === 0 &&
              <div>
                <div>
                  Seleccione un producto
                </div>
              </div>
            }
            {
              products.length > 0 &&
              <div className={s['table-content']}>
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
                      products.map((sp, index, array) => {
                        return (
                          <tr
                            className={s['gonvar-table__row']}
                            key={`table-row-detail-${sp.productId}`}
                          >
                            <td className={s['access-type']}>
                              <div className={s2['product-search-catalog-item-image-container']}>
                                <Image
                                  src={PRODUCTS_LIST.find(p => p.product_id === sp.productId)?.image_url || ''}
                                  width={80}
                                  height={80}
                                />
                              </div>
                              <p style={{
                                margin: '0',
                                textAlign: 'center',
                                marginTop: '8px'
                              }}>
                                {
                                  PRODUCTS_LIST.find(p => p.product_id === sp.productId)?.product_name
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

                                    const newProducts = products.map(p => {
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
                                    products.find(cp => cp.productId === sp.productId)?.count
                                    // details.find((detail) => detail.accessType === d.accessType)?.count
                                  }
                                </span>
                                <button
                                  className={s['count-button']}
                                  onClick={(e) => {
                                    if (userUseRegisterButton) {
                                      return;
                                    }
                                    const newProducts = products.map(p => {
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
                                    /*
                                    const { accessType } = d;
                                    modifyAccessInvoice({
                                      ...accessInvoice,
                                      details: details.map(d => {
                                        if (d.accessType !== accessType) {
                                          return d;
                                        }
                                        return {
                                          ...d,
                                          count: d.count + 1
                                        }
                                      })
                                    });
                                    */
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
                                  onChange={(e) => {
                                    const { value } = e.target;

                                    const newProductsList = products.map(p => {
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
                                />
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
          <div className={s['footer']}>
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
                  // TODO registrar venta de producto
                  /*
                  setUserUseRegisterButton(true);
                  const detailsFiltered = products.filter((d) => d.count > 0);
                  const requestBody: ICreateCodeSell = {
                    admin_id: adminId,
                    distributor_id: distributorId,
                    details: detailsFiltered.map((d) => {
                      return {
                        amount: d.price,
                        count: d.count,
                        duration_type: d.accessType
                      }
                    })
                  }
                  const canCreateInvoice = await generateSellOfAccess(requestBody);
                  console.log({ canCreateInvoice });
                  setCodesRequestIsFinish(true);
                  setHaveSuccessAtCreate(canCreateInvoice);
                  */
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
                  : '¡No se ha logrado crear los codigos de acceso!'
              }
            </h3>
            <h4 className={s['result-petition-subtitle']}>
              {
                haveSuccessAtCreate ?
                  'Ahora el distribuidor tiene una nueva factura'
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