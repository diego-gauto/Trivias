import { useRouter } from 'next/router';
import React from 'react'
import Certificate from '../../containers/Certificate/Certificate';
import { MainContain } from '../../screens/Styles.styled';
const CertificatesScreen = () => {
  const router = useRouter()
  const { name, title }: any = router.query;

  return (
    <MainContain>
      <Certificate></Certificate>
    </MainContain>
  )
}
export default CertificatesScreen;