import BeneficiosCard from "./beneficiosCard";
import styles from "./beneficiosCardContainer.module.css";

export default function BeneficiosCardContainer() {

  const { cardContainer } = styles

  const cardInfo = [
    { img: "/images/trivias/Beneficios/asesorias.png", title: "Asesorías ilimitadas ", description: "con nuestros instructores certificados.", extra: "" },
    { img: "/images/trivias/Beneficios/envio.png", title: "Envío gratis ", description: "en compras superiores a $1,000.00 mx de productos Gonvar.", extra: "" },
    { img: "/images/trivias/Beneficios/certificado.png", title: "Certificación oficial FUV* ", description: "por cada curso que completes.", extra: "*(folio único verificado)" },
    { img: "/images/trivias/Beneficios/puntos.png", title: "Sistema de puntos acumulables ", description: "que podrás cambiar por premios.", extra: "" },
    { img: "/images/trivias/Beneficios/lineas.png", title: "Líneas de aprendizaje ", description: "donde podrás aprender desde lo básico hasta convertirte en máster.", extra: "" }]

  return (
    <div className={cardContainer}>
      {cardInfo.map((card, index) => (
        <BeneficiosCard cardInfo={card} key={index} />
      ))}
    </div>
  );
}