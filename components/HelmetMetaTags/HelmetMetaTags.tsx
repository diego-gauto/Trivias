import React from "react";
import { Helmet } from "react-helmet";
import { useRouter } from 'next/router';
import { DataForHelmet } from "./IHelmetMetaTags";
export default function HelmetMetaTags(props: DataForHelmet) {
  const { quote, title, image, description, hashtag } = props;
  const router = useRouter();
  let currentUrl = "https://gonvar.io" + router.asPath;
  let quote_tag = quote !== "" ? quote : "";
  let title_tag = title !== "" ? title : "Gonvar Nails Academy";
  let image_tag = image !== "" ? image : "/images/logo-g.png";
  let description_tag = description !== "" ? description : "Gonvar - La mejor academia";
  let hashtag_tag = hashtag !== "" ? hashtag : "#gonvar";
  return (
    <Helmet>
      <title>{title_tag}</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title_tag} />
      <meta property="quote" content={quote_tag} />
      <meta name="description" content={description_tag} />
      <meta property="image" content={image_tag} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title_tag} />
      <meta property="og:quote" content={quote_tag} />
      <meta property="og:hashtag" content={hashtag_tag} />
      <meta property="og:image" content={image_tag} />
      <meta property="og:type" content="article" />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description_tag} />
    </Helmet>
  );
}
