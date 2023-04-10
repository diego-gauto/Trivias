import React from 'react'
import { Modal } from 'react-bootstrap';
import { IMaterialData, IMaterials } from './IModalMaterials';
import { Container } from './ModalMaterials.styled';

export const ModalMaterials = (props: IMaterials) => {

  const { show, setShow, materials } = props;

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered >
      <Container>
        <div className="top-section">
          <h1>
            Materiales
          </h1>
          {materials?.map((material: IMaterialData, index: any) => {
            return (
              <p key={"Materiales " + index}>{material.name}</p>
            )
          })}
        </div>
        <button onClick={handleClose}>x</button>
      </Container>
    </Modal>
  )
}
export default ModalMaterials;