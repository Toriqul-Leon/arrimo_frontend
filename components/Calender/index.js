import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import styles from "./Calender.module.css";
import { formatDate } from "@fullcalendar/core";

const Calender = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(currentEvents));
  }, [currentEvents]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    console.log(title);
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* calender sidebar */}
        <div className={styles.sidebar}>
          {/* list item */}

          {currentEvents.map((event) => {
            return (
              <div key={event.id}>
                <p className={styles.listItem}>{event.title}</p>
                {formatDate(event.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            );
          })}
          {currentEvents.length === 0 && (
            <p className={styles.listItem}>No events</p>
          )}
        </div>
        <div className={styles.calendar}>
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={JSON.parse(localStorage.getItem("events"))}
          />
        </div>
      </div>
    </>
  );
};

export default Calender;
