import React, { useEffect, useState } from "react";

import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { getLandingProductApi, getLandingReviewApi } from "../../api/admin";
import { getLandingInfo } from "../../api/landing";
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
  const [data, setData] = useState<any>();
  const [reviews, setReviews] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchLandingData = async () => {
    const landingData = await getLandingInfo();
    setData(landingData.data.data[0]);
    setLoading(false);
  };

  useEffect(() => {
    getLandingReviewApi().then((res) => {
      setReviews(res);
    })
    getLandingProductApi().then((res) => {
      setProduct(res);
    })
    fetchLandingData();
  }, [setData]);

  if (loading) {
    return (
      <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }

  return (
    <AdminContain>
      <GeneralContain>
        <AddTitle>
          HomePage
          {/* <button onClick={addProducts}>agregar</button> */}
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
            {showTab == 1 && <HeroSection heroSectionData={data && data} />}
            {showTab == 2 && <ReviewsSection reviewsSectionData={reviews} />}
            {showTab == 3 && <ProductsSection productsSectionData={product} />}
          </HomePageContain>
        </Container>
      </GeneralContain>
    </AdminContain >
  )
}
export default Landing;