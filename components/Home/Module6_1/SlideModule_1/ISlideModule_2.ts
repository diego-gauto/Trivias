export interface ISlideModule_2 {
  isNew: boolean;
  title: string;
  precio: number;
  imgURL: Promise<string>;
  clickURL: string;
  id: string;
  disponible: boolean;
  currency: string;
  compraRapida: boolean;
}
