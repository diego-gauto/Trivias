import React from 'react'
import { Modal } from 'react-bootstrap';
import { ImageContainter } from './ImagePreview.styled';
import { AiOutlineClose } from 'react-icons/ai';

const ImagePreview = (props: any) => {
  const { show, setShow, imageDisplay } = props;
  return (
    <Modal show={show} centered>
      <ImageContainter>
        <AiOutlineClose onClick={() => setShow(false)} className='close' />
        <iframe src={imageDisplay} title="PDF Viewer" width="100%" height="600px" className='document' style={{ marginTop: 50 }} />
        {/* <img src={imageDisplay} /> */}
      </ImageContainter>

    </Modal>
  )
}
export default ImagePreview;