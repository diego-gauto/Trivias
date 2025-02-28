import Image from 'next/image';
import s from './InvoiceAccessModal.module.css';
import { FaRegCopy } from "react-icons/fa";

type InvoiceAccessModalProps = {
  productInvoiceRecord: IProductSellHistory
  onShare: () => void
  onClose: () => void
}

export const InvoiceProductModal = ({
  productInvoiceRecord,
  onClose,
  onShare
}: InvoiceAccessModalProps) => {

  console.log({ productInvoiceRecord });

  const { sell_at, seller_email, product_count, product_total_amount, products } = productInvoiceRecord;

  return (
    <div className={s['container']}>
      <div className={s['header']}>
        <h2 className={s['title']}>Factura</h2>
        <h3 className={s['subtitle']}>Revisa los detalles de esta compra</h3>
      </div>
      <div className={s['body']}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              fontSize: '20px',
              color: '#6310C8',
              fontWeight: 'bold'
            }}>Fecha de venta</div>
            <div>{sell_at}</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              fontSize: '20px',
              color: '#6310C8',
              fontWeight: 'bold'
            }}>Vendedor</div>
            <div>{seller_email}</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              fontSize: '20px',
              color: '#6310C8',
              fontWeight: 'bold'
            }}>Productos vendidos</div>
            <div>{product_count}</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              fontSize: '20px',
              color: '#6310C8',
              fontWeight: 'bold'
            }}>Total de la venta</div>
            <div>
              {
                Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(product_total_amount)
              }
            </div>
          </div>
        </div>
        <hr />
        <div className={s['table-content']}>
          <table className={s['gonvar-table']}>
            <thead
              style={{
                textAlign: 'center'
              }}
              className={s['gonvar-table__thead']}>
              <tr className={s['gonvar-table__row']}>
                <th>Producto</th>
                <th>Precio vendido</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((p, index) => {
                  const { product_id, product_name, product_image, price, count } = p;
                  return (<tr
                    className={s['gonvar-table__row']}
                    key={`product_${p.product_id}`}
                  >
                    <td className={s['product-item']}>
                      <div
                        className={s['product-item-container']}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                          paddingTop: '8px'
                        }}
                      >
                        {
                          product_image === '' ?
                            <Image
                              src={'/images/profile/default_img.png'}
                              width={50}
                              height={50}
                            />
                            :
                            <Image
                              src={product_image}
                              width={50}
                              height={50}
                            />
                        }
                        <p style={{
                          margin: '0'
                        }}>{product_name}</p>
                      </div>
                    </td>
                    <td style={{
                      textAlign: 'center'
                    }}>
                      {price}
                    </td>
                    <td style={{
                      textAlign: 'center'
                    }}>
                      {count}
                    </td>
                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className={s['buttons']}>
        <button
          className={s['button']}
          onClick={(e) => {
            onClose();
          }}
        >
          Cerrar
        </button>{/* button--purple */}
        <button
          className={`${s['button']} ${s['button--purple']}`}
          onClick={(e) => {
            onShare();
          }}
        >
          Compartir
        </button>
      </div>
    </div>
  );
}