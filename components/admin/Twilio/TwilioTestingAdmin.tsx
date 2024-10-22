import { useEffect, useState } from 'react';
import { MainContainer } from './TwilioTestingAdmin.styled';
import { getGenericQueryResponse } from '../../api/admin';

// estructura sql de twilio_messages 
export interface ITwilioMessage {
  id: number
  description: string
  is_approved: number
  content_sid: string
}

export const TwilioTestingAdmin = () => {

  const [twilioTemplates, setTwilioTemplates] = useState<ITwilioMessage[]>([]);

  const [canSend, setCanSend] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    getMessageTypes();
  }

  const getMessageTypes = async () => {
    try {
      const messagesTypesResponse = await getGenericQueryResponse('select * from twilio_messages;');
      const messagesTypes: ITwilioMessage[] = messagesTypesResponse.data.data;
      setTwilioTemplates(messagesTypes);
    } catch (error) {
      console.error({ error });
    }
  }

  const generateMessageTypesTableComponent = () => {
    return (
      <div className='table-content'>
        <table className='gonvar-table'>
          <thead className='gonvar-table__thead'>
            <tr className='gonvar-table__tr gonvar-table__tr--thead'>
              <th>
                <p className='no-margin'>ID base de datos</p>
              </th>
              <th>
                <p className='no-margin'>Descripción</p>
              </th>
              <th className='gonvar-table__th'>
                <p className='no-margin'>ContentSID</p>
              </th>
            </tr>
          </thead>
          <tbody className='gonvar-table__tbody'>
            {
              twilioTemplates.map((template, index) => {
                return (
                  <tr className='gonvar-table__row' key={`twilio_template_${index}`}>
                    <td className='gonvar-table__data'>
                      <p className='no-margin'>{template.id}</p>
                    </td>
                    <td className='gonvar-table__data'>
                      <p className='no-margin'>{template.description}</p>
                    </td>
                    <td className='gonvar-table__data'>
                      <p className='no-margin'>{template.content_sid}</p>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  const generateEmptyContentMessageComponent = (message: string): JSX.Element => {
    return (
      <div style={{
        backgroundColor: '#eee',
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        <div>
          <p
            style={{
              margin: '0'
            }}
          >
            {
              message
            }
          </p>
        </div>
      </div>
    );
  }

  return <MainContainer>
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
      className='header'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '16px',
        }}
      >
        <h2 style={{
          margin: '0'
        }}>Administración de Twilio</h2>
      </div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
      }}>
        <div style={{
          padding: '16px'
        }}>
          <h3>Tipos de mensajes disponibles</h3>
          <div>
            {
              twilioTemplates.length !== 0 ?
                generateMessageTypesTableComponent()
                :
                generateEmptyContentMessageComponent('No existen tipos de mensajes registrados')
            }
          </div>
        </div>
        <div style={{
          display: 'flex',
          padding: '20px',
          flexDirection: 'column'
        }}>
          <div>
            <h3 className='no-margin'>Enviar mensaje a usuarios</h3>
          </div>
          <div style={{
            padding: '20px'
          }}>
            <form
              action=""
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <label
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 'bold',
                  color: '#691aca'
                }}
                htmlFor="">
                Tipo de mensaje
              </label>
              <select name="" id="" className='form__select-input'>
                {
                  twilioTemplates.length > 0 &&
                  twilioTemplates.map((template, index) => {
                    return (
                      <option value={`${template.id}`} key={`template_option_${index}`}>
                        {template.description}
                      </option>
                    );
                  })
                }
              </select>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <label
                  htmlFor=""
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 'bold',
                    color: '#691aca'
                  }}
                >
                  Usuarios seleccionados
                </label>
                {
                  generateEmptyContentMessageComponent('En proceso de componente para filtrar usuarios')
                }
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    margin: '16px 0',
                    width: '50%',
                    alignSelf: 'center'
                  }}
                >
                  <button
                    className={
                      canSend ?
                        `gonvar-button gonvar-button--purple`
                        :
                        `gonvar-button gonvar-button--disabled`
                    }
                    disabled={canSend === false}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </MainContainer>;
}