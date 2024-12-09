import Swiper from "swiper";
// import { heroOptions } from "./includes/your-js-file-for-section-or-page";
import class_footer from './includes/footer';
import class_header from './includes/header';
import class_welcome from './includes/welcome';
import class_tickets from './includes/tickets';
import class_video from './includes/video';
import class_explore from './includes/explore';
//import class_authcookies from './includes/authcookies';
import class_registation from './includes/registration';
import class_autorisation from './includes/autorisation';
import class_forgot from './includes/forgot-password';
import class_profile from './includes/profile';
if (document.location.pathname === "/" || document.location.pathname === "/index.html") {
  //Hero init your class from your-js-file-for-section-or-pag
  // new YourClass()

}

if (document.location.pathname === "/your-page.html") {
  //code
}
document.addEventListener('DOMContentLoaded', () => {
  const welcome = new class_welcome.Welcome();
  const header = new class_header.Header();
  const tickets = new class_tickets.Tickets();
  const booking = new class_tickets.Booking();
  const video = new class_video.Video();
  const explore = new class_explore.Explore();
  //const authcookies = new class_authcookies.AuthCookies();
  const registration = new class_registation.Registration();
  const autorisation = new class_autorisation.Autorisation();
  const forgot = new class_forgot.Forgot();
  const profile = new class_profile.Profile();
  const footer = new class_footer.Footer();
});
