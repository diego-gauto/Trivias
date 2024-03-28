const rewards = "/images/landing_suscription/rewardCircle.png"
const timeReward = "/images/landing_suscription/time.png"
const timeRewardOut = "/images/landing_suscription/time_outline.png"
const pointReward = "/images/landing_suscription/star.png"
const pointRewardOut = "/images/landing_suscription/star_outline.png"
const awardReward = "/images/landing_suscription/award.png"
const awardRewardOut = "/images/landing_suscription/award_outline.png"
const rewardBack = "/images/landing_suscription/recompensas_back.png"
const cursoR = "/images/landing_suscription/cursos_recompensa.png"
const tiempoR = "/images/landing_suscription/tiempo_recompensa.png"
const puntoR = "/images/landing_suscription/puntos_recompensa.png"
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { RewardsContainer } from './ComponentsStyles.styled'

interface IReward {
  nails_master?: boolean;
}
export const RewardComponent = (props: IReward) => {
  const { nails_master } = props;
  const responsive650 = useMediaQuery({ query: "(max-width: 650px)" });
  if (nails_master) {
    return (
      <RewardsContainer>
        <div className="card-container">
          <div className="reward-card points">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={pointReward} className="title-img" />
                <img src={pointRewardOut} className="title-img" />
              </div>
              <h4><b className="p-pink"><i>Por puntaje</i></b><br /></h4>
              <p className="bold m-5">Cada tarea aprobada, clase o curso terminado,
                te dará puntos que puedes canjear por productos Gonvar.</p>
            </div>
            <div className="hover-card">
              <img src={puntoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Siguiente recompensa <br /> <b className="yellow">2 monómetros Gonvar</b></p>
              <h3 className="yellow bold">al reunir <br /> 3,000 puntos</h3>
            </div>
          </div>
          <div className="reward-card time">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={timeReward} className="title-img" />
                <img src={timeRewardOut} className="title-img" />
              </div>
              <h4><b className="teal"><i>Por tiempo </i></b><br /></h4>
              <p className="bold m-5">Por cada mes que permanezcas suscrita, obtendrás nuevos beneficios y
                mejores descuentos en nuestros productos.</p>
            </div>
            <div className="hover-card">
              <img src={tiempoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Tu siguiente recompensa <br /> estará disponible <b className="yellow">en Junio</b></p>
              <h3 className="yellow bold" style={{ fontSize: '1.5rem' }}>20% de descuento <br /> en productos Gonvar</h3>
            </div>
          </div>
          <div className="reward-card awards">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={awardReward} className="title-img" />
                <img src={awardRewardOut} className="title-img" />
              </div>
              <h4><b className="blue"><i>Certificados </i></b><br /></h4>
              <p className="bold m-5">Recibe un certificado oficial de la marca con un Folio Único Verificado (FUV)
                por cada curso completo que termines.</p>
            </div>
            <div className="hover-card">
              <img src={cursoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Tu siguiente curso a terminar es <br /> <b className="yellow">MANICURE CON BALANCE</b></p>
              <h3 className="yellow bold">Has conseguido 15 <br /> Certificados FUV</h3>
            </div>
          </div>
        </div>
      </RewardsContainer>
    )
  }
  else {
    return (
      <RewardsContainer>
        <div className="side-images">
          <img src={rewardBack} />
          <img src={rewardBack} className="rotate-img" />
        </div>
        <div className="mx-3 all-center">
          <img src={rewards} className="me-3" />
          <h2 className="text-title">CENTRO DE {responsive650 && <br />}<b>RECOMPENSAS</b></h2>
        </div>
        <div className="card-container">
          <div className="reward-card points">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={pointReward} className="title-img" />
                <img src={pointRewardOut} className="title-img" />
              </div>
              <h4><b className="p-pink"><i>Por puntaje</i></b><br /></h4>
              <p className="bold m-5">Cada tarea aprobada, clase o curso terminado,
                te dará puntos que puedes canjear por productos Gonvar.</p>
            </div>
            <div className="hover-card">
              <img src={puntoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Siguiente recompensa <br /> <b className="yellow">2 monómetros Gonvar</b></p>
              <h3 className="yellow bold">al reunir <br /> 3,000 puntos</h3>
            </div>
          </div>
          <div className="reward-card time">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={timeReward} className="title-img" />
                <img src={timeRewardOut} className="title-img" />
              </div>
              <h4><b className="teal"><i>Por tiempo </i></b><br /></h4>
              <p className="bold m-5" >Por cada mes que permanezcas suscrita, obtendrás nuevos beneficios y
                mejores descuentos en nuestros productos.</p>
            </div>
            <div className="hover-card">
              <img src={tiempoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Tu siguiente recompensa <br /> estará disponible <b className="yellow">en Junio</b></p>
              <h3 className="yellow bold" style={{ fontSize: '1.5rem' }}>20% de descuento <br /> en productos Gonvar</h3>
            </div>
          </div>
          <div className="reward-card awards">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={awardReward} className="title-img" />
                <img src={awardRewardOut} className="title-img" />
              </div>
              <h4><b className="blue"><i>Certificados </i></b><br /></h4>
              <p className="bold m-5">Recibe un certificado oficial de la marca con un Folio Único Verificado (FUV)
                por cada curso completo que termines.</p>
            </div>
            <div className="hover-card">
              <img src={cursoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Tu siguiente curso a terminar es <br /> <b className="yellow">MANICURE CON BALANCE</b></p>
              <h3 className="yellow bold">Has conseguido 15 <br /> Certificados FUV</h3>
            </div>
          </div>
        </div>
        <h5 style={{
          paddingInline: '20px'
        }}>Gracias a nuestro sistema de puntos,{responsive650 && <br />} beneficios y certificados acumulables, <br />
          <b className="p-pink bold">puedes ganar miles de pesos en productos y premios</b> <br />
          sólo por <b>permanecer suscrita, concluir tus {responsive650 && <br />}cursos y hacer tus tareas.</b></h5>
      </RewardsContainer>
    )
  }

}
