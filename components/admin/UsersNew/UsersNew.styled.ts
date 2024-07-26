/*
img {
  max-width: 100%;
}

.main-container {
  background-color: #e3dded;
  width: 100%;
  max-height: 100vh;
  height: 100%;
}
*/

import styled from 'styled-components';

//const linesBackgroundStyles: CSSProperties = {
//backgroundImage: "url('/images/admin/users-view-background.png')", /* URL de tu imagen */
//backgroundRepeat: "repeat-x", /* Repetir solo verticalmente */
//backgroundSize: "100% auto", /* La imagen ocupa todo el ancho del contenedor */
//backgroundPosition: "top", /* La imagen se alinea con la parte superior del contenedor */
//backgroundAttachment: 'fixed', /* Hace que la imagen se quede fija al hacer scroll */
//height: "100vh",
//}
//*/

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  background-image: url('/images/admin/users-view-background.png');
  background-attachment: 'fixed';
  min-height: 80vh;
  background-position: 'top';
  background-size: 100% auto;
  background-repeat: repeat-y;

  .top-header {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    font-size: 20px;
    align-self: flex-start;
    gap: 20px;
    font-weight: bold;
    color: #691aca;
  }

  .data-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 1100px;
  }

  .user-main-header,
  .sections-container,
  .content-section {
    background-color: white;
    border-radius: 16px;
    padding: 20px;
  }

  .user-main-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-around;
    align-items: center;
  }

  .user-profile {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .user-image {
    width: 80px;
    height: 80px;
    min-width: 80px;
    border-radius: 50%;
    border: 5px solid #691aca;
    overflow: hidden;
    margin-right: 30px;
  }

  .user-image img {
    width: 100%;
  }

  .user-name {
    font-size: 20px;
    font-weight: bold;
    margin-right: 15px;
    text-align: center;
    color: #691aca;
  }

  .user-properties {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .user-property-header {
    font-size: 18px;
    color: black;
    font-weight: normal;
  }

  .user-property-value {
    font-size: 16px;
    color: #691aca;
    font-weight: bold;
  }

  .sections-container {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-direction: column;
    align-items: center;
  }

  .section-title {
    font-size: 18px;
    color: #691aca;
  }

  .section-title--active {
    font-weight: bold;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .course-homeworks-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .course-homeworks-section__title-container {
    background-color: white;
    padding: 15px;
    border-radius: 16px;
    text-align: center;
  }

  .course-homeworks-section__title {
    color: #691aca;
    margin: 0;
  }

  .table-content {
    border-collapse: collapse;
    width: 100%;
    overflow-x: auto;
    order: 2;
  }

  .gonvar-table {
    width: 100%;
    border-spacing: 10px;
  }

  .gonvar-table__thead {
  }

  .gonvar-table__tbody {
    color: black;
  }

  .gonvar-table__row {
    padding: 10px;
  }

  .gonvar-table__th {
    padding-bottom: 10px;
    padding-inline: 15px;
    border-bottom: 2px solid lightgrey;
    color: #691aca;
  }

  .gonvar-table__data {
    padding: 10px 5px 0;
    font-size: 14px;
    color: black;
  }

  .gonvar-table__th,
  .gonvar-table__data {
    white-space: nowrap;
    text-align: center;
  }

  .gonvar-table__data--large-text {
    white-space: wrap;
    text-overflow: ellipsis;
    width: 50%;
  }

  .gonvar-table__approved-text,
  .gonvar-table__not-approved-text,
  .gonvar-table__not-checking-text,
  .gonvar-table__not-sended-text {
    font-weight: bold;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
  }

  .gonvar-table__not-approved-text {
    background-color: #ffc6c7cc;
    color: #c10b0ecc;
  }

  .gonvar-table__approved-text {
    background-color: #d5ffed;
    color: #0ead69;
  }

  .gonvar-table__not-checking-text {
    background-color: #f8e2f8;
    color: #d244d1;
  }

  .gonvar-table__not-sended-text {
    background-color: #cbcbcb;
    color: #323232;
  }

  .gonvar-table__purple-text {
    background-color: #f6efff;
    color: #691aca;
  }

  .gonvar-table__button {
    background-color: transparent;
    border: 2px solid #691aca;
    border-radius: 12px;
    padding: 6px 18px;
    font-size: 14px;
    font-weight: bold;
    color: #691aca;
  }

  .gonvar-table__button:hover {
    opacity: 0.7;
  }

  .go-back {
    display: flex;
    justify-content: center;
    align-items: start;
    font-weight: bold;
    order: 1;
    color: #691aca;
  }

  .go-back__arrow {
    max-width: 100%;
    height: 20px;
    width: 20px;
    margin: 0px 5px 5px 5px;
  }

  .rewards-sections {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    padding: 0px 0px 10px 0;
    color: #691aca;
  }

  .rewards-sections__option {
    padding: 10px 20px;
  }

  .rewards-sections__option--active {
    border-radius: 20px;
    border: 2px solid #691aca;
  }

  .rewards-details {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    color: #691aca;
  }

  .accumulated-rewards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .rewards__grid-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1f;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .rewards__grid-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }

  .reward-card {
    background-color: #d8cce2;
    border-radius: 16px;
    padding: 15px;
    text-align: center;
    gap: 5px;
    display: flex;
    flex-direction: column;
  }

  .reward-card__title {
    color: #ed8029;
  }

  .reward-card__subtitle {
  }

  .reward-card__bottom-text {
  }

  .reward-card__image-container {
    margin: 10px 0;
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
  }

  .certificate-card {
    background-color: transparent;
    border-radius: 16px;
    padding: 15px;
    text-align: center;
    gap: 5px;
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }

  .certificate-card__course-title {
    color: #d244d1;
    margin: 0;
  }

  .reward-card__instructor-name {
    color: black;
    font-weight: normal;
    margin: 0;
  }

  .certificate-card__image-container {
    margin: 10px 0;
    max-width: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
  }

  .certificate-card__image {
    width: 100%;
  }

  .locked-rewards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .empty-content-area {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
    color: #888;
    text-align: center;
    background-color: #eee;
    border-radius: 16px;
  }

  .empty-container {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .empty-content {
    background-color: #eee;
    padding: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
  }

  .empty-content-text {
    margin: 0;
    font-weight: 500;
  }

  .subscription-container {
  }

  .subscription-info-container {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: start;
    align-content: center;
    gap: 5px;
  }

  .subscription-item {
    padding: 10px;
  }

  .subscription-item__content,
  .subscription-item__header {
    padding: 10px;
    text-align: center;
  }

  .subscription-item__header {
  }

  .subscription-item__content {
    border-radius: 16px;
    background-color: #f6efff;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: column;
  }

  .subscription-item__content-text {
    color: #8a4bd7;
    font-weight: bold;
    margin: 0;
  }

  .subscription-item__content-text--normal-weight {
    font-weight: normal;
  }

  .subscription-item__title {
    color: #691aca;
    font-weight: 500;
    margin: 0;
  }

  @media screen and (min-width: 576px) {
    .sections-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .user-properties {
      grid-template-columns: 3fr 2fr;
    }

    .rewards__grid-container {
      grid-template-columns: 1fr 1fr;
    }

    .subscription-info-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (min-width: 768px) {
    .user-profile {
      flex-direction: row;
    }
    .user-properties {
      grid-template-columns: 3fr 2fr 2fr 1fr;
    }
    .sections-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .rewards-sections {
      flex-direction: row;
      justify-content: center;
    }
  }

  @media screen and (min-width: 992px) {
    .user-properties {
      grid-template-columns: 3fr 2fr 2fr 1fr;
    }
    .user-main-header {
      flex-direction: row;
    }
    .user-profile {
      flex-direction: row;
    }
    /* go-back contenedor ... TODO */
    .content-section {
    }
    .content-section--with-go-back {
      flex-direction: row;
    }

    .go-back {
      order: 2;
    }
    .table-content {
      order: 1;
    }
    .rewards__grid-container {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .subscription-info-container {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  @media screen and (min-width: 1200px) {
  }
`;
