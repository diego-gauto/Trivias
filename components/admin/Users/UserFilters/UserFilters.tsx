import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { FilterContainer } from './UserFilters.styled';
interface IFilters {
  showFilters: boolean;
  pagePerUsers: (users: any) => void;
  allUsers: any;
  allCourses: any;
  setShowFilters: any;
  filterValue: string;
  filteredData: any;
  setSelectFilters: any;
}

const UserFilters = (props: IFilters) => {
  const { showFilters, pagePerUsers, allUsers, allCourses, setShowFilters, filterValue, setSelectFilters, filteredData } = props;
  const [allFilters, setAllFilters] = useState<any>([]);
  let today = new Date().getTime() / 1000;
  const [arrayFilter, setArrayFilter] = useState([
    'todos', 'todos', 'todos', 'todos', 'todos', 'todos'
  ])
  const startFilters = async (filterType: number, value: string) => {
    let users: any = allUsers;
    let filters = arrayFilter;
    filters[filterType] = value;
    if (filterValue !== "") {
      let query = filterValue.toLocaleLowerCase();
      users = users.filter((item: any) => {
        return item.name.toLowerCase().includes(query) || item.email.includes(query)
      })
    }
    await filteredData(filters, users).then((data: any) => {
      setSelectFilters(true);
      pagePerUsers(data);
      setArrayFilter(filters)
    })
  }
  return (
    <FilterContainer filter={showFilters}>
      <div className='content'>
        <p className='title'> Filtros</p>
        <AiOutlineClose className='close-icon' onClick={() => setShowFilters(false)} />
        <div className='filter-contain'>
          <p className='title-filter'>Por Suscripción</p>
          <select defaultValue="todos" onChange={(e) => startFilters(0, e.target.value)}>
            <option value="todos">Todos</option>
            <option value="mensual">Mensual</option>
            {/* <option value="anual">Anual</option> */}
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Estado de Suscripción</p>
          <select defaultValue="todos" onChange={(e) => startFilters(1, e.target.value)}>
            <option value="todos">Todos</option>
            <option value="active">Activa</option>
            <option value="not-active">No Activa</option>
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
        <div className='filter-contain'>
          <p className='title-filter'>Rango de Fecha de creacion del usuario</p>
          <select defaultValue="todos" onChange={(e) => startFilters(4, e.target.value)}>
            <option value="asc-create">Fecha Ascendente</option>
            <option value="desc-create">Fecha Descendente</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Cantidad Gastada</p>
          <select defaultValue="todos" onChange={(e) => startFilters(5, e.target.value)}>
            <option value="todos">Todos</option>
            <option value="first">149 - 0</option>
            <option value="second">1000 - 150</option>
            <option value="third">5000 - 1000</option>
            <option value="fourth">Mayor a 5000</option>
          </select>
        </div>
        {/* <div className='filter-contain'>
          <p className='title-filter'>
            Por Pais
          </p>
          <select defaultValue="todos">
            <option value="todos">Todos</option>
            <option value="mexico">Mexico</option>
            <option value="argentina">Argentina</option>
          </select>
        </div> */}
        {/* <div className='filter-contain'>
          <p className='title-filter'>Ultimo login del usuario</p>
          <select defaultValue="todos" onChange={(e) => startFilters("last-login", e.target.value)}>
            <option value="asc">Fecha Ascendente</option>
            <option value="desc">Fecha Descendente</option>
          </select>
        </div> */}
        {/* <div className='filter-contain'>
          <p className='title-filter'>Método de pago</p>
          <select defaultValue="todos">
            <option value="todos">Todos</option>
            <option value="dedqw">dedqw</option>
          </select>
        </div> */}
      </div>
    </FilterContainer>
  )
}
export default UserFilters;