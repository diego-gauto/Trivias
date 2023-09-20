
import React, { useState } from 'react'
import { IUser } from '../../../interfaces/IUserData';
import { Modal, Spinner } from 'react-bootstrap';
import { ComeFromContainer } from './ComeFromModal.styled';
import { IoClose } from 'react-icons/io5';
import { SOCIALS_ARRAY } from '../../../constants/arrays';
import { PurpleButton, SelectInput } from '../../../constants/defaultClasses.styled';
import { updateComeFromApi } from '../../api/auth';

interface IComeFromModal {
  user: IUser;
  show: boolean;
  onHide: () => void;
}

const ComeFromModal = (props: IComeFromModal) => {
  const { user, show, onHide } = props;
  const [option, setOption] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const optionSelect = (value: string) => {
    setOption(value);
    setError('')
  }
  const updateComeFrom = async () => {
    setLoader(true);
    if (option === "") {
      setLoader(false);
      setError("Seleccione una Opcion porfavor");
      return
    }
    let body = {
      id: user.id,
      come_from: option,
    }
    try {
      await updateComeFromApi(body).then(() => {
        setLoader(false);
        onHide();
      })
    }
    catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  return (
    <Modal show={show}>
      <ComeFromContainer>
        <div className='header'>
          <h2 className='title'>
            Hola
            <span> {user.name}!</span>
          </h2>
        </div>
        <div className='bottom-data'>
          <p>Nos gustaria conocerte mejor, queremos saber como nos conociste!</p>
          <div className='select-container'>
            <SelectInput onChange={(e) => optionSelect(e.target.value)} defaultValue=''>
              <option value="" disabled >Seleccione una opción</option>
              {
                SOCIALS_ARRAY.map((val: string, index: number) => {
                  return (
                    <option value={val} key={"socials_" + index}>{val}</option>
                  )
                })
              }
            </SelectInput>
            {
              error !== "" && <p className='error'>{error}</p>
            }
          </div>
        </div>
        <div className='btn-contain'>
          {
            loader
              ? <div style={{ marginRight: 10 }}><Spinner /></div>
              : <PurpleButton className='btn' onClick={updateComeFrom}>Continuar</PurpleButton>
          }
        </div>
      </ComeFromContainer>
    </Modal>
  )
}
export default ComeFromModal;