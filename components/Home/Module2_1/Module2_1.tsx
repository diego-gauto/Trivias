import { PurpleModule2Button } from "./PurpleModule2Button/PurpleModule2Button";
import { PurpleEmptyButton } from "./PurpleEmptyButton/PurpleEmptyButton";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import {
  ModuleContainer,
  Tittle,
  Subtittle1,
} from "../Module2_1/Module2_1.styled";
import { IModule2_1 } from "./IModule2_1";
import { useMediaQuery } from "react-responsive";
import { PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../../constants/paths";


export const Module2_1 = (props: IModule2_1) => {
  const { data, img, user } = props;
  const [loading, setLoading] = useState(false);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);

  }, [data]);


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
        {responsive1023 && <img className="bg-responsive" src="../images/Landing/mobileBG2.png" alt="" />}
        <img className="background" src="../images/Landing/bgSection1.png" alt="" />
        <img className="women" src="../images/Landing/mujeres_gonvar-min.png" alt="" />
        <div className="left-side">
          {!responsive1023 && <Tittle>Aprende a <br /> aplicar uñas <br /> desde cero</Tittle>}
          {responsive1023 && <Tittle>Aprende a aplicar <br /> uñas desde cero</Tittle>}
          {!responsive1023 && <Subtittle1  >Somos la plataforma de <br /> aprendizaje en línea que <br />
            te permite disfrutar de <br /> cientos de clases sobre uñas <br />
            <span>y más servicios de belleza.</span>
          </Subtittle1>}
          {responsive1023 && <Subtittle1  >Somos la plataforma de aprendizaje en línea <br />
            que te permite disfrutar de cientos de clases <br />
            sobre uñas <span>y más servicios de belleza.</span>
          </Subtittle1>}
          <div className="buttons">
            <PurpleModule2Button b1text={"Comienza desde $149"} n1text={" MXN/mes"}
              onClick={startFromRedirect} />
            <PurpleEmptyButton text={"Ver cursos"} onClick={() => { goToPreview() }} />
          </div>
        </div>
        {responsive1023 && <img className="women-second" src="../images/Landing/infoWomen.png" alt="" />}

      </ModuleContainer >
    </>
  )
}
