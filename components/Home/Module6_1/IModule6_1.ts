export interface IModule6_1 {
  slideData: SlideObj[];
}
interface SlideObj {
  isNew: boolean;
  title: string;
  precio: string;
  imgURL: string;
  clickURL: string;
  id: string;
  disponible: boolean;
  currency: string;
  compraRapida: boolean;
}