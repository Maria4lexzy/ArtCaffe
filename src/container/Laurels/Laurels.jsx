import React from 'react';
import { SubHeading } from '../../components';
import { pics, data } from '../../constants';
import './Laurels.scss';
const AwardCard = ({ award: { title, subtitle } }) => {
  <div className='app__laurels_awards-card' key={title}>
    {/* <img src={imgUrl} alt="award" /> */}
    <div className='app__laurels_awards-card_content'>
      <p className='p__cormorant' style={{ color: '#dcca87' }}>{title}</p>
      <p className='p__cormorant' >{subtitle}</p>
    </div>
  </div>
}
const Laurels = () => (
  <div className='app__bg app__wrapper section__padding' id='awards'>
    <div className='app__wrapper_info'>
      <SubHeading title='Awards & Recognition' />
      <h1 className='headtext__cormorant'>Our Laurels</h1>
      <div className='app__laurels_awards'>

        {
          data.awards.map(award => {
            console.log(award)
            return <AwardCard award={award} key={award.title} />
          })
        }
      </div>
    </div>

    <div className='app__wrapper_img'>
      <img src={pics.laurels} alt="laurels" />

    </div>
  </div>
);

export default Laurels;
