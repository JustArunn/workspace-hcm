import { useAuth } from "../../context/Context";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import {
  Panel,
  TextField,
  PrimaryButton,
} from "@fluentui/react";

import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import Loader from "../custom/Loader";

const Calendar = () => {
  const [loading, setLoading] = useState(false);
  const { getCalendarEvents } = useAuth();

  const plugins = [
    createEventsServicePlugin(),
    createEventModalPlugin(),
    createCalendarControlsPlugin(),
  ];

  const calendar = useCalendarApp(
    {
      views: [createViewMonthGrid(), createViewDay(), createViewWeek()],
      calendars: {
        meeting: {
          colorName: "meeting",
          lightColors: {
            main: "#1cf9b0",
            container: "#dafff0",
            onContainer: "#004d3d",
          },
          darkColors: {
            main: "#c0fff5",
            onContainer: "#e6fff5",
            container: "#42a297",
          },
        },
      },
      events: [],
    },
    plugins
  );

  useEffect(() => {
    calendar.eventsService.getAll();
    calendar.calendarControls.setView("month-grid");
  }, []);

  useEffect(() => {
    setLoading(true);
    getCalendarEvents().then((events: any) => {
      calendar.eventsService.set(events);
      setLoading(false);
    });
  }, []);

  return (
    <div className="h-full w-full mt-3">
      {loading ? (
        <div className="h-[90vh] w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      )}
    </div>
  );
};

const AddEvent = ({ isOpen, onDismiss, clickedDate }: any) => {
  console.log("clickedDate", clickedDate);
  const [eventData, setEventData] = useState({
    summary: "",
    location: "",
    description: "",
    start: "",
    end: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const addEvent = async () => {
    // setLoading(true);
    const event = {
      summary: eventData.summary,
      location: eventData.location,
      description: eventData.description,
      start: {
        dateTime: eventData.start,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: eventData.end,
        timeZone: "America/Los_Angeles",
      },
    };

    const request = await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    console.log("req", request);

    try {
      const response = await request.json();
      if (response) {
        alert("Event created: " + response.result.htmlLink);
      }
    } catch (error) {
      // alert("Error creating event: " + error.message);
    } finally {
      // setLoading(false);
      // setIsPanelOpen(false);
    }
  };

  useEffect(() => {
    setEventData({
      summary: "",
      location: "",
      description: "",
      start: clickedDate,
      end: clickedDate,
    });
  }, []);

  return (
    <Panel
      headerText="Add Event"
      isOpen={isOpen}
      onDismiss={() => onDismiss(false)}
    >
      <div>
        <TextField
          label="Event Summary"
          name="summary"
          value={eventData.summary}
          onChange={handleChange}
          required
        />
        <TextField
          label="Event Location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
        />
        <TextField
          label="Event Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
        />
        <TextField
          label="Start Time"
          name="start"
          type="datetime-local"
          value={eventData.start}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
          required
        />
        <TextField
          label="End Time"
          name="end"
          type="datetime-local"
          value={eventData.end}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
          required
        />
        <PrimaryButton onClick={addEvent}>Submit</PrimaryButton>
      </div>
    </Panel>
  );
};

export default Calendar;
