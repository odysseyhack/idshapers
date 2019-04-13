import EmploymentIcon from "../images/company-logo.png";
import SERVICES from "./servicesKlm";

const DUTY_FREE = {
  id: "DUTY_FREE",
  name: "Duty free",
  icon: EmploymentIcon,
  entity: "Duty Free LLC.",
  description: "Share confirmation of your Airport checkin, age and destination easily. No more looking for boarding pass and passport.",
  url: "/company",
  claim: "DutyFree",
  steps: [
    "Verify with KLM",
    "Enter your information",
    "Get verified"
  ]
};

// Claims
const SCHOOL_NAME = {
  name: "Airport name",
  issuedBy: [SERVICES.KLM_ENROLLMENT],
  honoredBy: [DUTY_FREE]
};

const PROGRAM_NAME = {
  name: "Airport check in time",
  type: "required",
  issuedBy: [SERVICES.KLM_ENROLLMENT],
  honoredBy: [DUTY_FREE]
};

const FINAL_GRADES = {
  name: "Destination airport",
  issuedBy: [SERVICES.KLM_ENROLLMENT],
  honoredBy: [DUTY_FREE]
};


const COMPANY_NAME = {
  name: "Company Name",
  issuedBy: [DUTY_FREE],
  honoredBy: []
};



// Attach claims to services
DUTY_FREE.requiredClaims = [SCHOOL_NAME, PROGRAM_NAME, FINAL_GRADES];
DUTY_FREE.requiredServices = [SERVICES.PASSENGER_ID, SERVICES.KLM_ENROLLMENT];
DUTY_FREE.generatedClaims = [COMPANY_NAME];

export default {
  KLM_ENROLLMENT: SERVICES.KLM_ENROLLMENT,
  DUTY_FREE
}
