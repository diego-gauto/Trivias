import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { PREVIEW_PATH } from '../../constants/paths';
import { ThankYouContainer } from './ThankYou.styled';
import { useAuth } from '../../hooks/useAuth';
import { SOCIALS_ARRAY } from '../../constants/arrays';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoChevronDown } from 'react-icons/io5';
import { updateUser, updateUserOfferReference } from '../api/users';

const ThankYouSubscriptionMonth = () => {
  const [userData, setUserData] = useState<any>(null);
  const [option, setOption] = useState('');

  type FormValues = {
    option: string;
  };
  const formSchema = yup.object().shape({
    option: yup.string()
      .required('Debe seleccionar una opcion')
  })

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    let body = {
      offer_reference: formData.option,
      userId: parseInt(userData.user_id)
    }
    updateUserOfferReference(body).then((res) => {
      window.location.href = "/preview";
    })
  }

  var userDataAuth = useAuth();
  useEffect(() => {
    if (userDataAuth.user !== null) {
      setUserData(userDataAuth.user);
    } else {
      window.location.href = "/preview";
    }
  }, [userDataAuth])

  return (
    <ThankYouContainer>
      <form className='left' onSubmit={handleSubmit(onSubmit)}>
        <h1>Felicidades tu compra ha <br /> sido exitosa, <span>{userData?.name}!</span></h1>
        <p>¡Felicidades ya estás dentro! <br />
          Para continuar, ¿dónde viste nuestra oferta única?</p>
        <div className="form-input">
          <label>Me enteré de Gonvar en:</label>
          <div className="select-contain">
            <select className={`form-control ${errors.option ? 'is-invalid' : ''}`} defaultValue={""} {...register("option")} onChange={(e) => setOption(e.target.value)}>
              <option value="" disabled>Seleccione una opción</option>
              {
                SOCIALS_ARRAY.map((val: string, index: number) => {
                  return (
                    <option value={val} key={"socials_" + index}>{val}</option>
                  )
                })
              }
            </select>
            <IoChevronDown className="icon" />
          </div>
        </div>
        <div className='buttons'>
          <button className='top' disabled={!option} type='submit'>Ir a tus cursos</button>
        </div>
      </form>
      <img src="/images/purchase/payment.png" alt="" />
    </ThankYouContainer>
  )
}
export default ThankYouSubscriptionMonth;