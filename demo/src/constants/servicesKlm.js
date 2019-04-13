import TransportIcon from "../images/transport-logo.png";
import CityIDIcon from "../images/city-logo.png";
import DiplomaIcon from "../images/university-logo.png";

const YOURSELF = {
  id: "YOURSELF",
  name: "Yourself, Any Issuer",
  icon: CityIDIcon,
  entity: "Yourself, Any Issuer",
  description: "Yourself, Any Issuer",
  url: "/"
};

// TODO Map KLM Passenger data
const PASSENGER_ID = {
  id: "PASSENGER_ID",
  name: "Passenger ID",
  icon: CityIDIcon,
  entity: "KLM Airlines",
  description: "Identify yourself with one click. Get a digital Passenger ID. Enjoy seamless travel experience.",
  url: "/passenger",
  claim: "Passenger ID",
  steps: [
    "Verify with KLM",
    "Enter your information",
    "Get verified"
  ]
};

const KLM_ENROLLMENT = {
  id: "KLM_ENROLLMENT",
  name: "Schipol Airport Check In",
  icon: DiplomaIcon,
  entity: "The Schipol Airport",
  description: "Check in at the Schipol Airport and get passport-free access within the airport without a need of passport.",
  url: "/selfservice/enrollment",
  claim: "AirportCheckin",
  steps: [
    "Verify with KLM",
    "Enter your information",
    "Get verified"
  ]
};

const FLIGHT_PARIS = {
  id: "FLIGHT_PARIS",
  name: "Amsterdam - Paris",
  // TODO Could be icon from KLM service here https://img.static-fb.com/images/media/EAB48D10-4B9D-4E4B-9AC10451F0B80876
  icon: TransportIcon,
  entity: "KLM Airlines",
  description: "AMS - CDG KL1243. Check in at the Schipol Airport and get passport-free access within the airport without a need of passport.",
  url: "/flights/0",
  claim: "Flight Ticket",
  steps: [
    "Verify with KLM",
    "Enter your information",
    "Get verified"
  ],

  date: "2019-03-31",
  origin: "AMS",
  originName: "Amsterdam",
  destination: "CDG",
  destinationName: "Paris",
  flightId: 2,
  flightName: "KL1243",
  milesAmount: 840,
  xpAmount: 5,
  ultimateEligibility: true
};

const FLIGHT_BARCELONA = {
  id: "FLIGHT_BARCELONA",
  name: "Amsterdam - Barcelona",
  // TODO Could be icon from KLM service here https://img.static-fb.com/images/media/EAB48D10-4B9D-4E4B-9AC10451F0B80876
  icon: TransportIcon,
  description: "AMS - BCN KL1669. Check in at the Schipol Airport and get passport-free access within the airport without a need of passport.",
  entity: "KLM Airlines",
  url: "/flights/2",
  claim: "Flight Ticket",
  steps: [
    "Scan passport",
    "Take selfie",
    "Receive Airport Check-in"
  ],

  date: "2019-03-25",
  origin: "AMS",
  originName: "Amsterdam",
  destination: "BCN",
  destinationName: "Barcelona",
  flightId: 2,
  flightName: "KL1669",
  milesAmount: 752,
  xpAmount: 5,
  ultimateEligibility: true,
};
const PASSENGER_FLIGHTS = {
  FLIGHT_PARIS,
  FLIGHT_BARCELONA,
};

// Claims
const FIRST_NAME = {
  id: "firstName",
  name: "First Name",
  issuedBy: [PASSENGER_ID],
  honoredBy: [KLM_ENROLLMENT, FLIGHT_PARIS, FLIGHT_BARCELONA]
};

const LAST_NAME = {
  id: "lastName",
  name: "Last Name",
  issuedBy: [PASSENGER_ID],
  honoredBy: [KLM_ENROLLMENT, FLIGHT_PARIS, FLIGHT_BARCELONA]
};

const DATE_OF_BIRTH = {
  id: "dob",
  name: "Date of Birth",
  issuedBy: [PASSENGER_ID],
  honoredBy: [KLM_ENROLLMENT, FLIGHT_PARIS, FLIGHT_BARCELONA]
};

const PERSONAL_ID = {
    id: "personalId",
    name: "Personal Id",
    issuedBy: [PASSENGER_ID],
    honoredBy: [KLM_ENROLLMENT, FLIGHT_PARIS, FLIGHT_BARCELONA]
};

const DOCUMENT_ID = {
    id: "documentId",
    name: "Document Id",
    issuedBy: [PASSENGER_ID],
    honoredBy: [KLM_ENROLLMENT, FLIGHT_PARIS, FLIGHT_BARCELONA]
};

const SELFIE_PHOTO = {
    id: "selfiePhoto",
    name: "Selfie Photo",
    issuedBy: [PASSENGER_ID],
    honoredBy: [KLM_ENROLLMENT, FLIGHT_PARIS, FLIGHT_BARCELONA]
};

const DOCUMENT_PHOTO = {
    id: "documentPhoto",
    name: "Document Photo",
    issuedBy: [PASSENGER_ID],
    honoredBy: [FLIGHT_PARIS, FLIGHT_BARCELONA]
};

const FLIGHT_TICKET_PARIS = {
  name: "Flight Ticket (Amsterdam - Paris)",
  issuedBy: [FLIGHT_PARIS],
  honoredBy: [FLIGHT_PARIS]
};

const FLIGHT_TICKET_BARCELONA = {
  name: "Flight Ticket (Amsterdam - Barcelona)",
  issuedBy: [FLIGHT_BARCELONA],
  honoredBy: [FLIGHT_BARCELONA]
};

const CERTIFIED_PASSPORT = {
  name: "Airport check in time",
  type: "required",
  issuedBy: [KLM_ENROLLMENT],
  honoredBy: []
};

// Attach claims to services
PASSENGER_ID.generatedClaims = [FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, PERSONAL_ID, DOCUMENT_ID, SELFIE_PHOTO, DOCUMENT_PHOTO];
PASSENGER_ID.requiredClaims = PASSENGER_ID.generatedClaims.map(c => ({
  ...c,
  issuedBy: [YOURSELF]
}));

FLIGHT_PARIS.requiredClaims = [FIRST_NAME, LAST_NAME, DATE_OF_BIRTH];
// FLIGHT_PARIS.requiredServices = [PASSENGER_ID];
FLIGHT_PARIS.generatedClaims = [FLIGHT_TICKET_PARIS];

FLIGHT_BARCELONA.requiredClaims = [FIRST_NAME, LAST_NAME, DATE_OF_BIRTH];
//FLIGHT_BARCELONA.requiredServices = [PASSENGER_ID];
FLIGHT_BARCELONA.generatedClaims = [FLIGHT_TICKET_BARCELONA];

KLM_ENROLLMENT.requiredClaims = [PASSENGER_ID];
KLM_ENROLLMENT.requiredServices = [PASSENGER_ID];
KLM_ENROLLMENT.generatedClaims = [CERTIFIED_PASSPORT];

export default {
  PASSENGER_ID, PASSENGER_FLIGHTS, KLM_ENROLLMENT
}
