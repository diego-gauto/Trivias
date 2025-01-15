
import { useState } from 'react';
import styles from './GenerateCodesModalContent.module.css';
// import { createCodes } from '../../../api/admin';
import { generateCodes } from './GenerateCodesApi';

interface IAdmin {
  admin_id: number
  user_id: number
  name: string
  email: string
  phone_number: string
}

interface IDistributor {
  distributor_id: number
  name: string
  phone_number: string
  photo: string
  user_created_at: number
  distributor_created_at: number
  admin_user_id: number
  country: string | null,
  email: string
}

interface IGenerateCodesModalProps {
  distributor: IDistributor | undefined,
  admin: IAdmin | undefined
}

interface IData {
  admin: IAdmin | undefined,
  distributor: IDistributor | undefined,
  details: IDetail[]
}

type Duration = 'M' | 'C' | 'A';

interface IDetail {
  duration_type: Duration,
  count: number,
  amount: number
}

export const GenerateCodesModal = ({
  admin,
  distributor,
}: IGenerateCodesModalProps) => {

  const generateInitialData = (): IData => {
    return {
      admin,
      distributor,
      details: [
        {
          duration_type: 'M',
          amount: 459,
          count: 0,
        },
        {
          duration_type: 'C',
          amount: 1599,
          count: 0,
        },
        {
          duration_type: 'A',
          amount: 3497,
          count: 0,
        },
      ]
    }
  }

  const generateInitialCodesData = (): {
    codeSellId: number,
    mensualCodes: string[],
    cuatrimestralCodes: string[],
    annualCodes: string[]
  } => {

    return {
      codeSellId: 0,
      annualCodes: [],
      cuatrimestralCodes: [],
      mensualCodes: []
    }
  }

  const [sellData, setSellData] = useState<IData>(generateInitialData());
  const [state, setState] = useState<'sell' | 'codes'>('sell');
  const [codes, setCodes] = useState<{
    codeSellId: number,
    mensualCodes: string[],
    cuatrimestralCodes: string[],
    annualCodes: string[]
  }>(generateInitialCodesData());

  const isAbleToContinueToCodes = sellData.details.filter(d => d.count > 0).length > 0;

  if (state === 'sell') {
    return <>
      <div className={styles['main-container']}>
        <div className={styles['header']}>
          <h3 className={styles['title']}>Datos de compra</h3>
        </div>
        <div className={styles['body']}>
          < CodeSell
            data={sellData}
          />
        </div>
        <div className={styles['header']}>
          <h3 className={styles['title']}>Detalles de compra</h3>
          <h4 className={styles['subtitle']}>Accesos de la compra</h4>
        </div>
        <div className={styles['body']}>
          < CodeSellDetail
            data={sellData}
            setData={setSellData}
          />
        </div>
      </div>
      <div className={styles['buttons-container']}>
        <button
          className={`${styles['button']} ${isAbleToContinueToCodes ? '' : styles['button--disabled']}`}
          type="button"
          onClick={() => {
            if (isAbleToContinueToCodes) {
              // Aquí se manda el body a la api de crear codigos
              const body = {
                admin_id: sellData.admin!.admin_id,
                distributor_id: sellData.distributor!.distributor_id,
                details: sellData.details
              }
              console.log(body);
              generateCodes(body).then(res => {
                console.log({ res });
                let codeSellId = res[0]?.code_sell_id || 0;
                const mensualCodes = res
                  .filter(code => code.duration_type === 'M')
                  .map(code => code.code.toUpperCase());
                const cuatrimestralCodes = res
                  .filter(code => code.duration_type === 'C')
                  .map(code => code.code.toUpperCase());
                const annualCodes = res
                  .filter(code => code.duration_type === 'A')
                  .map(code => code.code.toUpperCase());

                const codesResult = {
                  codeSellId,
                  mensualCodes,
                  cuatrimestralCodes,
                  annualCodes
                }

                setCodes(codesResult);
                setState('codes');
              });
            }
          }}
        >
          Aceptar
        </button>
      </div >
    </>
  }

  const generateTitleByDurationType = (durationType: Duration) => {
    return durationType === 'M' ? 'Mensual' : durationType === 'C' ? 'Cuatrimestral' : 'Anual'
  }

  return <>
    <div className={styles['main-container']}>
      <div className={styles['header']}>
        <h3 className={styles['title']}>Codigos generados</h3>
      </div>
      <div className={styles['body']}>
        {
          /*
          {
          sellData.details
            .filter(d => d.count > 0)
            .map((d, index) => {
              return <div
                className={styles['codes-section']}
                key={`detail-code-${d.duration_type}-${index}`}>

                <h4 className={styles['subtitle']}>
                  {
                    generateTitleByDurationType(d.duration_type)
                  }
                </h4>
                <ol className={styles['order-list']}>
                  {
                    generateSequence(d.count).map((v, index) => {
                      return <li className={styles['order-list-item']} key={`sequence_${index}`}>
                        {
                          generateUUID()
                            .split('-')
                            .filter((uuid, index) => index < 2)
                            .join('')
                            .toUpperCase()
                        }
                      </li>
                    })
                  }
                </ol>
              </div>
            })
        }
          */
        }
        {
          (codes.codeSellId !== 0 &&
            codes.annualCodes.length > 0
          ) &&
          < div
            className={styles['codes-section']}
          >
            <h4 className={styles['subtitle']}>
              {
                generateTitleByDurationType('A')
              }
            </h4>
            <ol className={styles['order-list']}>
              {
                codes.annualCodes.map((code, index) => {
                  return <li className={styles['order-list-item']} key={`sequence_${index}`}>
                    {code.toUpperCase()}
                  </li>
                })
              }
            </ol>
          </div>
        }
        {
          (codes.codeSellId !== 0 &&
            codes.cuatrimestralCodes.length > 0
          ) &&
          < div
            className={styles['codes-section']}
          >
            <h4 className={styles['subtitle']}>
              {
                generateTitleByDurationType('C')
              }
            </h4>
            <ol className={styles['order-list']}>
              {
                codes.cuatrimestralCodes.map((code, index) => {
                  return <li className={styles['order-list-item']} key={`sequence_${index}`}>
                    {code.toUpperCase()}
                  </li>
                })
              }
            </ol>
          </div>
        }
        {
          (codes.codeSellId !== 0 &&
            codes.mensualCodes.length > 0
          ) &&
          < div
            className={styles['codes-section']}
          >
            <h4 className={styles['subtitle']}>
              {
                generateTitleByDurationType('M')
              }
            </h4>
            <ol className={styles['order-list']}>
              {
                codes.mensualCodes.map((code, index) => {
                  return <li className={styles['order-list-item']} key={`sequence_${index}`}>
                    {code.toUpperCase()}
                  </li>
                })
              }
            </ol>
          </div>
        }
      </div>
    </div >
    <div className={styles['buttons-container']}>
      <button
        className={`${styles['button']}`}
        type="button"
        onClick={() => {
          let annuals = codes.annualCodes.length > 0 ? `Anuales\n${codes.annualCodes.join('\n')}\n` : '';
          let cuatrimestrals = codes.cuatrimestralCodes.length > 0 ? `Cuatrimestrales\n${codes.cuatrimestralCodes.join('\n')}\n` : '';
          let mensuals = codes.mensualCodes.length > 0 ? `Mensuales\n${codes.mensualCodes.join('\n')}` : '';
          const text = `${annuals}${cuatrimestrals}${mensuals}`;
          navigator.clipboard.writeText(text);
        }}
      >
        Copiar
      </button>
    </div>
  </>
}

