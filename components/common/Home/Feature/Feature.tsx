import { Navbar } from 'react-bootstrap';

import { IFeatureProps } from './IFeatureProps';

export const Feature = (props: IFeatureProps) => {
  const { title, image } = props;
  return (
    <Navbar.Brand className='justify-content-center'>
      <img alt='icono' src={image} className='d-inline-block align-top ' />
      {title}
    </Navbar.Brand>
  );
};
