export interface ISlideModule_2{ 
  isNew : boolean, 
  title : string, 
  precio : string, 
  imgURL : Promise<string>, 
  clickURL: string;
  id: string;
  disponible: boolean;
  currency: string;
  compraRapida: boolean;
}