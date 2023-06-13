import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import { useRouter } from "next/router";

import { PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../../constants/paths";
import { getLandingInfo } from "../../api/landing";
import { ModuleContainer, Subtittle1, Tittle } from "../Module2_1/Module2_1.styled";
import { IModule2_1 } from "./IModule2_1";
import { PurpleEmptyButton } from "./PurpleEmptyButton/PurpleEmptyButton";
import { PurpleModule2Button } from "./PurpleModule2Button/PurpleModule2Button";

export const Module2_1 = (props: IModule2_1) => {
  const { data, img, user } = props;
  const [loading, setLoading] = useState(false);
  const [landingData, setlandingData] = useState()
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const router = useRouter();

  const getData = async () => {
    const res = await getLandingInfo()
    setlandingData(res.data.data[0])
  }

  useEffect(() => {
    getData()
    setTimeout(() => {
      setLoading(true);
    }, 3000);

  }, [data, setlandingData]);


  const startFromRedirect = () => {
    let newDate = new Date();
    let currentDaySeconds = (newDate.getTime() / 1000);
    if (user) {
      if (user.level === 1) {
        router.push(PREVIEW_PATH)
      }
      else {
        router.push(`${PURCHASE_PATH}?type=subscription`)
      }
    } else {
      localStorage.setItem("sub", "true");
      router.push(SIGNUP_PATH)
    }
  }

  const goToPreview = () => {
    if (user) {
      router.push(SIGNUP_PATH)
    } else {
      router.push(PREVIEW_PATH)
    }
  }

  return (
    <>
      <ModuleContainer fluid id="webView" user={user}>
        {
          !!landingData &&
          <>
            {responsive1023 && <img className="bg-responsive" src="../images/Landing/mobileBG2.png" alt="" />}
            <img className="background" src="../images/Landing/bgSection1.png" alt="" />
            <img className="women" src="../images/Landing/mujeres_gonvar-min.png" alt="" />
            <div className="left-side">
              <h1 style={{ display: "none" }}>Academia de belleza</h1>
              {!responsive1023 && <Tittle className="col-4">{landingData['tituloInicial']}</Tittle>}
              {responsive1023 && <Tittle>{landingData['tituloInicial']}</Tittle>}
              {!responsive1023 && <Subtittle1 className="col-3">
                <p dangerouslySetInnerHTML={{ __html: landingData['parrafoInicial'] }} /></Subtittle1>}
              {responsive1023 && <Subtittle1 className="m-3" ><p dangerouslySetInnerHTML={{ __html: landingData['parrafoInicial'] }} /></Subtittle1>}
              <div className="buttons">
                <PurpleModule2Button b1text={landingData['botonPrimario']} n1text={""}
                  onClick={startFromRedirect} />
                <PurpleEmptyButton text={landingData['botonSecundario']} onClick={() => { goToPreview() }} />
              </div>
            </div>
            {responsive1023 && <img className="women-second" src="../images/Landing/infoWomen.png" alt="" />}
          </>
        }
      </ModuleContainer >
    </>
  )
}
