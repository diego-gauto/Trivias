interface Option {
  isVisible: boolean | null;
  label: string;
  options: string[];
}

interface Form {
  name: string;
  title: string;
  subtitle: string;
  createdAt: string;
  editedAt: string;
  img: {
    source: string;
    isVisible: boolean | null;
  };
  optionsArray: Option[];
  redirect: {
    type: "thankYouPage" | "customLink";
    link: string;
    textButton: string;
  };
}

const forms: Form[] = [
  {
    name: "Campaña 11 de Diciembre Facebook",
    title:
      "<p><strong>Solicitud</strong> de Beca de 75% y <strong>Plan de 4 pagos</strong> ¡Última oportunidad!</p>",
    subtitle:
      "<p><strong>Más de 65 cursos</strong> de uñas, maquillaje y pestañas <strong>incluídos</strong>. Además, recibe acceso a cursos de Drill profesional, Dry Manicure Y Nails Master Revolution (un curso de uñas en técnicas de Tips y Escultural). Aprende en línea, <strong>Desde cero</strong> con <strong>revisión de prácticas</strong>, asesorías ilimitadas y <strong>Certificado oficial</strong> de la marca. Un precio real de <s>$6.307,00 MXN</s> reducido a un costo total de $1.599,00 MXN (99 USD) que podrás pagar en 4 pagos de $399,00 MXN (25 USD). 💞 <strong>LUGARES MUY LIMITADOS. Apresúrate a apartar tu lugar antes de que se agoten. Solicita</strong> tu inscripción con beca al 75% de descuento y plan de <strong>4 pagos de $399 MXN</strong> (uno a la semana) y en caso de ser seleccionada, te contactaremos de inmediato. 🥳</p>",
    createdAt: "04-12-2023 14:12:37",
    editedAt: "12-12-2023 19:42:00",
    img: {
      source: "/images/forms/IPHONE-removebg-preview.png",
      isVisible: true,
    },
    optionsArray: [
      {
        isVisible: true,
        label: `<p>Recuerda que el <strong>costo del programa es de $1.599,00 MXN</strong> y podrás pagarlo en 4 partes. <strong>Se dará acceso</strong> una vez que liquides el monto total. ¡Todas las alumnas de este programa ·"Gonvar+ cuatrimestral" participan para <strong>ganar un iPhone 15 Pro</strong> Nuevo, remodelación de su salón y miles de pesos más! <span style="color: rgb(18, 18, 18);">😍 </span>El primer pago de cuatro, deberás darlo hoy y <strong>Máximo este</strong> SÁBADO 16 de Diciembre. Elige tu plan de Pagos:</p>`,
        options: [
          "Pagaré en 4 partes de 399 pesos (un pago a la semana)",
          "Pagaré en una sola exhibición máximo el día sábado",
        ],
      },
      {
        isVisible: true,
        label: `<p><strong>En caso de ser seleccionada</strong>, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso <strong>por completo</strong>? Recuerda que al ser seleccionada <strong>tomarás uno de los lugares</strong> y otras aspirantes quedarán fuera.</p>`,
        options: [
          "Si, me comprometo a realizar el programa",
          "No, gracias. Quiero perder mi lugar",
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
  {
    name: "Campaña 11 de Diciembre Google",
    title:
      "<p><strong>Solicitud</strong> de Beca de 75% y <strong>Plan de 4 pagos</strong> ¡Última oportunidad!</p>",
    subtitle:
      "<p><strong>Más de 65 cursos</strong> de uñas, maquillaje y pestañas <strong>incluídos</strong>. Además, recibe acceso a cursos de Drill profesional, Dry Manicure Y Nails Master Revolution (un curso de uñas en técnicas de Tips y Escultural). Aprende en línea, <strong>Desde cero</strong> con <strong>revisión de prácticas</strong>, asesorías ilimitadas y <strong>Certificado oficial</strong> de la marca. Un precio real de <s>$6.307,00 MXN</s> reducido a un costo total de $1.599,00 MXN (99 USD) que podrás pagar en 4 pagos de $399,00 MXN (25 USD). 💞 <strong>LUGARES MUY LIMITADOS. Apresúrate a apartar tu lugar antes de que se agoten. Solicita</strong> tu inscripción con beca al 75% de descuento y plan de <strong>4 pagos de $399 MXN</strong> (uno a la semana) y en caso de ser seleccionada, te contactaremos de inmediato. 🥳</p>",
    createdAt: "04-12-2023 14:12:37",
    editedAt: "12-12-2023 19:42:00",
    img: {
      source: "/images/forms/IPHONE-removebg-preview.png",
      isVisible: true,
    },
    optionsArray: [
      {
        isVisible: true,
        label: `<p>Recuerda que el <strong>costo del programa es de $1.599,00 MXN</strong> y podrás pagarlo en 4 partes. <strong>Se dará acceso</strong> una vez que liquides el monto total. ¡Todas las alumnas de este programa ·"Gonvar+ cuatrimestral" participan para <strong>ganar un iPhone 15 Pro</strong> Nuevo, remodelación de su salón y miles de pesos más! <span style="color: rgb(18, 18, 18);">😍 </span>El primer pago de cuatro, deberás darlo hoy y <strong>Máximo este</strong> SÁBADO 16 de Diciembre. Elige tu plan de Pagos:</p>`,
        options: [
          "Pagaré en 4 partes de 399 pesos (un pago a la semana)",
          "Pagaré en una sola exhibición máximo el día sábado",
        ],
      },
      {
        isVisible: true,
        label: `<p><strong>En caso de ser seleccionada</strong>, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso <strong>por completo</strong>? Recuerda que al ser seleccionada <strong>tomarás uno de los lugares</strong> y otras aspirantes quedarán fuera.</p>`,
        options: [
          "Si, me comprometo a realizar el programa",
          "No, gracias. Quiero perder mi lugar",
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
  {
    name: "Campaña 11 de Diciembre Tik Tok",
    title:
      "<p><strong>Solicitud</strong> de Beca de 75% y <strong>Plan de 4 pagos</strong> ¡Última oportunidad!</p>",
    subtitle:
      "<p><strong>Más de 65 cursos</strong> de uñas, maquillaje y pestañas <strong>incluídos</strong>. Además, recibe acceso a cursos de Drill profesional, Dry Manicure Y Nails Master Revolution (un curso de uñas en técnicas de Tips y Escultural). Aprende en línea, <strong>Desde cero</strong> con <strong>revisión de prácticas</strong>, asesorías ilimitadas y <strong>Certificado oficial</strong> de la marca. Un precio real de <s>$6.307,00 MXN</s> reducido a un costo total de $1.599,00 MXN (99 USD) que podrás pagar en 4 pagos de $399,00 MXN (25 USD). 💞 <strong>LUGARES MUY LIMITADOS. Apresúrate a apartar tu lugar antes de que se agoten. Solicita</strong> tu inscripción con beca al 75% de descuento y plan de <strong>4 pagos de $399 MXN</strong> (uno a la semana) y en caso de ser seleccionada, te contactaremos de inmediato. 🥳</p>",
    createdAt: "04-12-2023 14:12:37",
    editedAt: "12-12-2023 19:42:00",
    img: {
      source: "/images/forms/IPHONE-removebg-preview.png",
      isVisible: true,
    },
    optionsArray: [
      {
        isVisible: true,
        label: `<p>Recuerda que el <strong>costo del programa es de $1.599,00 MXN</strong> y podrás pagarlo en 4 partes. <strong>Se dará acceso</strong> una vez que liquides el monto total. ¡Todas las alumnas de este programa ·"Gonvar+ cuatrimestral" participan para <strong>ganar un iPhone 15 Pro</strong> Nuevo, remodelación de su salón y miles de pesos más! <span style="color: rgb(18, 18, 18);">😍 </span>El primer pago de cuatro, deberás darlo hoy y <strong>Máximo este</strong> SÁBADO 16 de Diciembre. Elige tu plan de Pagos:</p>`,
        options: [
          "Pagaré en 4 partes de 399 pesos (un pago a la semana)",
          "Pagaré en una sola exhibición máximo el día sábado",
        ],
      },
      {
        isVisible: true,
        label: `<p><strong>En caso de ser seleccionada</strong>, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso <strong>por completo</strong>? Recuerda que al ser seleccionada <strong>tomarás uno de los lugares</strong> y otras aspirantes quedarán fuera.</p>`,
        options: [
          "Si, me comprometo a realizar el programa",
          "No, gracias. Quiero perder mi lugar",
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
  {
    name: "Venta nocturna 15 Diciembre",
    title:
      "<p>¡Gran Venta Nocturna Gonvar! 🎁🎄<br>Hasta el 40% de descuento</p>",
    subtitle:
      "<p><strong>Válido Sólo desde Hoy y máximo este domingo 17 de diciembre</strong> los mejores precios en <strong>producto de uñas</strong> nunca antes vistos. 🔥<br><br>🎄¡Navidad está cerca! Y Gonvar te quiere consentir.<br><br>Recuerda que al ser un Kit LIMITADO y con descuento tienes máximo hasta el Domingo para poder realizar tu pago. Este es un regalo que les damos a todas ustedes con todo el cariño para que puedan darle el mejor uso a todos los productos y lo disfruten al máximo con ustedes y sus clientas. Te contactaremos lo más rápido posible para confirmar tu kit y darte indicaciones de pago y envíos.<br><br><strong>Completa el formulario</strong> para apartar uno de nuestros 3 kits con diferentes productos y precios.</p>",
    createdAt: "15-12-2023 16:28:23",
    editedAt: "15-12-2023 16:36:42",
    img: { source: "/images/forms/mistery box gonvar.png", isVisible: true },
    optionsArray: [
      {
        isVisible: true,
        label:
          "<p><strong>Elige sólo uno</strong> para apartarlo y <strong>consiéntete esta navidad.</strong> 🙋🏻‍♀️<strong>Hazlo</strong> sólo sí estás comprometida a completar tu pago <strong>máximo el domingo</strong>, ya que estos son LIMITADOS y al seleccionarlo dejarás a alguien fuera. Te mandaremos un mensaje de Whatsapp para confirmarte tu pedido.<br><br>Recomendación: La Mystery Box contiene <strong>GRANDES SORPRESAS Y 70 PRODUCTOS SECRETOS de la Marca</strong> donde ahorras $1,899 pesos y obtienes hasta 70% de descuento.<br><br>Perfecto, hermosa. Estas apunto de apartar tu kit con DESCUENTO, solo debes elegir cuál de los cinco opciones de kit vas a querer:</p>",
        options: [
          `Apartar Kit Pincel y Geles (Precio real: $1,620MXN) NO pagarás eso. Precio para ti: 1,199MXN`,
          "Apartar Kit de manicura y Drill (Precio real: $. 2,078MXN) NO pagarás eso. Precio para ti: 1,799MXN",
          "Apartar Kit Nails Máster(Precio real: $.3,654MXN) NO pagarás eso. Precio para ti: $1,949MXN",
          "Apartar Mystery Box (Precio real: $3,699MXN) NO pagarás eso. Precio para ti: $1,999MXN",
          "Hacer pedido personalizado (a partir de 3,000 pesos MXN)",
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
  {
    name: "campaña 29 Enero 2024 Facebook",
    title:
      "<p><strong>Solicitud</strong> de Beca de 75% y <strong>Plan de 4 pagos</strong> ¡Última oportunidad!</p>",
    subtitle:
      "<p><strong>Más de 65 cursos</strong> de uñas, maquillaje y pestañas <strong>incluídos</strong>. Además, recibe acceso a cursos de Drill profesional, Dry Manicure Y Nails Master Revolution (un curso de uñas en técnicas de Tips y Escultural). Aprende en línea, <strong>Desde cero</strong> con <strong>revisión de prácticas</strong>, asesorías ilimitadas y <strong>Certificado oficial</strong> de la marca. Un precio real de <s>$6.307,00 MXN</s> reducido a un costo total de $1.599,00 MXN (99 USD) que podrás pagar en 4 pagos de $399,00 MXN (25 USD). 💞 <strong>LUGARES MUY LIMITADOS. Apresúrate a apartar tu lugar antes de que se agoten. Solicita</strong> tu inscripción con beca al 75% de descuento y plan de <strong>4 pagos de $399 MXN</strong> (uno a la semana) y en caso de ser seleccionada, te contactaremos de inmediato. 🥳</p>",
    createdAt: "04-12-2023 14:12:37",
    editedAt: "12-12-2023 19:42:00",
    img: { source: "/images/forms/form29Enero2024.jpeg", isVisible: true },
    optionsArray: [
      {
        isVisible: true,
        label: `<p>Recuerda que el <strong>costo del programa es de $1.599,00 MXN</strong> y podrás pagarlo en 4 partes. <strong>Se dará acceso</strong> una vez que liquides el monto total. ¡Todas las alumnas de este programa ·"Gonvar+ cuatrimestral" participan para <strong>ganar hasta $30.000 MXN en productos.</strong> <span style="color: rgb(18, 18, 18);">😍 </span>El primer pago de cuatro, deberás darlo hoy y <strong>Máximo este</strong> SÁBADO 03 de Febrero. Elige tu plan de Pagos:</p>`,
        options: [
          "Pagaré en 4 partes de 399 pesos (un pago a la semana)",
          "Pagaré en una sola exhibición máximo el día sábado",
        ],
      },
      {
        isVisible: true,
        label: `<p><strong>En caso de ser seleccionada</strong>, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso <strong>por completo</strong>? Recuerda que al ser seleccionada <strong>tomarás uno de los lugares</strong> y otras aspirantes quedarán fuera.</p>`,
        options: [
          "Si, me comprometo a realizar el programa",
          "No, gracias. Quiero perder mi lugar",
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
  {
    name: "campaña 29 Enero 2024 Google",
    title:
      "<p><strong>Solicitud</strong> de Beca de 75% y <strong>Plan de 4 pagos</strong> ¡Última oportunidad!</p>",
    subtitle:
      "<p><strong>Más de 65 cursos</strong> de uñas, maquillaje y pestañas <strong>incluídos</strong>. Además, recibe acceso a cursos de Drill profesional, Dry Manicure Y Nails Master Revolution (un curso de uñas en técnicas de Tips y Escultural). Aprende en línea, <strong>Desde cero</strong> con <strong>revisión de prácticas</strong>, asesorías ilimitadas y <strong>Certificado oficial</strong> de la marca. Un precio real de <s>$6.307,00 MXN</s> reducido a un costo total de $1.599,00 MXN (99 USD) que podrás pagar en 4 pagos de $399,00 MXN (25 USD). 💞 <strong>LUGARES MUY LIMITADOS. Apresúrate a apartar tu lugar antes de que se agoten. Solicita</strong> tu inscripción con beca al 75% de descuento y plan de <strong>4 pagos de $399 MXN</strong> (uno a la semana) y en caso de ser seleccionada, te contactaremos de inmediato. 🥳</p>",
    createdAt: "04-12-2023 14:12:37",
    editedAt: "12-12-2023 19:42:00",
    img: { source: "/images/forms/form29Enero2024.jpeg", isVisible: true },
    optionsArray: [
      {
        isVisible: true,
        label: `<p>Recuerda que el <strong>costo del programa es de $1.599,00 MXN</strong> y podrás pagarlo en 4 partes. <strong>Se dará acceso</strong> una vez que liquides el monto total. ¡Todas las alumnas de este programa ·"Gonvar+ cuatrimestral" participan para <strong>ganar hasta $30.000 MXN en productos.</strong> <span style="color: rgb(18, 18, 18);">😍 </span>El primer pago de cuatro, deberás darlo hoy y <strong>Máximo este</strong> SÁBADO 03 de Febrero. Elige tu plan de Pagos:</p>`,
        options: [
          "Pagaré en 4 partes de 399 pesos (un pago a la semana)",
          "Pagaré en una sola exhibición máximo el día sábado",
        ],
      },
      {
        isVisible: true,
        label: `<p><strong>En caso de ser seleccionada</strong>, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso <strong>por completo</strong>? Recuerda que al ser seleccionada <strong>tomarás uno de los lugares</strong> y otras aspirantes quedarán fuera.</p>`,
        options: [
          "Si, me comprometo a realizar el programa",
          "No, gracias. Quiero perder mi lugar",
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
  {
    name: "campaña 29 Enero 2024 Tik Tok",
    title:
      "<p><strong>Solicitud</strong> de Beca de 75% y <strong>Plan de 4 pagos</strong> ¡Última oportunidad!</p>",
    subtitle:
      "<p><strong>Más de 65 cursos</strong> de uñas, maquillaje y pestañas <strong>incluídos</strong>. Además, recibe acceso a cursos de Drill profesional, Dry Manicure Y Nails Master Revolution (un curso de uñas en técnicas de Tips y Escultural). Aprende en línea, <strong>Desde cero</strong> con <strong>revisión de prácticas</strong>, asesorías ilimitadas y <strong>Certificado oficial</strong> de la marca. Un precio real de <s>$6.307,00 MXN</s> reducido a un costo total de $1.599,00 MXN (99 USD) que podrás pagar en 4 pagos de $399,00 MXN (25 USD). 💞 <strong>LUGARES MUY LIMITADOS. Apresúrate a apartar tu lugar antes de que se agoten. Solicita</strong> tu inscripción con beca al 75% de descuento y plan de <strong>4 pagos de $399 MXN</strong> (uno a la semana) y en caso de ser seleccionada, te contactaremos de inmediato. 🥳</p>",
    createdAt: "04-12-2023 14:12:37",
    editedAt: "12-12-2023 19:42:00",
    img: { source: "/images/forms/form29Enero2024.jpeg", isVisible: true },
    optionsArray: [
      {
        isVisible: true,
        label: `<p>Recuerda que el <strong>costo del programa es de $1.599,00 MXN</strong> y podrás pagarlo en 4 partes. <strong>Se dará acceso</strong> una vez que liquides el monto total. ¡Todas las alumnas de este programa ·"Gonvar+ cuatrimestral" participan para <strong>ganar hasta $30.000 MXN en productos.</strong> <span style="color: rgb(18, 18, 18);">😍 </span>El primer pago de cuatro, deberás darlo hoy y <strong>Máximo este</strong> SÁBADO 03 de Febrero. Elige tu plan de Pagos:</p>`,
        options: [
          "Pagaré en 4 partes de 399 pesos (un pago a la semana)",
          "Pagaré en una sola exhibición máximo el día sábado",
        ],
      },
      {
        isVisible: true,
        label: `<p><strong>En caso de ser seleccionada</strong>, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso <strong>por completo</strong>? Recuerda que al ser seleccionada <strong>tomarás uno de los lugares</strong> y otras aspirantes quedarán fuera.</p>`,
        options: [
          "Si, me comprometo a realizar el programa",
          "No, gracias. Quiero perder mi lugar",
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
  {
    name: "Venta nocturna 02 Febrero 2024",
    title:
      "<p>¡Gran Venta Nocturna Gonvar! 🎁💘<br>Hasta el 40% de descuento</p>",
    subtitle:
      "<p><strong>Válido Sólo desde Hoy y máximo este lunes 5 de Febrero</strong> los mejores precios en <strong>producto de uñas</strong> nunca antes vistos. 🔥<br><br>💘¡El día del amor y la amistad está cerca! Y Gonvar te quiere consentir.<br><br>Recuerda que al ser un Kit LIMITADO y con descuento tienes máximo hasta el lunes para poder realizar tu pago. Este es un regalo que les damos a todas ustedes con todo el cariño para que puedan darle el mejor uso a todos los productos y lo disfruten al máximo con ustedes y sus clientas. Te contactaremos lo más rápido posible para confirmar tu kit y darte indicaciones de pago y envíos.<br><br><strong>Completa el formulario</strong> para apartar uno de nuestros 4 kits con diferentes productos y precios.</p>",
    createdAt: "02-02-2024 16:28:23",
    editedAt: "02-02-2024 16:36:42",
    img: { source: "/images/forms/form02Feb2024.jpeg", isVisible: true },
    optionsArray: [
      {
        isVisible: true,
        label:
          "<p><strong>Elige sólo uno</strong> para apartarlo y <strong>consiéntete.</strong> 🙋🏻‍♀️<strong>Hazlo</strong> sólo sí estás comprometida a completar tu pago <strong>máximo el lunes</strong>, ya que estos son LIMITADOS y al seleccionarlo dejarás a alguien fuera. Te mandaremos un mensaje de Whatsapp para confirmarte tu pedido.<br><br>Recomendación: La Mystery Box contiene <strong>GRANDES SORPRESAS Y PRODUCTOS SECRETOS de la Marca</strong> donde ahorras $1,899 pesos y obtienes hasta 70% de descuento.<br><br>Perfecto, hermosa. Estas apunto de apartar tu kit con DESCUENTO, solo debes elegir cuál de las 4 opciones de kit vas a querer:</p>",
        options: [
          `Apartar Kit Nails Máster (Precio real: $3,654MXN) NO pagarás eso. Precio para ti: $1,949MXN`,
          "Apartar Mystery Box Love Edition + Drill (Precio real: $3,699MXN) NO pagarás eso. Precio para ti: $1,999MXN",
          "Apartar Mystery Box Love Edition + Pincel (Precio real: $3,699MXN) NO pagarás eso. Precio para ti: $1,999MXN",
          "Hacer pedido personalizado (a partir de 3,000 pesos MXN)",
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
  {
    name: "Tanda Pinceles 12 Febrero 2024",
    title:
      "<p>¡Únete a nuestra tanda de pinceles Gonvar!🥳🖌️</p>",
    subtitle:
      "<p><strong>Registro Válido Sólo desde Hoy y máximo este viernes 16 de Febrero,</strong> plan de 4 pagos flexibles.</p><p>🚨Los lugares son limitados, asegúrate de conseguir lugar antes de que se agoten</span>.</p><p>Recuerda que al ser un programa LIMITADO tienes máximo hasta el Sábado 17 para poder realizar tu pago. Este es un plan que les damos a todas ustedes con todo el cariño para que puedan obtener su pincel profesional y lo disfruten al máximo con ustedes y sus clientas. Te contactaremos lo más rápido posible para confirmar tu lugar y darte indicaciones de pago y envíos.</p><p><strong>Completa el formulario</strong> para elegir una de las opciones de pincel que tenemos para ti en esta Tanda.</p>",
    createdAt: "12-02-2024 16:16:08",
    editedAt: "12-02-2024 16:16:08",
    img: { source: "/images/forms/form02Feb2024.jpeg", isVisible: true },
    optionsArray: [
      {
        isVisible: true,
        label:
          "<p><strong>Elige sólo uno</strong> para apartarlo y <strong>consiéntete.</strong> 🙋🏻‍♀️ <strong>Hazlo</strong> sólo si estás comprometida a completar tu primer pago <strong>máximo el Sábado 17</strong>, ya que estos son LIMITADOS y al seleccionarlo dejarás a alguien fuera.Te mandaremos un mensaje de Whatsapp para confirmarte tu pedido.</p>",
        options: [
          `Apartar Pincel profesional de aplicación Kolinsky 100% natural del Número 10 con acabado en aluminio Ligero Gold Rose. (Disponible para entrega inmediata en caso de liquidar antes)\n
          Incluye:\n
          💕Envío Gratis a todo México\n
          💕Estuche de viaje con acabado  Soft touch\n
          💕Curso de cuidados del pincel Gratis\n`,
          `Apartar Kit de Pinceles Profesionales de Arte Van Gogh, diseñados con acabado Fino en aluminio Rose Gold. Cada pincel ofrece una combinación única de cerdas suaves y resistentes que garantizan una aplicación suave y precisa. Fabricados con mangos ergonómicos para un control óptimo, estos pinceles son la herramienta perfecta para artistas de todos los niveles. (Disponible solo para entrega en 4 semanas)\n
          Incluye:\n
          💕5 Pinceles de doble punta (10 Pinceles de Arte)\n
          💕Envío Gratis a todo México\n
          💕Estuche de viaje  con acabado Soft Touch\n
          💕Curso de uso de los Pinceles Gratis`,
        ],
      },
      { isVisible: false, label: "", options: ["", ""] },
      { isVisible: false, label: "", options: ["", ""] },
    ],
    redirect: {
      type: "thankYouPage",
      link: "",
      textButton: "",
    },
  },
];

export default forms;
