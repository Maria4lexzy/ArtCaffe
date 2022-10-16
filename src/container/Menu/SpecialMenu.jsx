import React from 'react';

import './SpecialMenu.scss';
import { SubHeading, MenuItem } from '../../components';
import { pics, data } from '../../constants';
const SpecialMenu = () => (
  <div className='app__specialmenu flex__center section__padding' id="menu">
    <div className='app__specialmenu-title'>
      <SubHeading title="Menu that fits your taste" />
      <h1 className='headtext__cormorant'>Today's specials</h1>
    </div>
    <div className='app__specialmenu-menu'>
      <div className='app__specialmenu-menu--wine flex__center'>
        <p className='app__specialmenu-menu--heading'> Wine & Beer</p>
        <div className='app__specialmenu-menu--items'>
          {data.wines.map((wine, index) => (<MenuItem key={wine.title + index} title={wine.title} price={wine.price} tags={wine.tags} />))}

        </div>
      </div>
      <div className='app__specialmenu-menu--img'>
        <img src={pics.menu} alt="menu" />
      </div>
      <div className='app__specialmenu-menu--cocktails flex__center'>
        <p className='app__specialmenu-menu--heading'> Cocktails</p>
        <div className='app__specialmenu-menu--items'>
          {data.wines.map((cocktail, index) => (<MenuItem key={cocktail.title + index} title={cocktail.title} price={cocktail.price} tags={cocktail.tags} />))}

        </div>
      </div>
    </div>
    <div style={{ marginTop: '16px' }}>
      <button className='custom__button' type='button'>View More</button>
    </div>
  </div>
);

export default SpecialMenu;
