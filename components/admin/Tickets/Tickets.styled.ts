import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const ModalContainer = styled(Modal)`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  .modal-content {
    border-radius: 12px !important;
  }
  @media (min-width: 992px) {
    .modal-lg,
    .modal-xl {
      --bs-modal-width: 66%;
    }
  }
`;
