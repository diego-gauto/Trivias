import React from 'react'
import { FilterContainer } from './UserFilters.styled';
interface IFilters {
  showFilters: boolean;
}

const UserFilters = (props: IFilters) => {
  const { showFilters } = props;
  return (
    <FilterContainer filter={showFilters}>
      Hola
    </FilterContainer>
  )
}
export default UserFilters;