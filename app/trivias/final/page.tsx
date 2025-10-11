"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './final.module.css';
import Failed from '../../../components/Trivias/final/failed';
import Success from '../../../components/Trivias/final/success';
import Beneficios from '../../../components/Trivias/final/beneficios';

export default function FinalPage() {
  const { finalContainer, final, finalTextos, finalVolver, finalImg, link } = styles;
  const searchParams = useSearchParams();
  const createUserSuccess = searchParams?.get('createUserSuccess');
  const success = createUserSuccess === 'true';

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <>
        <div className={finalContainer}>
          <style jsx global>{`
            body {
              margin: 0px;
              padding: 0px;
            }
          `}</style>
          <div className={final}>
            <Link href={'/trivias'} className={link}>
              <div className={finalVolver}>
                <img src='/images/trivias/icono . retroceder.svg' alt='' />
                <div> Volver</div>
              </div>
            </Link>
            {success ? <Success /> : <Failed />}
          </div>
          <div className={finalImg}>
            <img src='/images/trivias/logo gonvar blanco.svg' alt='' />
          </div>
        </div>
        {success && <Beneficios />}
      </>
    </Suspense>
  );
}
