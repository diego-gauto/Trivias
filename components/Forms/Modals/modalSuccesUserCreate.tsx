import { useRouter } from "next/router";
import styled from "styled-components";

const ModalSuccessUserCreate = ({ closeModal }: { closeModal: (value: boolean) => void }) => {

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/preview`);
  };

  return (
    <>
      <Overlay>
        <ModalContainer>
          <ModalHead>
            <h3>Solicitud procesada con éxito</h3>
          </ModalHead>
          <CloseButton onClick={() => closeModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </CloseButton>
          <ContentContainer>
            <h4>¡Felicidades!</h4>
            <h5>Has solicitado tu beca con éxito</h5>
            <h6>En los próximos días nos comunicaremos contigo para indicarte los pasos a seguir</h6>
            <p>Te invitamos a navegar nuestra plataforma y tomar alguno de nuestros cursos gratuitos</p>
          </ContentContainer>
          <ButtonContainer>
            <RedirectButton onClick={handleRedirect}>Ir a Cursos</RedirectButton>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </>
  )
}

export default ModalSuccessUserCreate

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 500px;
  min-height: 100px;
  background: #FFF;
  position: relative;
  border-radius: 10px;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
  padding: 20px;

  font-family: "Montserrat";
  font-style: normal;
  color: #520795;

  display: flex;
  flex-direction: column;
  align-items: start;
`;

const ModalHead = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #E8E8E8;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #CD42D3;
  }
`;

const ContentContainer = styled.div`
  text-align: center; /* Centra el texto horizontalmente */
  margin-bottom: 20px; /* Agrega un espacio entre h4 y los demás elementos */
  font-weight: 500;
  
  h4 {
    font-weight: 600;
    font-size: 36px;
  }

  h5, h6, p {
    text-align: left; /* Alinea el resto de los textos a la izquierda */
  }

  p {
    color: #CD42D3;
    font-size:16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;

  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: .3s ease all;
  border-radius: 5px;
  color: #520795;

  &:hover{
    background: #F2F2F2;
  }

  svg{
    width: 100%;
    height: 100%;
  }
  `;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

const RedirectButton = styled.button`
    font-family: "Montserrat";
    border-radius: 100px;
    background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
    color: #ede7f2;
    border: 0;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;    
    width: 200px;
    height: 45px;

  &:hover {
    transform: scale(1.03);
    -webkit-transition: 0.5s ease all;
    transition: 0.5s ease all;
    background-color: #5000b5;
  }
  `;