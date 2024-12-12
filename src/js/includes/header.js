import AuthCookies from './authcookies.js';
class Header{
    constructor(){
        this.i_img = 0;
        this.mas_img = new Array(
            '../../img/hero/hero-image1.webp',
            '../../img/hero/hero-image2.webp',
            '../../img/hero/hero-image3.webp',
            '../../img/hero/hero-image4.webp',
            '../../img/hero/hero-image5.webp'
        );
        this.first_img = document.querySelector('.header__img');
        this.counter = document.querySelector('.header__counter-1');
        this.items = document.querySelectorAll('.header__span');
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
        }
        if(document.querySelector('.header__arrow-prev') !== null) {
            document.querySelector('.header__arrow-prev').onclick = () => this.changeImg('-');
        }
        if(document.querySelector('.header__arrow-next') !== null) {
            document.querySelector('.header__arrow-next').onclick = () => this.changeImg('+');
        }
    }
    changeImg(mark) {
        if(mark === '-'){
            this.i_img--;
            if (this.i_img < 0) this.i_img = 4;
        }
        else{
            this.i_img++;
            if (this.i_img > 4) this.i_img = 0;
        }
        this.first_img.src = this.mas_img[this.i_img];
        this.counter.textContent = '0' + (this.i_img + 1).toString();
        for (let i = 0; i < 5; i++) {
            if (i === this.i_img) this.items[i].style = 'background-color: var(--palette-secondary-light);';
            else this.items[i].style = 'background-color: var(--palette-primary-light);';
        }
    }
}

export default {Header};