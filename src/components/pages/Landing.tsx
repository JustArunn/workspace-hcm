import ContactUsImage from "../../assets/contact-us.avif";
import HeroImage from "../../assets/hero-image.png";
import HCMLogo from "../../assets/workspace-hcm-header.png";
import { gapi } from "gapi-script";
import { useAuth } from "../../context/Context";
import GoogleButton from "../custom/buttons/GoogleButton";
import { useState, useEffect } from "react";
import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
} from "@fluentui/react";

const API_KEY = import.meta.env.VITE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const scopes =
  "https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.group.member https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.user.security https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar";

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const signIn = () => {
    gapi.load("client:auth2", async () => {
      const authInstance = gapi.auth2.getAuthInstance();

      if (!authInstance) {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: scopes,
        });
      }

      const userSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      setLoggedIn(userSignedIn);
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          setLoggedIn(true);
        })
        .catch(() => {
          setLoggedIn(false);
        });
    });
  };

  return (
    <div id="home" className="w-full">
      <Navbar signIn={signIn} isScrolled={isScrolled} />
      <div className="w-full pt-7">
        <Hero signIn={signIn} />
        <PricingSection />
        <ContactUs />
      </div>
    </div>
  );
};

const Navbar = ({ signIn, isScrolled }: any) => {
  const [tab, setTab] = useState("home");
  return (
    <div
      className={`sticky top-0 z-10 w-full flex justify-between items-center px-10 py-2 transition-shadow duration-200 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-[210px] ">
        {/* <h1 className="text-xl">Workspace HCM</h1> */}
        <img src={HCMLogo} />
      </div>
      <ul className="flex gap-5 select-none">
        <li
          className={`cursor-pointer hidden md:block text-gray-500 ${
            tab === "home" && "border-b-[#0078D4] border-b-2"
          }`}
        >
          <a onClick={() => setTab("home")} href="#home">
            Home
          </a>
        </li>
        <li
          className={`cursor-pointer hidden md:block text-gray-500 ${
            tab === "pricing" && "border-b-[#0078D4] border-b-2"
          }`}
        >
          <a onClick={() => setTab("pricing")} href="#pricing">
            Pricing
          </a>
        </li>
        <li
          className={`cursor-pointer hidden md:block text-gray-500 ${
            tab === "contacts" && "border-b-[#0078D4] border-b-2"
          }`}
        >
          <a onClick={() => setTab("contacts")} href="#contacts">
            Contacts
          </a>
        </li>
        <li
          className={`cursor-pointer hidden md:block text-gray-500 ${
            tab === "about" && "border-b-[#0078D4] border-b-2"
          }`}
        >
          <a onClick={() => setTab("about")} href="#about">
            About
          </a>
        </li>
      </ul>
      <GoogleButton onClick={signIn} width="fit-content">
        Sign in
      </GoogleButton>
    </div>
  );
};

const Hero = ({ signIn }: any) => {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-y-3 p-4 md:p-0">
      <h1 className="md:text-4xl font-medium text-[#0078D4]">
        Simplify Your Google Workspace Management
      </h1>
      <h2 className="md:text-2xl text-gray-700">
        Effortlessly manage users, groups, and settings—all in one place.
      </h2>
      <h3 className="text-gray-500 text-sm">
        Streamline onboarding, optimize collaboration, and enhance security with
        our intuitive application
      </h3>
      <h3 className="text-gray-400">designed for Google Workspace</h3>
      <div className="w-full flex justify-center mt-4">
        <GoogleButton width="40%" onClick={signIn} />
      </div>
      {/* <svg
        className="hidden lg:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,64L30,58.7C60,53,120,43,180,64C240,85,300,139,360,149.3C420,160,480,128,540,106.7C600,85,660,75,720,101.3C780,128,840,192,900,234.7C960,277,1020,299,1080,272C1140,245,1200,171,1260,170.7C1320,171,1380,245,1410,282.7L1440,320L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        />
      </svg> */}
      <div className="w-full flex justify-center mt-4">
        <img src={HeroImage} width={1200} />
      </div>
    </div>
  );
};

const pricingPlans = [
  {
    name: "Basic Plan",
    price: "$10/month",
    features: ["Employee Search", "Grid View", "List View", "Profile Cards"],
  },
  {
    name: "Standard Plan",
    price: "$20/month",
    features: [
      "Employee Search",
      "Grid View",
      "List View",
      "Profile Cards",
      "Email Scheduler",
      "Calendar Events",
    ],
  },
  {
    name: "Premium Plan",
    price: "$30/month",
    features: [
      "Employee Search",
      "Grid View",
      "List View",
      "Profile Cards",
      "Email Scheduler",
      "Calendar Events",
      "Google Meet Calls Scheduler",
    ],
  },
];

const PricingSection = () => {
  return (
    <div id="pricing" className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Pricing Plans
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {plan.name}{" "}
              <span className="text-lg font-medium text-gray-600">
                {plan.price}
              </span>
            </h3>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <PrimaryButton className="mt-4">Choose Plan</PrimaryButton>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any, field: any) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div id="contacts" className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>

      <div className="flex items-center justify-around w-full">
        <div>
          <img className="max-w-[500px]" src={ContactUsImage} alt="" />
        </div>
        <form onSubmit={handleSubmit} className=" w-[50%] space-y-4">
          {submitted && (
            <MessageBar messageBarType={MessageBarType.success}>
              Thank you for your message! We will get back to you shortly.
            </MessageBar>
          )}
          <div>
            <TextField
              id="name"
              type="text"
              label="Name"
              value={formData.name}
              disabled={submitted}
              onChange={(e) => handleChange(e, "name")}
              required
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div>
            <TextField
              id="email"
              type="email"
              label="Email"
              value={formData.email}
              disabled={submitted}
              onChange={(e) => handleChange(e, "email")}
              required
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          <div>
            <TextField
              id="message"
              type="text"
              label="Message"
              value={formData.message}
              disabled={submitted}
              onChange={(e) => handleChange(e, "message")}
              required
              multiline
              rows={4}
              placeholder="Enter your message"
              className="w-full"
            />
          </div>
          <PrimaryButton disabled={submitted} type="submit" className="w-full">
            Send Message
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Landing;
