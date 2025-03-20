import s from './InvoiceAccessModal.module.css';

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

  const { sell_at, seller_email, product_count, product_total_amount, products, is_confirmed, send_cost, discount } = productInvoiceRecord;

  const total = products
    .map(p => p.count * p.price)
    .reduce((pv, cv) => { return pv + cv }, 0)
    * (1 - (discount / 100)) + send_cost;

  /*
    const total = (invoiceProducts.reduce((pv, cv) => {
      return pv + (cv.price * cv.count);
    }, 0) * (1 - (discount / 100))) + send_cost; // + send_cost
  */

  return (
    <div
      className={s['container']}
    >
      <div className={s['header']}>
        <h2 className={s['title']}>Factura</h2>
        <h3 className={s['subtitle']}>Revisa los detalles de este presupuesto</h3>
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
            }}>Responsable</div>
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
            }}>Estado</div>
            <div>
              {
                is_confirmed ? 'Confirmado' : 'Sin confirmar'
              }
            </div>
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
            }}>Descuento</div>
            <div>
              {
                `${discount}%`
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
                <th style={{ paddingInline: '5px' }}>Producto</th>
                <th style={{ paddingInline: '5px' }}>Precio</th>
                <th style={{ paddingInline: '5px' }}>Cantidad</th>
                <th style={{ paddingInline: '5px' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((p, index) => {
                  const { product_id, product_name, price, count } = p;
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
                        <p style={{
                          margin: '0'
                        }}>{product_name}</p>
                      </div>
                    </td>
                    <td style={{
                      textAlign: 'center'
                    }}>
                      {`$${price.toFixed(2)}`}
                    </td>
                    <td style={{
                      textAlign: 'center'
                    }}>
                      {count}
                    </td>
                    <td style={{
                      textAlign: 'center'
                    }}>
                      {`$${(count * price).toFixed(2)}`}
                    </td>
                  </tr>)
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {
                    `$${(products.map((p) => p.count * p.price).reduce((pv, cv) => { return pv + cv }, 0)).toFixed(2)}`
                  }
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            fontSize: '20px',
            color: '#6310C8',
            fontWeight: 'bold'
          }}>Costo de envio</div>
          <div>
            {
              Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(send_cost)
            }
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            fontSize: '20px',
            color: '#6310C8',
            fontWeight: 'bold'
          }}>Total de la venta</div>
          <div style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '22px'
          }}>
            {
              Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)
            }
          </div>
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