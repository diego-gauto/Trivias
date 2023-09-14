import styles from "./beneficiosCard.module.css";

export default function BeneficiosCard(props: any) {

  const { img, title, description, extra } = props.cardInfo

  const { cardImage, cardContainer, cardText, cardTitle, cardDescription, cardExtra } = styles

  return (
    <div className={cardContainer}>
      <img
        src={img}
        alt={"imagen"}
        className={cardImage}
      />
      <div className={cardText}>
        <h3 className={cardTitle}>{title} <span className={cardDescription}>{description}</span></h3>
        <p className={cardExtra}>{extra}</p>
      </div>
    </div>
  );
}