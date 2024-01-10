import React, { useEffect, useState } from 'react'
import { AdminContain } from '../SideBar.styled';
import { AdminTable, DefaultColumn, DefaultContainer, DefaultFilterContain, DefaultRow, DefaultSearchContainer } from '../DefaultComponents/DefaultComponents.styled';
import { useAdmin } from '../../../hooks/AdminContext';
import CsvDownloader from "react-csv-downloader";
import Calendar from 'react-calendar';
import { IoClose } from 'react-icons/io5';
import { AiFillPlusCircle } from 'react-icons/ai';
import Pagination from '../../Pagination/Pagination'
import { EditIcon } from '../Category/Category.styled';
import { ProfileContain, Profile } from '../Pay/Pay.styled';
import { UserShow } from '../Users/UsersList.styled';
import { IAdminUsers } from '../../../interfaces/IAdmin';
import { FormatDateForBack, formatDate } from '../../../utils/functions';
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { getLessonFromUserApi, usersForExcelApi } from '../../api/admin';
import { getAdminMassiveLotteryApi } from '../../api/notifications';
// getAdminMassiveLotteryApi
import UserCardData from '../Users/UserData/UserCardData';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import users from '../../../pages/admin/trivias/users';
import { user } from 'firebase-functions/v1/auth';

interface TicketRowData {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  ticket_value: number;
};

const jsonToCsv = (items: any) => {
  const header = Object.keys(items[0]);
  const headerString = header.join(',');
  const replacer = (key: any, value: any) => value ?? '';
  const rowItems = items.map((row: any) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  );
  const csv = [headerString, ...rowItems].join('\r\n');
  return csv;
}

const generateFilename = (name: string) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${name}-${year}-${month + 1}-${day} ${hour}-${minutes}-${seconds}`;
}

type FilterValue = 'NAME' | 'TICKET_NUMBER';

const Tickets = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState<TicketRowData[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [textFilter, setTextFilter] = useState('');
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState<TicketRowData[]>([]);
  const [selectedOption, setSelectedOption] = useState<FilterValue>('NAME');

  useEffect(() => {
    getData();
  }, []);

  const downloadListCSVHandler = () => {
    const csv = jsonToCsv(data);
    const fileName = "sorteo-gonvar";
    const fileNameResult = generateFilename(fileName);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileNameResult}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const getData = async () => {
    try {
      const response = await getAdminMassiveLotteryApi();
      setData(response.data.data);
      setFilteredData(response.data.data);
      setTotalUsers(response.data.user_count);
      setTotalTickets(response.data.data.length);
      setIsLoadingData(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        console.error(error.stack);
      }
    }
  }

  const changePage = (page: number) => {
    setOffset(page * 100);
  }

  const handleInputSearchChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilter(e.target.value);
    const newFilterValue = e.target.value;
    changePage(0);
    if (selectedOption === 'NAME') {
      const result = data.filter(row => `${row.email}`.toLowerCase()
        .includes(newFilterValue.toLowerCase()));
      setFilteredData(result);
    } else if (selectedOption === 'TICKET_NUMBER') {
      const result = data.filter(row => row.ticket_value === parseInt(newFilterValue));
      if (newFilterValue === '') {
        setFilteredData(data);
      } else {
        setFilteredData(result);
      }
    }
  }

  return (
    <AdminContain>
      <DefaultContainer>
        <div className='top-data'>
          <div className='header'>
            <DefaultColumn gap={5}>
              <div className='top-title'>
                <h2 className='title'>Sorteos</h2>
              </div>
            </DefaultColumn>
            <Pagination
              changePage={changePage}
              currentPage={(offset / 100)}
              totalPage={Math.ceil(filteredData.length / 100)}
            />
          </div>
          <div className='bottom-header'>
            <div>
              <p className='title-filter'>Usuarios activos: {totalUsers}</p>
              <p className='title-filter'>Cantidad total de boletos: {totalTickets}</p>
            </div>
            <form>
              <div className='search-input-tickets'>
                <div className='search-input-container'>
                  <div className='search-icon' />
                  <input
                    style={{ fontSize: '18px' }}
                    className='search-input'
                    placeholder="Buscar"
                    onChange={handleInputSearchChangeValue}
                    type={"text"}
                    value={textFilter}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', gap: '5px' }}>
                <div className="option" style={{ fontSize: '18px' }}>
                  <input id='radio-name' type="radio" checked={selectedOption === 'NAME'} value={'NAME'} onChange={() => {
                    setSelectedOption('NAME');
                    setTextFilter('');
                  }}
                  />
                  <label htmlFor='radio-name'>Por correo eléctronico</label>
                </div>
                <div className="option" style={{ fontSize: '18px' }}>
                  <input id='radio-ticket-number' type="radio" checked={selectedOption === 'TICKET_NUMBER'} value={'TICKET_NUMBER'} onChange={() => {
                    setSelectedOption('TICKET_NUMBER');
                    setTextFilter('');
                  }} />
                  <label htmlFor='radio-ticket-number'>Por número de boleto</label>
                </div>
              </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button
                type="button"
                style={{ height: 'fit-content', fontSize: '20px' }}
                className='button button-purple'
                onClick={downloadListCSVHandler}
              >Descargar listado</button>
            </div>
          </div>
        </div>
        {
          !isLoadingData &&
          <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
            <LoaderImage>
              <LoaderContain />
            </LoaderImage>
          </Background>
        }
        <div className='table-contain'>
          <AdminTable id="Users">
            <tbody style={{ display: 'inline-table', width: '100%' }}>
              <tr>
                <th>Boleto</th>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Telefono</th>
              </tr>
              {
                isLoadingData &&
                filteredData.filter((_, index) => index >= offset && index < (offset + 100))
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ fontWeight: 600 }}>
                          <ProfileContain>
                            <Profile />
                            {user.ticket_value}
                          </ProfileContain>
                        </td>
                        <td>{`${user.name} ${user.last_name}`}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </AdminTable>
        </div>
      </DefaultContainer>
    </AdminContain >
  )
}
export default Tickets;