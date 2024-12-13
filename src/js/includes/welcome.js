import slider from "./../index";
class Welcome{
    constructor(){
        this.init();
    }
    init(){
        if(document.querySelector('.welcome__button') !== null) {
            document.querySelector('.welcome__button').onclick = () => location.reload();;
            slider.sliderImg[1].on('slideChange', function () {
                const items = document.querySelectorAll('.welcome__span');
                for (let i = 0; i < 5; i++) {
                    if (i === slider.sliderImg[1].realIndex) items[i].style = 'background-color: var(--palette-secondary-light);';
                    else items[i].style = 'background-color: var(--palette-primary-light);';
                }
            })
        }
    }
}
export default {Welcome};