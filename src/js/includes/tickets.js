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
        this.radio1 = document.querySelector('.tickets__radio-1');
        this.radio2 = document.querySelector('.tickets__radio-2');
        this.radio3 = document.querySelector('.tickets__radio-3');
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
        if(this.minus !== null) {
            this.minus.onclick = () => this.minusCount_1();
        }
        if(this.minus2 !== null) {
            this.minus2.onclick = () => this.minusCount_2();
        }
        if(this.plus !== null) {
            this.plus.onclick = () => this.plusCount_1();
        }
        if(this.plus2 !== null) {
            this.plus2.onclick = () => this.plusCount_2();
        }

        if(this.radio1 !== null) {
            this.radio1.onclick = () => this.radio_change(0);
        }
        if(this.radio2 !== null) {
            this.radio2.onclick = () => this.radio_change(1);
        }
        if(this.radio3 !== null) {
            this.radio3.onclick = () => this.radio_change(2);
        }

        if(this.button !== null) {
            this.button.onclick = () => this.buttonClick();
        }
        if(this.button_buy !== null) {
            this.button_buy.onclick = () => this.buttonClick();
        }

        if(this.total_count !== null) {
            this.total_count.oninput = () => this.positivNumber(0);
        }
        if(this.total_count2 !== null) {
            this.total_count2.oninput = () => this.positivNumber(1);
        }
    }

    positivNumber(id){
        if(id===0) {
            this.total_count.value = this.total_count.value.slice(0, 3);
            this.total_count.value = Math.abs(this.total_count.value);
            count = this.total_count.value;
        }
        else {
            this.total_count2.value = this.total_count2.value.slice(0, 3);
            this.total_count2.value = Math.abs(this.total_count2.value);
            count2 = this.total_count2.value;
        }
        this.Cost();
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
        if(radio_chacked === 0) {
                this.radio1.className = 'tickets__radio-1';
                this.select_checked = this.mas_type[0];
                this.radio2.className = 'tickets__radio';
                this.radio3.className = 'tickets__radio'
        }
        if(radio_chacked === 1) {
            this.radio2.className = 'tickets__radio-1';
            this.select_checked = this.mas_type[1];
            this.radio1.className = 'tickets__radio';
            this.radio3.className = 'tickets__radio'
        }
        if(radio_chacked === 2) {
            this.radio3.className = 'tickets__radio-1';
            this.select_checked = this.mas_type[2];
            this.radio2.className = 'tickets__radio';
            this.radio1.className = 'tickets__radio'
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
        if(count > 999) count = 999;
        this.total_count.value = count;
        this.Cost();
    }
    plusCount_2(){
        if (count2 < 0) count2 = 0;
        count2++;
        if(count2 > 999) count2 = 999;
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
        this.arrows1 = document.querySelector('.booking__arrow-1');
        this.arrows2 = document.querySelector('.booking__arrow-2');
        this.arrows3 = document.querySelector('.booking__arrow-3');
        this.arrows4 = document.querySelector('.booking__arrow-4');
        this.select = document.querySelector('.booking__select');
        this.div_select = document.querySelector('.booking__select-options')
        this.tickets_type_right = document.querySelector('.booking__text-type');
        this.tickets_type = document.querySelector('.booking__div-title-type');

        this.booking_button = document.querySelector('.booking__button');

        this.flag_select = true;
        this.booking_div_right = document.querySelector('.booking__div-right');
        this.option_mas1 = document.querySelector('.booking__option-1');
        this.option_mas2 = document.querySelector('.booking__option-2');
        this.option_mas3 = document.querySelector('.booking__option-3');
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
        if(this.minus !== null) {
            this.minus.onclick = () => this.minusCount_1();
        }
        if(this.minus2 !== null) {
            this.minus2.onclick = () => this.minusCount_2();
        }
        if(this.plus !== null) {
            this.plus.onclick = () => this.plusCount_1();
        }
        if(this.plus2 !== null) {
            this.plus2.onclick = () => this.plusCount_2();
        }

        if(this.date !== null) {
            this.date.onchange = () => this.changeDate();
        }
        if(this.time !== null) {
            this.time.onchange = () => this.changeTime();
        }

        if(this.arrows1 !== null) {
            this.arrows1.onclick = () => this.plus_month();
        }
        if(this.arrows2 !== null) {
            this.arrows2.onclick = () => this.minus_month();
        }
        if(this.arrows3 !== null) {
            this.arrows3.onclick = () => this.plus_year();
        }
        if(this.arrows4 !== null) {
            this.arrows4.onclick = () => this.minus_year();
        }

        if(this.select !== null) {
            this.select.onclick = () => this.openSelect();
        }
        if(this.option_mas1 !== null) {
            this.option_mas1.onclick = () => this.Option(0);
        }
        if(this.option_mas2 !== null) {
            this.option_mas2.onclick = () => this.Option(1);
        }
        if(this.option_mas3 !== null) {
            this.option_mas3.onclick = () => this.Option(2);
        }

        if(this.booking_button !== null) {
            this.booking_button.onclick = () => this.Cross();
        }

        if(this.cvc !== null) {
            this.cvc.oninput = () => this.Cvc();
        }
        if(this.cardNumber !== null) {
            this.cardNumber.oninput = () => this.Number();
        }

        if(this.button_book !== null) {
            this.button_book.onclick = () => this.booking_buttonClick();
        }

        if(this.email !== null) {
            this.email.oninput = () => this.onInputEmail();
        }
        if(this.tel !== null) {
            this.tel.oninput = () => this.onInputTel();
        }
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
        if(count > 999) count = 999;
        this.total_count.textContent = count;
        this.booking_grey_count.textContent = count;
        this.Cost();
    }
    plusCount_2(){
        if (count2 < 0) count2 = 0;
        count2++;
        if(count2 > 999) count2 = 999;
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

export default {Tickets, Booking};