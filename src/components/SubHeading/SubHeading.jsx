import React from 'react';
import { pics } from '../../constants'

const SubHeading = ({ title }) => (
  <div style={{ marginBottom: '8px' }}>
    <p className='p__cormorant'>{title}</p>
    <img src={pics.spoon} alt="spoon" className='spoon__img' />
  </div>
);

export default SubHeading;
