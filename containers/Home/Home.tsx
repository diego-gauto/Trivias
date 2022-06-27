import { NavBar } from "../../components/NavBar/NavBar";
import { Module1 } from "../../components/Home/Module1/Module1";
import { Module2 } from "../../components/Home/Module2/Module2";
import { Module3 } from "../../components/Home/Module3/Module3";
import { Module4_Carousel } from "../../components/Home/Module4_Carousel/Module4_Carousel";

/**
 * The home page.
 * @returns {ReactElement} The home page.
 */

//Module 1: Panel de iconos, imagenes y texto
//Module 2: Panel de iconos y texto
//Module 3: Informacion principal del curso y es imagen estatica
//Module 4: Carrusel de lecciones particulares del curso
const HomeContainer = () => {
  return <>
    <NavBar title={"Gonvar Academy"} />
    <Module1 />
    <Module2 />
    <Module3 button={"Nuevo"} title={"Curso de Uñas Francesas"}
      subtitle={"Descubre un nuevo métodos para tus este San Valentín"} type={5} faved={true} />


    <Module4_Carousel isInfinite={true} />
  </>


};

export default HomeContainer;
