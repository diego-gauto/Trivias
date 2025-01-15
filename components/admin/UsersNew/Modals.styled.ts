import styled from 'styled-components';

export const SuccessModalContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
  color: #691aca;

  .header-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .header-modal__success-circle {
    border-radius: 50%;
    background-color: #0ead69;
    width: 50px;
    height: 50px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
  }

  .header-modal__title {
    margin: 0;
    font-weight: bold;
    font-size: 20px;
  }

  .body-modal {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .body-modal__text {
    margin: 0;
    text-align: center;
    color: #8c4fd7;
    font-weight: bold;
  }
`;

export const ActivateSubscriptionModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;

  .activate-subscription-modal__body {
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: #691aca;
    text-align: start;
  }

  .activate-subscription-modal__section {
  }

  .activate-subscription-modal__title {
    margin: 0;
    font-weight: bold;
  }

  .activate-subscription-modal__label {
    margin: 0;
    font-weight: bold;
  }

  .activate-subscription-modal__select-input {
    width: calc(100% - 30px);
    border-radius: 16px;
    height: 35px;
    padding: 5px 10px;
    margin-top: 5px;
  }

  .activate-subscription-modal__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export const UpdateFinalDateModal = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .update-fd-modal__input-date {
    border-radius: 16px;
    padding: 5px 15px;
  }

  .update-fd-modal__paragraph {
    margin: 0;
  }
`;

export const RemoveSubscriptionModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;

  .remove-subscription-modal__body {
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: #691aca;
    text-align: center;
  }

  .remove-subscription-modal__title {
    margin: 0;
    font-weight: bold;
    font-size: 18px;
  }

  .remove-subscription-modal__label {
    margin: 0;
    font-weight: bold;
  }

  .remove-subscription-modal__paragraph {
    margin: 0;
  }

  .remove-subscription-modal__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export const ShowCodeSellDetailModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;
