import React, { useRef } from "react";

import "./CalendarUI.scss";
import ReserveTable from "../../components/Reservation/ReserveTable";

const CalendarUI = () => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    console.log("btn clicked");
  };
  return (
    <div className="app__calendarui ">
      <ReserveTable />
      {/*      
      <div className="app__calendarui--side-panel">
        <div className='app__calendarui--side_panel-arrows'>
          <BsArrowLeftShort className='arrow-icon' onClick={() => scroll('left')} />
          <BsArrowRightShort className='arrow-icon' onClick={() => scroll('right')} />
        </div>
      </div>
      <div className="app__calendarui--calendar">
        <ul class="days">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li><span class="active">10</span></li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
          <li>31</li>
        </ul>
      </div> */}
    </div>
  );
};
export default CalendarUI;
