export interface IPagination {
  previousPage: () => void;
  nextPage: () => void;
  firstPage: () => void;
  finalPage: () => void;
  currentPage: number;
  totalPage: number;
}
