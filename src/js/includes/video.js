class Video{
    constructor(){
        this.video = document.querySelectorAll('.video__frame');
        this.span = document.querySelectorAll('.video__span');
        this.video_src = new Array(
            'https://www.youtube.com/embed/aWmJ5DgyWPI?si=H85tY1qiikp8xfTx',
            'https://www.youtube.com/embed/Vi5D6FKhRmo?si=WhHSVVS17bNR0Rx9',
            'https://www.youtube.com/embed/NOhDysLnTvY?si=5t7R4CF4vOVp_k1n',
            'https://www.youtube.com/embed/VVj-2Jdtl4o?si=2eQCWj_A3kqzbJEu',
            'https://www.youtube.com/embed/zp1BXPX8jcU?si=Zy4Job7HFMv4NsT5'
          );
        this.i_video = new Array(0, 1, 2);
        this.init();
    }
    init(){
        if(document.querySelector('.video__arrow-1') !== null) {
            document.querySelector('.video__arrow-1').onclick = () => this.changeVideo('-');
        }
        if(document.querySelector('.video__arrow-2') !== null) {
            document.querySelector('.video__arrow-2').onclick = () => this.changeVideo('+');
        }
        if(document.querySelector('.video__overlay-1') !== null) {
            document.querySelector('.video__overlay-1').onclick = () => this.videoClick(0);
        }
        if(document.querySelector('.video__overlay-2') !== null) {
            document.querySelector('.video__overlay-2').onclick = () => this.videoClick(1);
        }
        if(document.querySelector('.video__overlay-3') !== null) {
            document.querySelector('.video__overlay-3').onclick = () => this.videoClick(2);
        }
    }
    videoClick(id){
        document.querySelector('.video__main-frame').src = this.video_src[this.i_video[id]];
    }
    changeVideo(mark){
        if(mark === '-'){
            this.i_video[0]--;
            this.i_video[1]--;
            this.i_video[2]--;
            if (this.i_video[0] < 0) this.i_video[0] = 4;
            if (this.i_video[1] < 0) this.i_video[1] = 4;
            if (this.i_video[2] < 0) this.i_video[2] = 4;
        }
        else{
            this.i_video[0]++;
            this.i_video[1]++;
            this.i_video[2]++;
            if (this.i_video[0] > 4) this.i_video[0] = 0;
            if (this.i_video[1] > 4) this.i_video[1] = 0;
            if (this.i_video[2] > 4) this.i_video[2] = 0;
        }
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