interface CodeSellProps {
  data: IData,
}

const CodeSell = ({
  data
}: CodeSellProps) => {
  return <div className={styles['code-sell']}>
    <div className={styles['sell-property']}>
      <p className={styles['sell-property-label']}>Los códigos de acceso serán asignados a:</p>
      <p className={styles['sell-property-value']}>
        {
          data.distributor?.name
        }
      </p>
    </div>
    <div className={styles['sell-property']}>
      <p className={styles['sell-property-label']}>La persona responsable se trata de:</p>
      <p className={styles['sell-property-value']}>
        {
          data.admin?.name
        }
      </p>
    </div>
  </div>
}

interface CodeSellDetailProps {
  data: IData,
  setData: (data: IData) => void
}

const CodeSellDetail = ({ data, setData }: CodeSellDetailProps) => {

  const TYPE_VALUES: Duration[] = ['M', 'C', 'A'];

  const changeDetails = (type: Duration, field: 'amount' | 'count', value: any) => {
    const newDetails = [...data.details.filter(d => d.duration_type !== type)];
    const accessData = data.details.filter(d => d.duration_type === type)[0]!;
    newDetails.push({
      ...accessData,
      [`${field}`]: value,
    });
    const newData: IData = {
      ...data,
      details: newDetails
    }
    setData(newData);
  }

  return <div className={styles['code-sell-details']}>
    {
      TYPE_VALUES.map(type => {
        return <div className={styles['access-detail']} key={`access-detail-${type}`}>
          <p className={styles['access-title']}>Accesos {type === 'M' ? 'mensuales' : type === 'C' ? 'cuatrimestrales' : 'anuales'}</p>
          <div className={styles['access-form']}>
            <p className={styles['access-property-label']}>Cantidad</p>
            <input
              className={styles['access-numeric-input']}
              type="number"
              min={0}
              max={100}
              value={data.details.filter(d => d.duration_type === type)[0]?.count}
              onChange={(e) => {
                const { value } = e.target;
                changeDetails(type, 'count', parseInt(value));
              }}
            />
            <p className={styles['access-property-label']} >Precio por acceso</p>
            <input
              className={styles['access-numeric-input']}
              type="number"
              min={0}
              max={9999}
              value={data.details.filter(d => d.duration_type === type)[0]?.amount}
              onChange={(e) => {
                const { value } = e.target;
                changeDetails(type, 'amount', parseFloat(value));
              }}
            />
          </div>
        </div>
      })
    }
  </div>
}

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID(); // Usa la API nativa si está disponible
  }

  // Fallback para navegadores antiguos
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const generateSequence = (n: number) => Array.from({ length: n }, (_, i) => i + 1);