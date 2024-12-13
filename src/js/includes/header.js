import AuthCookies from './authcookies.js';
import slider from "./../index";
class Header{
    constructor(){
        this.header_a = document.querySelector('.header__a-log-in');
        this.init();
    }
    init(){
        if(this.header_a !== null) {
            if (AuthCookies.checkAuthentication()) {
                this.header_a.innerHTML = 'Profile';
                this.header_a.href = 'profile-user.html';
            } else {
                this.header_a.innerHTML = 'Log in';
                this.header_a.href = 'autorisation.html';
            }
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            slider.sliderImg[0].on('slideChange', function () {
                const items = document.querySelectorAll('.header__span');
                for (let i = 0; i < 5; i++) {
                    if (i === slider.sliderImg[0].realIndex) items[i].style = 'background-color: var(--palette-secondary-light);';
                    else items[i].style = 'background-color: var(--palette-primary-light);';
                }
            })
        }
    }
}

export default {Header};