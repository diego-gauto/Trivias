import { Col, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import {
  CUATRIMESTRAL_SUSCRIPTION_REDIRECT,
  PREVIEW_PATH,
  PURCHASE_PATH,
  SIGNUP_PATH,
} from '../../../constants/paths';
import { PurpleButton } from '../../common/PurpleButton/PurpleButton';
import { CardContainer } from './GonvarPlusModule.styled';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { useEffect } from 'react';
import { haveAccess, IUserData } from '../../GlobalFunctions';
declare let Hls: any;

interface Props {
  loggedIn: any;
  user: IUserData;
  courses: any;
}

export const GonvarPlusModule = ({ loggedIn, user, courses }: Props) => {
  const responsive1140 = useMediaQuery({ query: '(max-width: 1140px)' });
  const responsive768 = useMediaQuery({ query: '(max-width: 784px)' });
  const responsive576 = useMediaQuery({ query: '(max-width: 576px)' });

  const handleShow = () => {
    router.push({ pathname: CUATRIMESTRAL_SUSCRIPTION_REDIRECT });
  };
  const router = useRouter();

  const doVideoStuff = () => {
    //@ts-ignore
    var video: HTMLMediaElement = document.getElementById(
      'video',
    ) as HTMLMediaElement;
    var videoSrc = 'https://video.gonvar.io/media/alineacion_sep/1/master.m3u8';
    videoSrc = videoSrc.slice(0, -11) + 'stream_0' + videoSrc.slice(-5);
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    } else {
      video.src = `${videoSrc}`;
    }
  };

  const goTo = () => {
    if (user) {
      // let complete_nails = user.user_courses.filter((user: any) => user.course_id === 57 && user.final_date > today);
      if (
        haveAccess(
          user.level,
          user.final_date,
          user.role,
          user.method,
        ) /* || complete_nails.length > 0 */
      ) {
        router.push(PREVIEW_PATH);
      } else {
        router.push({
          pathname: PURCHASE_PATH,
          query: { type: 'subscription', frequency: 'cuatrimestral', v: '3' },
        });
      }
    } else {
      localStorage.setItem('anual', 'true');
      router.push(SIGNUP_PATH);
    }
  };
  useEffect(() => {
    doVideoStuff();
  }, []);
  return (
    <CardContainer className='card-container'>
      <div className='course-container'>
        <div className='info'>
          <div className='top'>
            <img
              style={{ margin: 0 }}
              src='../images/purchase/logo.png'
              alt=''
            />
            <p>Gonvar+</p>
            <button style={{ cursor: 'initial' }}>
              Suscripción Cuatrimestral
            </button>
          </div>
          <div className='middle'>
            <h3>
              Empieza a cursar <br /> cientos de clases <br /> sobre uñas y
              belleza <br /> <span>en línea</span>{' '}
            </h3>
            <p>
              Diferentes niveles de dificultad <br />e instructores
              internacionales.
            </p>
          </div>
          <h3 className='price'>
            Sólo $1599 <span>MXN el cuatrimestre</span>
          </h3>
          <h3 className='price'><span>No incluye material</span></h3>
          {responsive1140 && (
            <Row>
              <Col sm={12} md={5} className='second-col'>
                <PurpleButton
                  text={responsive768 ? 'Comenzar' : 'Comenzar ahora'}
                  onClick={goTo}
                />
                <WhiteButton
                  text={responsive768 ? 'Información' : 'Más información'}
                  onClick={() => {
                    handleShow();
                  }}
                />
              </Col>
            </Row>
          )}
        </div>
        <div className='video'>
          <video
            id='video'
            loop
            muted
            autoPlay
            playsInline
            preload='auto'
            width='100%'
            height={responsive576 ? '523px' : '600px'}
          ></video>
          {!responsive1140 && (
            <Row>
              <Col sm={12} md={5} className='second-col'>
                <PurpleButton
                  text={responsive768 ? 'Comenzar' : 'Comenzar ahora'}
                  onClick={goTo}
                />
                <WhiteButton
                  text={responsive768 ? 'Información' : 'Más información'}
                  onClick={() => {
                    handleShow();
                  }}
                />
              </Col>
            </Row>
          )}
        </div>
      </div>
    </CardContainer>
  );
};
