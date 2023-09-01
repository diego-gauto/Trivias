import Image from "next/image";

// import { useNavigate } from "react-router-dom";
import styles from "./card.module.css";

export default function Card(props: any) {
  // const handleClick = () => {
  //   navigate(`/trivias/${props.triviaInfo.id}`);
  // };

  const cardStyle1 = {
    backgroundColor: props.triviaInfo?.color, // asigna el valor del color como background-color
  };

  const cardStyle2 = {
    background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, ${props.triviaInfo?.trans} 100%)`,
  };


  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImageUnder} style={cardStyle1}></div>
      <div className={styles.cardImageAbove} style={cardStyle2}></div>
      <Image
        src={props.triviaInfo?.img}
        alt={"imagen"}
        layout="responsive"
        width={298}
        height={360}
        className={styles.cardImage}
      />
      <div className={styles.cardText}>{props.triviaInfo?.title}</div>
    </div>
  );
}