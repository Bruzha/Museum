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
        this.prevArrow.onclick = () => this.prev();
        this.nextArrow.onclick = () => this.next();
        this.button_reload.onclick = () => this.reload();
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
        this.init();
    }
    init(){
        this.prevArrow.onclick = () => this.prev();
        this.nextArrow.onclick = () => this.next();
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


let count = 0;
let count2 = 0;
let count_save = 0;
let count2_save = 0;
class Tickets{
    constructor(){
        this.minus = document.querySelector('.tickets__minus-1');
        this.minus2 = document.querySelector('.tickets__minus-2');
        this.plus = document.querySelector('.tickets__plus-1');
        this.plus2 = document.querySelector('.tickets__plus-2');
        this.total_count = document.querySelector('.tickets__count-1');
        this.total_count2 = document.querySelector('.tickets__count-2');
        this.total_cost = document.querySelector('.tickets__cost');
        this.booking_total_count = document.querySelector('.booking__count-1');
        this.booking_total_count2 = document.querySelector('.booking__count-2');
        this.booking_grey_count = document.querySelector('.booking__count-grey-1');
        this.booking_grey_count2 = document.querySelector('.booking__count-grey-2');
        this.booking_cost_basic = document.querySelector('.booking__cost-basic');
        this.booking_cost_senior = document.querySelector('.booking__cost-senior');
        this.booking_all_cost = document.querySelector('.booking__all-cost');
        this.price1 = 0;
        this.price2 = 0;

        this.radio = document.querySelectorAll('.tickets__radio');
        this.tickets_type = document.querySelector('.booking__div-title-type');
        this.tickets_type_right = document.querySelector('.booking__text-type');
        this.mas_type = new Array(
            'Permanent exhibition',
            'Temporary exhibition',
            'Combined Admission'
        );
        this.select = document.querySelector('.booking__select');
        this.button = document.querySelector('.tickets__button');
        this.button_buy = document.querySelector('.tickets__button-buy');
        this.select_checked = 'Permanent exhibition';
        this.init();
    }
    init(){
        this.minus.onclick = () => this.minusCount_1();
        this.minus2.onclick = () => this.minusCount_2();
        this.plus.onclick = () => this.plusCount_1();
        this.plus2.onclick = () => this.plusCount_2();

        this.radio[0].onclick = () => this.radio_change(0);
        this.radio[1].onclick = () => this.radio_change(1);
        this.radio[2].onclick = () => this.radio_change(2);

        this.button.onclick = () => this.buttonClick();
        this.button_buy.onclick = () => this.buttonClick();

        this.total_count.oninput = () => this.positivNumber(0);
        this.total_count2.oninput = () => this.positivNumber(1);
    }

    positivNumber(id){
        if(id===0) {
            this.total_count.value = Math.abs(this.total_count.value);
            count = this.total_count.value;
        }
        else {
            this.total_count2.value = Math.abs(this.total_count2.value);
            count2 = this.total_count2.value;
        }
    }
    buttonClick(){
        count_save = count;
        count2_save = count2;
        this.tickets_type.textContent = this.select_checked;
        this.tickets_type_right.textContent = this.select_checked;
        this.select.value = this.select_checked;
        this.booking_total_count.textContent = this.total_count.value;
        this.booking_grey_count.textContent = this.total_count.value;
        this.booking_total_count2.textContent = this.total_count2.value;
        this.booking_grey_count2.textContent = this.total_count2.value;
        this.Cost();
    }

    radio_change(radio_chacked){
        for(let i=0; i<3; i++){
            if(radio_chacked === i) {
                this.radio[i].className = 'tickets__radio-1';
                this.select_checked = this.mas_type[i];
            }
            else this.radio[i].className = 'tickets__radio';
        }
    }

    minusCount_1(){
        count--;
        if (count < 0) {
            this.total_count.value = 0;
        }
        else {
            this.total_count.value= count;
        }
        this.Cost();
    }
    minusCount_2(){
        count2--;
        if (count2 < 0) {
            this.total_count2.value = 0;
        }
        else {
            this.total_count2.value = count2;
        }
        this.Cost();
    }
    plusCount_1(){
        if (count < 0) count = 0;
        count++;
        this.total_count.value = count;
        this.Cost();
    }
    plusCount_2(){
        if (count2 < 0) count2 = 0;
        count2++;
        this.total_count2.value = count2;
        this.Cost();
    }
    
    Cost() {
        if(count >= 0) this.price1 = 20 * count;
        this.booking_cost_basic.textContent = (this.price1).toString() + ' €';
        if(count2 >= 0) this.price2 = 10 * count2;
        this.booking_cost_senior.textContent = (this.price2).toString() + ' €';
        this.total_cost.textContent = 'Total €' + (this.price1 + this.price2).toString();
        this.booking_all_cost.textContent = this.total_cost.textContent;
    }
}

class Booking{
    constructor(){
        this.minus = document.querySelector('.booking__minus-1');
        this.minus2 = document.querySelector('.booking__minus-2');
        this.plus = document.querySelector('.booking__plus-1');
        this.plus2 = document.querySelector('.booking__plus-2');
        this.total_count = document.querySelector('.booking__count-1');
        this.total_count2 = document.querySelector('.booking__count-2');
        this.booking_grey_count = document.querySelector('.booking__count-grey-1');
        this.booking_grey_count2 = document.querySelector('.booking__count-grey-2');
        this.booking_cost_basic = document.querySelector('.booking__cost-basic');
        this.booking_cost_senior = document.querySelector('.booking__cost-senior');
        this.booking_all_cost = document.querySelector('.booking__all-cost');
        this.price1 = 0;
        this.price2 = 0;

        this.date = document.querySelector('.booking__input-date');
        this.textDate = document.querySelector('.booking__div-title-date');
        this.textDate_right = document.querySelector('.booking__text-date');
        this.day = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        ];
        this.month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
        ];

        this.time = document.querySelector('.booking__input-time');
        this.textTime = document.querySelector('.booking__div-title-time');
        this.textTime_right = document.querySelector('.booking__text-time');

        this.card_month = document.querySelector('.booking__card-month');
        this.month_count = 1;
        this.card_year = document.querySelector('.booking__card-year');
        this.year_count = 2024;
        this.arrows = document.querySelectorAll('.booking__arrow');

        this.select = document.querySelector('.booking__select');
        this.div_select = document.querySelector('.booking__select-options')
        this.tickets_type_right = document.querySelector('.booking__text-type');
        this.tickets_type = document.querySelector('.booking__div-title-type');

        this.booking_button = document.querySelector('.booking__button');

        this.flag_select = true;
        this.booking_div_right = document.querySelector('.booking__div-right');
        this.option_mas = document.querySelectorAll('.booking__option');
        this.mas_type = new Array(
            'Permanent exhibition',
            'Temporary exhibition',
            'Combined Admission'
        );

        this.cvc = document.querySelector('.booking__card-input-4');
        this.cardNumber = document.querySelector('.booking__card-input-1');

        this.button_book = document.querySelector('.booking__div-button');
        
        this.email = document.querySelector('.booking__input-email');
        this.tel = document.querySelector('.booking__input-phone');
        this.init();
    }
    init(){
        this.minus.onclick = () => this.minusCount_1();
        this.minus2.onclick = () => this.minusCount_2();
        this.plus.onclick = () => this.plusCount_1();
        this.plus2.onclick = () => this.plusCount_2();

        this.date.onchange = () => this.changeDate();
        this.time.onchange = () => this.changeTime();

        this.arrows[0].onclick = () => this.plus_month();
        this.arrows[1].onclick = () => this.minus_month();
        this.arrows[2].onclick = () => this.plus_year();
        this.arrows[3].onclick = () => this.minus_year();

        this.select.onclick = () => this.openSelect();
        this.option_mas[0].onclick = () => this.Option(0);
        this.option_mas[1].onclick = () => this.Option(1);
        this.option_mas[2].onclick = () => this.Option(2);

        this.booking_button.onclick = () => this.Cross();

        this.cvc.oninput = () => this.Cvc();
        this.cardNumber.oninput = () => this.Number();

        this.button_book.onclick = () => this.booking_buttonClick();

        this.email.oninput = () => this.onInputEmail();
        this.tel.oninput = () => this.onInputTel();
    }
    onInputTel(){
        if(this.isPhoneValid(this.tel.value)){
            document.querySelector('.booking__div-phone').style.borderColor = 'rgba(3, 3, 3, 1)';
        }
        else{
            document.querySelector('.booking__div-phone').style.borderColor = 'red';
        }
    }
    onInputEmail(){
        if(this.isEmailValid(this.email.value)){
            document.querySelector('.booking__div-email').style.borderColor = 'rgba(3, 3, 3, 1)';
        }
        else{
            document.querySelector('.booking__div-email').style.borderColor = 'red';
        }
    }
    isPhoneValid(value){
        const belarusPhonePattern = /^\+375[- ]?\(?((29)|(33))\)?[- ]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2}$/;
        return belarusPhonePattern.test(value);

    }
    isEmailValid(value) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(value);
    }
    booking_buttonClick(){
        console.log(this.date);
        console.log(this.time);
        console.log("Date: " + this.textDate.textContent);
        console.log("Time: " + this.textTime.textContent);
        console.log("Name: " + document.querySelector('.booking__input-name').value);
        console.log("E-mail: " + document.querySelector('.booking__input-email').value);
        console.log("Phone: " + document.querySelector('.booking__input-phone').value);
        console.log("Ticket Type: " + this.tickets_type.textContent);
    }
    Number(){
        this.cardNumber.value = this.cardNumber.value.slice(0, 16);
        if(this.cardNumber.value.length<16){
            this.cardNumber.style.borderColor = 'red';
        }
        else{
            this.cardNumber.style.borderColor = 'rgba(3, 3, 3, 1)';
        }
    }
    Cvc(){
        this.cvc.value = Math.abs(this.cvc.value);
        this.cvc.value = this.cvc.value.slice(0, 4);
    }
    Option(id){
        for(let i=0; i<3; i++){
            if(id===i) {
                this.tickets_type_right.textContent = this.mas_type[i];
                this.tickets_type.textContent = this.mas_type[i];
            }
        }
    }

    Cross(){
        count = count_save;
        count2 = count2_save;
    }
    openSelect(){
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        if(this.flag_select){
            this.div_select.style.display = 'block';  
            this.flag_select = false;
            if(mediaQuery.matches){
                this.booking_div_right.style.marginTop = '186px';
            }
        }
        else{
            this.div_select.style.display = 'none';  
            this.flag_select = true;
            if(mediaQuery.matches){
                this.booking_div_right.style.marginTop = '51px';
            }
        }
    }

    plus_month(){
        this.month_count++;
        if (this.month_count <= 9) this.card_month.textContent = '0' + (this.month_count).toString();
        else if(this.month_count <= 12) this.card_month.textContent = (this.month_count).toString();
        else {
            this.month_count = 1;
            this.card_month.textContent = '0' + (this.month_count).toString();
        }
    }
    minus_month(){
        this.month_count--;
        if (this.month_count > 9) this.card_month.textContent = (this.month_count).toString();
        else if(this.month_count > 0) this.card_month.textContent = '0' + (this.month_count).toString();
        else {
            this.month_count = 12;
            this.card_month.textContent = (this.month_count).toString();
        }
    }
    plus_year(){
        this.year_count++;
        this.card_year.textContent = (this.year_count).toString();
    }
    minus_year(){
        this.year_count--;
        this.card_year.textContent = (this.year_count).toString();
    }
    changeDate(){
        let date2 = new Date(this.date.value);
        this.textDate.textContent = this.date.value;
        this.textDate_right.textContent =
            this.day[date2.getDay()].toString() +
            ', ' +
            this.month[date2.getMonth()].toString() +
            ' ' +
        date2.getDate().toString();
    }
    changeTime(){
        this.textTime.textContent = this.time.value;
        this.textTime_right.textContent = this.time.value;
    }

    minusCount_1(){
        count--;
        if (count < 0) {
            this.total_count.textContent = 0;
            this.booking_grey_count.textContent = 0;
        }
        else {
            this.total_count.textContent = count;
            this.booking_grey_count.textContent = count
        }
        this.Cost();
    }
    minusCount_2(){
        count2--;
        if (count2 < 0) {
            this.total_count2.textContent = 0;
            this.booking_grey_count2.textContent = 0;
        }
        else {
            this.total_count2.textContent = count2;
            this.booking_grey_count2.textContent = count2;
        }
        this.Cost();
    }
    plusCount_1(){
        if (count < 0) count = 0;
        count++;
        this.total_count.textContent = count;
        this.booking_grey_count.textContent = count;
        this.Cost();
    }
    plusCount_2(){
        if (count2 < 0) count2 = 0;
        count2++;
        this.total_count2.textContent = count2;
        this.booking_grey_count2.textContent = count2;
        this.Cost();
    }
    
    Cost() {
        if(count >= 0) this.price1 = 20 * count;
        this.booking_cost_basic.textContent = (this.price1).toString() + ' €';
        if(count2 >= 0) this.price2 = 10 * count2;
        this.booking_cost_senior.textContent = (this.price2).toString() + ' €';
        this.booking_all_cost.textContent = 'Total €' + (this.price1 + this.price2).toString();
    }
}

