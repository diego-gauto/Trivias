import s from './InvoiceAccessModal.module.css';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const { sell_at, seller_email, product_count, product_total_amount, products, is_confirmed, send_cost, discount, product_sell_id } = productInvoiceRecord;

  const total = products
    .map(p => p.count * p.price)
    .reduce((pv, cv) => { return pv + cv }, 0)
    * (1 - (discount / 100)) + send_cost;

  const subtotalWithoutDiscount = (products.map((p) => p.count * p.price).reduce((pv, cv) => { return pv + cv }, 0));
  const subtotalWithDiscount = products
    .map(p => p.count * p.price)
    .reduce((pv, cv) => { return pv + cv }, 0)
    * (1 - (discount / 100));

  const presupuesto = {
    fecha: sell_at,
    responsable: seller_email,
    estado: is_confirmed === true ? "Confirmado" : "No confirmado",
    productos: /*[
      { nombre: "Producto A", precio: 100, cantidad: 2 },
      { nombre: "Producto B", precio: 50, cantidad: 1 },
    ]*/
      products.map((p, index) => {
        const { product_name, count, price } = p;
        return {
          nombre: product_name,
          precio: price,
          cantidad: count
        }
      }),
    descuento: discount, // 10%
    envio: send_cost,
  };

  const formatedNumber = (value: number) => {
    return `${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)}`;
  }

  const generarPDF = () => {
    const doc = new jsPDF();

    const parts = presupuesto.fecha.split('-');
    const newDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    const leftPart = `Presupuesto N° ${`${product_sell_id}`.padStart(6, '0')}`;
    const rightPart = `Fecha: ${newDate}`;
    const firstText = [rightPart, leftPart].join(` `.repeat(45));

    doc.setFont("helvetica", "bold");
    doc.text(firstText, 14, 20);

    doc.setFont("helvetica", "normal");
    doc.text(`Responsable: ${presupuesto.responsable}`, 14, 40);
    doc.text(`Estado: ${presupuesto.estado}`, 14, 50);

    const productosTabla = presupuesto.productos.map((p) => [
      p.nombre,
      `${formatedNumber(parseFloat(p.precio.toFixed(2)))}`,
      p.cantidad,
      `${formatedNumber(parseFloat((p.precio * p.cantidad).toFixed(2)))}`,
    ]);

    const subtotalDeProductos = presupuesto.productos
      .map((p) => p.cantidad * p.precio)
      .reduce((pv, cv) => { return pv + cv }, 0);

    productosTabla.push(['', '', '', formatedNumber(subtotalDeProductos)]);

    autoTable(doc, {
      startY: 60,
      head: [["Producto", "Precio", "Cantidad", "Subtotal"]],
      body: productosTabla,
    });

    const subtotal = presupuesto.productos.reduce(
      (acc, p) => acc + p.precio * p.cantidad,
      0
    );
    const descuento = (subtotal * presupuesto.descuento) / 100;
    const total = subtotal - descuento + presupuesto.envio;

    const y = 240;

    doc.setFont("helvetica", "bold")

    const spaceToEnd = 100;

    doc.text(`Subtotal: ${formatedNumber(parseFloat(subtotal.toFixed(2)))}`, spaceToEnd + 14, y + 10);
    doc.text(`Descuento (${presupuesto.descuento}%): -${formatedNumber(parseFloat(descuento.toFixed(2)))}`, spaceToEnd + 14, y + 20);
    doc.text(`Costo de Envío: ${formatedNumber(parseFloat(presupuesto.envio.toFixed(2)))}`, spaceToEnd + 14, y + 30);
    doc.text(`Total: ${formatedNumber(parseFloat(total.toFixed(2)))}`, spaceToEnd + 14, y + 40);

    doc.save("presupuesto.pdf");
    console.log('Se ha descargado el pdf');
  };

  return (
    <div
      className={s['container']}
    >
      <div className={s['header']}>
        <h2 className={s['title']}>Presupuesto</h2>
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
        </div>
        <hr />
        <div
          className={s['table-content']}
          style={{
            overflowY: 'scroll',
            height: '200px'
          }}
        >
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
                      {`${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price)}`}
                    </td>
                    <td style={{
                      textAlign: 'center'
                    }}>
                      {count}
                    </td>
                    <td style={{
                      textAlign: 'center'
                    }}>
                      {`${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(count * price)}`}
                      {
                        // {`${}`}
                      }
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
                    `${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(subtotalWithoutDiscount)}`
                  }
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                >
                  <p style={{
                    margin: '0',
                    textAlign: 'end',
                    paddingRight: '16px'
                  }}>
                    Descuento de <strong>{`${discount}%`}</strong>{' '}
                    <strong>
                      (
                      {
                        `${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(((subtotalWithoutDiscount * (1 - (discount / 100))) + subtotalWithoutDiscount * -1))}`
                      }
                      )
                    </strong>
                  </p>
                </td>
                <td style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {
                    `${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(subtotalWithDiscount)}`
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
            generarPDF();
            onShare();
          }}
        >
          Descargar
        </button>
      </div>
    </div>
  );
}