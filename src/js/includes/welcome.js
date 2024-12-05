class Welcome{
    constructor(){
        this.i_img = 0;
        this.mas_img = new Array(
            '../../img/hero/hero-image1.webp',
            '../../img/hero/hero-image2.webp',
            '../../img/hero/hero-image3.webp',
            '../../img/hero/hero-image4.webp',
            '../../img/hero/hero-image5.webp'
        );
        this.first_img = document.querySelector('.welcome__img');
        this.counter = document.querySelector('.welcome__counter-first');
        this.items = document.querySelectorAll('.welcome__span');
        this.prevArrow = document.querySelector('.welcome__arrow-prev');
        this.nextArrow = document.querySelector('.welcome__arrow-next');
        this.button_reload = document.querySelector('.welcome__button');
        this.init();
    }
    init(){
        if(this.prevArrow !== null) {
            this.prevArrow.onclick = () => this.prev();
        }
        if(this.nextArrow !== null) {
            this.nextArrow.onclick = () => this.next();
        }
        if(this.button_reload !== null) {
            this.button_reload.onclick = () => this.reload();
        }
    }

    reload(){
        location.reload();
    }
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

export default {Welcome};