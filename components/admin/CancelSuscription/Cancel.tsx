import React, { useEffect, useState } from 'react';
import { CancelReview } from './Cancel.styled';
import { ICancelReview } from '../../../interfaces/IAdmin';
import { cancelReviewExcel, getCancelReviewApi } from '../../api/admin';
import { AdminLoader, Table } from '../SideBar.styled';
import { Container, Title, TitleContain } from '../Pay/Pay.styled';
import Calendar from 'react-calendar';
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { FormatDateForBack } from '../../../utils/functions';
import CsvDownloader from 'react-csv-downloader';
import { DownloadUserData } from '../Users/UsersList.styled';

const Cancel = () => {
  const [reviews, setReviews] = useState<ICancelReview[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [dateFilter, setDateFilter] = useState('all');
  const [hideCalendar, setHideCalendar] = useState<boolean>(false);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [changeDate, setChangeDate] = useState([[], []]);
  let usersPerPage: number = 100;

  const createdAtDate = (date: any) => {
    let allDates = changeDate;
    allDates[0] = date;
    if (date[1] !== null) {
      filterStart(currentPage, allDates);
    }
    setChangeDate(allDates);
  };
  const getNextData = (direction: string) => {
    let tempPage = 0;
    if (direction === 'backward') {
      if (currentPage !== 0) {
        tempPage = currentPage - 1;
        setCurrentPage(tempPage);
      }
    }
    if (direction === 'forward') {
      if (currentPage !== maxPages - 1) {
        tempPage = currentPage + 1;
        setCurrentPage(tempPage);
      }
    }
    if (direction === 'first') {
      tempPage = 0;
      setCurrentPage(tempPage);
    }
    if (direction === 'last') {
      tempPage = maxPages - 1;
      setCurrentPage(tempPage);
    }
    filterStart(tempPage, changeDate);
  };
  const filterStart = (tempPage: number, dates: any) => {
    setLoader(false);
    getCancelReviewApi(
      usersPerPage,
      tempPage * 100,
      dateFilter,
      FormatDateForBack(dates[0][0]),
      FormatDateForBack(dates[0][1]),
    ).then((res) => {
      setReviews(res.data);
      setTotalData(res.total);
      setLoader(true);
      setMaxPages(Math.ceil(res.total / usersPerPage));
    });
  };
  const Gonvar: any = async (dates: any) => {
    let sendData: any = [];
    await cancelReviewExcel(
      dateFilter,
      FormatDateForBack(dates[0][0]),
      FormatDateForBack(dates[0][1]),
    ).then(async (res) => {
      console.log(res);
      await res.map(async (user: ICancelReview) => {
        sendData.push({
          nombre: user.name,
          apellido: user.last_name,
          email: user.email,
          whatsapp: user.phone_number,
          fecha_de_reacion: user.created_at,
          primer_pregunta: user.first_question,
          segunda_pregunta: user.second_question,
          tercer_pregunta: user.third_question,
          cuarta_pregunta: user.fourth_question,
          quinta_pregunta: user.fifth_question,
        });
      });
    });
    return sendData;
  };
  useEffect(() => {
    getCancelReviewApi(usersPerPage, currentPage, 'all', '', '').then((res) => {
      setReviews(res.data);
      setTotalData(res.total);
      setLoader(true);
      setMaxPages(Math.ceil(res.total / usersPerPage));
    });
  }, []);

  return (
    <CancelReview>
      <div className='user-answers'>
        <Container>
          <TitleContain className='cancel-filter'>
            <Title>Cancelación de usuarios: {totalData}</Title>
            <div className='right-data'>
              <div className='input-contain'>
                <label>Rango de fecha</label>
                <select
                  defaultValue='all'
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option disabled>Seleccione una opción</option>
                  <option value='all'>Todos</option>
                  <option value='select'>Filtro por fecha</option>
                </select>
              </div>
              {dateFilter === 'select' && (
                <div
                  className='calendar-contain'
                  style={
                    hideCalendar ? { borderRadius: '100px', width: 350 } : {}
                  }
                >
                  <div className='close-tab'>
                    {!hideCalendar ? (
                      <AiOutlineMinus
                        className='close'
                        onClick={() => setHideCalendar(true)}
                      />
                    ) : (
                      <AiOutlinePlus
                        className='close'
                        onClick={() => setHideCalendar(false)}
                      />
                    )}
                  </div>
                  {!hideCalendar && (
                    <Calendar
                      onChange={(e: any) => {
                        createdAtDate(e);
                      }}
                      allowPartialRange={true}
                      returnValue='range'
                      selectRange={true}
                    />
                  )}
                </div>
              )}
              <CsvDownloader
                filename='suscripcion_canceladas'
                extension='.csv'
                separator=','
                wrapColumnChar=''
                datas={() => Gonvar(changeDate)}
              >
                <DownloadUserData>Descargar lista de usuarios</DownloadUserData>
              </CsvDownloader>
            </div>
          </TitleContain>
          <div className='pages'>
            <div className='index'>
              <AiFillCaretLeft
                className='arrows'
                onClick={() => {
                  getNextData('backward');
                }}
              />
              <p
                className='default-number'
                onClick={() => {
                  getNextData('first');
                }}
              >
                1
              </p>
              <p className='current-number'>{currentPage + 1}</p>
              <p
                className='default-number'
                onClick={() => {
                  getNextData('last');
                }}
              >
                {maxPages}
              </p>
              <AiFillCaretRight
                className='arrows'
                onClick={() => {
                  getNextData('forward');
                }}
              />
            </div>
            <div className='max-pages'>
              <p className='max-number'>Paginas: {maxPages}</p>
            </div>
          </div>
          <Table className='table-contain'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha de Cancelación</th>
                <th>Por que quieres cancelar tu suscripción</th>
                <th>
                  Describe con sinceridad el por qué quieres cancelar tu
                  suscripción
                </th>
                <th>¿Qué te gustaría ve mejorado en la plataforma?</th>
                <th>¿Qué tan probable es que regreses en el futuro?</th>
                <th>
                  Del 1 al 10 como ha sido la experiencia con tu suscripción
                </th>
              </tr>
            </thead>
            {loader && (
              <tbody>
                {reviews.map((review: ICancelReview, index: number) => {
                  return (
                    <tr key={'cancel-review-' + index}>
                      <td className='name-td'>
                        {review.name}
                        <div className='tp'>
                          <p>Email: {review.email}</p>
                          <p>Telefono: {review.phone_number}</p>
                        </div>
                      </td>
                      <td>{review.created_at.substring(0, 10)}</td>
                      <td>{review.first_question}</td>
                      <td>{review.second_question}</td>
                      <td>{review.third_question}</td>
                      <td>{review.fourth_question}</td>
                      <td>{review.fifth_question}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>
          {!loader && (
            <AdminLoader style={{ position: 'absolute' }}>
              <div className='loader-image'>
                <div className='loader-contain' />
              </div>
            </AdminLoader>
          )}
        </Container>
      </div>
    </CancelReview>
  );
};
export default Cancel;
