import React from 'react'
import { Modal } from 'react-bootstrap';
import { Container } from './ModalMaterials.styled';

export const ModalMaterials = ({ show, setShow, materials }: any) => {

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered >
      <Container>
        <div className="top-section">
          <h1>
            Materiales
          </h1>
          {materials?.map((material: any) => {
            return (
              <p>{material}</p>
            )
          })}
        </div>
        <button onClick={handleClose}>x</button>
      </Container>
    </Modal>
  )
}
export default ModalMaterials;