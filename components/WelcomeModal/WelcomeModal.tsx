import React from 'react'
import { Modal } from 'react-bootstrap';
import { TfiClose } from 'react-icons/tfi';
import ReactPlayer from 'react-player';
import { IWelcomeModal } from './IWelcomeModa';
import { WelcomeContainer } from './WelcomeModal.styled';

const WelcomeModal = (props: IWelcomeModal) => {
  const { show, setShow } = props
  const handleClose = () => setShow(false);
  const VideoPlayer = "https://video.gonvar.io/media/instrucciones/1_04/master.m3u8"
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <WelcomeContainer>
        <div className='title-container'>
          <h1 className='title'>
            Bienvenida a tú nueva plataforma, ve este video
            para conocer mas sobre la experiencia <span>Gonvar</span>.
          </h1>
          <TfiClose className="close" onClick={handleClose} />
        </div>
        <ReactPlayer
          url={VideoPlayer}
          playing={true}
          muted={false}
          controls
          width="100%" height="100%"
        />
      </WelcomeContainer>
    </Modal>
  )
}
export default WelcomeModal;