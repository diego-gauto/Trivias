import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PREVIEW_PATH } from '../../constants/paths';
import { ThankYouContainer } from './ThankYou.styled';
import { useAuth } from '../../hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUser, updateUserOfferReference } from '../api/users';
import { SOCIALS_ARRAY } from '../../constants/arrays';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoChevronDown } from 'react-icons/io5';
import { redirectInfoToLesson } from './Functions';

const ThankYouSubscriptionAnual = () => {
  const [userData, setUserData] = useState<any>(null);
  const [option, setOption] = useState('');

  type FormValues = {
    option: string;
  };
  const formSchema = yup.object().shape({
    option: yup.string().required('Debe seleccionar una opcion'),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    let body = {
      offer_reference: formData.option,
      userId: parseInt(userData.user_id),
    };
    updateUserOfferReference(body).then((res) => {
      if (redirectInfoToLesson() === null) {
        window.location.href = '/preview';
      } else {
        const lessonRedirectInfo = redirectInfoToLesson() || '';
        const { course_id, lesson_id, season_id } = JSON.parse(lessonRedirectInfo) as {
          course_id: number;
          season_id: number;
          lesson_id: number;
        };
        localStorage.removeItem('lesson-redirect-info');
        const url = `/lesson?id=${course_id}&season=${season_id}&lesson=${lesson_id}`;
        window.location.href = `${window.location.origin}${url}`;
      }
    });
  };

  var userDataAuth = useAuth();
  useEffect(() => {
    if (userDataAuth.user !== null) {
      setUserData(userDataAuth.user);
    } else {
      window.location.href = '/preview';
    }
  }, [userDataAuth]);
  return (
    <ThankYouContainer>
      <form className='left' onSubmit={handleSubmit(onSubmit)}>
        <h1>
          Felicidades tu compra ha <br /> sido exitosa,{' '}
          <span>{userData?.name}!</span>
        </h1>
        <p>
          ¡Felicidades ya estás dentro! <br />
          Para continuar, ¿dónde viste nuestra oferta única?
        </p>
        <div className='form-input' style={{ flexGrow: 'unset' }}>
          <label>Me enteré de Gonvar en:</label>
          <div className='select-contain'>
            <select
              className={`form-control ${errors.option ? 'is-invalid' : ''}`}
              defaultValue={''}
              {...register('option')}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value='' disabled>
                Seleccione una opción
              </option>
              {SOCIALS_ARRAY.map((val: string, index: number) => {
                return (
                  <option value={val} key={'socials_' + index}>
                    {val}
                  </option>
                );
              })}
            </select>
            <IoChevronDown className='icon' />
          </div>
        </div>
        <div className='buttons'>
          <button className='top' disabled={!option} type='submit'>
            {
              redirectInfoToLesson() === null ?
                'Ir a tus cursos'
                : 'Ver tu curso pendiente'
            }
          </button>
        </div>
      </form>
      <img
        src='/images/purchase/payment.png'
        alt=''
        style={{ maxHeight: 'unset' }}
      />
    </ThankYouContainer>
  );
};
export default ThankYouSubscriptionAnual;
