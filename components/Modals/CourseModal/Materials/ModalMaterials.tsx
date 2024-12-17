import React from 'react';
import { Modal } from 'react-bootstrap';
import { IMaterialData, IMaterials } from './IModalMaterials';
import { Container } from './ModalMaterials.styled';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';

export const ModalMaterials = (props: IMaterials) => {
  const { show, setShow, materials, route } = props;

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <div className='top-section'>
          <h1>Materiales</h1>
          {materials?.map((material: IMaterialData, index: any) => {
            return (
              <div key={'Materiales ' + index}>
                <div className='circle' />
                {material.name}
              </div>
            );
          })}
        </div>
        <IoClose className='icon' onClick={handleClose} />
        {/* <button onClick={handleClose}></button> */}
        <p className='reg-text'>
          Lista de material avalado por el Sistema de Educación Profesional
          Gonvar®️.
        </p>
        {route !== '' && (
          <div className='btn-contain'>
            <p>
              Da click en el botón de abajo para que puedas ver los materiales
              que necesitarás para este curso.
            </p>
            <a target='_blank' href={route} style={{ textDecoration: 'none' }}>
              <button className='btn-buy'>Comprar Materiales</button>
            </a>
          </div>
        )}
      </Container>
    </Modal>
  );
};
export default ModalMaterials;
