import React from 'react';
import { SubHeading } from '../../components';
import { pics } from '../../constants';
const FindUs = () => (
  <div className='app__bg app__wrapper section__padding' id='contact'>
    <div className='app__wrapper_info'>
      <SubHeading title="Contact" />
      <h1 className='headtext__cormorant' style={{ marginBottm: '3rem' }}>Find us</h1>
      <div className='app__wrapper-content'>
        <p className='p__opensans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem totam ad fuga voluptas veniam debitis minima magni aliquam, ducimus, repudiandae consequuntur non? Dolores, officiis? Debitis facilis distinctio nostrum laudantium perspiciatis.</p>
        <p className='p__cormorant' style={{ color: "#dcca7", margin: '16px 0' }}>Opening Hours</p>
        <p className='p__opensans'>Mon - Fri 18:00 - 23:00</p>
        <p className='p__opensans'>Sat - Sun 16:00 - 00:00</p>
      </div>
      <div className='cusotm__button' style={{ marginTop: '16px' }}>Visit Us</div>
    </div>
    <div className='app__wrapper_img'>
      <img src={pics.findus} alt="find us" />
    </div>
  </div>
);

export default FindUs;
