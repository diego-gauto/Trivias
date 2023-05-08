import React, { useEffect, useState } from "react";

import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { getLandingData } from "../../../store/actions/LandingActions";
import { createLandingProductApi, createLandingReviewApi, getLandingProductApi, getLandingReviewApi } from "../../api/admin";
import LandingObject from "../Landing/templates";
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
  const [reviews, setReviews] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchLandingData = async () => {
    const landingData = await getLandingData();
    setData(landingData);
    setLoading(false);
  };
  // console.log(data.productosDestacadosData);
  // const addProducts = () => {
  //   data.productosDestacadosData.forEach((product: any) => {
  //     let addData = {
  //       url: product.clickURL,
  //       purchase: product.compraRapida,
  //       currency: product.currency,
  //       available: product.disponible,
  //       image: product.imgURL,
  //       title: product.title,
  //       price: 100,
  //       is_new: product.isNew,
  //     }
  //     console.log(addData);
  //     createLandingProductApi(addData).then((res) => {
  //       console.log(res);
  //     })
  //   })
  // }
  // const addReviews = () => {
  //   data.experienciasSectionData.forEach((review: any) => {
  //     let addData = {
  //       date: review.convertedDate,
  //       about: review.descripcion,
  //       image: review.imgURL,
  //       new: review.isNew,
  //       user_name: review.username,
  //       facebook_url: review.usrFacebookURL,
  //       user_image: review.usrImgURL,
  //       temp_user_image: ''
  //     }
  //     createLandingReviewApi(addData).then((res) => {
  //       console.log(res);
  //     })
  //   })
  // }
  useEffect(() => {
    getLandingReviewApi().then((res) => {
      setReviews(res);
    })
    getLandingProductApi().then((res) => {
      setProduct(res);
    })
    fetchLandingData();
  }, []);

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
            {showTab == 1 && <HeroSection heroSectionData={data.heroSectionData} />}
            {showTab == 2 && <ReviewsSection reviewsSectionData={reviews} />}
            {showTab == 3 && <ProductsSection productsSectionData={product} />}
          </HomePageContain>
        </Container>
      </GeneralContain>
    </AdminContain >
  )
}
export default Landing;