import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { FilterContainer } from './UserFilters.styled';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
interface IFilters {
  showFilters: boolean;
  countries: [];
  allUsers: any;
  allCourses: any;
  setShowFilters: any;
  filterValue: string;
  filteredData: any;
  setSelectFilters: any;
  loginDate: any,
  createDate: any,
  setLoginDate: (val: any) => void,
  setCreateDate: (val: any) => void,
  pageIndex: number;
}

const UserFilters = (props: IFilters) => {
  const {
    countries,
    showFilters,
    allUsers,
    allCourses,
    setShowFilters,
    filterValue,
    setSelectFilters,
    filteredData,
    loginDate,
    createDate,
    setLoginDate,
    setCreateDate,
    pageIndex,
  } = props;
  const [allFilters, setAllFilters] = useState<any>([]);
  let today = new Date().getTime() / 1000;
  const [openCreateDate, setOpenCreateDate] = useState<boolean>(false);
  const [openLoginDate, setOpenLoginDate] = useState<boolean>(false);
  const [arrayFilter, setArrayFilter] = useState([
    'todos', 'todos', 'todos', -1, 'todos', 'todos', 'todos', 'todos'
  ])
  const [changeDate, setChangeDate] = useState([
    [], []
  ])
  const createdAtDate = (date: any) => {
    let allDates = changeDate;
    allDates[0] = date;
    if (date[1] !== null) {
      startFilters(2, "date-create", allDates)
    }
    setChangeDate(allDates);
  }
  const lastLoginDate = (date: any) => {
    let allDates = changeDate;
    allDates[1] = date;
    if (date[1] !== null) {
      startFilters(4, "date-login", allDates)
    }
    setChangeDate(allDates);
  }
  const openCalendar = (calendar: any, value: string) => {
    if (calendar === 0) {
      if (value === "todos") {
        startFilters(2, "todos", changeDate)
        setOpenCreateDate(false);
      }
      if (value === "abrir") {
        setOpenCreateDate(true);
      }
    }
    if (calendar === 1) {
      if (value === "todos") {
        startFilters(4, "todos", changeDate)
        setOpenLoginDate(false);
      }
      if (value === "abrir") {
        setOpenLoginDate(true);
      }
    }
  }
  const startFilters = async (filterType: number, value: any, date: any) => {
    let filters = arrayFilter;
    filters[filterType] = value;
    await filteredData(filters, date, filterValue, pageIndex).then((data: any) => {
      setSelectFilters(true);
      setArrayFilter(filters)
    })
  }
  return (
    <FilterContainer show={showFilters}>
      <div className='content'>
        <p className='title'> Filtros</p>
        <AiOutlineClose className='close-icon' onClick={() => setShowFilters(false)} />
        <div className='filter-contain'>
          <p className='title-filter'>Por Suscripción</p>
          <select defaultValue="todos" onChange={(e) => startFilters(0, e.target.value, changeDate)}>
            <option value="todos">Todos</option>
            <option value="mensual">Mensual</option>
            {/* <option value="anual">Anual</option> */}
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Estado de Suscripción</p>
          <select defaultValue="todos" onChange={(e) => startFilters(1, e.target.value, changeDate)}>
            <option value="todos">Todos</option>
            <option value="active">Activa</option>
            <option value="not-active">No Activa</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Rango de Fecha de creacion del usuario</p>
          <select defaultValue="todos" onChange={(e) => openCalendar(0, e.target.value)}>
            <option value="todos">Fechas Normal</option>
            <option value="abrir">Calendario</option>
          </select>
          {
            openCreateDate &&
            <Calendar
              onChange={(e: any) => { createdAtDate(e) }}
              allowPartialRange={true}
              returnValue='range'
              selectRange={true}
            />
          }

        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Cantidad Gastada</p>
          <select defaultValue="todos" onChange={(e) => startFilters(3, parseInt(e.target.value), changeDate)}>
            <option value={-1}>Todos</option>
            <option value={149}> +149</option>
            <option value={1000}>+1000</option>
            <option value={5000}> +5000</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Rango Ultimo login del usuario</p>
          <select defaultValue="todos" onChange={(e) => openCalendar(1, e.target.value)}>
            <option value="todos">Fechas Normal</option>
            <option value="abrir">Calendario</option>
          </select>
          {
            openLoginDate &&
            <Calendar
              onChange={(e: any) => { lastLoginDate(e) }}
              allowPartialRange={true}
              returnValue='range'
              selectRange={true}
            />
          }
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Método de pago</p>
          <select defaultValue="todos" onChange={(e) => startFilters(5, e.target.value, changeDate)}>
            <option value="todos">Todos</option>
            <option value="stripe">stripe</option>
            <option value="paypal">paypal</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>
            Por Pais
          </p>
          <select defaultValue="todos" onChange={(e) => startFilters(6, e.target.value, changeDate)}>
            <option value="todos" >Todos</option>
            {
              countries.map((val: any, index: number) => {
                return (
                  <option value={val.country} key={"paises" + index}>{val.country}</option>
                )
              })
            }
          </select>
        </div>
        {/* <div className='filter-contain'>
          <p className='title-filter'>Cursos</p>
          <select defaultValue="todos" onChange={(e) => startFilters(2, e.target.value)}>
            <option value="todos">Todos</option>
            {
              allCourses.map((course: any, index: number) => {
                return (
                  <option
                    value={course.id}
                    key={"coursos_de_usuario" + index}
                  >
                    {course.title}
                  </option>
                )
              })
            }
          </select>
        </div> */}
        {/* <div className='filter-contain'>
          <p className='title-filter'>Avance dentro del curso</p>
          <select defaultValue="todos" onChange={(e) => startFilters(3, e.target.value)}>
            <option value="todos">Todos</option>
            <option value="first">Progreso Ascendente</option>
            <option value="desc">Progreso Descendente</option>
          </select>
        </div> */}

      </div>
    </FilterContainer>
  )
}
export default UserFilters;