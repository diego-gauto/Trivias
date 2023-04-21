import React from 'react'
import { Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { AboutContainer } from './About.styled';
import { IAbout } from './IAbout';

const About = (props: IAbout) => {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <AboutContainer>
        <AiOutlineClose onClick={handleClose} className="close" />
        <p>
          A fin de dar cumplimiento con lo establecido en la Ley Federal de Protección de
          Datos Personales en Posesión de los Particulares, su Reglamento y Lineamientos
          aplicables (la “Ley”), GONVAR TECHNOLOGIES, S.A.P.I. de C.V., sus filiales y/o
          subsidiarias, y/o sus partes relacionadas (de “GONVAR”), con domicilio operativo
          en Manzana 4, Grupo 9, Casa 31, Unidad Santa Fe IMSS, C.P. 01170. Álvaro Obregón,
          CDMX (el “Domicilio”), dirección electrónica: https://www.gonvar.io (el “Sitio”),
          titular de los derechos del Software denominado “Gonvar” para uso en Plataforma Digital
          (la “Plataforma”) y demás plataformas presentes y futuras de su propiedad, y con correo electrónico
          de contacto soporte@gonvar.io (el “Correo Electrónico”), pone a su disposición el presente:
        </p>
        <h1> AVISO DE PRIVACIDAD</h1>
        <p>
          Con la finalidad de dar un tratamiento legítimo, controlado e informado a sus datos personales,
          que actualmente nos proporcione o en el futuro y que obren en nuestras bases de datos, o que
          hayan sido recopilados por cookies, o cualquier otra tecnología de seguimiento web, así como
          para garantizar su privacidad y su derecho a la autodeterminación informativa al proporcionarnos
          dichos datos, siendo GONVAR responsable del uso y protección de sus datos personales los cuales
          serán tratados con base en los principios de licitud, consentimiento, información, calidad, finalidad,
          lealtad, proporcionalidad y responsabilidad previstos en la Ley.
        </p>
        <p><span>UTILIZACIÓN DE LA INFORMACIÓN</span><br />
          La información que usted nos provea a través del acceso, registro y creación de perfil de Usuario en
          el Sitio y/o en la Plataforma, y/o correo electrónico, y/o llenado de formularios o encuestas físicas
          o electrónicas, en tiempo real o histórico, se procesará y ordenará, para que genere indicadores de datos,
          mismos que GONVAR podrá usar para tomar decisiones pertinentes a su negocio. Toda la información que sea
          recopilada se utilizará con fines estadísticos, de manera genérica y no personalizada, y se asocian con
          el crecimiento, mantenimiento y administración de GONVAR, respetando en todo momento su privacidad.
          Estos usos incluyen nuestras operaciones y administración internas, la comunicación con usted y el
          cumplimiento de las solicitudes de servicios y/o productos provistos por GONVAR, así como para mejorar,
          desarrollar, perfeccionar y, proporcionar los servicios de GONVAR, a través de sus partes relacionadas,
          filiales, o proveedores autorizados y/o socios comerciales, estableciendo las medidas adecuadas a fin de
          limitar el uso de la información recabada de usted, únicamente para fines legales y autorizados de conformidad
          con este Aviso, así como con las debidas medidas de confidencialidad y seguridad.
        </p>
        <p>
          GONVAR también podrá recabar su dirección de IP (Internet Protocol) para ayudar a diagnosticar problemas
          con el servidor de GONVAR y para administrar el Sitio y la Plataforma. Una dirección de IP es un número
          que se le asigna a su computadora cuando usa Internet. Su dirección de IP también es utilizada para ayudar
          a identificarle dentro de una sesión particular y para recolectar información demográfica general.
          GONVAR podrá hacer uso de tecnología “push” a través de la aplicación que GONVAR usa para enviar
          notificaciones con autorización previa del Usuario. Este medio de comunicación no tiene ningún tipo de
          acceso a otras funciones o información del equipo con el que se conecta al Sitio. La información puede
          incluir la URL de la que provienen (estén o no en el Sitio), a qué URL acceden seguidamente
          (estén o no en el Sitio), qué navegador están usando, así como también las páginas visitadas, las búsquedas
          realizadas, las publicaciones, preferencias comerciales, mensajes, etc.
        </p>
        <p><span>USO DE COOKIES</span><br />
          GONVAR le informa que, mediante el uso de cookies y tecnologías similares, busca garantizar la mejor
          experiencia posible en el Sitio y/o la Plataforma, al proporcionarle información personalizada,
          recordando sus preferencias de servicios y de mercadeo y ayudándolo a obtener la información adecuada.
          En caso de que requiera más información respecto al uso de cookies y tecnologías similares,
          GONVAR pone a su disposición la Política de Uso de Cookies.
        </p>
        <p><span>1. DATOS PERSONALES SOLICITADOS </span><br />
          GONVAR y/o las empresas controladoras de éste y/o empresas filiales y/o subsidiarias y/o partes relacionadas
          (los “Terceros Relacionados”) solicita y obtiene datos personales en general, así como datos personales
          considerados sensibles por la Ley (en lo sucesivo “Datos Personales Generales” y “Datos Personales Sensibles”,
          respectivamente; y de manera conjunta referidos como los “Datos Personales”) de las personas en adelante descritas.
        </p>
        <p>
          Los Datos Personales Sensibles podrán ser solicitados por medios electrónicos o físicos, en el entendido
          de que toda información proporcionada en físico, será considerada y tratada como si se hubiera proporcionado
          y autorizado en el Sitio y/o la Plataforma, y por lo cual se regirá por el presente documento.
        </p>
        <p>
          En todos los casos, la recolección de Datos Personales por parte de GONVAR es realizada de buena
          fe y para los fines aquí expuestos; por tal motivo, se presume que los datos proporcionados por
          sus titulares son apegados a la verdad y completos, por lo que son responsabilidad del titular que los proporciona.
        </p>
        <p>
          Los Datos Personales que serán recabados de los Usuarios constan de información personal que es incluida
          o podrá ser incluida en formatos, listados, bases de datos u otros medios físicos y/o electrónicos, según corresponda,
          a efecto de que GONVAR pueda proveer los Servicios.
        </p>
        <p><span>USUARIOS DE LA PLATAFORMA. </span>
          Los Datos Personales que serán recabados de los Usuarios que hagan uso de la Plataforma son necesarios
          para documentar la relación comercial y jurídica que existe o podrá existir con cada uno de ellos. Los Datos
          Personales que usted proporcionará voluntaria y libremente a GONVAR, constan de información que es incluida o
          podrá ser incluida en contratos, cartas, formatos, listados, bases de datos u otros medios físicos y/o
          electrónicos, según corresponda, a efecto de que GONVAR pueda documentar la relación entre las partes,
          el proceso de selección que realice o vaya a realizar de los Cursos que conforman los Servicios de la Plataforma;
          así como para dar cabal cumplimiento a las políticas internas, procedimientos y demás obligaciones legales
          aplicables a GONVAR.
        </p>
        <p>
          Los Datos Personales que le serán solicitados mediante el uso de la plataforma, son los siguientes:
        </p>
        <div className='tables'><p className='center'>Generales:</p></div>
        <ul>
          <li>Nombre Completo</li>
          <li>Número de teléfono corporativo fijo y/o móvil</li>
          <li>Correo electrónico personal y corporativo</li>
          <li>Domicilio</li>
          <li>País de residencia</li>
          <li>Ubicación</li>
        </ul>
        <p><span>2.  FINALIDADES DEL TRATAMIENTO DE LOS DATOS PERSONALES</span><br />
          Los Datos Personales proporcionados a GONVAR a través de la Plataforma serán utilizados según se ha
          mencionado anteriormente, con la finalidad de:
        </p>
        <ul>
          <li>Realizar el procesamiento de datos que permita crear un registro de los Usuarios y de los Cursos que utilice</li>
          <li>Dar seguimiento al usuario en relación a sus intereses y comportamiento con el fin de mejorar su experiencia en nuestro servicio</li>
        </ul>
        <p>
          Una vez cumplidas las finalidades del tratamiento de sus Datos Personales, y cuando no exista
          disposición legal que establezca lo contrario, GONVAR procederá a la cancelación, eliminación
          y/o destrucción de los Datos Personales recibidos, en los términos establecidos por la Ley.
        </p>
        <p><span>3. TRANSFERENCIA DE LOS DATOS PERSONALES E INFORMACIÓN.</span><br />
          Los Datos Personales a que se refiere este Aviso podrán ser transferidos a: (i) Terceros relacionados
          y/o aliados comerciales, con la finalidad de engrandecer la propuesta de valor de GONVAR, así como ofrecerle,
          con base en sus necesidades, otros productos y servicios; (ii) Autoridades judiciales, mexicanas y extranjeras,
          con la finalidad de dar cumplimiento a la Ley, legislación, notificaciones, requerimientos u oficios de
          carácter judicial; (iii) A proveedores de servicios de internet sobre la cual esté montada la infraestructura
          tecnológica de GONVAR; y/o (iv) A proveedores de servicios de soporte técnico de la Plataforma. En caso de
          realizar alguna transferencia de sus Datos Personales, en los que se requiera su consentimiento expreso, se lo
          informaremos a efecto de recabar el mismo.
        </p>
        <p>
          En todos los casos, GONVAR comunicará el presente Aviso de Privacidad a estos terceros y se asegurará
          a través de la firma de convenios y/o la adopción de otros documentos vinculantes, que dichos terceros
          mantengan las medidas de seguridad administrativas, técnicas y físicas necesarias para resguardar sus
          Datos Personales, así como que dichos terceros únicamente utilicen sus Datos Personales para las finalidades
          para los cuales fueron recabados. Asimismo, tanto los terceros como responsables de recabar los Datos Personales
          y GONVAR que facilita a través de la Plataforma la recabación y procesamiento de los mismos, así como cualquier
          otra persona relacionada con GONVAR que tenga acceso a la información contenida en este Aviso de Privacidad,
          quedarán obligados a resguardarla bajo las mismas normas de seguridad y confidencialidad, y a no revelarla ni
          hacer mal uso de la misma, o en caso contrario serán responsables de conformidad con las leyes aplicables.
        </p>
        <p>
          No obstante lo anterior, GONVAR no transferirá sus Datos Personales a terceros no relacionados con GONVAR,
          salvo en los casos antes citados y los previstos en la Ley, sin su consentimiento previo.
        </p>
        <p><span>4. MEDIOS Y PROCEDIMIENTOS PARA EL EJERCICIO DE LOS DERECHOS ARCO </span><br />
          Usted, como titular de los Datos Personales proporcionados a GONVAR, podrá solicitar en cualquier momento,
          el ejercicio de sus derechos de acceso, rectificación, cancelación u oposición (los “Derechos ARCO”) al
          tratamiento de sus Datos Personales, consistentes en: (i) Acceder a sus Datos Personales y a los detalles
          del tratamiento de los mismos; (ii) Rectificar sus Datos Personales en caso de ser inexactos o incompletos; (iii)
          Cancelar sus Datos Personales cuando considere que no se requieren para alguna de las finalidades señalados en
          este Aviso de Privacidad, estén siendo utilizados para finalidades no consentidas o haya finalizado su relación
          contractual o de servicio u otra con GONVAR; y (iv) Oponerse al tratamiento de sus Datos Personales para fines específicos.
        </p>
        <p>
          Para tal fin, usted deberá seguir el proceso de presentar su petición por escrito a GONVAR, o bien, enviar su
          petición al Correo Electrónico, según sea aplicable, la cual deberá contener, como mínimo, la siguiente
          información: (a) Su nombre completo y domicilio, u otro medio idóneo para comunicarle la respuesta a su solicitud; (b)
          Los documentos que acrediten su identidad o, en su caso, la de su representante legal; (c) La descripción clara y
          precisa de los Datos Personales respecto de los que se busca ejercer alguno de los derechos antes mencionados; y (d)
          Cualquier otro elemento o información que facilite la localización de los Datos Personales, así como cualquier otro
          documento requerido por la regulación actual en el momento de presentar la solicitud. Usted también podrá solicitar
          al Correo Electrónico mayor información sobre el procedimiento para ejercer sus Derechos ARCO.
        </p>
        <p>
          La respuesta a su solicitud le será dada a conocer por GONVAR en los términos y plazos establecidos en la Ley. No obstante,
          usted podrá obtener más información acerca del estado que guarda su solicitud y del plazo de respuesta de la misma,
          contactando a GONVAR o enviando su petición al Correo Electrónico, donde además podrán atender cualquier aclaración o
          duda que pudiera tener respecto al tratamiento de sus Datos Personales y el ejercicio de sus Derechos ARCO.
        </p>
        <p><span>5. REVOCACIÓN DEL CONSENTIMIENTO; LIMITACIÓN DE USO Y DIVULGACIÓN DE LOS DATOS PERSONALES</span><br />
          Usted también podrá revocar, en cualquier momento, el consentimiento que haya otorgado a GONVAR para el tratamiento de
          sus Datos Personales, así como solicitar que se limite el uso y divulgación de los mismos, siempre y cuando no
          lo impida una disposición legal. Para tal fin, usted deberá presentar su solicitud por escrito a GONVAR, o bien,
          enviar su solicitud al Correo Electrónico, según sea aplicable. Dicha solicitud deberá cumplir con los mismos
          requisitos mencionados en la Sección 4. anterior.
        </p>
        <p>
          La respuesta a su solicitud le será dada a conocer por GONVAR en los términos y plazos establecidos en la Ley.
          No obstante, usted podrá obtener más información acerca del estado que guarda su solicitud y del plazo de
          respuesta de la misma, contactando a GONVAR o enviando su petición al Correo Electrónico, donde además podrán
          atender cualquier aclaración o duda que pudiera tener respecto al tratamiento y estos derechos que le
          corresponden respecto a sus Datos Personales.
        </p>
        <p>
          En caso de que sus Datos Personales hubiesen sido remitidos con anterioridad a la fecha de revocación
          del consentimiento, y sigan siendo tratados por encargados de GONVAR, éste hará del conocimiento de éstos
          últimos dicha revocación, para que procedan a efectuar lo conducente.
        </p>
        <p><span>6. CAMBIOS AL AVISO DE PRIVACIDAD</span><br />
          GONVAR se reserva el derecho de modificar y/o actualizar este Aviso de Privacidad, en alguna o todas sus partes,
          a su entera discreción, en cuyo caso lo comunicará aquí mismo a través de su Sitio y/o la Plataforma; y,
          según sea el caso particular de cada titular, a través de sus redes internas, o por medio de un aviso que
          se colocará en los medios habituales (físicos o electrónicos) de comunicación de GONVAR y en un lugar
          visible del Domicilio, o mediante un aviso por escrito dirigido a su correo electrónico, según sea legalmente requerido.
        </p>
        <p><span>7. FORMA DIGITAL, ELECTRÓNICA O EN LÍNEA</span><br />
          La Partes acuerdan que la forma para perfeccionar el acuerdo de voluntades entre ellas podrá ser el de
          formato Digital, Electrónico o en Línea, en donde bastará manifestar su voluntad por medio de su aceptación,
          así como proporcionar los datos personales, en el propio Sitio de GONVAR sin requerir estampar la firma en
          documento alguno.
        </p>
        <p>
          Fecha de primera emisión: 2022-11-30 <br />
          Fecha de última modificación: 2023-04-20
        </p>
      </AboutContainer>
    </Modal>
  )
}
export default About;