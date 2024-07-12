export async function getServerSideProps(context: any) {
  return {
    redirect: {
      destination: '/nails-master-revolution',
      permanent: true,
    },
  };
}

const NailsMasterRevolutionGoo = () => {
  return null; // Este componente nunca se renderiza porque siempre redirige.
};

export default NailsMasterRevolutionGoo;