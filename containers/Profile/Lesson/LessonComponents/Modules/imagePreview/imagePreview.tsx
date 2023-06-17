

import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

import { LoaderImage } from "../../../../../../components/Loader.styled";
import { LoaderContain } from "../../../../User/User.styled";
import { ImageContainter } from "./ImagePreview.styled";

const ImagePreview = (props: any) => {
  const { show, setShow, imageDisplay, type, getImage, loader, setTypeFile, setImageDisplay, user, lesson } = props;
  const handleClose = () => {
    setShow(false);
    setTypeFile('');
    setImageDisplay('');
  }
  return (
    <Modal show={show} centered className='modal-xl'>
      <ImageContainter>

        <AiOutlineClose onClick={handleClose} className='close' />
        <div className="row">
          <div className='text-contain col-lg-5 col-md-12'>
            <h2 className="purple h1 fw-semibold text-center">¡Hola <b>{user}</b>!</h2>
            <p className="purple h2 fw-semibold text-center">Hermosa, estás por entregar tu tarea de <b>{lesson}</b></p>
            <p className="purple h2 fw-semibold text-center">Si todo está bien, solo da click en aceptar para enviarla.</p>
            {
              (type !== "aplication/pdf" && type.substring(0, 5) !== "image") &&
              <p className='note'>(Los documentos .doc y .docx no cuentan con vista previa)</p>
            }
            <div className="button-contain">
              <div className='buttons'>
                <button className='btn' onClick={handleClose}>Salir</button>
                {
                  loader
                    ?
                    <LoaderImage>
                      <LoaderContain />
                    </LoaderImage>
                    : <button className='btn' onClick={() => getImage(imageDisplay)} >Aceptar</button>
                }
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            {
              type === "application/pdf" &&
              <iframe src={imageDisplay} className='image' height="600px" />
            }
            {
              type.substring(0, 5) === "image" &&
              <img src={imageDisplay} className="image" />
            }
          </div>
          <div className="button-contain">
            <div className='buttons mt-3'>
              <button className='btn-down' onClick={handleClose}>Salir</button>
              {
                loader
                  ?
                  <LoaderImage>
                    <LoaderContain />
                  </LoaderImage>
                  : <button className='btn-down' onClick={() => getImage(imageDisplay)}>Aceptar</button>
              }
            </div>
          </div>
        </div>



      </ImageContainter>
    </Modal>
  )
}
export default ImagePreview;