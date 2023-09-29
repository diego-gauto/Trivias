import React from 'react'
import { IPagination } from './IPagination'
import { PaginationContainer } from './Pagination.styled'
import { HiArrowCircleRight, HiArrowCircleLeft } from 'react-icons/hi'

const Pagination = () => {
  // const { } = props;

  return (
    <PaginationContainer>
      <p className="max-number">Total de páginas: {'10'}</p>
      <div className="index">
        <HiArrowCircleLeft className="arrows" />
        <p className="default-number">1</p>
        <p className="current-number">1</p>
        <p className="default-number">{"10"}</p>
        <HiArrowCircleRight className="arrows" />
      </div>
    </PaginationContainer>
  )
}
export default Pagination;