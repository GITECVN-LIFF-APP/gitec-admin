import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'; // needed for dayClick
import { EVENTS_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';
import useSWR, { useSWRConfig } from 'swr';
import { CircularProgress } from '@mui/material';

const index = () => {
  const handleClick = (info) => {
    console.log('1', info);
  };

  const handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };

  const { data: events } = useSWR<[]>(EVENTS_URL, getData);

  if (!events) return <CircularProgress />;
  return (
    <>
      <FullCalendar
        // defaultView="timeGridWeek"
        plugins={[timeGridPlugin, dayGridPlugin]}
        // header={{
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'timeGridWeek,timeGridDay'
        // }}
        eventMinHeight={18}
        slotMinTime="09:00:00"
        slotMaxTime="18:00:00"
        nowIndicator={false}
        allDayText="All Day"
        locale="ja"
        timeZone="local"
        events={events}
        // eventClick={handleClick}
        // scrollTime={'08:00:00'}
        expandRows={true}
        dateClick={handleDateClick}
      />
    </>
  );
};

export default index;
