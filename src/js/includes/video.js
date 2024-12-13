import slider from "./../index";
class Video{
    constructor(){
        this.video = document.querySelectorAll('.video__frame');
        this.span = document.querySelectorAll('.video__span');
        this.init();
    }
    init(){
        // if(document.querySelector('.overlay-id-0') !== null) {
        //     document.querySelector('.overlay-id-0').onclick = () => this.videoClick('https://www.youtube.com/embed/aWmJ5DgyWPI?si=H85tY1qiikp8xfTx');
        // }
        // if(document.querySelector('.overlay-id-1') !== null) {
        //     document.querySelector('.overlay-id-1').onclick = () => this.videoClick('https://www.youtube.com/embed/Vi5D6FKhRmo?si=WhHSVVS17bNR0Rx9');
        // }
        // if(document.querySelector('.overlay-id-2') !== null) {
        //     document.querySelector('.overlay-id-2').onclick = () => this.videoClick('https://www.youtube.com/embed/NOhDysLnTvY?si=5t7R4CF4vOVp_k1n');
        // }
        // if(document.querySelector('.overlay-id-3') !== null) {
        //     document.querySelector('.overlay-id-3').onclick = () => this.videoClick('https://www.youtube.com/embed/VVj-2Jdtl4o?si=2eQCWj_A3kqzbJEu');
        // }
        // if(document.querySelector('.overlay-id-4') !== null) {
        //     document.querySelector('.overlay-id-4').onclick = () => this.videoClick('https://www.youtube.com/embed/zp1BXPX8jcU?si=Zy4Job7HFMv4NsT5');
        // }
        if(document.querySelector('.swiper-video') !== null){
            console.log("slider-video: " +slider);
            console.log("slider-slider-video: " +slider.sliderVideo);
            slider.sliderVideo.on('slideChange', function () {
                const items = document.querySelectorAll('.video__frame');
                for (let i = 0; i < 5; i++) {
                    if (i === slider.sliderVideo.realIndex) {
                        if(i===0)
                        document.querySelector('.video__main-frame').src = items[4].src; 
                        if(i<=5 && i>0)
                            document.querySelector('.video__main-frame').src = items[i-1].src;
                    }
                }
            })
        }
    }
    videoClick(id){
        document.querySelector('.video__main-frame').src = id;
    }
}
export default {Video};