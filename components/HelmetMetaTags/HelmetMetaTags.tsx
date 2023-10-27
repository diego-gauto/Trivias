import React from "react";
import { useRouter } from 'next/router';
import { DataForHelmet } from "./IHelmetMetaTags";
import Head from "next/head";
export default function HelmetMetaTags(props: DataForHelmet) {
  const { quote, title, image, description, hashtag } = props;
  const router = useRouter();
  let currentUrl = "https://gonvar.io" + router.asPath;
  let quote_tag = quote !== "" ? quote : "";
  let title_tag = title !== "" ? title : "Gonvar Nails Academy";
  let image_tag = image !== "" ? image : "/images/logo-g.png";
  let description_tag = (description !== " ") ? description : "Descubre la academia de belleza para convertirte en un experto. Aprende técnicas y tendencias con los profesionales del sector. ¡Inscríbete ya!";
  let hashtag_tag = hashtag !== "" ? hashtag : "#gonvar";
  return (
    <Head>
      <title>{title_tag}</title>
      <meta property="url" content={currentUrl} />
      <meta property="title" content={title_tag} />
      <meta property="quote" content={quote_tag} />
      <meta name="description" content={description_tag} />
      <meta property="image" content={image_tag} />
      <meta property="og:title" content={title_tag} />
      <meta property="og:quote" content={quote_tag} />
      <meta property="og:hashtag" content={hashtag_tag} />
      <meta property="og:image" content={image_tag} />
      <meta property="og:type" content="article" />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description_tag} />
    </Head>
  );
}
