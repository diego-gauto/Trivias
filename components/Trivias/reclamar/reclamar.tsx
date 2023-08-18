import Link from "next/link";
// import { useNavigate, useParams } from "react-router-dom";
import { useRouter } from "next/router";

// import facebook from "/images/logo facebook.svg";
// import messenger from "/images/logo messenger.svg";
// import whatsApp from "/images/logo whatsapp.svg";
// import instagram from "/images/logo instagram.svg";
import styles from "./reclamar.module.css";

const { reclamarContainer, reclamarPremio, reclamarRedes, iconos, button, centrado, link } =
  styles;

const Reclamar = ({ result, idTemplateBrevo }: any) => {
  // const navigate = useNavigate();
  // const { id } = useParams();
  const {
    query: { triviaId },
  } = useRouter();
  console.log(result);
  console.log(idTemplateBrevo)

  // const handleClick = () => {
  //   navigate(`/trivias/${triviaId}/send/${result}`);
  // };

  const handleFacebookShare = () => {
    const quote =
      "¡Acabo de obtener X puntos en la trivia! ¿Puedes hacerlo mejor?"; // Mensaje personalizado
    const url = "https://www.gonvar.io"; // URL de la página que deseas compartir

    // Abre una ventana emergente para compartir en Facebook utilizando la API de Facebook
    window.open(
      `https://www.facebook.com/dialog/share?app_id=1293630141585988&display=popup&href=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(quote)}`,
      "_blank"
    );
  };

  // function handleFacebookShare() {

  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: "1293630141585988",
  //       autoLogAppEvents: true,
  //       xfbml: true,
  //       version: "v13.0",
  //     });
  //   };

  //   (function (d, s, id) {
  //     var js: any,
  //       fjs: any = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src =
  //       "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=1293630141585988&autoLogAppEvents=1";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");

  //   window.setTimeout(function () {
  //     window.FB.ui(
  //       {
  //         method: "share",
  //         href: "https://www.gonvar.io/",
  //       },
  //       function (response: any) {
  //         if (response && response.post_id) {
  //           alert("Post was published.");
  //         } else {
  //           alert("Post was not published.");
  //         }
  //       }
  //     );
  //   }, 1000);
  // }

  function handleMessengerShare() {
    const url = "https://www.gonvar.io"; // URL de la página que deseas compartir

    window.open(
      `https://www.facebook.com/dialog/send?app_id=1293630141585988&link=${encodeURIComponent(
        url
      )}&redirect_uri=${encodeURIComponent(url)}`,
      "_blank"
    );
  }

  function handleWhatsAppShare() {
    const text =
      "Soy toda una profesional!!! Intenta hacerlo mejor que yo: https://www.gonvar.io"; // Texto de la página que deseas compartir

    const encodedText = encodeURIComponent(text);

    const isMobile = window.innerWidth <= 768; // Tamaño de pantalla típico de un dispositivo móvil (puedes ajustar este valor según tus necesidades)

    if (isMobile) {
      console.log("mobile");
      window.location.href = `whatsapp://send?text=${encodedText}`;
    } else {
      console.log("Web");

      window.open(
        `https://web.whatsapp.com/send?text=${encodedText}`,
        "_blank"
      );
    }
  }

  function handleInstagramShare() {
    // const imageUrl =
    //   "https://www.shutterstock.com/image-vector/trivia-time-poster-design-template-600w-1630412920.jpg"; // URL de la imagen que deseas compartir
    // const caption = "Soy toda una profesional!!! Intenta hacerlo mejor que yo"; // Texto de la publicación en Instagram

    // window.open(
    //   `https://www.instagram.com/create/batch/?caption=${encodeURIComponent(
    //     caption
    //   )}&media=${encodeURIComponent(imageUrl)}`,
    //   "_blank"
    // );
  }

  return (
    <div className={reclamarContainer}>
      <div className={reclamarPremio}>
        <div className={centrado}>
          <h3>Reclamá tu regalo :</h3>
          <Link href={`/trivias/${triviaId}/send/${result}?br=${idTemplateBrevo}`}>
            <a className={link}>
              <button className={button}>Ver regalo</button>
            </a>
          </Link>
        </div>
      </div>

      <div className={reclamarRedes}>
        <div className={centrado}>
          <h3>Comparte tu resultado</h3>
          <div className={iconos}>
            <img
              src="/images/trivias/logo facebook.svg"
              alt="Icon Facebook"
              onClick={handleFacebookShare}
            />
            <img
              src="/images/trivias/logo messenger.svg"
              alt="Icon Messenger"
              onClick={handleMessengerShare}
            />
            <img
              src="/images/trivias/logo whatsapp.svg"
              alt="Icon WhatsApp"
              onClick={handleWhatsAppShare}
            />
            <img
              src="/images/trivias/logo instagram.svg"
              alt="Icon Instagram"
              onClick={handleInstagramShare}
            />
          </div>
        </div>
        {/* <div className="sharethis-inline-share-buttons">
          <div className="iconos">
          <img
          src={facebook}
          alt="Icon Facebook"
          onClick={handleFacebookShare}
          />
          <img src={messenger} alt="Icon Messenger" />
          <img src={whatsApp} alt="Icon WhatsApp" />
            <img src={instagram} alt="Icon Instagram" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Reclamar;
