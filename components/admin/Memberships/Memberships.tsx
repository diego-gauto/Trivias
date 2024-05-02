import React, { useEffect, useRef, useState } from 'react';
import { AdminContain } from '../SideBar.styled';
import {
  AdminTable2,
  DefaultColumn,
  DefaultContainer,
} from '../DefaultComponents/DefaultComponents.styled';
import Pagination from '../../Pagination/Pagination';
import { ProfileContain, Profile } from '../Pay/Pay.styled';
import {
  Background,
  LoaderContain,
  LoaderImage,
} from '../../../screens/Login.styled';
import {
  getCloseToEndingMembershipUsers,
  getGenericQueryResponse,
} from '../../api/admin';
import {
  generateUserIdQuery,
  generateUserRoleAccessQuery,
  generateUserRolesLevelQuery,
} from '../../GenericQueries/UserRoles/UserRolesQueries';
import {
  Role,
  UserLevelValue,
} from '../../GenericQueries/UserRoles/UserRolesInterfaces';
import { generateMemberhsipsQuery } from './Queries';

interface Memberships {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  method: string;
  final_date: string;
  level: number;
  datediff: number;
}

const jsonToCsv = (items: any) => {
  const header = Object.keys(items[0]);
  const headerString = header.join(',');
  const replacer = (key: any, value: any) => value ?? '';
  const rowItems = items.map((row: any) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(','),
  );
  const csv = [headerString, ...rowItems].join('\r\n');
  return csv;
};

