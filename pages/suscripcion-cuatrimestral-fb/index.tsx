import { renderToString } from 'react-dom/server';

import LandingSuscription from '../../components/Landings/LandingSuscription/LandingSuscription';
import { MainContain } from '../../screens/Styles.styled';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type Repo = {
  data: [];
};
export const getServerSideProps = async ({ req, res }: any) => {
  // const result = await fetch("https://gonvar.inowu.dev/" + "courses/getCourses");
  const html = renderToString(
    <LandingSuscription price={'$1,599 MXN/anual'} type={'cuatrimestral'} />,
  );
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );
  // let anual = await result.json();
  let anual = html;
  return {
    props: { anual },
  };
};
const termsConditions = ({
  anual,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const price = '$1,599 MXN/cuatrimestre';
  const type = 'cuatrimestral';
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <LandingSuscription price={price} type={type} origin='facebook' />
    </MainContain>
  );
};
export default termsConditions;
