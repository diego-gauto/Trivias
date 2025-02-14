import s from './InvoiceAccessModal.module.css';
import { FaRegCopy } from "react-icons/fa";

type InvoiceAccessModalProps = {
  accessInvoiceRecord: ICodeSell
  onShare: () => void
  onClose: () => void
}

export const InvoiceAccessModal = ({
  accessInvoiceRecord,
  onClose,
  onShare
}: InvoiceAccessModalProps) => {

  console.log({ accessInvoiceRecord });

  const { code_sell_id, created_sell_at, distributor_id, admin_id, details } = accessInvoiceRecord;

  const mensualDetails = details.filter((d) => d.duration_type === 'M')[0];
  const anualDetails = details.filter((d) => d.duration_type === 'A')[0];
  const cuatrimestralDetails = details.filter((d) => d.duration_type === 'C')[0];

  const detailsArray = [mensualDetails, anualDetails, cuatrimestralDetails];

  return (
    <div className={s['container']}>
      <div className={s['header']}>
        <h2 className={s['title']}>Factura</h2>
        <h3 className={s['subtitle']}>Revisa los detalles de esta compra</h3>
      </div>
      <div className={s['body']}>
        <div className={s['table-content']}>
          <table className={s['gonvar-table']}>
            <thead className={s['gonvar-table__thead']}>
              <tr className={s['gonvar-table__row']}>
                <th className={s['gonvar-table__th']}>Tipos de acceso</th>
                <th className={s['gonvar-table__th']}>Código</th>
                <th className={s['gonvar-table__th']}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {
                detailsArray.map((detailElement, index, array) => {
                  if (detailElement === undefined) {
                    return <></>
                  }
                  const haveBorder = index < array.length;
                  return (
                    <tr
                      className={s['gonvar-table__row']}
                      key={`table-row-detail-${detailElement.duration_type}`}
                    >
                      <td className={s['access-type']}>
                        {
                          detailElement.duration_type === 'M'
                            ? 'Mensual'
                            : detailElement.duration_type === 'C'
                              ? 'Cuatrimestral' : 'Anual'
                        }
                      </td>
                      <td className={s['access-codes']}>
                        {
                          detailElement.codes.map((code, index) => {
                            return (
                              <div
                                className={s['access-code']}
                                key={`code-${index}`}
                                onClick={(e) => {
                                  navigator.clipboard.writeText(code.code);
                                }}
                              >
                                {code.code}{' '}<FaRegCopy color='#6310C8' />
                              </div>)
                          })
                        }
                      </td>
                      <td className={s['access-amount']}>
                        MXN{' '}{
                          `${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(detailElement.amount)}`.slice(1)
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className={s['footer']}>
        <div className={s['price']}>
          Total: MXN {
            `${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
              .format(details
                .reduce((pv, cv) => { return pv + (cv.amount * cv.count) }, 0))}`
              .slice(1)
          }
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
    </div>
  );
}