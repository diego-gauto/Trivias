import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { PREVIEW_PATH, PURCHASE_PATH } from '../../constants/paths';
import { FailedContainer } from './PaymentFailed.styled';
import router, { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { IoChevronDown } from 'react-icons/io5';
import { SOCIALS_ARRAY } from '../../constants/arrays';
import register from '../../pages/auth/register';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateNails, updateUser } from '../api/users';
import * as yup from "yup";

const PaymentFailedSubscriptionCuatri = () => {

  const [userData, setUserData] = useState<any>(null);
  const router = useRouter()
  const { error } = router.query;
  const [msg, setMsg] = useState<any>("Puede que tu tarjeta no este activada para enviar pagos de manera online, intenta de nuevo o usa otro método de pago.")
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
      comeFrom: formData.option,
      userId: userData.user_id
    }
    updateUser(body).then((res) => {
      router.push({ pathname: PURCHASE_PATH, query: { type: 'subscription', frequency: 'anual', v: '3' } })
    })
  }

  var userDataAuth = useAuth();
  useEffect(() => {
    if (userDataAuth.user !== null) {
      setMsg(error)
      setUserData(userDataAuth.user);
    } else {
      window.location.href = "/preview";
    }
  }, [userDataAuth])

  return (
    <FailedContainer>
      <form className='left' onSubmit={handleSubmit(onSubmit)}>
        <h1>Tu compra no se ha podido<br /> realizar, <span>{userData?.name}!</span></h1>
        <p style={{ width: "300px" }}>{error}</p>
        <div className="form-input" style={{ flexGrow: 'unset' }}>
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
          <button className='top' disabled={!option} type='submit'>Reintentar</button>
        </div>
      </form>
      <img src="/images/purchase/payment.png" alt="" />
    </FailedContainer>
  )
}
export default PaymentFailedSubscriptionCuatri;