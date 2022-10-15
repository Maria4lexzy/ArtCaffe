import React from 'react';

import './Header.scss';
import { pics } from '../../constants';
import { SubHeading } from '../../components';
const Header = () => (
  <div className='app__header app__wrapper section__padding' id='home'>
    <div className='app__wrapper-info'>
      <SubHeading title="chase the new flavor" />
      <h1 className='app__header-h1'>The key to find dining</h1>
      <p className='p__opensans' style={{ margin: '16px 0' }}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita maiores molestias consequuntur numquam sint non quod magnam temporibus harum fuga est a vitae pariatur deleniti ducimus repellendus optio, quam dicta.</p>
      <button type='button' className='custom__button'>Explore</button>
    </div>
    <div className='app__wrapper-img'>
      <img src={pics.introdrink} alt="welcome drink" />
    </div>

  </div>
);

export default Header;
