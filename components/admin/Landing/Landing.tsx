import React, { useEffect, useState } from "react";

import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { getLandingData } from "../../../store/actions/LandingActions";
import LandingObject from "../Landing/templates";
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import HeroSection from "./HeroSection/HeroSection";
import {
  AddTitle,
  Container,
  GeneralContain,
  HomePageContain,
  OptionsContainer,
  OptionBtn,
  OptionBtnOn,
} from "./Landing.styled";
import ProductsSection from "./ProductsSection/ProductsSection";
import ReviewsSection from "./ReviewsSection/ReviewsSection";

const Landing = () => {

  const [showTab, setShowTab] = useState(1);
  const [data, setData] = useState<any>(LandingObject);
  const [loading, setLoading] = useState(true);

  const fetchLandingData = async () => {
    const landingData = await getLandingData();
    setData(landingData);
    setLoading(false);
  };

  useEffect(() => {
    fetchLandingData();
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
    <AdminContain>
      <SideBar />
      <GeneralContain>
        <AddTitle>
          HomePage
        </AddTitle>
        <Container>
          <HomePageContain>
            <OptionsContainer>
              {showTab == 1 ?
                (
                  <OptionBtnOn onClick={() => { setShowTab(1); }}>
                    Hero Page
                  </OptionBtnOn>
                ) :
                (
                  <OptionBtn onClick={() => { setShowTab(1); }}>
                    Hero Page
                  </OptionBtn>
                )
              }
              {showTab == 2 ?
                (
                  <OptionBtnOn onClick={() => { setShowTab(2); }}>
                    Reseñas
                  </OptionBtnOn>
                ) :
                (
                  <OptionBtn onClick={() => { setShowTab(2); }}>
                    Reseñas
                  </OptionBtn>
                )
              }
              {showTab == 3 ?
                (
                  <OptionBtnOn onClick={() => { setShowTab(3); }}>
                    Productos <br /> Destacados
                  </OptionBtnOn>
                ) :
                (
                  <OptionBtn onClick={() => { setShowTab(3); }}>
                    Productos <br /> Destacados
                  </OptionBtn>
                )
              }
            </OptionsContainer>
            {showTab == 1 && <HeroSection heroSectionData={data.heroSectionData} />}
            {showTab == 2 && <ReviewsSection reviewsSectionData={data.experienciasSectionData} />}
            {showTab == 3 && <ProductsSection productsSectionData={data.productosDestacadosData} />}
          </HomePageContain>
        </Container>
      </GeneralContain>
    </AdminContain >
  )
}
export default Landing;