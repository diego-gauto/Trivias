import React, { useEffect, useState } from 'react';
import { AdminContain } from '../SideBar.styled';
import {
  AdminTable,
  DefaultColumn,
  DefaultContainer,
  DefaultFilterContain,
  DefaultRow,
  DefaultSearchContainer,
} from '../DefaultComponents/DefaultComponents.styled';
import { useAdmin } from '../../../hooks/AdminContext';
import CsvDownloader from 'react-csv-downloader';
import Calendar from 'react-calendar';
import { IoClose } from 'react-icons/io5';
import { AiFillPlusCircle } from 'react-icons/ai';
import Pagination from '../../Pagination/Pagination';
import { EditIcon } from '../Category/Category.styled';
import { ProfileContain, Profile } from '../Pay/Pay.styled';
import { UserShow } from '../Users/UsersList.styled';
import { IAdminUsers } from '../../../interfaces/IAdmin';
import { FormatDateForBack, formatDate } from '../../../utils/functions';
import {
  Background,
  LoaderContain,
  LoaderImage,
} from '../../../screens/Login.styled';
import { getGenericQueryResponse, usersForExcelApi } from '../../api/admin';
import UserCardData from '../Users/UserData/UserCardData';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import {
  generateUserIdQuery,
  generateUserRoleAccessQuery,
  generateUserRolesLevelQuery,
} from '../../GenericQueries/UserRoles/UserRolesQueries';
import {
  Role,
  UserLevelValue,
} from '../../GenericQueries/UserRoles/UserRolesInterfaces';
import { useRouter } from 'next/router';

type SuscriptionOption = 'todos' | 'mensual' | 'anual' | 'cuatri';
interface MethodData {
  method: string;
}

interface UserAccesss {
  canView: boolean;
  canEdit: boolean;
  canReport: boolean;
  canDelete: boolean;
}

