import { gapi } from "gapi-script";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { formatAllUsers } from "../components/utils/utils";

const Context = createContext<any>(null);

interface IProvider {
  children: ReactNode;
}

const API_KEY = import.meta.env.VITE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const scopes =
  "https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.group.member https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.user.security https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar";

export const Provider: FC<IProvider> = ({ children }) => {
  const [loggedin, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilter] = useState([]);
  const [isNavExpended, setIsNavExpended] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [admins, setAdmins] = useState([]);
  const [views, setViews] = useState({
    grid: true,
    list: true,
    contact: true,
  });

  //Themes States
  const [bgColor, setBgColor] = useState("#0078D4");
  const [fontColor, setFontColor] = useState("#FFFFFF");

  const getHolidayCalendarId = async () => {
    const response = await gapi.client.calendar.calendarList.list();
    const calendars = response.result.items;

    const holidayCalendar = calendars.find((calendar: any) =>
      calendar.summary.toLowerCase().includes("holiday")
    );

    return holidayCalendar ? holidayCalendar.id : null;
  };

  const getCurrentUser = async () => {
    const cu = await gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile().cu;
    setCurrentUser(cu);
    return cu;
  };

  const getUsers = async () => {
    const response = await gapi.client.directory.users.list({
      customer: "my_customer",
      maxResults: 10,
      orderBy: "email",
      projection: "full",
    });
    return response.result.users;
  };

  const getCalendarEvents = async () => {
    let allUserEvents = [];
    let allFestivalEvents = [];

    const userResponse = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 2500,
      singleEvents: true,
      orderBy: "startTime",
    });
    allUserEvents = userResponse.result.items;

    const holidayCalendarId = await getHolidayCalendarId();

    if (holidayCalendarId) {
      const holidayResponse = await gapi.client.calendar.events.list({
        calendarId: holidayCalendarId,
        timeMin: new Date().toISOString(),
        maxResults: 2500,
        singleEvents: true,
        orderBy: "startTime",
      });

      allFestivalEvents = holidayResponse.result.items;
    } else {
      console.log("No holiday calendar found.");
    }

    console.log("allUserEvents", allUserEvents);
    console.log("userResponse", userResponse);
    console.log("allFestivalEvents", allFestivalEvents);

    const userEvents = allUserEvents.map((x: any) => {
      const participants =
        x.attendees !== undefined ? x.attendees.map((a: any) => a.email) : [];

      return {
        id: x.id,
        title: x.summary,
        start: x.start.dateTime,
        end: x.end.dateTime,
        calendarId: "meeting",
        people: participants.length < 1 ? undefined : participants,
      };
    });

    const defaultEvents = allFestivalEvents.map((x: any) => ({
      id: x.id,
      title: x.summary,
      start: x.start.date,
      end: x.start.date,
      color: "#039BE5",
    }));

    const events = [...userEvents, ...defaultEvents];
    return events;
  };

  const getMeetings = async () => {
    const response = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("getMeetings", response.result.items);

    const meetings = response.result.items.map((x: any) => ({
      id: x.id,
      organizer: x.organizer.email,
      summary: x.summary,
      start: x.start.dateTime,
      end: x.end.dateTime,
      showLink: x.htmlLink,
      joinLink: x.hangoutLink,
      attendees: x.attendees ?? [],
    }));

    console.log("meetings", meetings);
    return meetings;
  };

  const signInOnLoad = () => {
    gapi.load("client:auth2", async () => {
      setLoading(true);
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: scopes,
        })
        .then(async () => {
          await gapi.client.load("admin", "directory_v1");
          await gapi.client.load("calendar", "v3");
          await gapi.client.load("gmail", "v1");

          const userSignInState = gapi.auth2.getAuthInstance().isSignedIn.get();
          if (userSignInState) {
            setLoggedIn(true);
            setLoading(false);
            getMeetings();
            getCurrentUser();
            getUsers().then((users: any[]) => {
              setAllUsers(formatAllUsers(users));
            });
          } else {
            setLoggedIn(false);
            setLoading(false);
          }
        });
    });
  };

  const sendEmail = async (toList: any, subject: any, body: string) => {
    const to = toList.join(", ");

    const email = [`To: ${to}`, `Subject: ${subject}`, "", body].join("\n");

    const base64EncodedEmail = btoa(email)
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const request = {
      userId: "me",
      resource: {
        raw: base64EncodedEmail,
      },
    };

    try {
      await gapi.client.gmail.users.messages.send(request);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  useEffect(() => {
    signInOnLoad();
  }, [loggedin]);

  const value = {
    loggedin,
    loading,
    searchFilters,
    isNavExpended,
    bgColor,
    fontColor,
    currentUser,
    allUsers,
    admins,
    views,
    setViews,
    setAdmins,
    setAllUsers,
    setBgColor,
    setFontColor,
    setIsNavExpended,
    setSearchFilter,
    setLoggedIn,
    setLoading,
    getUsers,
    getCalendarEvents,
    getMeetings,
    getCurrentUser,
    sendEmail,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// hooks
export const useAuth = () => useContext(Context);
export const useThemes = () => {
  const { bgColor, setBgColor, fontColor, setFontColor } = useContext(Context);
  return { bgColor, setBgColor, fontColor, setFontColor };
};
