import { Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';

import { SuscriptionContain } from './LandingNailsMaster.styled';
import { MaterialsModal } from '../LandingNailsMasterRevolution/LandingNailsMasterRevolution.styled';

const star = 'images/landing_nails_master/star_outline.png';

interface Materiales {
  show: any;
  setShow: () => void;
}

const MaterialesModal = (props: Materiales) => {
  const { show, setShow } = props;

  const shopRedirect = () => {
    window.open('https://gonvarnails.mx');
  };

  return (
    <Modal show={show} onHide={setShow} size='xl'>
      <SuscriptionContain>
        <Modal.Body>
          <MaterialsModal>
            <div className='end'>
              <AiOutlineClose className='icon' onClick={setShow} />
            </div>
            <h2 className='title'>¡Hola!</h2>
            <h5 className='subtitle'>
              Estos son todos los materiales que necesitarás para{' '}
              <b>Nails Master Revolution.</b>
              <br />
              Recuerda que puedes encontrar todo esto y más en nuestra tienda
              oficial Gonvar.
            </h5>

            <div className='materials-list'>
              <div className='materials-column'>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Aceite para hidratar cutícula</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Acrílico blanco</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Acrílico cover </p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Acrílico Cristal</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Acrílicos de colores</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Alicatas para corte recto</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Cepillo de cerdas de nylon</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Cristales</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Cubrebocas</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Empujador de cutícula</p>
                </div>
              </div>
              <div className='materials-column'>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Gel semipermanente de colores varios</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Godete</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Guantes de Nitrílo</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Lámpara, Mínimo de 24 watts</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Lima Buffer</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Limas Grano Medio y Fuerte</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Líquido sanitizante</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Nivelado de PH</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Pincel Kolinsky #8 o #10</p>
                </div>
              </div>
              <div className='materials-column'>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Primer adherente</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Resina</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Servitoalla</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Tijeras para corte</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Tips</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Toallitas limpiadoras, libres de pelusa</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Top Coat</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Top Matte</p>
                </div>
                <div className='icon-row'>
                  <img src={star} />
                  <p>Vasito de cristal</p>
                </div>
              </div>
            </div>

            <div className='materials-footer'>
              <button className='btn' onClick={() => shopRedirect()}>
                ¡Vamos a la tienda!
              </button>
              <p className='tip'>
                Tip: Toma captura de pantalla y ve rellenando las estrellas de
                los productos que ya tengas
              </p>
            </div>
          </MaterialsModal>
        </Modal.Body>
      </SuscriptionContain>
    </Modal>
  );
};

export default MaterialesModal;
