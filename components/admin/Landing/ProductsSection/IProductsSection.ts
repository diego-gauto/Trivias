export interface IProductsSectionProps {
  productsSectionData: Product[];
}

export interface Product {
  clickURL: string;
  imgURL: string;
  title: string;
  subtitle: string;
  precio: number;
  id: string;
  file?: File;
  url: string;
}
