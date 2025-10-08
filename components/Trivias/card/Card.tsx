import Image from 'next/image';
import Link from 'next/link';

// import { useNavigate } from "react-router-dom";
import styles from './card.module.css';

export default function Card(props: any) {
  // const handleClick = () => {
  //   navigate(`/trivias/${props.triviaInfo.id}`);
  // };

  const triviaId = props.triviaInfo?.id ?? props.triviaId;

  return (
    <Link href={`/trivias/${triviaId}`} className={styles.card_link}>
      <div className={styles.cardContainer} data-id={triviaId}>
        <div
          className={styles.cardImageUnder}
          data-color={props.triviaInfo?.color}
        ></div>
        <div
          className={styles.cardImageAbove}
          data-trans={props.triviaInfo?.trans}
        ></div>
        <Image
          src={props.triviaInfo?.imgSelector}
          alt={'imagen'}
          fill
          className={styles.cardImage}
        />
        <div className={styles.cardText}>{props.triviaInfo?.title}</div>
      </div>
    </Link>
  );
}
