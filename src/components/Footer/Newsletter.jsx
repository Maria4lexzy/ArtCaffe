import React from 'react';

import './Newsletter.scss';
import SubHeading from '../SubHeading/SubHeading';
const Newsletter = () => (
  <div className='app__newsletter'>
    <div className='app__newsletter-heading'>
      <SubHeading title="NewsLetter" />
      <h1 className='headtext__cormorant'>Subscribe to our newsletter</h1>
      <p className='p__opensans'>Never miss latest updates</p>
    </div>
    <div className='app__newsletter-input flex__center'>
      <input type='email' placeholer='example@gmail.com'></input>
      <button className="custom__button">Subscribe</button>
    </div>
  </div>
);

export default Newsletter;
