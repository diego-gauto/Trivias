

import { SuscriptionContain } from "./LandingSuscription.styled";

const cursoBackground = "/images/landing_suscription/Rectangle 684.png"

const LandingSuscription = () => {
  const mensual = "$149 mxn/mes"
  const anual = "$1,599 mxn/anual"
  return (
    <SuscriptionContain>
      <h1>La suscripción anual que te permite ver <b className="p-pink">cientos de cursos</b> de uñas y belleza en línea.</h1>
      <h2>¡Accede a <b className="p-pink">más de 60 cursos</b> hoy mismo!</h2>
      <h2>Sólo {anual}</h2>
      <button className="btn left-right">¡Comenzar ahora!</button>
      <h2>En esta plataforma encontrarás</h2>
      <h1><b className="p-pink">MÁS DE 60 CURSOS DE UÑAS Y BELLEZA EN LÍNEA</b></h1>
      <h2>donde aprenderás desde cero y paso a paso.</h2>
      <div className="group-buttons">
        <div className="center">
          <button>Tips</button>
          <button>Escultural</button>
          <button>Mano Alzada</button>
          <button>Stamping</button>
          <button>3D</button>
        </div>
        <div className="center">
          <button>Micropintura</button>
          <button>Manicura</button>
          <button>Maquillaje</button>
          <button>Pedicura</button>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={cursoBackground} alt="Curso" />
          <p><b className="p-pink">Nombre del curso </b><br />
            <i>Nombre del instructor</i></p>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={cursoBackground} alt="Curso" />
          <p><b className="p-pink">Nombre del curso </b><br />
            <i>Nombre del instructor</i></p>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={cursoBackground} alt="Curso" />
          <p><b className="p-pink">Nombre del curso </b><br />
            <i>Nombre del instructor</i></p>
        </div>
      </div>
      <button className="btn left-right">¡Comenzar ahora!</button>
      <h5 className="p-pink"><i>Y aprende muchas otras técnicas sobre imagen personal.</i></h5>
      {/* img */}
      <h1 className="big-title">NO IMPORTA TU UBICACIÓN</h1>
      <h2 className="text-center">Disfruta de clases en línea pregrabadas en alta definición, aprende a tu ritmo,
        <br /><b className="p-pink">desde cualquier pais, donde quieras y a la hora que quieras.</b></h2>
      <h1 className="big-title text-center"><b className="p-pink">¡Nunca te dejaremos sola, </b><br />en tu
        proceso de aprendizaje!</h1>
      {/* Avengers de gonvar  ? lleva p para titulo?*/}
      <h2 className="text-center">Los cursos son impartidos por <b className="p-pink">instructores profesionales
        y certificados,</b><br /> que estarán guiándote paso a paso, durante tu aprendizaje.</h2>


      <button className="btn up-down">Quiero comenzar<br /> hoy mismo</button>

      <h1 className="text-center">Nuestra suscripción cuneta con <br />
        <b className="p-pink">cursos de diferentes grados de dificultad,</b><br />
        desde principiantes hasta niveles más avanzados.</h1>

      {/* difficulties */}

      <h2 className="text-center fst-italic">No importa si vas comenzando o si ya tienes conocimientos, <br />
        te aseguramos que tenemos un curso para ti.</h2>
      <h2>Además, en la plataforma encontrarás diferentes</h2>
      <h1 className="big-title p-pink">Líneas de aprendizaje</h1>

      {/* lineas de aprendizaje */}

      <h2 className="text-center">Así tendrás la oportunidad de <br /><b className="p-pink">aprender desde
        lo básico hasta convetirte en Master.</b></h2>

      <h1 className="p-pink">Certificado FUV</h1>
      <h2>Con <b className="p-pink">Gonvar+</b> podrás enviar tus prácticas para revisión y al aprobarlas,
        <b className="p-pink">obtendrás la certificación</b> correspondiente al curso que hayas tomado.</h2>
      <h2>Te entregaremos un <b className="p-pink"> certificado oficial de la marca, que cuenta con un FUV
        <i>(folio único verificado).</i></b></h2>


      <h1>¡Obtén <b className="p-pink">asesorías personalizadas</b> y conviértete en una experta en uñas y belleza!</h1>
      <h3>Mejora tu proceso de aprendizaje con nuestras <b className="p-pink">asesorías individuales e ilimitadas
        con nuestros instructores certificados.</b> Aprende de manera correcta y alcanza tus metas con confianza.</h3>
      <button className="btn up-down">Comienza ahora<br /> por {anual}</button>


      <h1>Recibe <b className="p-pink">beneficios, contenido exclusivos y recompensas con tu suscripción</b></h1>
      <h3><b className="p-pink">Envío gratis</b> de productos en compras superiores a $1,000.00 mx</h3>
      <h3>Por cada mes dentro, recibes un boleto acumulable más para el <b className="p-pink">sorteo trimestral donde podrás ganas hasta $20,000.00</b></h3>
      <div>
        <h3><b className="p-pink">20% de descuento</b> en productos a partir del 3° mes</h3>
        <h3><b className="p-pink">40% de descuento en productos a partir del 6° mes</b></h3>
      </div>
      <h3>Envíos de <b className="p-pink">Kits de producto de regalo</b>(Sólo pagarás envio)</h3>
      <h3><b className="p-pink">Certificaión oficial de la marca</b> por cada curso que completes.</h3>
      <div>
        <h3><b className="p-pink">Sistema de puntos acumulables</b> que podrás cambiar por premios.</h3>
        <h3>Cada tarea, clase y curso aprobados genera puntos.</h3>
      </div>
    </SuscriptionContain >
  )
}
export default LandingSuscription;