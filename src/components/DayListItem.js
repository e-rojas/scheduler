import React from "react";
import "components/DayListItem.scss";
const className = require('classnames');

export default function DayListItem(props) {
    const dayClass = className('day-list__item', {
        'day-list__item--selected': props.selected,
        'day-list__item--full': props.spots === 0
    })
    const formatSpots = function(spotsNumber) {
        if (spotsNumber === 0) {
          return "no spots remaining";
        } else if (spotsNumber === 1) {
          return `${spotsNumber} spot remaining`;
        } else {
          return `${spotsNumber} spots remaining`;
        }
      }
    
      return (
        <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
          <h2 className="text--regular">{props.name}</h2>
          <h3 className="text--light">{formatSpots(props.spots)}</h3>
        </li>
      );
}