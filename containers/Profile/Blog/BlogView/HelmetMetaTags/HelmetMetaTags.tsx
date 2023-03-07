import React from "react";
import { Helmet } from "react-helmet";
import { useRouter } from 'next/router';
export default function HelmetMetaTags(props: any) {
  const router = useRouter();
  let currentUrl = "http://gonvar.io" + router.asPath;
  let quote = props.quote !== undefined ? props.quote : "";
  let title = props.title !== undefined ? props.title : "Gonvar Nails Academy";
  let image = props.image !== undefined ? props.image : "https://storage.googleapis.com/cmperstribe_storage_usha/Banner/IMG_3640.JPG";
  let description = props.description !== undefined ? props.description : "CampersTribe lets you experience the camping culture. We discover the hidden gems in the nearby to help you connect with nature & yourself by learning in the woods, on the riverbank under the open sky." +
    "Trust us, its million dollars experience to ride away from city life, pitch a tent, do campfire and endless talk!" +
    "So, join us on this voyage, and explore the beauty and miracle of being yourself!";
  let hashtag = props.hashtag !== undefined ? props.hashtag : "#gonvar";
  return (
    <Helmet>


      <title>https://www.gonvar.io/%C2%BFCon-qu%C3%A9-puedo-pegar-u%C3%B1as-postizas-si-no-tengo-pegamento%3F</title>
      <meta name="description" content="Gonvar Prueba" />


      <meta property="og:url" content="https://www.gonvar.io/%C2%BFCon-qu%C3%A9-puedo-pegar-u%C3%B1as-postizas-si-no-tengo-pegamento%3F" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="https://www.gonvar.io/%C2%BFCon-qu%C3%A9-puedo-pegar-u%C3%B1as-postizas-si-no-tengo-pegamento%3F" />
      <meta property="og:description" content="Gonvar Prueba" />
      <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/blog%2F%C2%BFCon%20qu%C3%A9%20puedo%20pegar%20u%C3%B1as%20postizas%20si%20no%20tengo%20pegamento%3F-604272aa-44aa-4f1e-80b5-7d4588aad96f?alt=media&token=45651d40-7c50-480f-a874-bacbcb65cecf" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="gonvar.io" />
      <meta property="twitter:url" content="https://www.gonvar.io/%C2%BFCon-qu%C3%A9-puedo-pegar-u%C3%B1as-postizas-si-no-tengo-pegamento%3F" />
      <meta name="twitter:title" content="https://www.gonvar.io/%C2%BFCon-qu%C3%A9-puedo-pegar-u%C3%B1as-postizas-si-no-tengo-pegamento%3F" />
      <meta name="twitter:description" content="Gonvar Prueba" />
      <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/blog%2F%C2%BFCon%20qu%C3%A9%20puedo%20pegar%20u%C3%B1as%20postizas%20si%20no%20tengo%20pegamento%3F-604272aa-44aa-4f1e-80b5-7d4588aad96f?alt=media&token=45651d40-7c50-480f-a874-bacbcb65cecf" />


      {/* <title>{title}</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} /> */}
    </Helmet>
  );
}
