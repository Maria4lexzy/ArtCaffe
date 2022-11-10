import React, { useRef } from 'react';

import './CalendarUI.scss';
import { pics } from '../../constants';

import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'

const CalendarUI = () => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    console.log("btn clicked");
  }
  const makeDivs = divs => {
    for (var i = 0; i < 10; i++) {
      console.log(i);
    }
  }
  return (

    <div className='app__calendarui'>
      <div id="calendar" className='app__calendarui--calendar'>
        {/* <!-- use empty divs to create empty cells --> */}

        {/* flex start here */}
        <div class="day">1</div>
        <div class="day">2</div>
        <div class="day">3</div>
        <div class="day">4</div>
        <div class="day">5</div>
        <div class="day">6</div>
        <div class="day">7</div>
        <div class="day">8</div>
        <div class="day">9</div>
        <div class="day">10</div>
        <div class="day">11</div>
        <div class="day">12</div>
        <div class="day">13</div>
        <div class="day">14</div>
        <div class="day">15</div>
        <div class="day">16</div>
        <div class="day">17</div>
        <div class="day">18</div>
        <div class="day">19</div>
        <div class="day">20</div>
        <div class="day">21</div>
        <div class="day">22</div>
        <div class="day">23</div>
        <div class="day">24</div>
        <div class="day">25</div>
        <div class="day">26</div>
        <div class="day">27</div>
        <div class="day">28</div>
        <div class="day">29</div>
        <div class="day">30</div>
        <div class="day">31</div>
      </div>
      <div className="app__calendarui--side-panel">
        <div className='app__calendarui--side_panel-arrows'>
          <BsArrowLeftShort className='arrow-icon' onClick={() => scroll('left')} />
          <BsArrowRightShort className='arrow-icon' onClick={() => scroll('right')} />
        </div>
      </div>
      <div className="app__calendarui--calendar">
        { }
      </div>

    </div>



  );
}
export default CalendarUI;
