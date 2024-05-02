const aplicacionBasica =
  '/images/trivias/Portadas/Aplicación basica de acrilico.jpg';
const vipEsculturalBasico = '/images/trivias/Portadas/vip basico rico.jpg';
const perfeccionamientoEnTips =
  '/images/trivias/Portadas/perfeccionamiento en tips pergo.jpg';

import styles from './sliderCourses.module.css';

const SliderCourses = () => {
  const { courseContainer, cursos, portada, textos, curso, instructor } =
    styles;

  return (
    // <div className="row all-center space">
    <div className={courseContainer}>
      {/* <div className="responsive-unset col-lg-4 col-md-6 col-sm-12"> */}
      <div className={cursos}>
        <img
          className={portada}
          src={aplicacionBasica}
          alt='Aplicación Básica de Acrílico'
        />
        <div className={textos}>
          <p className={curso}>Aplicación Básica de Acrílico</p>
          <p className={instructor}>por Arita Gonvar</p>
        </div>
      </div>

      {/* <div className="responsive-unset col-lg-4 col-md-6 col-sm-12"> */}
      <div className={cursos}>
        <img
          className={portada}
          src={vipEsculturalBasico}
          alt='VIP Escultural Básico'
        />
        <div className={textos}>
          <p className={curso}>V.I.P. Escultural Básico</p>
          <p className={instructor}>por J. Antonio Rico</p>
        </div>
      </div>

      {/* // <div className="responsive-unset col-lg-4 col-md-6 col-sm-12"> */}
      <div className={cursos}>
        <img
          className={portada}
          src={perfeccionamientoEnTips}
          alt='Perfeccionamiento en Tips'
        />
        <div className={textos}>
          <p className={curso}>Perfeccionamiento en Tips</p>
          <p className={instructor}>por Andrés Pergo</p>
        </div>
      </div>
    </div>
  );
};

export default SliderCourses;
