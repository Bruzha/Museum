import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper';
import class_header from './includes/header';
import class_welcome from './includes/welcome';
import class_tickets from './includes/tickets';
import class_video from './includes/video';
import class_explore from './includes/explore';
import class_registation from './includes/registration';
import class_autorisation from './includes/autorisation';
import class_forgot from './includes/forgot-password';
import class_profile from './includes/profile';
import class_orders from './includes/orders';

let sliderImg = new Swiper('.swiper__div-img', {
    modules: [Navigation, Pagination],
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination-fraction',
      type: 'fraction',
      renderFraction: function(currentClass, totalClass){
        return '0<span class="' + currentClass + '"></span>'+ ' '+' | ' + '0<span class="' + totalClass + '"></span>';
      }
    },
    grabCursor: true,
    slideToClickedSlide: true,
    keyboard:{
      enabled: true,
      onlyInViewport:true,
      pageUpDown:true,
    },
    mousewheel:{
      sensitivity: 1,
      // eventsTarget: '.slider',
    },
    spaceBetween: 30,
    loop: true,
    speed: 800,    
});

let sliderVideo = new Swiper('.swiper-video', {
  modules: [Navigation, Pagination],
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  grabCursor: true,
  //slideToClickedSlide: true,
  keyboard:{
    enabled: true,
    onlyInViewport:true,
    pageUpDown:true,
  },
  mousewheel:{
    sensitivity: 1,
    // eventsTarget: '.slider',
  },
  spaceBetween: 32,
  loop: true,
  initialSlide: 0,
  speed: 800,
  breakpoints:{
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
  }
});

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
  const autorisation = new class_autorisation;
  const forgot = new class_forgot.Forgot();
  const profile = new class_profile.Profile();
  const orders = new class_orders.Orders();
  //const footer = new class_footer.Footer();
});
export default { sliderImg, sliderVideo };