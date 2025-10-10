"use client";
import React, { useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { userTrivia, emailTrivia } from '../../../../../components/api/usertrivia';
import InputMail from '../../../../../components/Trivias/inputMail/inputMail';
import InputNombre from '../../../../../components/Trivias/inputNombre/inputNombre';
import InputWatsapp from '../../../../../components/Trivias/inputWhatsapp/inputWhatsapp';
import styles from './form.module.css';

export default function FormPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const triviaId = params?.triviaId;
  const result = params?.result;
  const br = searchParams?.get('br');

  const [userData, setUserData] = useState<any>(null);
  // removed userDataLoaded: this trivia app is isolated and does not fetch
  // logged-in user data from the platform.
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    formContainer,
    form,
    volver,
    textos,
    inputContainer,
    checkboxContainer,
    btnRecibir,
    formImg,
    link,
    errorMessageNombre,
    errorMessageApellido,
    errorMessageMail,
    errorMessageWA,
    buttonEnabled,
    terminos,
    costo,
    tachado,
    verde,
    bold,
    ital,
    nota,
    ganaste,
  } = styles;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .min(3, 'El nombre debe tener al menos 3 letras'),
    apellido: Yup.string()
      .required('El apellido es obligatorio')
      .min(3, 'El apellido debe tener al menos 3 letras'),
    correo: Yup.string()
      .required('El correo electrónico es obligatorio')
      .email('El correo electrónico no es válido'),
    numeroWhatsApp: Yup.string().required('El número de WhatsApp es obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      correo: '',
      numeroWhatsApp: '',
      codigoPais: '',
      nombrePais: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('nombre', event.target.value);
  };
  const handleApellidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('apellido', event.target.value);
  };
  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('correo', event.target.value);
  };
  const handlePaisChange = (value: any, selectedCountry: any, selectedCode: any) => {
    formik.setFieldValue('numeroWhatsApp', value);
    formik.setFieldValue('nombrePais', selectedCountry);
    formik.setFieldValue('codigoPais', selectedCode);
    const isValid = isValidPhoneNumber(value, selectedCode);
    console.log(value);
    console.log(selectedCode);
    console.log(isValid);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleNombreBlur = () => {
    formik.setFieldTouched('nombre', true);
  };
  const handleApellidoBlur = () => {
    formik.setFieldTouched('apellido', true);
  };
  const handleMailBlur = () => {
    formik.setFieldTouched('correo', true);
  };
  const handlePaisBlur = () => {
    formik.setFieldTouched('numeroWhatsApp', true);
  };
  const handleRedirect = (createUserSuccess: boolean) => {
    router.push(`/trivias/final?createUserSuccess=${createUserSuccess}`);
    console.log('entro');
  };
  const handleSubmit = async (values: any) => {
    const lowerCaseMail = values.correo.toLowerCase();
    const createUserDto = {
      nombre: values.nombre,
      apellido: values.apellido,
      mail: lowerCaseMail,
      numeroWhatsapp: values.numeroWhatsApp,
      pais: values.nombrePais,
      isUser: false,
      numeroTrivia: triviaId,
      resultadoTrivia: result,
    };
    console.log(createUserDto);
    let createUserSuccess = false;
    try {
      const res = await userTrivia(createUserDto);
      const createUserResult = res.data.result;
      if (createUserResult) {
        createUserSuccess = true;
        const sendEmailDto = {
          to: lowerCaseMail,
          username: values.nombre + ' ' + values.apellido,
          subject: 'Prueba 2',
          idTemplateBrevo: Number(br),
        };
        const sendEmailResponse = await emailTrivia(sendEmailDto);
        console.log(sendEmailResponse);
      } else {
        console.log('El usuario ya jugó a esta trivia');
      }
    } catch (error) {
      console.error('Error al crear el usuario', error);
    }
    handleRedirect(createUserSuccess);
  };
  const handleButtonClick = () => {
    console.log('button clicked');
    formik.setTouched({
      nombre: true,
      apellido: true,
      correo: true,
      numeroWhatsApp: true,
    });
    formik.validateForm().then((errors) => {
      const formIsValid = Object.keys(errors).length === 0;
      setIsFormValid(formIsValid);
      if (isChecked && formIsValid) {
        try {
          formik.handleSubmit();
        } catch (error) {
          console.error('Error al enviar el formulario', error);
        }
      }
    });
  };
  // No user prefill behavior for the isolated trivia app.
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div className={formContainer}>
        <div className={form}>
          <Link href={'/trivias'} className={link}>
            <div className={volver}>
              <img src='/images/trivias/icono . retroceder.svg' alt='' />
              <div> Volver</div>
            </div>
          </Link>
          <div className={textos}>
            <h1>¡Completa el formulario!</h1>
            <h3>
              Una vez que envíes el formulario,{' '}
              <span>te llegará un correo</span> con tus resultados completos y
              además te daremos acceso a{' '}
              <span>más de 63 cursos en línea por un precio especial.</span>
            </h3>
            <p>
              Podrás reclamar tu acceso haciendo click en el botón de abajo.
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className={inputContainer}>
            <div>
              <InputNombre
                label={'Nombre'}
                placeholder={'Carla'}
                onChange={handleNombreChange}
                onBlur={handleNombreBlur}
                value={formik.values.nombre}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className={errorMessageNombre}>{formik.errors.nombre}</div>
              )}
            </div>
            <div>
              <InputNombre
                label={'Apellido'}
                placeholder={'Flores'}
                onChange={handleApellidoChange}
                onBlur={handleApellidoBlur}
                value={formik.values.apellido}
              />
              {formik.touched.apellido && formik.errors.apellido && (
                <div className={errorMessageApellido}>{formik.errors.apellido}</div>
              )}
            </div>
            <div>
              <InputMail
                label={'Correo Electrónico'}
                placeholder={'carlaflores@gmail.com'}
                onChange={handleMailChange}
                onBlur={handleMailBlur}
                value={formik.values.correo}
              />
              {formik.touched.correo && formik.errors.correo && (
                <div className={errorMessageMail}>{formik.errors.correo}</div>
              )}
            </div>
            <div>
              <InputWatsapp
                label={'Número de WhatsApp'}
                placeholder={'1153137872'}
                onChange={handlePaisChange}
                onBlur={handlePaisBlur}
                value={formik.values.numeroWhatsApp}
              />
              {formik.touched.numeroWhatsApp && formik.errors.numeroWhatsApp && (
                <div className={errorMessageWA}>{formik.errors.numeroWhatsApp}</div>
              )}
            </div>
          </form>
          <div className={checkboxContainer}>
            <input
              type='checkbox'
              name='checkbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor='checkbox'>
              He leído y acepto los{' '}
              <span>
                <Link href={'https://www.gonvar.io/terms-condition'} className={terminos} target='_blank' rel='noopener noreferrer'>
                  Términos y Condiciones
                </Link>{' '}
                y{' '}
                <Link href={'https://www.gonvar.io/politica-privacidad'} className={terminos} target='_blank' rel='noopener noreferrer'>
                  Políticas de privacidad
                </Link>
              </span>
            </label>
          </div>
          <button
            className={btnRecibir}
            disabled={!isChecked}
            onClick={() => handleButtonClick()}
          >
            Reclamar suscripción
          </button>
        </div>
        <div className={formImg}>
          <img src='/images/trivias/logo gonvar blanco.svg' alt='' />
        </div>
      </div>
    </>
  );
}
