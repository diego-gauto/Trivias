export interface IProductsSectionProps {
  productsSectionData: Product[];
}

export interface Product {
  clickURL: string;
  imgURL: string;
  title: string;
  subtitle: string;
  precio: number;
  id: any;
  file?: File;
  url: any;
  price: number;
  new_url: any;
  currency: string;
  purchase: boolean;
  is_new: boolean;
  image: any;
  new_image: any;
  img_display: any;
  available: any;
}
