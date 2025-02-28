import styled from 'styled-components';

export const ModalContainer = styled.div`
  .modal-backdrop-custom {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo negro transparente */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content-custom {
    background-color: white;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 20px;
    width: 380px;
    min-width: 300px;
  }

  .gonvar-button {
    border-radius: 16px;
    transition: background-color 0.5s ease;
    height: 35px;
  }

  .gonvar-button--disabled {
    border: none;
    background-color: darkgray;
    color: white;
  }

  .gonvar-button--purple {
    border: 2px solid white;
    background-color: #691aca;
    color: white;
  }

  .gonvar-button--purple:hover {
    color: #691aca;
    background-color: white;
    border: 2px solid #691aca;
  }

  .gonvar-button--ghost {
    background-color: transparent;
    color: #691aca;
    border: 2px solid #691aca;
  }

  .gonvar-button--ghost:hover {
    color: white;
    background-color: #691aca;
  }
`;
