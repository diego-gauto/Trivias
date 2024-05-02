import React from 'react';
import { IPagination } from './IPagination';
import { PaginationContainer } from './Pagination.styled';
import { HiArrowCircleRight, HiArrowCircleLeft } from 'react-icons/hi';

const Pagination = (props: IPagination) => {
  const { changePage, currentPage, totalPage } = props;
  const switchPage = (val: string) => {
    if (val === 'back' && currentPage !== 0) {
      changePage(currentPage - 1);
    }
    if (val === 'first' && currentPage !== 0) {
      changePage(0);
    }
    if (val === 'last' && currentPage !== totalPage - 1) {
      changePage(totalPage - 1);
    }
    if (val === 'next' && currentPage !== totalPage - 1) {
      changePage(currentPage + 1);
    }
  };
  return (
    <PaginationContainer>
      <p className='max-number'>Total de páginas: {totalPage}</p>
      <div className='index'>
        <HiArrowCircleLeft
          className='arrows'
          onClick={() => switchPage('back')}
        />
        <p className='default-number' onClick={() => switchPage('first')}>
          1
        </p>
        <p className='current-number'>{currentPage + 1}</p>
        <p className='default-number' onClick={() => switchPage('last')}>
          {totalPage}
        </p>
        <HiArrowCircleRight
          className='arrows'
          onClick={() => switchPage('next')}
        />
      </div>
    </PaginationContainer>
  );
};
export default Pagination;
