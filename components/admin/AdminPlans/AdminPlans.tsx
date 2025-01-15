import { useState } from 'react';
import { DefaultContainer } from '../DefaultComponents/DefaultComponents.styled';
import { AdminContain } from '../SideBar.styled';

interface IGroup {
  title: string;
  frequencyLabel: string;
  frequency: string;
  values: {
    v: number;
    price: number;
    selected: boolean;
  }[];
}

const links: IGroup[] = [
  {
    title: 'Mensuales',
    frequency: 'month',
    frequencyLabel: 'mensual',
    values: [
      {
        price: 149,
        v: 1,
        selected: false,
      },
      {
        price: 249,
        v: 2,
        selected: false,
      },
      {
        price: 459,
        v: 3,
        selected: false,
      },
      {
        price: 759,
        v: 4,
        selected: false,
      }
    ],
  },
  {
    title: 'Cuatrimestrales',
    frequency: 'cuatrimestral',
    frequencyLabel: 'cuatrimestral',
    values: [
      {
        price: 1599,
        v: 3,
        selected: false,
      },
      {
        price: 2599,
        v: 4,
        selected: false,
      },
    ],
  },
  {
    title: 'Anuales',
    frequency: 'anual',
    frequencyLabel: 'anual',
    values: [
      {
        price: 1599,
        v: 1,
        selected: false,
      },
      {
        price: 3497,
        v: 3,
        selected: false,
      },
      {
        price: 5697,
        v: 4,
        selected: false,
      },
    ],
  },
];

const generateLink = (value: { frequency: string; v: number }) => {
  const { origin } = window.location;
  const link = `${origin}/purchase?type=subscription&frequency=${value.frequency}&v=${value.v}`;
  return link;
};

const changeSelectedValue = (indexX: number, indexY: number) => {
  const newLinks = links.map((group, indexGroupX) => {
    return {
      ...group,
      values: group.values.map((value, indexValueY) => {
        if (indexGroupX === indexX && indexValueY === indexY) {
          return {
            ...value,
            selected: true,
          };
        }
        return {
          ...value,
        };
      }),
    };
  });
  console.log({ newLinks });
  return newLinks;
};

const AdminPlans = () => {
  const [link, setLink] = useState<string>('');
  const [values, setValues] = useState(links);

  return (
    <>
      <AdminContain>
        <DefaultContainer>
          <div
            style={{
              padding: '25px',
            }}
          >
            <h2
              style={{
                fontWeight: 'bold',
              }}
            >
              Enlaces a planes
            </h2>
            <p
              style={{
                fontSize: '20px',
              }}
            >
              Da clic en cualquier opción para copiar el enlace
            </p>

            {
              // Enlace copiado tras dar clic a los enlaces
              link === '' ? (
                <p
                  style={{
                    fontSize: '18px',
                    color: '#bb2222',
                    paddingTop: '15px',
                  }}
                >
                  No se ha copiado ningun enlace aún.
                </p>
              ) : (
                <p
                  style={{
                    fontSize: '18px',
                    paddingTop: '15px',
                  }}
                >
                  El enlace copiado fue el de: <br />
                  <span
                    style={{
                      fontSize: '18px',
                      color: '#22bb22',
                      paddingTop: '15px',
                    }}
                  >
                    {link}
                  </span>
                </p>
              )
            }

            {values.map(
              ({ title, frequency, values, frequencyLabel }, indexX) => {
                return (
                  <>
                    <h3
                      style={{
                        paddingTop: '20px',
                      }}
                    >
                      Planes {title}
                    </h3>
                    <ul>
                      {values.map(({ price, v, selected }, indexY) => {
                        const colorValue = selected ? '#22bb22' : 'black';
                        const bolderOrNot = selected ? 'bolder' : 'inherit';
                        return (
                          <li
                            style={{
                              fontSize: '22px',
                              padding: '8px 0px',
                              color: colorValue,
                              fontWeight: bolderOrNot,
                            }}
                            onClick={() => {
                              const url = generateLink({ frequency, v });
                              setLink(url);
                              setValues(changeSelectedValue(indexX, indexY));
                              navigator.clipboard.writeText(url);
                            }}
                          >
                            Checkout directo a la suscripción {frequencyLabel}{' '}
                            de ${price}
                          </li>
                        );
                      })}
                    </ul>
                    <hr />
                  </>
                );
              },
            )}

            {/*
            <h3 style={{
            paddingTop: '20px'
          }}>Planes mensuales</h3>
          <ul style={{
            backgroundColor: ''
          }}>
            <li style={{
              fontSize: '22px'
            }}>Checkout directo a la suscripción mensual de $149</li>
          </ul>
          <hr />
            */}
          </div>
        </DefaultContainer>
      </AdminContain>
    </>
  );
};

export default AdminPlans;
