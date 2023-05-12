import React from 'react'
import { Modal } from 'react-bootstrap';
import { ImageContainter } from './ImagePreview.styled';
import { AiOutlineClose } from 'react-icons/ai';
import DocViewer from "react-doc-viewer";
import { LoaderContain } from '../../../../../../components/Loader.styled';

const ImagePreview = (props: any) => {
  const { show, setShow, imageDisplay, type, getImage, loader, setTypeFile, setImageDisplay } = props;
  const handleClose = () => {
    setShow(false);
    setTypeFile('');
    setImageDisplay('');
  }
  return (
    <Modal show={show} centered className='modal-xl'>
      <ImageContainter>
        <div className='button-contain'>
          <h1>¿Desea continuar?</h1>
          {
            (type !== "aplication/pdf" && type.substring(0, 5) !== "image") &&
            <p className='note'>(Los documentos .doc y .docx no cuentan con vista previa)</p>
          }
          <div className='buttons'>
            <button className='cancel-btn' onClick={handleClose}>Cancelar</button>
            {
              loader
                ? <LoaderContain />
                : <button className='continue-btn' onClick={() => getImage(imageDisplay)} >Continuar</button>
            }
          </div>
        </div>
        <AiOutlineClose onClick={handleClose} className='close' />
        {
          type === "application/pdf" &&
          <iframe src={imageDisplay} className='image' height="600px" />
        }
        {
          type.substring(0, 5) === "image" &&
          <img src={imageDisplay} className="image" />
        }
      </ImageContainter>
    </Modal>
  )
}
export default ImagePreview;