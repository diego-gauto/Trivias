export interface IPagination {
  changePage: (val: number) => void;
  currentPage: number;
  totalPage: number;
}
