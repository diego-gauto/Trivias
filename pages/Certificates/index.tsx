import { useRouter } from 'next/router';
import React from 'react'
import { MainContain } from '../../screens/Styles.styled';
const CertificatesScreen = () => {
  const router = useRouter()
  const { name, title }: any = router.query;

  return (
    <MainContain>
      <div>{name}</div>
      <div>{title}</div>
    </MainContain>
  )
}
export default CertificatesScreen;