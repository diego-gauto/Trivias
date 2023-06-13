export interface IHeroSectionProps {
	heroSectionData: HeroData;
}

export interface HeroData {
	id: number;
	tituloInicial: string;
	parrafoInicial: string;
	botonPrimario: string;
	botonSecundario: string;
	caracteristica1: string;
	caracteristica2: string;
	caracteristica3: string;
	heroImage: any;
}
