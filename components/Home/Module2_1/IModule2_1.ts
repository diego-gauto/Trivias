export interface IModule2_1 {
  title: string;
  features: Array<string>;
  data: SectionData;
  // Image to display in second column
  img: string;
  user: any;
}

export interface SectionData {
  tituloInicial: string;
  parrafoInicial: string;
  parrafoFinal?: string;
  botonPrimario: string;
  botonSecundario: string;
  primerCaracteristica: string;
  segundaCaracteristica: string;
  terceraCaracteristica: string;
}
