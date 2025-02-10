
import { useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import { generateSellOfAccess } from './Queries';

type CreateInvoiceAccessModalProps = {
  accessInvoice: IAccessInvoice
  modifyAccessInvoice: (accessInvoice: IAccessInvoice) => void
  onClose: () => void
  onCreate: (canCreate: boolean) => void
}

export const CreateInvoiceAccessModal = ({
  accessInvoice,
  onClose,
  onCreate,
  modifyAccessInvoice
}: CreateInvoiceAccessModalProps) => {

  const [userUseRegisterButton, setUserUseRegisterButton] = useState(false);

  const { adminId, distributorId, details } = accessInvoice;

  const isValidRequestValues = () => details.some((d) => d.count > 0);

  const total = details.reduce((pv, cv) => {
    return pv + cv.price;
  }, 0);

  return (
    <div className={s['container']}>
      <div className={s['header']}>
        <h2 className={s['title']}>Registrar accesos</h2>
        <h3 className={s['subtitle']}>Registra los accesos disponibles</h3>
      </div>
      <div className={s['body']}>
        <div className={s['table-content']}>
          <table className={s['gonvar-table']}>
            <thead className={s['gonvar-table__thead']}>
              <tr className={s['gonvar-table__row']}>
                <th className={s['gonvar-table__row']}>Tipo de acceso</th>
                <th className={s['gonvar-table__row']}>Cantidad</th>
                <th className={s['gonvar-table__row']}>Precio</th>
              </tr>
            </thead>
            <tbody>
              {
                details.map((d, index) => {
                  return (
                    <tr
                      key={`access-${index}`}
                      className={s['gonvar-table__row']}
                    >{/*  */}
                      <td className={`${s['access-type']} ${s['gonvar-table__data']}`}>
                        {
                          d.accessType === 'M'
                            ? 'Mensual'
                            : d.accessType === 'C'
                              ? 'Cuatrimestral' : 'Anual'
                        }
                      </td>
                      <td className={`${s['count']} ${s['gonvar-table__data']}`}>
                        <button
                          className={s['count-button']}
                          onClick={(e) => {
                            if (userUseRegisterButton) {
                              return;
                            }
                            const { accessType } = d;
                            modifyAccessInvoice({
                              ...accessInvoice,
                              details: details.map(d => {
                                if (d.accessType !== accessType) {
                                  return d;
                                }
                                if ((d.count - 1) === -1) {
                                  return d;
                                }
                                return {
                                  ...d,
                                  count: d.count - 1
                                }
                              })
                            });
                          }}
                        >
                          -
                        </button>
                        <span>
                          {
                            details.find((detail) => detail.accessType === d.accessType)?.count
                          }
                        </span>
                        <button
                          className={s['count-button']}
                          onClick={(e) => {
                            if (userUseRegisterButton) {
                              return;
                            }
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
                          }}
                        >
                          +
                        </button>
                      </td>
                      <td className={`${s['gonvar-table__data']}`}>
                        <div className={`${s['access-amount']}`}>
                          <span className={`${s['access-amount-label']}`}>
                            MXN
                          </span>
                          <input
                            type="number"
                            className={`${s['access-amount-input']}`}
                            min={0}
                            value={`${parseInt(d.price + '')}`}
                            onChange={(e) => {
                              const { value } = e.target;
                              const newValue = value === '' ? 0 : parseInt(value);
                              console.log({ value });
                              console.log({ newValue });
                              modifyAccessInvoice({
                                ...accessInvoice,
                                details: details.map((newDetail) => {
                                  if (newDetail.accessType !== d.accessType) {
                                    return newDetail;
                                  }
                                  const result = {
                                    ...newDetail,
                                    price: newValue
                                  }
                                  console.log({ result });
                                  return result;
                                })
                              })
                            }}
                            disabled={userUseRegisterButton}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <th
                  colSpan={2}
                  style={{
                    textAlign: 'end',
                    paddingRight: '46px',
                    color: '#691ACA',
                    fontSize: '18px'
                  }}
                >Total{' '}</th>
                <td
                  className={`${s['gonvar-table__data']}`}
                  style={{
                    textAlign: 'center',
                    fontWeight: '500'
                  }}
                >
                  MXN{' '}
                  {
                    Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total).slice(1)
                  }
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
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
              setUserUseRegisterButton(true);
              const detailsFiltered = details.filter((d) => d.count > 0);
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
              // USAR EL RESULTADO PARA MOSTRAR UNA PANTALLA DE EXITO O FRACASO
              // TODO
            }}
          >
            Registrar
          </div>
        </div>
      </div>
    </div>
  );
}