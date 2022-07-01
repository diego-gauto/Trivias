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
      <Module3 courseImg={"https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet1%2FFondo.png?alt=media&token=ee1bc68b-924a-49d0-8278-6f6b2f1adc01"}
        button={"Nuevo"} title={"Curso de Uñas Francesas"}
        subtitle={"Descubre un nuevo métodos para tus este San Valentín"} type={5} faved={true} />


      <Module4_Carousel isInfinite={true} slideData={
        [
          { isNew: true, title: "Manicure Avanzado", subtitle: "27 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet1%2F1.png?alt=media&token=a6f5a42e-8e74-4ba8-93a6-74313c90051c" },
          { isNew: false, title: "Uñas creativas", subtitle: "12 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet1%2F2.png?alt=media&token=b8a911ef-f7fa-4cd5-9b60-13b2b5884819" },
          { isNew: false, title: "Introducción a la Manicure", subtitle: "10 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet1%2F3.png?alt=media&token=6cc72119-4384-43f8-9a8c-868761fa68a5" },
          { isNew: true, title: "Introducción a la Manicure 2", subtitle: "5 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet1%2F4.png?alt=media&token=26c1e8ed-18ad-4056-968c-067cf2abfa6e" },
          { isNew: false, title: "Uñas creativas 2", subtitle: "9 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet1%2F6.png?alt=media&token=5eaf8124-4c7b-4692-8ebb-cfe876b5b26f" },
          { isNew: false, title: "Uñas creativas 3", subtitle: "13 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet1%2F5.png?alt=media&token=32a8d142-d0f0-4224-84a1-a1ca7fa53b70" },
        ]
      } />

      <Module3 courseImg={"https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet2%2FFondo.png?alt=media&token=7f3aafb7-e5d1-4a5f-8719-9be60295c0e0"}
        button={"Nuevo"} title={"Curso de Uñas Francesas"}
        subtitle={"Descubre un nuevo métodos para tus este San Valentín"} type={4} faved={false} />


      <Module4_Carousel isInfinite={true} slideData={
        [
          { isNew: true, title: "Manicure Avanzado", subtitle: "27 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet2%2F1.png?alt=media&token=4b92e86b-3c40-49c4-8d49-a93a56e4c213" },
          { isNew: true, title: "Uñas creativas 1 A", subtitle: "12 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet2%2F2.png?alt=media&token=a70013a5-d3fc-497b-bc92-8b06db6bf707" },
          { isNew: false, title: "Introducción a la Manicure", subtitle: "10 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet2%2F3.png?alt=media&token=253a9672-4af2-40ba-9b87-8011c2cf9235" },
          { isNew: false, title: "Introducción a la Manicure 2", subtitle: "5 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet2%2F4.png?alt=media&token=736acdc8-531c-429c-ab7f-1f35631b62e1" },
          { isNew: true, title: "Uñas creativas 2 B", subtitle: "9 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet2%2F5.png?alt=media&token=b80ab6f8-cf7c-4b33-9bdc-cdb230bc6167" },
          { isNew: true, title: "Uñas creativas 3 B", subtitle: "13 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet2%2F6.png?alt=media&token=6f3b04b9-67d7-4390-a9f8-bd0381664c5b" },
        ]
      } />

    </Container>
  </>


};

export default HomeContainer;
