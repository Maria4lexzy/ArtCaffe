import React from 'react';
import { images } from '../../constants'

const SubHeading = ({ title }) => (
  <div style={{ marginBottom: '8px' }}>
    <p className='p__cormorant'>{title}</p>
    <img src={images.spoon} alt="some image" className='spoon__img' />
  </div>
);

export default SubHeading;
