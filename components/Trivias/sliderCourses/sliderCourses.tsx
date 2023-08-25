
const cursoBackground = "/images/landing_suscription/Rectangle 684.png"

import styles from "./sliderCourses.module.css";

const SliderCourses = (props: any) => {

  const { portada, textos, curso, instructor } = styles


  return (
    <>
      <div className="row all-center space">
        <div className="responsive-unset col-lg-4 col-md-6 col-sm-12">
          <img className={portada} src={cursoBackground} alt="Curso" />
          <div className={textos}>
            <p className={curso}>Nombre del curso</p>
            <p className={instructor}>Nombre del instructor</p>
          </div>
        </div>

        <div className="responsive-unset col-lg-4 col-md-6 col-sm-12">
          <img className={portada} src={cursoBackground} alt="Curso" />
          <div className={textos}>
            <p className={curso}>Nombre del curso</p>
            <p className={instructor}>Nombre del instructor</p>
          </div>
        </div>

        <div className="responsive-unset col-lg-4 col-md-6 col-sm-12">
          <img className={portada} src={cursoBackground} alt="Curso" />
          <div className={textos}>
            <p className={curso}>Nombre del curso</p>
            <p className={instructor}>Nombre del instructor</p>
          </div>
        </div>
      </div>
    </>

  );
};

export default SliderCourses;