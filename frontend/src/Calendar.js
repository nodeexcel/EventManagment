import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = BigCalendar.momentLocalizer(moment); 

const MyCalendar = props => {

  props.events.forEach((val, i) => {
    props.events[i].end = new Date(val.EventEndDate);
    props.events[i].start = new Date(val.EventStartDate);
  });

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        view="month"
        views={["month"]}
        onSelectEvent={props.onEventClick}
        selectable={true}
      />
    </div>
  );
};
export default MyCalendar;
