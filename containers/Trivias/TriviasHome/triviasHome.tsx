import TriviaSelector from "../TriviaSelector/triviaSelector";
import styles from "./triviasHome.module.css";

// import mujer1 from "../public/images/mujer1.svg";
// import mujer2 from "../public/images/mujer2-removebg-preview.png";
// import mujer3 from "../public/images/mujer3.svg";
// import mujer4 from "../public/images/mujer4.svg";

const TriviaHome = () => {
  const trivias = [
    {
      id: 0,
      img: "/images/trivias/mujer1.svg",
      title: "¿Qué tipo de maquilladora soy?",
      color: "#C57DFF",
      trans: "#9115f7",
    },
    {
      id: 1,
      img: "/images/trivias/mujer2-removebg-preview.png",
      title: "Gonvar te dice tu futuro en el mundo de las uñas",
      color: "#ffcb7d",
      trans: "#ffb800",
    },
    {
      id: 2,
      img: "/images/trivias/mujer3.svg",
      title: "¿Qué nivel de manicurista eres?",
      color: "#7dffa2",
      trans: "#00c620",
    },
    {
      id: 3,
      img: "/images/trivias/mujer4.svg",
      title: "¿Cuánto se de maquillar pestañas?",
      color: "#7de0ff",
      trans: "#156ff7",
    },
  ];

  return (
    <div className={styles.home}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <img className={styles.premio} src="/images/trivias/Icono de premio.svg" alt="" />
      <h1 className={styles.title}>¡Comienza a jugar!</h1>
      <h3 className={styles.subtitle}>
        ¡Elige tu trivia favorita y gana un premio!
      </h3>

      <div className={styles.card_container}>
        <TriviaSelector trivias={trivias} />
      </div>
    </div>
  );
};

export default TriviaHome;