class Video{
    constructor(){
        this.video = document.querySelectorAll('.video__frame');
        this.overlay = document.querySelectorAll('.video__overlay');
        this.span = document.querySelectorAll('.video__span');
        this.video_arrows = document.querySelectorAll('.video__arrow');
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
        this.video_arrows[0].onclick = () => this.arrowPrev();
        this.video_arrows[1].onclick = () => this.arrowNext();
        this.overlay[0].onclick = () => this.videoClick(0);
        this.overlay[1].onclick = () => this.videoClick(1);
        this.overlay[2].onclick = () => this.videoClick(2);
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

class Explore{
    constructor() {
        this.dragMe = document.querySelector('.explore__slider');
        this.beforeAfter = document.querySelector('.explore__img-relative');

        this.canvas = document.querySelector('.explore__yellow-div');
        this.canvas_div = document.querySelector('.explore__div-yellow');
        this.img = document.querySelector('.explore__img-after')
        
        this.isDragging = false;
        this.init();
    }

    init() {
        this.applyYellowVeil();
        this.dragMe.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.dragMe.ondragstart = function() {
            return false;
        };
    }

    onMouseDown(e) {
        this.isDragging = true;
        //this.onMouseMove(e);
    }

    onMouseUp(e) {
        this.isDragging = false;
    }

    onMouseMove(e) {
        if (!this.isDragging) return;

        const rect = this.beforeAfter.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;

        // Ограничиваем перемещение ползунка
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        this.canvas_div.style = 'width:'+offsetX + 'px';
        this.dragMe.style = 'left:'+(offsetX-(this.dragMe.width/2)) + 'px';
    }

    applyYellowVeil() {
        const context = this.canvas.getContext('2d');
    
        // Сохраняем текущее состояние контекста
        context.save();
        
        // Получаем исходные размеры изображения
        const imgWidth = this.img.width;
        const imgHeight = this.img.height;
        
        // Изменяем размеры канваса, чтобы вмещать изображение
        this.canvas.width = imgWidth;
        this.canvas.height = imgHeight;

        // Отрисовываем изображение в полном размере на канвасе
        context.drawImage(this.img, 0, 0, imgWidth, imgHeight);
        
        const imageData = context.getImageData(0, 0, imgWidth, imgHeight);
        const imageDataFiltered = this.yellowVeil(imageData);
        
        context.putImageData(imageDataFiltered, 0, 0);
        
        // Восстанавливаем первоначальное состояние канваса
    }

    yellowVeil(imageData) {
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
            // Пример более сложной обработки, чтобы улучшить качество
            const red = Math.min(pixels[i] + 35, 255);
            const green = Math.min(pixels[i + 1] + 25, 255);
            const blue = pixels[i + 2]; // Увеличение синего светит ниже
            pixels[i] = red;
            pixels[i + 1] = green;
            pixels[i + 2] = blue; 
        }
        return imageData;
    }
}
// const fs = require('fs');
// const path = require('path');
class Registration{
    constructor(){
        this.name = document.querySelector('.registration__input-name');
        this.email = document.querySelector('.registration__input-email');
        this.tel = document.querySelector('.registration__input-phone');
        this.login = document.querySelector('.registration__div-button-log-in');
        this.setup = document.querySelector('.registration__div-button-sing-up');
        this.footer_username = document.querySelector('.footer__a-down-username');
        this.password = document.querySelector('.registration__input-password');
        this.users = [];
        this.unit();
    }
    unit(){
        this.login.onclick = () => this.loginClick();
        this.setup.onclick = () => this.setupClick();
        this.email.oninput = () => this.onInputEmail();
        this.tel.oninput = () => this.onInputTel();
        this.name.oninput = () => this.onInputName();
        this.password.oninput = () => this.onInputPassword();
    }
    saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Функция для проверки пользователя в localStorage
    checkUser(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.email === email && user.password === password);
    }
    checkUser2(username, email, phone) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.email === email || user.username === username || user.phone === phone);
    }
    loginClick(){

        if(this.name.value.length > 0){
            if(this.email.value.length > 0){
                if(this.tel.value.length > 0){
                    if(this.password.value.length>4){
                        const password = document.querySelector('.registration__input-password').value;
                        const email = document.querySelector('.registration__input-email').value;
                        const phone = document.querySelector('.registration__input-phone').value;

                        const user = this.checkUser(email, password);
                        
                        if (user) {
                            alert("Welcome, " + user.username + "!");
                            this.footer_username.textContent = this.name.value;
                        } else {
                            alert('Incorrect email or password.');
                        }
                    }
                    else{
                        document.querySelector('.registration__div-password').style.borderColor = 'red';
                    }
                }
                else{
                    document.querySelector('.registration__div-phone').style.borderColor = 'red';
                }
            }
            else{
                document.querySelector('.registration__div-email').style.borderColor = 'red';
            }
        }
        else{
            document.querySelector('.registration__div-name').style.borderColor = 'red';
        }
    }
    setupClick(){
        if(this.name.value.length > 0){
            if(this.email.value.length > 0){
                if(this.tel.value.length > 0){
                    if(this.password.value.length>4){
                        const username = document.querySelector('.registration__input-name').value;
                        const email = document.querySelector('.registration__input-email').value;
                        const phone = document.querySelector('.registration__input-phone').value;
                        const password = document.querySelector('.registration__input-password').value;

                        const user = { username, email, phone, password };
                        const user2 = this.checkUser2(username, email, phone);
                        
                        if (user2) {
                            alert('The user with such username, email or phone is already registered.');
                        } else {
                            // Сохраняем пользователя в localStorage
                            this.saveUser(user);
                            alert('Registration was successful!');
                            this.footer_username.textContent = this.name.value;
                        }
                    }
                    else{
                        document.querySelector('.registration__div-password').style.borderColor = 'red';
                    }
                }
                else{
                    document.querySelector('.registration__div-phone').style.borderColor = 'red';
                }
            }
            else{
                document.querySelector('.registration__div-email').style.borderColor = 'red';
            }
        }
        else{
            document.querySelector('.registration__div-name').style.borderColor = 'red';
        }
    }
    onInputPassword(){
        if(this.password.value.length > 4){
            document.querySelector('.registration__div-password').style.borderColor = 'rgba(3, 3, 3, 1)';
        }
        else{
            document.querySelector('.registration__div-password').style.borderColor = 'red';
        }
    }
    onInputName(){
        if(this.name.value.length > 0){
            document.querySelector('.registration__div-name').style.borderColor = 'rgba(3, 3, 3, 1)';
        }
        else{
            document.querySelector('.registration__div-name').style.borderColor = 'red';
        }
    }
    onInputTel(){
        if(this.isPhoneValid(this.tel.value)){
            document.querySelector('.registration__div-phone').style.borderColor = 'rgba(3, 3, 3, 1)';
        }
        else{
            document.querySelector('.registration__div-phone').style.borderColor = 'red';
        }
    }
    onInputEmail(){
        if(this.isEmailValid(this.email.value)){
            document.querySelector('.registration__div-email').style.borderColor = 'rgba(3, 3, 3, 1)';
        }
        else{
            document.querySelector('.registration__div-email').style.borderColor = 'red';
        }
    }
    isPhoneValid(value){
        const belarusPhonePattern = /^\+375[- ]?\(?((29)|(33))\)?[- ]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2}$/;
        return belarusPhonePattern.test(value);

    }
    isEmailValid(value) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(value);
    }
}
export default {Welcome, Header, Tickets, Booking, Video, Explore, Registration};