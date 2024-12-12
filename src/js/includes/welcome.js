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
        this.items = document.querySelectorAll('.welcome__span');
        this.init();
    }
    init(){
        if(document.querySelector('.welcome__arrow-prev') !== null) {
            document.querySelector('.welcome__arrow-prev').onclick = () => this.changeImg('-');
        }
        if(document.querySelector('.welcome__arrow-next') !== null) {
            document.querySelector('.welcome__arrow-next').onclick = () => this.changeImg('+');
        }
        if(document.querySelector('.welcome__button') !== null) {
            document.querySelector('.welcome__button').onclick = () => this.reload();
        }
    }

    reload(){
        location.reload();
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
        document.querySelector('.welcome__img').src = this.mas_img[this.i_img];
        document.querySelector('.welcome__counter-first').textContent = '0' + (this.i_img + 1).toString();
        for (let i = 0; i < 5; i++) {
            if (i === this.i_img) this.items[i].style = 'background-color: var(--palette-secondary-light);';
            else this.items[i].style = 'background-color: var(--palette-primary-light);';
        }
    }
}

export default {Welcome};