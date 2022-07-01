import { NavBar } from "../../components/NavBar/NavBar";
import { Module1 } from "../../components/Home/Module1/Module1";
import { Module2 } from "../../components/Home/Module2/Module2";
import { Module3 } from "../../components/Home/Module3/Module3";
import { Module4_Carousel } from "../../components/Home/Module4_Carousel/Module4_Carousel";
import { Container } from "react-bootstrap";

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
    <Container
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <NavBar title={"Gonvar Academy"} />
      <Module1 />
      <Module2 />
      <Module3 button={"Nuevo"} title={"Curso de Uñas Francesas"}
        subtitle={"Descubre un nuevo métodos para tus este San Valentín"} type={5} faved={true} />


      <Module4_Carousel isInfinite={true} slideData={
        [

          { isNew: true, title: "Manicure Avanzado", subtitle: "27 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FA1.png?alt=media&token=ab4ac5e1-8477-42ae-917e-528256c72a1f" },
          { isNew: false, title: "Uñas creativas", subtitle: "12 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FA2.png?alt=media&token=d6f8b315-5b15-4b3a-82d1-6241e7f7a0d4" },
          { isNew: false, title: "Introducción a la Manicure", subtitle: "10 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FA3.png?alt=media&token=0bd5bdc1-e6cc-40ef-a0a3-17991fc5209d" },
          { isNew: true, title: "Introducción a la Manicure 2", subtitle: "5 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FA3.png?alt=media&token=0bd5bdc1-e6cc-40ef-a0a3-17991fc5209d" },
          { isNew: false, title: "Uñas creativas 2", subtitle: "9 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FA1.png?alt=media&token=ab4ac5e1-8477-42ae-917e-528256c72a1f" },

        ]
      } />
    </Container>
  </>


};

export default HomeContainer;
