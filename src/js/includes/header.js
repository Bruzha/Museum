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
        this.prevArrow = document.querySelector('.header__arrow-prev');
        this.nextArrow = document.querySelector('.header__arrow-next');

        this.header_button = document.querySelector('.header__button');
        this.nav = document.querySelector('.header__nav');

        this.header_a = document.querySelector('.header__a-log-in');
        this.init();
    }
    init(){
        if(this.prevArrow !== null) {
            this.prevArrow.onclick = () => this.prev();
        }
        if(this.nextArrow !== null) {
            this.nextArrow.onclick = () => this.next();
        }
        // if(this.header_a !== null) {
        //     this.header_a.onclick = () => this.Profile();
        //     if(sessionStorage.getItem('profile') === 'true'){
        //         this.header_a.innerHTML = "Profile";
        //         this.header_a.href = "profile-user.html";
        //     }
        // }
    }
    // Profile(){
    //     sessionStorage.setItem('profile', 'true');
    // }
    prev() {
        this.i_img--;
        if (this.i_img < 0) this.i_img = 4;
        this.first_img.src = this.mas_img[this.i_img];
        this.counter.textContent = '0' + (this.i_img + 1).toString();
        for (let i = 0; i < 5; i++) {
            if (i === this.i_img) this.items[i].style = 'background-color: var(--palette-secondary-light);';
            else this.items[i].style = 'background-color: var(--palette-primary-light);';
        }
    }

    next() {
        this.i_img++;
        if (this.i_img > 4) this.i_img = 0;
        this.first_img.src = this.mas_img[this.i_img];
        this.counter.textContent = '0' + (this.i_img + 1).toString();
        for (let i = 0; i < 5; i++) {
            if (i === this.i_img) this.items[i].style = 'background-color: var(--palette-secondary-light);';
            else this.items[i].style = 'background-color: var(--palette-primary-light);';
        }
    }
}

export default {Header};