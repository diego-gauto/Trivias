import Image from 'next/image';
import Link from 'next/link';

// import { useNavigate } from "react-router-dom";
import styles from './card.module.css';

export default function Card(props: any) {
  // const handleClick = () => {
  //   navigate(`/trivias/${props.triviaInfo.id}`);
  // };

  return (
    <Link href={`/trivias/${props.triviaInfo.id}`} className={styles.link}>
      <div className={styles.cardContainer}>
        <div 
          className={styles.cardImageUnder} 
          data-color={props.triviaInfo?.color}
        ></div>
        <div 
          className={styles.cardImageAbove}
        ></div>
        <Image
          src={props.triviaInfo?.img}
          alt={'imagen'}
          fill
          className={styles.cardImage}
        />
        <div className={styles.cardText}>{props.triviaInfo?.title}</div>
      </div>
    </Link>
  );
}
