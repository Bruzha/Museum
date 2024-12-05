class Video{
    constructor(){
        this.video = document.querySelectorAll('.video__frame');
        this.overlay1 = document.querySelector('.video__overlay-1');
        this.overlay2 = document.querySelector('.video__overlay-2');
        this.overlay3 = document.querySelector('.video__overlay-3');
        this.span = document.querySelectorAll('.video__span');
        this.video_arrows1 = document.querySelector('.video__arrow-1');
        this.video_arrows2 = document.querySelector('.video__arrow-2');
        this.video_src = new Array(
            'https://www.youtube.com/embed/aWmJ5DgyWPI?si=H85tY1qiikp8xfTx',
            'https://www.youtube.com/embed/Vi5D6FKhRmo?si=WhHSVVS17bNR0Rx9',
            'https://www.youtube.com/embed/NOhDysLnTvY?si=5t7R4CF4vOVp_k1n',
            'https://www.youtube.com/embed/VVj-2Jdtl4o?si=2eQCWj_A3kqzbJEu',
            'https://www.youtube.com/embed/zp1BXPX8jcU?si=Zy4Job7HFMv4NsT5'
          );
        this.i_video = new Array(0, 1, 2);
        this.video_main = document.querySelector('.video__main-frame');
        this.init();
    }
    init(){
        if(this.video_arrows1 !== null) {
            this.video_arrows1.onclick = () => this.arrowPrev();
        }
        if(this.video_arrows2 !== null) {
            this.video_arrows2.onclick = () => this.arrowNext();
        }
        if(this.overlay1 !== null) {
            this.overlay1.onclick = () => this.videoClick(0);
        }
        if(this.overlay2 !== null) {
            this.overlay2.onclick = () => this.videoClick(1);
        }
        if(this.overlay3 !== null) {
            this.overlay3.onclick = () => this.videoClick(2);
        }
    }
    videoClick(id){
        this.video_main.src = this.video_src[this.i_video[id]];
    }
    arrowPrev(){
        this.i_video[0]--;
        this.i_video[1]--;
        this.i_video[2]--;
        if (this.i_video[0] < 0) this.i_video[0] = 4;
        if (this.i_video[1] < 0) this.i_video[1] = 4;
        if (this.i_video[2] < 0) this.i_video[2] = 4;
        for (let i = 0; i < 3; i++) {
            this.video[i].src = this.video_src[this.i_video[i]];
        }
        for (let i = 0; i < 5; i++) {
            if (i === this.i_video[0]) this.span[i].style = 'background-color: var(--palette-primary-main);';
            else this.span[i].style = 'background-color: var(--palette-tertiary-dark);';
        }
    }
    arrowNext(){
        this.i_video[0]++;
        this.i_video[1]++;
        this.i_video[2]++;
        if (this.i_video[0] > 4) this.i_video[0] = 0;
        if (this.i_video[1] > 4) this.i_video[1] = 0;
        if (this.i_video[2] > 4) this.i_video[2] = 0;
        for (let i = 0; i < 3; i++) {
            this.video[i].src = this.video_src[this.i_video[i]];
        }
        for (let i = 0; i < 5; i++) {
            if (i === this.i_video[0]) this.span[i].style = 'background-color: var(--palette-primary-main);';
            else this.span[i].style = 'background-color: var(--palette-tertiary-dark);';
        }
    }
}
export default {Video};