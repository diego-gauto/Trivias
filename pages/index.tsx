import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

import { ImageContainMod1, VideoContainMod3 } from "../components/Catalogue/Module1/Module1.styled";
import { Module1 } from "../components/Home/Module1/Module1";
import { Module2 } from "../components/Home/Module2/Module2";
import { Module3 } from "../components/Home/Module3/Module3";
import { Module4_Carousel } from "../components/Home/Module4_Carousel/Module4_Carousel";
import { Module5 } from "../components/Home/Module5/Module5";
import { Module6 } from "../components/Home/Module6/Module6";
import { Background, LoaderContain, LoaderImage } from "../screens/Login.styled";
import { getLandingData } from "../store/actions/LandingActions";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [landingData, setLandingData] = useState<any>({});

  const responsive380 = useMediaQuery({ query: "(max-width: 390px)" });
  const responsive520 = useMediaQuery({ query: "(max-width: 520px)" });
  const responsive600 = useMediaQuery({ query: "(max-width: 600px)" });
  const responsive800 = useMediaQuery({ query: "(max-width: 800px)" });
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

  const fetchLandingData = async () => {
    const landingData = await getLandingData()
    setLandingData(landingData)
    setLoading(false)
  }

  useEffect(() => {
    fetchLandingData()
  }, []);

  if (loading) {
    return (
      <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }
  return (
    <Container
      fluid
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        margin: "0 auto"
      }}>
      <Module1 heroSectionData={landingData.heroSectionData} />
      <Module2 featureShowcaseSectionData={landingData.featureShowcaseSectionData} />
      <Module3
        button={"Nuevo"} title={"Curso de Uñas Francesas"}
        subtitle={"Descubre un nuevo métodos para tus este San Valentín"} type={5} faved={true} />
      <ImageContainMod1>
        <VideoContainMod3>
          <ReactPlayer
            className='absolute'
            url='https://cadefivideo.com.mx/media/2022/JUNIO/COMPLIANCE/master.m3u8'
            playing={true}
            muted={true}
            width={responsive380 ? '100%' : '100%' &&
              responsive520 ? '100%' : '100%' &&
                responsive1023 ? '100%' : '100%'}
            height='180%'
            style={{ position: "absolute", top: responsive1023 ? "22px" : "-170px", }}
          />
        </VideoContainMod3>
      </ImageContainMod1>

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
        button={"Nuevo"} title={"Curso de Uñas Francesas 2"}
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

      <Module3 courseImg={"https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet3%2FFondo.png?alt=media&token=7c92538e-0d0b-4ab7-98a0-59ef77241c24"}
        button={"Nuevo"} title={"Curso de Uñas Francesas 3"}
        subtitle={"Descubre un nuevo métodos para tus este San Valentín"} type={3} faved={true} />


      <Module4_Carousel isInfinite={true} slideData={
        [
          { isNew: true, title: "Manicure Avanzado 1998", subtitle: "28 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet3%2F1.png?alt=media&token=2444db3b-02e2-41e5-92b1-62b42c4b7e62" },
          { isNew: true, title: "Uñas creativas 1 A 1998", subtitle: "12 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet3%2F2.png?alt=media&token=e537bcd4-7559-4b3c-9919-50bbbd9bf598" },
          { isNew: false, title: "Introducción a la Manicure 1998", subtitle: "10 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet3%2F3.png?alt=media&token=0ab8dc08-89d3-4d53-ae49-e86b354906c5" },
          { isNew: false, title: "Introducción a la Manicure 2 1998", subtitle: "99 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet3%2F4.png?alt=media&token=eb6628e9-af48-461e-9723-cc1290f8f21e" },
          { isNew: true, title: "Uñas creativas 2 B 1998", subtitle: "6 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet3%2F5.png?alt=media&token=68731653-e974-4879-a150-9ca27ad0d212" },
          { isNew: true, title: "Uñas creativas 3 B 1998", subtitle: "21 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet3%2F6.png?alt=media&token=b660ae00-edc5-41ca-84fe-68b743bb7dfe" },
        ]
      } />

      <Module3 courseImg={"https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet4%2FFondo.png?alt=media&token=6fbc5361-ad7c-46c8-9390-0c76d6b14d39"}
        button={"Nuevo"} title={"Curso de Uñas Francesas 4"}
        subtitle={"Descubre un nuevo métodos para tus este San Valentín"} type={2} faved={true} />


      <Module4_Carousel isInfinite={true} slideData={
        [
          { isNew: true, title: "Manicure Avanzado DE-8-22", subtitle: "28 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet4%2F1.png?alt=media&token=71925738-ea7a-4426-9d5f-d76ea338f01f" },
          { isNew: true, title: "Uñas creativas 1 A DE-8-22", subtitle: "12 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet4%2F2.png?alt=media&token=0bcf35be-3c54-4c1e-8051-519c11b74fd9" },
          { isNew: false, title: "Introducción a la Manicure DE-8-22", subtitle: "10 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet4%2F3.png?alt=media&token=e0ad2913-47f1-4c0e-85f7-391c546e27dc" },
          { isNew: false, title: "Introducción a la Manicure 2 DE-8-22", subtitle: "99 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet4%2F4.png?alt=media&token=0d5f3552-6b17-4c46-b18e-9728fe886dcf" },
          { isNew: true, title: "Uñas creativas 2 B DE-8-22", subtitle: "6 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet4%2F5.png?alt=media&token=b2a223b1-aa31-45e7-a05f-79ead57c275c" },
          { isNew: true, title: "Uñas creativas 3 B DE-8-22", subtitle: "21 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet4%2F6.png?alt=media&token=10c7b1cd-cc72-4507-962b-d3b5a16fb425" },
        ]
      } />

      <Module3 courseImg={"https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet5%2FFondo.png?alt=media&token=94ed7b55-ef41-406d-a276-28b5326eb2a5"}
        button={"Nuevo"} title={"Curso de Uñas Francesas 5"}
        subtitle={"Descubre un nuevo métodos para tus este San Valentín"} type={1} faved={false} />


      <Module4_Carousel isInfinite={true} slideData={
        [
          { isNew: false, title: "Manicure Avanzado DE-8-22", subtitle: "28 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet5%2F1.png?alt=media&token=e683e4d0-1b42-4a96-a414-4701eb93ddb3" },
          { isNew: false, title: "Uñas creativas 1 A DE-8-22", subtitle: "12 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet5%2F2.png?alt=media&token=1db92e92-bf90-4bf0-8995-627148736553" },
          { isNew: false, title: "Introducción a la Manicure DE-8-22", subtitle: "10 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet5%2F3.png?alt=media&token=5515c17a-3dd2-4197-945a-0d3fe3efe9e1" },
          { isNew: false, title: "Introducción a la Manicure 2 DE-8-22", subtitle: "99 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet5%2F4.png?alt=media&token=ff1f4630-7652-47f4-b758-90bb7751f3e2" },
          { isNew: true, title: "Uñas creativas 2 B DE-8-22", subtitle: "6 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet5%2F5.png?alt=media&token=33be20ca-bb9a-4d6d-879a-fe9417d8fe70" },
          { isNew: false, title: "Uñas creativas 3 B DE-8-22", subtitle: "21 Lecciones", imgURL: "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FSet5%2F6.png?alt=media&token=39f7efdc-7bd4-4c2e-95ce-fe5b8d348ae5" },
        ]
      } />
      <Module5 reviewsData={landingData.reseniasSectionData} />
      <Module6 slideData={landingData.productosDestacadosData} />
    </Container>
  )
}
export default Homepage;