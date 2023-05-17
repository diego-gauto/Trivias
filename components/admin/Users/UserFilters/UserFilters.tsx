import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { FilterContainer } from './UserFilters.styled';
interface IFilters {
  showFilters: boolean;
  pagePerUsers: (users: any) => void;
  allUsers: any;
  allCourses: any;
}

const UserFilters = (props: IFilters) => {
  const { showFilters, pagePerUsers, allUsers, allCourses } = props;
  const [previousUsers, setPreviousUsers] = useState(allUsers);
  const startFilters = (filter: string, value: string) => {

  }
  return (
    <FilterContainer filter={showFilters}>
      <div className='content'>
        <p className='title'> Filtros</p>
        <AiOutlineClose className='close-icon' />
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
        <div className='filter-contain'>
          <p className='title-filter'>Por Suscripción</p>
          <select defaultValue="todos" onChange={(e) => startFilters("by-suscription", e.target.value)}>
            <option value="todos">Todos</option>
            <option value="dedqw">dedqw</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Estado de Suscripción</p>
          <select defaultValue="todos" onChange={(e) => startFilters("state-suscription", e.target.value)}>
            <option value="todos">Todos</option>
            <option value="dedqw">dedqw</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Cursos</p>
          <select defaultValue="todos" onChange={(e) => startFilters("courses", e.target.value)}>
            <option value="todos">Todos</option>
            <option value="dedqw">dedqw</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Avance dentro del curso</p>
          <select defaultValue="todos" onChange={(e) => startFilters("progress-courses", e.target.value)}>
            <option value="todos">Todos</option>
            <option value="dedqw">dedqw</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Rango de Fecha de creacion del usuario</p>
          <select defaultValue="todos" onChange={(e) => startFilters("range-date", e.target.value)}>
            <option value="todos">Todos</option>
            <option value="dedqw">dedqw</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Ultimo login del usuario</p>
          <select defaultValue="todos" onChange={(e) => startFilters("last-login", e.target.value)}>
            <option value="todos">Todos</option>
            <option value="dedqw">dedqw</option>
          </select>
        </div>
        <div className='filter-contain'>
          <p className='title-filter'>Cantidad Gastada</p>
          <select defaultValue="todos" onChange={(e) => startFilters("spent", e.target.value)}>
            <option value="todos">Todos</option>
            <option value="dedqw">dedqw</option>
          </select>
        </div>
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