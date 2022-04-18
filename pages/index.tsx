import Head from "next/head";
import React from "react";
import Breaker from "../components/Breaker";
import ImageHolder from "../components/ImageHolder";
import Header from "../components/Header";
import StripeGradient from "../components/StripeGradient";
import ImageProvider from "../scripts/ImageProvider";
import Title from "../components/Title";
import ThemeButton from "../components/ThemeButton";
import { styleText } from "../scripts/FunctionsBundle";
import Image from "next/image";

const Home = () => (
  <>
    <Head>
      <title>Gonvar Nails Academy</title>
    </Head>

    <Header />

    <ImageHolder _canvasHeight={"776px"}>
      <StripeGradient />
    </ImageHolder>

    <ImageHolder
      _imageScr={ImageProvider.item.homescreen_01}
      _canvasPosition={{ top: "135px", right: "9px" }}
      _imageSize={"auto"}
      _imagePosition={3}
    />

    <ImageHolder>
      <div
        style={{
          width: "629px",
          height: "776px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          background:
            "radial-gradient(93.75% 92.64% at 6.25% 7.36%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%, rgba(196, 196, 196, 0) 100%)",
          // opacity: "0.55",
          boxShadow: "0px 4px 20px -1px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(40px)",
        }}
      >
        <Title
          _head={`*APRENDE A APLICAR UÑAS $DESDE CERO$*`}
          _body={`Descubre tu verdadero potencial a través de nuestros *entrenamientos personalizados*. ;; ;;
            En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un *aplicador profesional*.
            Entrenamientos de primer nivel para lograr resultados extraordinarios.`}
          _style={{ width: "550px" }}
          _marginBottomBody={"58px"}
        >
          <div style={{ display: "flex" }}>
            <ThemeButton _href={"/"} _style={{ marginRight: "20px" }}>
              {styleText({ _text: "Comienza desde $49" })}
            </ThemeButton>
            <ThemeButton _href={"/"} _type={"Tertiary"}>
              {styleText({ _text: "Ve más cursos" })}
              <div style={{ marginLeft: "9.6px", display: "flex" }}>
                <Image src={ImageProvider.icon.arrow} layout={"fixed"} />
              </div>
            </ThemeButton>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "46px",
              whiteSpace: "nowrap",
              color: "white",
            }}
          >
            <div style={{ marginRight: "11px", display: "flex" }}>
              <Image src={ImageProvider.icon.users} layout={"fixed"} />
            </div>

            <span
              className="text"
              style={{ marginRight: "11px", color: "white" }}
            >
              {styleText({ _text: "+4700 Alumnos" })}
            </span>

            <div style={{ marginRight: "11px", display: "flex" }}>
              <Image src={ImageProvider.icon.book} layout={"fixed"} />
            </div>

            <span
              className="text"
              style={{ marginRight: "11px", color: "white" }}
            >
              {styleText({ _text: "+250 Cursos" })}
            </span>

            <div style={{ marginRight: "11px", display: "flex" }}>
              <Image src={ImageProvider.icon.dialogue} layout={"fixed"} />
            </div>

            <span
              className="text"
              style={{ marginRight: "11px", color: "white" }}
            >
              {styleText({ _text: "+50 Presenciales" })}
            </span>
          </div>
        </Title>
      </div>
    </ImageHolder>

    <Breaker _size={"776px"} />

    <ImageHolder
      _canvasPosition={"top"}
      _imageScr={ImageProvider.bg_transition.white_in_01}
      _imageSize={["100%", "auto"]}
      _imagePosition={2}
    />

    <ImageHolder
      _canvasPosition={"bottom"}
      _imageScr={ImageProvider.shape.ink_blue}
      _imageSize={["auto", "auto"]}
      _imageStyle={{ left: "7px" }}
      _imagePosition={4}
    />

    <Breaker _size={"3080px"} />
  </>
);

export default Home;