const generateCSVFilename = (name: string) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${name}-${year}-${month + 1}-${day} ${hour}-${minutes}-${seconds}`;
};

const getDateWithNewFormat = (date: Date) => {
  const date1 = [...date.toJSON()].slice(0, 10).join('');
  const date1Parts = date1.split('-');
  const date2 = `${date1Parts[2]}-${date1Parts[1]}-${date1Parts[0]}`;
  const time1 = [...date.toJSON()].slice(11, 19).join('');
  return `${date2} ${time1}`;
};

type LevelFilter = 'TODOS' | 'MENSUAL' | 'CUATRIMESTRAL' | 'ANUAL';

/* 1 serian las mensuales, 4 las anuales y 7 las cuatrimestrales.  */

const levels = {
  MENSUAL: [1, 6],
  CUATRIMESTRAL: [7, 8],
  ANUAL: [4, 5],
  TODOS: [1, 4, 5, 6, 7, 8],
};

const getTextSusctiptionByLevel = (level: number) => {
  if ([1, 6].includes(level)) {
    return 'Mensual';
  } else if ([7, 8].includes(level)) {
    return 'Cuatrimestral';
  }
  return 'Anual';
};

interface UserAccesss {
  canView: boolean;
  canDownload: boolean;
}

const Memberships = () => {
  const today = getDateWithNewFormat(new Date()).slice(0, 10);
  const [hasFiltered, setHasFiltered] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState<Memberships[]>([]);
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState<Memberships[]>([]);
  const memberFilterHTMLSelect = useRef<HTMLSelectElement>(null);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());

  const [userAccess, setUserAccess] = useState<UserAccesss>({
    canDownload: false,
    canView: false,
  });
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');

  const { canDownload, canView } = userAccess;

  const getUserData = async () => {
    try {
      const email = localStorage.getItem('email');
      if (email === null) {
        throw new Error('No existe un email establecido para el usuario');
      }
      const userIdQuery = generateUserIdQuery(email);
      const userIdResponse = await getGenericQueryResponse(userIdQuery);
      const userId = userIdResponse.data.data[0]['id'];
      // Roles request
      const userRolesQuery = generateUserRoleAccessQuery(userId);
      const userRolesResponse = await getGenericQueryResponse(userRolesQuery);
      const userRoles = userRolesResponse.data.data as Role[];
      const role = userRoles.find((role) => role.role === 'memberships_list');
      setUserAccess({
        canView: role?.view === 1,
        canDownload: role?.download === 1,
      });
      // Role level
      const userLevelQuery = generateUserRolesLevelQuery(userId);
      const userLevelResponse = await getGenericQueryResponse(userLevelQuery);
      const userRoleLevel = userLevelResponse.data.data[0]['role'];
      setUserLevel(userRoleLevel);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const downloadListCSVHandler = () => {
    const thereAreData = data.length > 0;

    if (!thereAreData) {
      alert('No hay información que descargar');
      return;
    }

    const membresias = new Map<number, string>();
    membresias.set(6, 'Mensual');
    membresias.set(8, 'Cuatrimestre');
    membresias.set(5, 'Anual');
    const data3 = data.map(
      ({
        name,
        last_name,
        email,
        phone_number,
        method,
        level,
        final_date,
        datediff,
      }) => {
        return {
          nombre_completo: `${name} ${last_name}`,
          correo: email,
          numero: phone_number,
          membresia: getTextSusctiptionByLevel(level),
          metodo: method,
          fecha_termino: getDateWithNewFormat(new Date(final_date)),
          dias_faltantes: datediff,
        };
      },
    );

    const csv = jsonToCsv(data3);
    const fileName = `usuarios-con-membresia-por-terminar`;
    const fileNameResult = generateCSVFilename(fileName);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileNameResult}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filterMembershipsHandler = async () => {
    const membershipValue = memberFilterHTMLSelect.current
      ?.value as LevelFilter;

    const selectedMembership = levels[membershipValue ?? 'TODOS'];

    if (startDate === undefined || finalDate === undefined) {
      alert(
        'Las fechas tienen que ser diferentes y no puede continuar sin ser especificadas.',
      );
      alert('No introduzca fechas previas a hoy.');
      return;
    }

    try {
      setIsLoadingData(false);

      const nowFromServer = `SELECT now() as current_moment;`;

      const responseNow = await getGenericQueryResponse(nowFromServer);

      const millisServer = new Date(
        responseNow.data.data[0]['current_moment'],
      ).getTime();
      const millisClient = new Date().getTime();

      const diffMillisServerClient =
        Math.abs(millisServer - millisClient) / 1000;

      console.log({
        millisServer,
        millisClient,
        dif: millisServer - millisClient,
      });

      const startDateTime = startDate.toJSON().slice(0, 10);
      const finalDateTime = finalDate.toJSON().slice(0, 10);

      const query = generateMemberhsipsQuery(
        startDateTime,
        finalDateTime,
        selectedMembership.join(', '),
      );
      const sds = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
      const fds = `${finalDate.getFullYear()}-${finalDate.getMonth() + 1}-${finalDate.getDate()}`;
      // const query2 = generateMemberhsipsTestQuery(diffMillisServerClient, sds, fds/* , selectedMembership.join(', ') */);
      const response2 = await getGenericQueryResponse(query);
      // const response3 = await getGenericQueryResponse(query2);

      interface IMembership {
        id: number;
        name: string;
        last_name: string;
        email: string;
        phone_number: string;
        final_date: number;
        level: number;
        method: string;
      }

      const data = response2.data.data as IMembership[];

      const mapFuction = (membership: IMembership): Memberships => {
        const fd = new Date(membership.final_date * 1000);
        const formatedFinalDate = `${fd.getFullYear()}-${fd.getMonth() + 1}-${fd.getDate()} ${fd.getHours()}:${fd.getMinutes()}:${fd.getSeconds()}`;
        const millisecondsDiff = new Date(
          new Date(
            fd.getFullYear(),
            fd.getMonth(),
            fd.getDate(),
            fd.getHours(),
            fd.getMinutes(),
            fd.getSeconds(),
          ).getTime() -
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() + 1,
            ).getTime(),
        ).getTime();

        const todayTime = new Date().getTime();
        const fdTime = fd.getTime();

        console.log(`${todayTime} - ${fdTime} = ${todayTime - fdTime}`);

        const datediff = Math.ceil(millisecondsDiff / (1000 * 60 * 60 * 24));

        return {
          ...membership,
          final_date: formatedFinalDate,
          datediff,
        };
      };

      const formatedData = data.map(mapFuction);

      console.log(response2.data.query);

      setData(formatedData);
      setFilteredData(formatedData);
      setIsLoadingData(true);
      setHasFiltered(true);
    } catch (error) {
      console.error(error);
    }
    changePage(0);
  };

  const createNewData = async () => {
    try {
      let year = 2024;
      let month = 0;
      let day = 1;
      let hour = 1;

      let date = new Date(year, month, day, hour);

      let query = `INSERT INTO memberships2 (final_date) VALUES`;
      let values = [];
      let i = 0;
      let value = date.getTime() / 1000;
      while (i < 1200) {
        values.push(`(${value})`);
        value += 60 * 60;
        i++;
      }
      query = `${query} ${values.join(', ')}`;
      console.log({ query });
    } catch (error) {
      console.error(error);
    }
  };

  const changePage = (page: number) => {
    setOffset(page * 100);
  };

  return (
    <AdminContain>
      <DefaultContainer>
        <div className='top-data'>
          <div className='header'>
            <DefaultColumn gap={5}>
              <div className='top-title'>
                <h2 className='title'>Membresias por finalizar</h2>
                {((userLevel === 'admin' && canView) ||
                  userLevel === 'superAdmin') && (
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      textAlign: 'right',
                    }}
                  >
                    Cantidad de usuarios: {data.length}
                  </span>
                )}
              </div>
            </DefaultColumn>
            {((userLevel === 'admin' && canView) ||
              userLevel === 'superAdmin') && (
              <Pagination
                changePage={changePage}
                currentPage={offset / 100}
                totalPage={Math.ceil(filteredData.length / 100)}
              />
            )}
          </div>
          {((userLevel === 'admin' && canView) ||
            userLevel === 'superAdmin') && (
            <div className='bottom-header'>
              <div>
                <label
                  style={{
                    fontSize: '20px',
                  }}
                  htmlFor='memberships-filter'
                >
                  Filtro de membresía
                </label>
                <select
                  ref={memberFilterHTMLSelect}
                  style={{
                    width: '100%',
                    height: '40px',
                  }}
                  name='memberships-filter'
                  id='memberships-filter'
                >
                  <option value='TODOS'>Todos</option>
                  <option value='MENSUAL'>Mensual</option>
                  <option value='CUATRIMESTRAL'>Cuatrimestral</option>
                  <option value='ANUAL'>Anual</option>
                </select>
              </div>
              <form>
                <div>
                  <label
                    style={{
                      fontSize: '20px',
                    }}
                    htmlFor='start-date-input'
                  >
                    Inicio
                  </label>
                  <input
                    style={{
                      width: '100%',
                      borderRadius: '20px',
                      height: '40px',
                      padding: '15px',
                      border: 'solid 1px #6717cd',
                    }}
                    type='date'
                    name='start-date'
                    id='start-date-input'
                    min={today}
                    value={startDate.toJSON().slice(0, 10)}
                    onChange={(e) => {
                      setStartDate(new Date(e.target.value));
                    }}
                  />
                  <label
                    style={{
                      fontSize: '20px',
                    }}
                    htmlFor='start-date-input'
                  >
                    Fin
                  </label>
                  <input
                    style={{
                      width: '100%',
                      borderRadius: '20px',
                      height: '40px',
                      padding: '15px',
                      border: 'solid 1px #6717cd',
                    }}
                    type='date'
                    name='final-date'
                    id='final-date-input'
                    min={today}
                    value={finalDate.toJSON().slice(0, 10)}
                    onChange={(e) => {
                      setFinalDate(new Date(e.target.value));
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '10px',
                    gap: '5px',
                  }}
                ></div>
              </form>
              <div
                style={{
                  display: 'flex',
                  gap: '35px',
                  padding: '15px 0',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <button
                  type='button'
                  style={{
                    height: 'fit-content',
                    width: '100%',
                    fontSize: '20px',
                  }}
                  className='button button-purple'
                  onClick={filterMembershipsHandler}
                >
                  Filtrar
                </button>
                {((canDownload && userLevel === 'admin') ||
                  userLevel === 'superAdmin') && (
                  <button
                    type='button'
                    style={{
                      height: 'fit-content',
                      width: '100%',
                      fontSize: '20px',
                    }}
                    className='button button-purple'
                    onClick={downloadListCSVHandler}
                  >
                    Descargar listado
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {!isLoadingData && (
          <Background
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <LoaderImage>
              <LoaderContain />
            </LoaderImage>
          </Background>
        )}
        {hasFiltered &&
          ((userLevel === 'admin' && canView) ||
            userLevel === 'superAdmin') && (
            <div className='table-contain'>
              <AdminTable2>
                <tbody style={{ display: 'inline-table', width: '100%' }}>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Suscripción</th>
                    <th>Método</th>
                    <th>Fecha de terminación</th>
                    <th>Dias faltantes</th>
                  </tr>
                  {isLoadingData &&
                    filteredData
                      .filter(
                        (_, index) => index >= offset && index < offset + 100,
                      )
                      .map((membership, index) => {
                        const { final_date } = membership;
                        return (
                          <tr key={index}>
                            <td style={{ fontWeight: 600 }}>
                              <ProfileContain>
                                <Profile />
                                {`${membership.name} ${membership.last_name}`}
                              </ProfileContain>
                            </td>
                            <td>{membership.email}</td>
                            <td>{membership.phone_number}</td>
                            <td>
                              {getTextSusctiptionByLevel(membership.level)}
                            </td>
                            <td>{membership.method}</td>
                            <td>{membership.final_date}</td>
                            <td>{membership.datediff}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </AdminTable2>
            </div>
          )}
        {!hasFiltered && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '35px',
            }}
          >
            <p>
              De click en el botón <strong>"Filtrar"</strong> para generar el
              listado de los usuarios que estan por terminar su membresía en el
              lapso de tiempo especificado.
            </p>
          </div>
        )}
        {isLoadingData && filteredData.length === 0 && hasFiltered === true && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '35px',
            }}
          >
            <p>No existen registros con las especificaciones dadas.</p>
          </div>
        )}
      </DefaultContainer>
    </AdminContain>
  );
};
export default Memberships;
