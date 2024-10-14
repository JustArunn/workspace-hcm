import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import {
  TextField,
  Panel,
  PanelType,
  Icon,
} from "@fluentui/react";
import { useAuth } from "../../context/Context";
import { useId } from "react";
import Select from "react-select";
import Button from "../custom/buttons/Button";
import Heading from "../utils/Heading";
import NoRecordsFound from "../utils/NoRecordsFound";
import Loader from "../custom/Loader";

const Meetings = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState<any>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<any>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState<string | null>(null);
  const [users, setUsers] = useState<any>([]);

  const { getMeetings, currentUser, getUsers } = useAuth();
  const id = useId();

  // const handleEvent = async () => {
  //   const meetingDateTime = new Date(meetingTime).toISOString();

  //   const event = {
  //     summary: meetingTitle,
  //     start: {
  //       dateTime: meetingDateTime,
  //       timeZone: "America/Los_Angeles",
  //     },
  //     end: {
  //       dateTime: new Date(
  //         new Date(meetingDateTime).getTime() + 60 * 60 * 1000
  //       ).toISOString(),
  //       timeZone: "America/Los_Angeles",
  //     },
  //     attendees: selectedParticipants.map((participant: any) => ({
  //       email: participant.value,
  //     })),
  //     conferenceData: {
  //       createRequest: {
  //         requestId: id,
  //         conferenceSolutionKey: {
  //           type: "hangoutsMeet",
  //         },
  //       },
  //     },
  //   };

  //   try {
  //     let response;
  //     if (isEditing && currentMeetingId) {
  //       // Update existing event
  //       response = await gapi.client.calendar.events.update({
  //         calendarId: "primary",
  //         eventId: currentMeetingId,
  //         resource: event,
  //         conferenceDataVersion: 1,
  //       });
  //     } else {
  //       // Create new event
  //       response = await gapi.client.calendar.events.insert({
  //         calendarId: "primary",
  //         resource: event,
  //         conferenceDataVersion: 1,
  //       });
  //     }

  //     const newMeeting = {
  //       id: response.result.id,
  //       organizer: response.result.organizer.email,
  //       summary: response.result.summary,
  //       start: response.result.start.dateTime ?? response.result.start.date,
  //       showLink: response.result.htmlLink,
  //       joinLink: response.result.hangoutLink,
  //       attendees: event.attendees,
  //     };

  //     if (isEditing) {
  //       // Update meeting in state
  //       setMeetings(
  //         meetings.map((meeting: any) =>
  //           meeting.id === currentMeetingId ? newMeeting : meeting
  //         )
  //       );
  //     } else {
  //       // Add new meeting to state
  //       setMeetings([...meetings, newMeeting]);
  //     }

  //     setIsPanelOpen(false);
  //     resetForm();
  //   } catch (error: any) {
  //     console.log("error in handling event", error);
  //   }
  // };

  const handleEvent = async () => {
    const meetingDateTime = new Date(meetingTime).toISOString();

    const event = {
      summary: meetingTitle,
      start: {
        dateTime: meetingDateTime,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: new Date(
          new Date(meetingDateTime).getTime() + 60 * 60 * 1000
        ).toISOString(),
        timeZone: "America/Los_Angeles",
      },
      attendees: selectedParticipants.map((participant: any) => ({
        email: participant.value,
      })),
      conferenceData: {
        createRequest: {
          requestId: id,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    };

    try {
      let response;
      if (isEditing && currentMeetingId) {
        // Update existing event
        response = await gapi.client.calendar.events.update({
          calendarId: "primary",
          eventId: currentMeetingId,
          resource: event,
          conferenceDataVersion: 1,
        });
      } else {
        // Create new event
        response = await gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
          conferenceDataVersion: 1,
        });
      }

      const newMeeting = {
        id: response.result.id,
        organizer: response.result.organizer.email,
        summary: response.result.summary,
        start: response.result.start.dateTime ?? response.result.start.date,
        showLink: response.result.htmlLink,
        joinLink: response.result.hangoutLink,
        attendees: event.attendees,
      };

      // Update meeting in state correctly
      setMeetings((prevMeetings: any) => {
        if (isEditing) {
          return prevMeetings.map((meeting: any) =>
            meeting.id === currentMeetingId ? newMeeting : meeting
          );
        } else {
          return [...prevMeetings, newMeeting];
        }
      });

      setIsPanelOpen(false);
      resetForm();
    } catch (error: any) {
      console.log("error in handling event", error);
    }
  };

  const resetForm = () => {
    setMeetingTitle("");
    setMeetingTime("");
    setSelectedParticipants([]);
    setIsEditing(false);
    setCurrentMeetingId(null);
  };

  const editMeeting = (meeting: any) => {
    setMeetingTitle(meeting.summary);
    setMeetingTime(new Date(meeting.start).toISOString().slice(0, 16));
    setSelectedParticipants(
      meeting.attendees.map((attendee: any) => ({
        value: attendee.email,
        label: attendee.email,
      }))
    );
    setCurrentMeetingId(meeting.id);
    setIsEditing(true);
    setIsPanelOpen(true);
  };

  const cancelMeeting = async (meetingId: string) => {
    try {
      await gapi.client.calendar.events.delete({
        calendarId: "primary",
        eventId: meetingId,
      });
      setMeetings(meetings.filter((meeting: any) => meeting.id !== meetingId));
    } catch (error: any) {
      console.log("error in canceling event", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMeetings().then(async (data: any) => {
      setMeetings(data);
      setLoading(false);
    });

    getUsers().then((users: any) => {
      const data = users.map((x: any) => ({
        value: x.primaryEmail ?? "",
        label: x.name.fullName ?? "",
      }));
      setUsers(data);
    });

    const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    setMeetingTime(getCurrentDateTime());
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Heading>Schedule Meetings</Heading>
      <Button onClick={() => setIsPanelOpen(true)}>
        <div className="flex gap-2 justify-center items-center">
          <Icon iconName="Add" />
          <span>Schedule Meeting</span>
        </div>
      </Button>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => {
          setIsPanelOpen(false);
          resetForm();
        }}
        headerText={isEditing ? "Edit Meeting" : "Schedule a New Meeting"}
        type={PanelType.custom}
        customWidth="450px"
      >
        <div className="flex flex-col space-y-4">
          <TextField
            label="Meeting Title"
            value={meetingTitle}
            onChange={(e: any) => setMeetingTitle(e.target.value)}
            required
          />
          <TextField
            label="Meeting Time"
            type="datetime-local"
            value={meetingTime}
            onChange={(e: any) => {
              setMeetingTime(e.target.value);
            }}
            required
          />
          <Select
            isMulti
            menuShouldScrollIntoView
            menuPosition="fixed"
            maxMenuHeight={150}
            options={users as any}
            value={selectedParticipants}
            onChange={(data) => setSelectedParticipants(data)}
            placeholder="Select participants..."
          />
          <Button
            text={isEditing ? "Update Event" : "Create Event"}
            onClick={handleEvent}
          />
        </div>
      </Panel>

      <div className="mt-6">
        {loading ? (
          <div className="h-[70vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {meetings.length === 0 ? (
              <div className="flex justify-center"><NoRecordsFound className="w-[20%]" /></div>
            ) : (
              <ul className="space-y-4">
                {meetings.map((meeting: any, index: number) => (
                  <li key={index} className="p-4 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-y-1">
                        <strong className="text-lg">{meeting.summary}</strong>
                        <div className="">
                          {new Date(meeting.start).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Organizer: {meeting.organizer}
                        </div>
                        {meeting.attendees && meeting.attendees.length > 0 && (
                          <div
                            title={meeting.attendees
                              .slice(0, 3)
                              .map((attendee: any) => attendee.email)
                              .join(", ")}
                            className="text-sm text-gray-500"
                          >
                            Participants:{" "}
                            {meeting.attendees.length > 1
                              ? meeting.attendees
                                  .slice(0, 1)
                                  .map((attendee: any) => attendee.email)
                                  .join(", ") + "..."
                              : meeting.attendees
                                  .map((attendee: any) => attendee.email)
                                  .join(", ")}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {meeting.joinLink && (
                          <a
                            href={meeting.joinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="mt-2" text="Join Meeting" />
                          </a>
                        )}
                        {meeting.showLink && (
                          <a
                            href={meeting.showLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="mt-2" text="Show Meeting" />
                          </a>
                        )}
                        {currentUser === meeting.organizer && (
                          <>
                            {/* <Button
                              className="mt-2"
                              text="Edit Meeting"
                              onClick={() => editMeeting(meeting)}
                            /> */}
                            <Button
                              className="mt-2"
                              text="Cancel Meeting"
                              onClick={() => cancelMeeting(meeting.id)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Meetings;
