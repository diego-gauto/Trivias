import React from "react";
import { ReactElement } from "react";
// import { NavBar } from "../../components/NavBar/NavBar";
import { Module1 } from "../../components/Home/Module1/Module1";
import { Module2 } from "../../components/Home/Module2/Module2";
import { Module3 } from "../../components/Home/Module3/Module3";
import { Module5 } from "../../components/Home/Module5/Module5";
import { Module6 } from "../../components/Home/Module6/Module6";
import { Module4_Carousel } from "../../components/Home/Module4_Carousel/Module4_Carousel";
import { Container } from "react-bootstrap";
import Landings from "../../pages/index";
/**
 * The home page.
 *
 */
//Module 1: Panel de iconos, imagenes y texto
//Module 2: Panel de iconos y texto
//Module 3: Informacion principal del curso y es imagen estatica
//Module 4: Carrusel de lecciones particulares del curso
export const HomeContainer = () => {
  return <>
    <Landings />
  </>
};

export default HomeContainer;