const Users = () => {
  const router = useRouter();
  const [userCalendar, setUserCalendar] = useState<boolean>(true);
  const [loginCalendar, setLoginCalendar] = useState<boolean>(true);
  const [openUserCalendar, setOpenUserCalendar] = useState<boolean>(false);
  const [openloginCalendar, setOpenLoginCalendar] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({} as IAdminUsers);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showCourseSelect, setShowCourseSelect] = useState(false);
  const [methodSelected, setMethodSelected] =
    useState<SuscriptionOption>('todos');
  let adminContext = useAdmin();
  const [userAccess, setUserAccess] = useState<UserAccesss>({
    canView: false,
    canReport: false,
    canEdit: false,
    canDelete: false,
  });
  const [adminUserId, setAdminUserId] = useState<number>(-1);
  const { canEdit, canReport, canView, canDelete } = userAccess;
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');

  const {
    countries,
    users,
    userLoader,
    comeFrom,
    methods,
    userFilters,
    totalUsers,
    setUserFilters,
    courses,
    payCourses,
    permits,
  } = adminContext;

  const getUserData = async () => {
    try {
      const email = localStorage.getItem('email');
      if (email === null) {
        throw new Error('No existe un email establecido para el usuario');
      }
      const userIdQuery = generateUserIdQuery(email);
      const userIdResponse = await getGenericQueryResponse(userIdQuery);
      const userId = userIdResponse.data.data[0]['id'];
      setAdminUserId(userId);
      // Roles request
      const userRolesQuery = generateUserRoleAccessQuery(userId);
      const userRolesResponse = await getGenericQueryResponse(userRolesQuery);
      const userRoles = userRolesResponse.data.data as Role[];
      const role = userRoles.find((role) => role.role === 'users');
      setUserAccess({
        canView: role?.view === 1,
        canEdit: role?.edit === 1,
        canReport: role?.delete === 1,
        canDelete: role?.delete === 1,
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

  const handleUserCalendar = () => {
    setUserCalendar(!userCalendar);
  };
  const price_month = [149, 249, 459];
  const price_anual = [1599, 3497];
  const price_cuatri = [1599];
  const handleLoginCalendar = () => {
    setLoginCalendar(!loginCalendar);
  };

  const changePage = (page: number) => {
    setUserFilters({
      ...userFilters,
      offset: page * 100,
    });
  };
  const changeData = (key: string, data: string | number) => {
    let filters = userFilters;
    filters[key] = data;
    if (key === 'courses' && data !== 0) {
      setShowCourseSelect(true);
    }
    if (key === 'courses' && data === 0) {
      setShowCourseSelect(false);
    }
    if (key === 'membership') {
      filters.price = 0;
    }
    if (key === 'membership') {
      if (['todos', 'mensual', 'anual', 'cuatri'].includes(`${data}`)) {
        setMethodSelected(data as SuscriptionOption);
      }
    }
    setUserFilters({ ...filters, offset: 0 });
  };
  const filterDate = (key: string, date: any) => {
    if (date[1] !== null) {
      let filters = userFilters;
      filters[key].date_1 = FormatDateForBack(date[0]);
      filters[key].date_2 = FormatDateForBack(date[1]);
      filters[key].valid = 1;
      setUserFilters({ ...filters, offset: 0 });
    }
  };
  const showUserCalendar = (value: string) => {
    let filters = userFilters;
    if (value === 'todos') {
      setOpenUserCalendar(false);
      filters['dates_created'].valid = 0;
      setUserFilters({ ...filters });
    }
    if (value === 'abrir') {
      setOpenUserCalendar(true);
    }
  };
  const showLoginCalendar = (value: string) => {
    let filters = userFilters;
    if (value === 'todos') {
      setOpenLoginCalendar(false);
      filters['dates_login'].valid = 0;
      setUserFilters({ ...filters });
    }
    if (value === 'abrir') {
      setOpenLoginCalendar(true);
    }
  };
  const downloadExcel = async () => {
    interface IRecordUsers {
      nombre: string
      apellido: string
      correo: string
      pais: string
      whatsapp: string
      level: number
      final_date: number
      origin_state: string
      come_from: string
    }
    const excel: any = await usersForExcelApi(userFilters);

    const data: IRecordUsers[] = excel.data;

    const getFormattedDate = (fd: number) => {
      const d = new Date(fd * 1000);
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    const result = data.map(({ apellido, come_from, correo, final_date, level, nombre, origin_state, pais, whatsapp }) => {
      const fechaDeTermino = final_date > 0 ? getFormattedDate(final_date) : 'Sin definir';
      return {
        nombre,
        apellido,
        correo,
        pais,
        whatsapp,
        // level,
        estado: origin_state,
        procedencia: come_from,
        // suscrito_hasta: fechaDeTermino
      }
    });

    console.log({ result });

    return result;
  };
  const openUserCard = async (user: IAdminUsers) => {
    setCurrentUser(user);
    setIsVisible(true);
  };

  const changeToUserDetailsView = (user: IAdminUsers) => {
    localStorage.setItem('selected-user-id', user.id + '');
    router.push({
      pathname: '/admin/UsersDetails'
    });
  }

  const getMethodsBySuscription = (option: SuscriptionOption) => {
    const methodsArray = methods as MethodData[];
    const allMethods = methodsArray.map((element) => element.method);
    switch (option) {
      case 'mensual':
        return ['conekta', 'paypal', 'admin'];
      case 'anual':
        return allMethods;
      case 'cuatri':
        return allMethods.filter((method) => method !== 'stripe');
    }
    return allMethods;
  };

  return (
    <AdminContain>
      <DefaultContainer>
        <div className='top-data'>
          <div className='header'>
            <DefaultColumn gap={5}>
              <div className='top-title'>
                {permits &&
                  ((userLevel === 'admin' && canReport) ||
                    userLevel === 'superAdmin') && (
                    <CsvDownloader
                      filename='usersData'
                      extension='.csv'
                      separator=','
                      wrapColumnChar=''
                      datas={downloadExcel}
                    >
                      <BsFileEarmarkExcelFill className='icon' />
                    </CsvDownloader>
                  )}
                <h2 className='title'>Usuarios: {totalUsers}</h2>
              </div>
              {((userLevel === 'admin' && canView) ||
                userLevel === 'superAdmin') && (
                  <DefaultSearchContainer>
                    <div className='search-icon' />
                    <input
                      className='search-input'
                      placeholder='Buscar un Usuario'
                      onChange={(e) => {
                        changeData('name', e.target.value);
                      }}
                      type={'text'}
                    />
                  </DefaultSearchContainer>
                )}
            </DefaultColumn>
            {((userLevel === 'admin' && canView) ||
              userLevel === 'superAdmin') && (
                <Pagination
                  changePage={changePage}
                  currentPage={userFilters.offset / 100}
                  totalPage={Math.ceil(totalUsers / 100)}
                />
              )}
          </div>

          {((userLevel === 'admin' && canView) ||
            userLevel === 'superAdmin') && (
              <DefaultColumn gap={10}>
                <h2 className='title-filter'>Filtros</h2>
                <DefaultRow gap={20}>
                  <DefaultFilterContain>
                    <p className='title-filter'>Por Suscripción</p>
                    <select
                      defaultValue={userFilters.membership}
                      onChange={(e) => {
                        changeData('membership', e.target.value);
                      }}
                    >
                      <option value='todos'>Todos</option>
                      <option value='mensual'>Mensual</option>
                      <option value='anual'>Anual</option>
                      <option value='cuatri'>Cuatrimestral</option>
                    </select>
                  </DefaultFilterContain>
                  <DefaultFilterContain>
                    <p className='title-filter'>Estado de Suscripción</p>
                    <select
                      defaultValue={userFilters.state}
                      onChange={(e) => {
                        changeData('state', e.target.value);
                      }}
                    >
                      <option value='todos'>Todos</option>
                      <option value='active'>Activa</option>
                      <option value='not-active'>No Activa</option>
                    </select>
                  </DefaultFilterContain>
                  {userFilters.membership === 'mensual'}
                  <DefaultFilterContain
                    className={
                      userFilters.membership === 'todos' ? 'disable-contain' : ''
                    }
                  >
                    <p
                      className={
                        'title-filter ' +
                        (userFilters.membership === 'todos' ? 'disable-txt' : '')
                      }
                    >
                      Por precio
                    </p>
                    <select
                      defaultValue={userFilters.price}
                      onChange={(e) => {
                        changeData('price', parseInt(e.target.value));
                      }}
                      className={
                        userFilters.membership === 'todos' ? 'disable' : ''
                      }
                    >
                      <option value={-1}>Todos</option>
                      {userFilters.membership === 'mensual' &&
                        price_month.map((price: number, index: number) => {
                          return (
                            <option value={price} key={'precio_mensual' + index}>
                              {' '}
                              +{price}
                            </option>
                          );
                        })}
                      {userFilters.membership === 'anual' &&
                        price_anual.map((price: number, index: number) => {
                          return (
                            <option value={price} key={'precio_anual' + index}>
                              {' '}
                              +{price}
                            </option>
                          );
                        })}
                      {userFilters.membership === 'cuatri' &&
                        price_cuatri.map((price: number, index: number) => {
                          return (
                            <option value={price} key={'precio_cuatri' + index}>
                              {' '}
                              +{price}
                            </option>
                          );
                        })}
                    </select>
                  </DefaultFilterContain>
                </DefaultRow>
                <DefaultRow gap={20}>
                  <DefaultFilterContain>
                    <p className='title-filter'>Método de pago</p>
                    <select
                      defaultValue={userFilters.method}
                      onChange={(e) => {
                        changeData('method', e.target.value);
                      }}
                    >
                      <option value='todos'>Todos</option>
                      {getMethodsBySuscription(methodSelected).map(
                        (method: string, index: number) => {
                          return (
                            <option value={method} key={'metodos_' + index}>
                              {method}
                            </option>
                          );
                        },
                      )}
                    </select>
                  </DefaultFilterContain>
                  <DefaultFilterContain>
                    <p className='title-filter'>
                      Rango de Fecha de creacion del usuario
                    </p>
                    <select
                      defaultValue='todos'
                      onChange={(e) => showUserCalendar(e.target.value)}
                    >
                      <option value='todos'>Fechas Normal</option>
                      <option value='abrir'>Calendario</option>
                    </select>
                    {openUserCalendar && (
                      <div className='calendar-contain'>
                        {userCalendar ? (
                          <>
                            <IoClose
                              className='icon'
                              onClick={handleUserCalendar}
                            />
                            <Calendar
                              onChange={(e: any) => {
                                filterDate('dates_created', e);
                              }}
                              allowPartialRange={true}
                              returnValue='range'
                              selectRange={true}
                            />
                          </>
                        ) : (
                          <AiFillPlusCircle
                            className='icon-open'
                            onClick={handleUserCalendar}
                          />
                        )}
                      </div>
                    )}
                  </DefaultFilterContain>
                  <DefaultFilterContain>
                    <p className='title-filter'>Rango Ultimo login del usuario</p>
                    <select
                      defaultValue='todos'
                      onChange={(e) => showLoginCalendar(e.target.value)}
                    >
                      <option value='todos'>Fechas Normal</option>
                      <option value='abrir'>Calendario</option>
                    </select>
                    {openloginCalendar && (
                      <div className='calendar-contain'>
                        {loginCalendar ? (
                          <>
                            <IoClose
                              className='icon'
                              onClick={handleLoginCalendar}
                            />
                            <Calendar
                              onChange={(e: any) => {
                                filterDate('dates_login', e);
                              }}
                              allowPartialRange={true}
                              returnValue='range'
                              selectRange={true}
                            />
                          </>
                        ) : (
                          <AiFillPlusCircle
                            className='icon-open'
                            onClick={handleLoginCalendar}
                          />
                        )}
                      </div>
                    )}
                  </DefaultFilterContain>
                </DefaultRow>
                <DefaultRow gap={20}>
                  <DefaultFilterContain>
                    <p className='title-filter'>Por Pais</p>
                    <select
                      defaultValue={userFilters.country}
                      onChange={(e) => {
                        changeData('country', e.target.value);
                      }}
                    >
                      <option value='todos'>Todos</option>
                      {countries.map((val: any, index: number) => {
                        return (
                          <option value={val.country} key={'paises' + index}>
                            {val.country}
                          </option>
                        );
                      })}
                    </select>
                  </DefaultFilterContain>
                  <DefaultFilterContain>
                    <p className='title-filter'>Procedencia</p>
                    <select
                      defaultValue={userFilters.come_from}
                      onChange={(e) => {
                        changeData('come_from', e.target.value);
                      }}
                    >
                      <option value={'todos'}>Todos</option>
                      {comeFrom.map((val: any, index: number) => {
                        return (
                          <option
                            value={val.come_from}
                            key={'procedencia' + index}
                          >
                            {val.come_from}
                          </option>
                        );
                      })}
                    </select>
                  </DefaultFilterContain>
                  <DefaultFilterContain>
                    <p className='title-filter'>Min. Gastado</p>
                    <input
                      onChange={(e) => changeData('spent_min', e.target.value)}
                      placeholder='0'
                      type='number'
                      defaultValue={userFilters.spent_min}
                    />
                  </DefaultFilterContain>
                </DefaultRow>
                <DefaultRow gap={20}>
                  <DefaultFilterContain>
                    <p className='title-filter'>Por cursos</p>
                    <select
                      defaultValue={userFilters.courses}
                      onChange={(e) => {
                        changeData('courses', parseInt(e.target.value));
                      }}
                    >
                      <option value={0}>Todos</option>
                      {courses.map((val: any, index: number) => {
                        return (
                          <option value={val.id} key={'cursos' + index}>
                            {val.title}
                          </option>
                        );
                      })}
                    </select>
                  </DefaultFilterContain>
                  <DefaultFilterContain
                    className={!showCourseSelect ? 'disable-contain' : ''}
                  >
                    <p
                      className={
                        'title-filter ' + (!showCourseSelect ? 'disable-txt' : '')
                      }
                    >
                      Progreso
                    </p>
                    <select
                      defaultValue={userFilters.progress}
                      onChange={(e) => {
                        changeData('progress', parseInt(e.target.value));
                      }}
                      className={!showCourseSelect ? 'disable' : ''}
                    >
                      <option value={0}>Todos</option>
                      <option value={25}>25%</option>
                      <option value={50}>50%</option>
                      <option value={75}>75%</option>
                      <option value={100}>100%</option>
                    </select>
                  </DefaultFilterContain>
                  <DefaultFilterContain>
                    <p className='title-filter'>Max Gastado.</p>
                    <input
                      onChange={(e) => changeData('spent_max', e.target.value)}
                      placeholder='0'
                      type='number'
                      defaultValue={userFilters.spent_max}
                    />
                  </DefaultFilterContain>
                </DefaultRow>
              </DefaultColumn>
            )}
        </div>
        {((userLevel === 'admin' && canView) || userLevel === 'superAdmin') && (
          <div className='table-contain'>
            <AdminTable id='Users'>
              <tbody style={{ display: 'inline-table', width: '100%' }}>
                <tr>
                  <th>Usuario</th>
                  <th>Correo Electrónico</th>
                  <th>Fecha de Creación</th>
                  <th>Amount spent</th>
                  <th>Origen</th>
                  <th>Estado</th>
                  <th>Visualizar</th>
                </tr>
                {/* TABLAS */}
                {
                  <>
                    {!userLoader && (
                      <>
                        {users.length > 0 &&
                          users.map((user: /* IAdminUsers */ any, index: number) => {
                            return (
                              <tr key={index}>
                                <td style={{ fontWeight: 600 }}>
                                  <ProfileContain>
                                    <Profile />
                                    {user.name}
                                  </ProfileContain>
                                </td>
                                <td>{user.email}</td>
                                <td>{formatDate(user.created_at)}</td>
                                <td>MXN${user.spent}</td>
                                <td>{user.come_from}</td>
                                <td>{user.origin_state}</td>
                                <td onClick={() => openUserCard(user)}>
                                  <UserShow>
                                    <EditIcon />
                                    Visualizar Usuario
                                  </UserShow>
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    )}
                  </>
                }
              </tbody>
            </AdminTable>
          </div>
        )}
        {userLoader && (
          <Background
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <LoaderImage>
              <LoaderContain />
            </LoaderImage>
          </Background>
        )}
      </DefaultContainer>
      {isVisible && (
        <UserCardData
          currentUser={currentUser}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          courses={payCourses}
          openUserCardData={openUserCard}
          canEdit={canEdit}
          userLevel={userLevel}
          adminUserId={adminUserId}
        />
      )}
    </AdminContain>
  );
};
export default Users;
