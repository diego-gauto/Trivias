import React, { useState } from 'react'
import { AdminContain } from '../SideBar.styled';
import { AdminTable, DefaultColumn, DefaultContainer, DefaultFilterContain, DefaultRow, DefaultSearchContainer } from '../DefaultComponents/DefaultComponents.styled';
import { useAdmin } from '../../../hooks/AdminContext';
import Calendar from 'react-calendar';
import { IoClose } from 'react-icons/io5';
import { AiFillPlusCircle } from 'react-icons/ai';
import Pagination from '../../Pagination/Pagination'
import { EditIcon } from '../Category/Category.styled';
import { ProfileContain, Profile } from '../Pay/Pay.styled';
import { UserShow } from '../Users/UsersList.styled';
import { IAdminUsers } from '../../../interfaces/IAdmin';
import { formatDate } from '../../../utils/functions';
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
const Users = () => {
  const [userCalendar, setUserCalendar] = useState<boolean>(true);
  const [loginCalendar, setLoginCalendar] = useState<boolean>(true);
  const [openUserCalendar, setOpenUserCalendar] = useState<boolean>(false);
  const [openloginCalendar, setOpenLoginCalendar] = useState<boolean>(false);
  let adminContext = useAdmin();
  const { countries, users, userLoader, comeFrom, methods, userFilters, totalUsers, setUserFilters } = adminContext;
  const handleUserCalendar = () => {
    setUserCalendar(!userCalendar);
  }
  const handleLoginCalendar = () => {
    setLoginCalendar(!loginCalendar);
  }
  const showUserCalendar = (value: string) => {
    if (value === "todos") {
      setOpenUserCalendar(false);
    }
    if (value === "abrir") {
      setOpenUserCalendar(true);
    }
  }
  const changeMethod = (method: string) => {
    setUserFilters({
      ...userFilters, method: method
    });
  }
  const changeCountry = (country: string) => {
    setUserFilters({
      ...userFilters, country: country
    });
  }
  const changePage = (page: number) => {
    setUserFilters({
      ...userFilters, offset: page * 20
    });
  }
  const openUserCard = (user: IAdminUsers) => {

  }
  const showLoginCalendar = (value: string) => {
    if (value === "todos") {
      setOpenLoginCalendar(false);
    }
    if (value === "abrir") {
      setOpenLoginCalendar(true);
    }
  }
  return (
    <AdminContain>
      <DefaultContainer>
        <div className='top-data'>
          <div className='header'>
            <DefaultColumn gap={5}>
              <h2 className='title'>Usuarios: {totalUsers}</h2>
              <DefaultSearchContainer>
                <div className='search-icon' />
                <input
                  className='search-input'
                  placeholder="Buscar un Usuario"
                  type={"text"}
                />
              </DefaultSearchContainer>
            </DefaultColumn>
            <Pagination
              changePage={changePage}
              currentPage={(userFilters.offset / 20)}
              totalPage={Math.ceil(totalUsers / 100)}
            />
          </div>
          <DefaultColumn gap={10}>
            <h2 className='title-filter'>Filtros</h2>
            <DefaultRow gap={20}>
              <DefaultFilterContain>
                <p className='title-filter'>Por Suscripción</p>
                <select defaultValue="todos">
                  <option value="todos">Todos</option>
                  <option value="mensual">Mensual</option>
                  <option value="anual">Anual</option>
                </select>
              </DefaultFilterContain>
              <DefaultFilterContain>
                <p className='title-filter'>Estado de Suscripción</p>
                <select defaultValue="todos">
                  <option value="todos">Todos</option>
                  <option value="active">Activa</option>
                  <option value="not-active">No Activa</option>
                </select>
              </DefaultFilterContain>
              <DefaultFilterContain>
                <p className='title-filter'>Cantidad Gastada</p>
                <select defaultValue="todos">
                  <option value={-1}>Todos</option>
                  <option value={149}> +149</option>
                  <option value={1000}>+1000</option>
                  <option value={5000}> +5000</option>
                </select>
              </DefaultFilterContain>
            </DefaultRow>
            <DefaultRow gap={20}>
              <DefaultFilterContain>
                <p className='title-filter'>Método de pago</p>
                <select defaultValue="todos" onChange={(e) => { changeMethod(e.target.value) }}>
                  <option value="todos">Todos</option>
                  {
                    methods.map((val: any, index: number) => {
                      return (
                        <option value={val.method} key={"metodos_" + index}>{val.method}</option>
                      )
                    })
                  }
                </select>
              </DefaultFilterContain>
              <DefaultFilterContain>
                <p className='title-filter'>Rango de Fecha de creacion del usuario</p>
                <select defaultValue="todos" onChange={(e) => showUserCalendar(e.target.value)}>
                  <option value="todos">Fechas Normal</option>
                  <option value="abrir">Calendario</option>
                </select>
                {
                  openUserCalendar &&
                  <div className='calendar-contain'>
                    {
                      userCalendar
                        ?
                        <>
                          <IoClose className='icon' onClick={handleUserCalendar} />
                          <Calendar
                            onChange={(e: any) => { }}
                            allowPartialRange={true}
                            returnValue='range'
                            selectRange={true}
                          />
                        </>
                        :
                        <AiFillPlusCircle className='icon-open' onClick={handleUserCalendar} />
                    }
                  </div>
                }
              </DefaultFilterContain>
              <DefaultFilterContain>
                <p className='title-filter'>Rango Ultimo login del usuario</p>
                <select defaultValue="todos" onChange={(e) => showLoginCalendar(e.target.value)}>
                  <option value="todos">Fechas Normal</option>
                  <option value="abrir">Calendario</option>
                </select>
                {
                  openloginCalendar &&
                  <div className='calendar-contain'>
                    {
                      loginCalendar
                        ?
                        <>
                          <IoClose className='icon' onClick={handleLoginCalendar} />
                          <Calendar
                            onChange={(e: any) => { }}
                            allowPartialRange={true}
                            returnValue='range'
                            selectRange={true}
                          />
                        </>
                        :
                        <AiFillPlusCircle className='icon-open' onClick={handleLoginCalendar} />
                    }
                  </div>
                }
              </DefaultFilterContain>
            </DefaultRow>
            <DefaultRow gap={20}>
              <DefaultFilterContain style={{ width: "33%" }}>
                <p className='title-filter'>
                  Por Pais
                </p>
                <select defaultValue="todos" onChange={(e) => { changeCountry(e.target.value) }}>
                  <option value="todos" >Todos</option>
                  {
                    countries.map((val: any, index: number) => {
                      return (
                        <option value={val.country} key={"paises" + index}>{val.country}</option>
                      )
                    })
                  }
                </select>
              </DefaultFilterContain>
              <DefaultFilterContain style={{ width: "33%" }}>
                <p className='title-filter'>Procedencia</p>
                <select defaultValue="todos">
                  <option value={"todos"}>Todos</option>
                  {
                    comeFrom.map((val: any, index: number) => {
                      return (
                        <option value={val.comeFrom} key={"procedencia" + index}>{val.comeFrom}</option>
                      )
                    })
                  }
                </select>
              </DefaultFilterContain>
            </DefaultRow>
          </DefaultColumn>
        </div>
        <AdminTable id="Users">
          <tbody>
            <tr>
              <th>Usuario</th>
              <th>Correo Electrónico</th>
              <th>Fecha de Creación</th>
              <th>Amount spent</th>
              <th>Visualizar</th>
            </tr>
            {/* TABLAS */}
            {
              <>
                {
                  !userLoader &&
                  <>
                    {
                      users.length > 0 && (
                        users.map((user: IAdminUsers, index: number) => {
                          return (
                            <tr key={index}>
                              <td style={{ fontWeight: 600 }}>
                                <ProfileContain>
                                  <Profile />
                                  {user.name}
                                </ProfileContain>
                              </td>
                              <td >{user.email}</td>
                              <td>{formatDate(user.created_at)}</td>
                              <td>MXN${user.spent}</td>
                              <td onClick={() => openUserCard(user)}><UserShow><EditIcon />Visualizar Usuario</UserShow></td>
                            </tr>
                          )
                        }))
                    }
                  </>
                }
              </>
            }
          </tbody>
        </AdminTable>
        {
          userLoader &&
          <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
            <LoaderImage>
              <LoaderContain />
            </LoaderImage>
          </Background>
        }
      </DefaultContainer>
    </AdminContain>
  )
}
export default Users;
