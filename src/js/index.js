import Swiper from "swiper";
// import { heroOptions } from "./includes/your-js-file-for-section-or-page";
import Classes from './includes/your-js-file-for-section-or-page'
if (document.location.pathname === "/" || document.location.pathname === "/index.html") {
  //Hero init your class from your-js-file-for-section-or-pag
  // new YourClass()

}

if (document.location.pathname === "/your-page.html") {
  //code
}
document.addEventListener('DOMContentLoaded', () => {
  const welcome = new Classes.Welcome();
  const header = new Classes.Header();
  const tickets = new Classes.Tickets();
  const booking = new Classes.Booking();
  const video = new Classes.Video();
  const explore = new Classes.Explore();
  const registration = new Classes.Registration();
});
