export const ROOT = "/";
export const ROUTE_LOGIN = "/signin";
export const ROUTE_SIGNUP = "/signup";
export const ROUTE_FORGOT_PASSWORD = "/forgot-password";
export const ROUTE_ABOUT_US = "/about-us";
export const ROUTE_COMPETITIONS = "/competitions";
export const ROUTE_MEMBERSHIP = "/membership";
export const ROUTE_FACILITIES = "/facilities";
export const ROUTE_TRAINING_CENTRE = "/training_centre";
export const ROUTE_BOOKING_COURT = "/book_court";
export const ROUTE_REPRESENTATIVE = "/united";
export const ROUTE_ACADEMY = "/academy";
export const ROUTE_PARTNERS = "/partners";
export const ROUTE_CORPORATE_PARTNERS = "/corporate_partners";
export const ROUTE_PLAYER_PARTNERS = "/player_partners";
export const ROUTE_CBL = "/cbl";
export const ROUTE_JCBL = "/jcbl";
export const ROUTE_HIGH_SCHOOL = "/cbl-high-school";
export const TEMPLATE_ROUTE_REGISTER1 = "/register_team";
export const TEMPLATE_ROUTE_REGISTER2 = "/register_individual";

export const ROUTE_ADVERTISE = "/advertise";
export const ROUTE_ADVERTISE_CPC = "/advertise-cpc";
export const ROUTE_ADVERTISE_CPI = "/advertise-cpi";
export const ROUTE_ADVERTISE_CPL = "/advertise-cpl";
export const ROUTE_LEGAL = "/legal";
export const ROUTE_CONTACT_US = "/contact-us";
export const ROUTE_OTP = "/otp-verify";

export const ROUTE_USER_DASHBOARD = "/user/dashboard";
export const ROUTE_USER_PAYMENT = "/user/transaction";
export const ROUTE_USER_SUBSCRIPTION = "/user/subscription";

export const ROUTE_ADMIN_LOGIN = "/admin/login";
export const ROUTE_ADMIN_DASHBOARD = "/admin/dashboard";
export const ROUTE_ADMIN_CBL = "/admin/cbl";
export const ROUTE_ADMIN_JCBL = "/admin/jcbl";
export const ROUTE_ADMIN_ACADEMY = "/admin/academy";
export const ROUTE_ADMIN_HIGHSCHOOL = "/admin/high_school";
export const ROUTE_ADMIN_BRANCH = "/admin/branch";
export const ROUTE_ADMIN_EVENT = "/admin/event";
export const ROUTE_ADMIN_SEASON = "/admin/season";
export const ROUTE_ADMIN_USER = "/admin/user";
export const ROUTE_ADMIN_WAITLIST = "/admin/wait_list";
export const ROUTE_ADMIN_PARTNER = "/admin/partners";
export const ROUTE_ADMIN_SUBSCRIPTION = "/admin/subscription_setting";
export const ROUTE_ADMIN_PAYMENT = "/admin/payment";

export const NAV_MENU_IMTES = [
  { route: ROOT, title: "HOME", active: true },
  { route: ROUTE_MEMBERSHIP, title: "MEMBERSHIPS", active: false },
  { route: ROUTE_COMPETITIONS, title: "COMPETITIONS", active: false },
  { route: ROUTE_FACILITIES, title: "FACILITIES", active: false },
  { route: ROUTE_ACADEMY, title: "ACADEMY", active: false },
  { route: ROUTE_PARTNERS, title: "CURRENT PARTNERS", active: false },
];


export const FOOTER_SITEMAP_IMTES = [
  { route: "", title: "COMPETITIONS", main: true },
  { route: ROUTE_CBL, title: "CBL", main: false },
  { route: ROUTE_JCBL, title: "JCBL", main: false },
  { route: ROUTE_HIGH_SCHOOL, title: "CBL HIGH SCHOOL", main: false },
];

export const FOOTER_QUICK_IMTES = [
  { route: "", title: "FACILITIES", main: true },
  { route: ROUTE_FACILITIES, title: "Bunbury", main: false },
];

export const FOOTER_CONTACTUS_IMTES = [
  { route: "", title: "UNITED", main: true },
  { route: ROUTE_REPRESENTATIVE, title: "TEAM", main: false },
];
export const FOOTER_ASSOCIATION_IMTES = [
  { route: "", title: "ACADEMY", main: true },
  { route: ROUTE_ACADEMY, title: "CBA", main: false },
];