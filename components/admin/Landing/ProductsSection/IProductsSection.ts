export interface IProductsSectionProps {
  productsSectionData: Product[];
}

export interface Product {
  clickURL: string;
  imgURL: string;
  title: string;
  subtitle: string;
  id: string;
}
