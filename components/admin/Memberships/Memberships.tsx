import React, { useRef, useState } from 'react'
import { AdminContain } from '../SideBar.styled';
import { AdminTable2, DefaultColumn, DefaultContainer } from '../DefaultComponents/DefaultComponents.styled';
import Pagination from '../../Pagination/Pagination'
import { ProfileContain, Profile } from '../Pay/Pay.styled';
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { getCloseToEndingMembershipUsers } from '../../api/admin';

interface Memberships {
  id: number,
  name: string,
  last_name: string,
  email: string,
  phone_number: string,
  method: string,
  final_date: string,
  level: number,
  datediff: number,
}

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

const generateCSVFilename = (name: string) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${name}-${year}-${month + 1}-${day} ${hour}-${minutes}-${seconds}`;
}

const getDateWithFormat = (date: Date) => {
  const date1 = [...date.toJSON()].slice(0, 10).join('');
  const time1 = [...date.toJSON()].slice(11, 19).join('');
  return `${date1} ${time1}`;
}

type LevelFilter = "TODOS" | "MENSUAL" | "CUATRIMESTRAL" | "ANUAL";

/* 1 serian las mensuales, 4 las anuales y 7 las cuatrimestrales.  */

const levels = {
  "MENSUAL": [1, 6],
  "CUATRIMESTRAL": [7, 8],
  "ANUAL": [4, 5],
  "TODOS": [1, 4, 5, 6, 7, 8]
}

const getTextSusctiptionByLevel = (level: number) => {
  if ([1, 6].includes(level)) {
    return "Mensual";
  } else if ([7, 8].includes(level)) {
    return "Cuatrimestral";
  }
  return "Anual"
}

const Memberships = () => {
  const today = new Date().toISOString().split('T')[0];
  const [hasFiltered, setHasFiltered] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState<Memberships[]>([]);
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState<Memberships[]>([]);
  const memberFilterHTMLSelect = useRef<HTMLSelectElement>(null);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());

  const downloadListCSVHandler = () => {
    const thereAreData = data.length > 0;

    if (!thereAreData) {
      alert('No hay información que descargar');
      return;
    }

    const membresias = new Map<number, string>();
    membresias.set(6, "Mensual");
    membresias.set(8, "Cuatrimestre");
    membresias.set(5, "Anual");
    const data3 = data.map(({ id, name, last_name, email, phone_number, method, level, final_date, datediff }) => {
      return {
        id,
        nombre_completo: `${name} ${last_name}`,
        correo: email,
        numero: phone_number,
        membresia: getTextSusctiptionByLevel(level),
        metodo: method,
        fecha_termino: getDateWithFormat(new Date(final_date)),
        dias_faltantes: datediff,
      }
    });

    const csv = jsonToCsv(data3);
    const fileName = `usuarios-con-membresia-por-terminar`;
    const fileNameResult = generateCSVFilename(fileName);
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

  const filterMembershipsHandler = async () => {
    const membershipValue = memberFilterHTMLSelect.current?.value as LevelFilter;


    const selectedMembership = levels[membershipValue ?? "TODOS"];

    if (startDate === undefined || finalDate === undefined) {
      alert('Las fechas tienen que ser diferentes y no puede continuar sin ser especificadas.');
      alert('No introduzca fechas previas a hoy.');
      return;
    }

    try {
      setIsLoadingData(false);
      console.log({ startDate });
      const response = await getCloseToEndingMembershipUsers(selectedMembership, startDate, finalDate);
      setData(response.data.data);
      setFilteredData(response.data.data);
      setIsLoadingData(true);
      setHasFiltered(true);
    } catch (error) {
      console.error(error);
    }
    changePage(0);
  }


  const changePage = (page: number) => {
    setOffset(page * 100);
  }

  return (
    <AdminContain>
      <DefaultContainer>
        <div className='top-data'>
          <div className='header'>
            <DefaultColumn gap={5}>
              <div className='top-title'>
                <h2 className='title'>Membresias por finalizar</h2>
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
              <label
                style={{
                  fontSize: '20px'
                }}
                htmlFor="memberships-filter">Filtro de membresía</label>
              <select
                ref={memberFilterHTMLSelect}
                style={{
                  width: '100%',
                  height: '40px',
                }}
                name="memberships-filter"
                id="memberships-filter">
                <option value="TODOS">Todos</option>
                <option value="MENSUAL">Mensual</option>
                <option value="CUATRIMESTRAL">Cuatrimestral</option>
                <option value="ANUAL">Anual</option>
              </select>
            </div>
            <form>
              <div>
                <label
                  style={{
                    fontSize: '20px'
                  }}
                  htmlFor="start-date-input">Inicio</label>
                <input
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    height: '40px',
                    padding: '15px',
                    border: 'solid 1px #6717cd',
                  }}
                  type="date"
                  name="start-date"
                  id="start-date-input"
                  min={today}
                  value={startDate.toJSON().slice(0, 10)}
                  onChange={(e) => {
                    setStartDate(new Date(e.target.value));
                  }}
                />
                <label
                  style={{
                    fontSize: '20px'
                  }}
                  htmlFor="start-date-input">Fin</label>
                <input
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    height: '40px',
                    padding: '15px',
                    border: 'solid 1px #6717cd',
                  }}
                  type="date"
                  name="final-date"
                  id="final-date-input"
                  min={today}
                  value={finalDate.toJSON().slice(0, 10)}
                  onChange={(e) => {
                    setFinalDate(new Date(e.target.value));
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', gap: '5px' }}>
              </div>
            </form>
            <div
              style={{
                display: 'flex',
                gap: '35px',
                padding: '15px 0',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <button
                type="button"
                style={{ height: 'fit-content', width: '100%', fontSize: '20px' }}
                className='button button-purple'
                onClick={filterMembershipsHandler}
              >Filtrar</button>
              <button
                type="button"
                style={{ height: 'fit-content', width: '100%', fontSize: '20px' }}
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
        {
          hasFiltered && <div className='table-contain'>
            <AdminTable2>
              <tbody style={{ display: 'inline-table', width: '100%' }}>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Suscripción</th>
                  <th>Método</th>
                  <th>Fecha de terminación</th>
                  <th>Dias faltantes</th>
                </tr>
                {
                  isLoadingData &&
                  filteredData.filter((_, index) => index >= offset && index < (offset + 100))
                    .map((membership, index) => {
                      const { final_date } = membership;
                      return (
                        <tr key={index}>
                          <td style={{ fontWeight: 600 }}>
                            <ProfileContain>
                              <Profile />
                              {`${membership.name} ${membership.last_name}`}
                            </ProfileContain>
                          </td>
                          <td>{membership.email}</td>
                          <td>{membership.phone_number}</td>
                          <td>{getTextSusctiptionByLevel(membership.level)}</td>
                          <td>{membership.method}</td>
                          <td>{[...final_date.toString()].slice(0, 10).join('')}</td>
                          <td>{membership.datediff}</td>
                        </tr>
                      )
                    })
                }
              </tbody>
            </AdminTable2>
          </div>
        }
        {
          !hasFiltered &&
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '35px'
            }}>
            <p>De click en el botón <strong>"Filtrar"</strong> para generar el listado de los usuarios que estan por terminar su membresía en el lapso de tiempo especificado.</p>
          </div>
        }
        {
          (isLoadingData &&
            filteredData.length === 0 &&
            hasFiltered === true) &&
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '35px'
            }}>
            <p>No existen registros con las especificaciones dadas.</p>
          </div>
        }
      </DefaultContainer>
    </AdminContain >
  )
}
export default Memberships;