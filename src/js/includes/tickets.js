import { push, ref, set } from "firebase/database";
import { db } from "../../lib/firebase";
import Input from './input.js';
let count = 0;
let count2 = 0;
let count_save = 0;
let count2_save = 0;
let mas_type = [
    'Permanent exhibition',
    'Temporary exhibition',
    'Combined Admission'
];
class Tickets{
    constructor(){
        this.select_checked = 'Permanent exhibition';

        this.total_count = document.querySelector('.tickets__count-1');
        this.total_count2 = document.querySelector('.tickets__count-2');
        this.radio1 = document.querySelector('.tickets__radio-1');
        this.radio2 = document.querySelector('.tickets__radio-2');
        this.radio3 = document.querySelector('.tickets__radio-3');
        this.init();
    }
    init(){
        if(document.querySelector('.tickets__minus-1') !== null) {
            document.querySelector('.tickets__minus-1').onclick = () => this.updateCount('count1', '-');
        }
        if(document.querySelector('.tickets__minus-2') !== null) {
            document.querySelector('.tickets__minus-2').onclick = () => this.updateCount('count2', '-');
        }
        if(document.querySelector('.tickets__plus-1') !== null) {
            document.querySelector('.tickets__plus-1').onclick = () => this.updateCount('count1', '+');
        }
        if(document.querySelector('.tickets__plus-2') !== null) {
            document.querySelector('.tickets__plus-2').onclick = () => this.updateCount('count2', '+');
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

        if(document.querySelector('.tickets__button') !== null) {
            document.querySelector('.tickets__button').onclick = () => this.buttonClick();
        }
        if(document.querySelector('.tickets__button-buy') !== null) {
            document.querySelector('.tickets__button-buy').onclick = () => this.buttonClick();
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
        document.querySelector('.booking__div-title-type').textContent = this.select_checked;
        document.querySelector('.booking__text-type').textContent = this.select_checked;
        document.querySelector('.booking__select').value = this.select_checked;
        document.querySelector('.booking__count-1').textContent = this.total_count.value;
        document.querySelector('.booking__count-grey-1').textContent = this.total_count.value;
        document.querySelector('.booking__count-2').textContent = this.total_count2.value;
        document.querySelector('.booking__count-grey-2').textContent = this.total_count2.value;
        this.Cost();
    }

    radio_change(radio_chacked){
        if(radio_chacked === 0) {
            this.radio1.className = 'tickets__radio-1';
            this.select_checked = mas_type[0];
            this.radio2.className = 'tickets__radio';
            this.radio3.className = 'tickets__radio'
        }
        if(radio_chacked === 1) {
            this.radio2.className = 'tickets__radio-1';
            this.select_checked = mas_type[1];
            this.radio1.className = 'tickets__radio';
            this.radio3.className = 'tickets__radio'
        }
        if(radio_chacked === 2) {
            this.radio3.className = 'tickets__radio-1';
            this.select_checked = mas_type[2];
            this.radio2.className = 'tickets__radio';
            this.radio1.className = 'tickets__radio'
        }
    }

     updateCount(context, event){
        let countVariable, totalCountElem;
        if (context === 'count1'){
            countVariable = count;
            totalCountElem = this.total_count;
        } 
        else{
            countVariable = count2;
            totalCountElem = this.total_count2;
        } 
        if(event === '-'){
            countVariable--;
            if (countVariable < 0) {
                totalCountElem.value = 0;
            }
            else {
                totalCountElem.value = countVariable;
            }
        }
        else{
            if (countVariable < 0) countVariable = 0;
            countVariable++;
            if(countVariable > 999) countVariable = 999;
            totalCountElem.value = countVariable;
        }
        if (context === 'count1'){
            count = countVariable;
        }
        else{
            count2 = countVariable;
        }
        this.Cost();
    }
    
    Cost() {
        let price1 = 0;
        let price2 = 0;
        if(count >= 0) price1 = 20 * count;
        document.querySelector('.booking__cost-basic').textContent = (price1).toString() + ' €';
        if(count2 >= 0) price2 = 10 * count2;
        document.querySelector('.booking__cost-senior').textContent = (price2).toString() + ' €';
        document.querySelector('.tickets__cost').textContent = 'Total €' + (price1 + price2).toString();
        document.querySelector('.booking__all-cost').textContent = document.querySelector('.tickets__cost').textContent;
    }
}

///***///

class Booking{
    constructor(){
        this.month_count = 1;
        this.year_count = 2024;
        this.flag_select = true;
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

        this.newOrder = {
            date: document.querySelector('.booking__div-title-date') || '',
            time: document.querySelector('.booking__div-title-time') || '',
            name: document.querySelector('.booking__input-name') || '',
            email: document.querySelector('.booking__input-email') || '',
            phone: document.querySelector('.booking__input-phone') || '',
            type: document.querySelector('.booking__div-title-type') || '',
            basicCount: document.querySelector('.booking__count-1') || '',
            seniorCount: document.querySelector('.booking__count-2') || '',
            basicPrice: document.querySelector('.booking__cost-basic') || '',
            seniorPrice: document.querySelector('.booking__cost-senior') ||'',
            allPrice: document.querySelector('.booking__all-cost') || '',
            card: {
                number: document.querySelector('.booking__card-input-1') || '',
                month: document.querySelector('.booking__card-month') || '',
                year: document.querySelector('.booking__card-year') || '',
                name: document.querySelector('.booking__card-input-3') || '',
                code: document.querySelector('.booking__card-input-4') || '',
            }
        }

        this.option_mas1 = document.querySelector('.booking__option-1');
        this.option_mas2 = document.querySelector('.booking__option-2');
        this.option_mas3 = document.querySelector('.booking__option-3');
        this.button_book = document.querySelector('.booking__a-button');
        this.message_email = document.querySelector('.booking__message-email');
        this.form = document.querySelector('.booking__form');

        this.init();
    }
    init(){
        if(this.form !== null) {
            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                
            })
        }
        if(document.querySelector('.booking__card-input-3') !== null) {
            this.newOrder.card.name.oninput = () => this.onInputCardholder();
        }
        if(document.querySelector('.booking__minus-1') !== null) {
            document.querySelector('.booking__minus-1').onclick = () => this.updateCount('count1', '-');
        }
        if(document.querySelector('.booking__minus-2') !== null) {
            document.querySelector('.booking__minus-2').onclick = () => this.updateCount('count2', '-');
        }
        if(document.querySelector('.booking__plus-1') !== null) {
            document.querySelector('.booking__plus-1').onclick = () => this.updateCount('count1', '+');
        }
        if(document.querySelector('.booking__plus-2') !== null) {
            document.querySelector('.booking__plus-2').onclick = () => this.updateCount('count2', '+');
        }

        if(document.querySelector('.booking__input-date') !== null) {
            document.querySelector('.booking__input-date').onchange = () => this.changeDate();
        }
        if(document.querySelector('.booking__input-time') !== null) {
            document.querySelector('.booking__input-time').onchange = () => this.changeTime();
        }

        if(document.querySelector('.booking__arrow-1') !== null) {
            document.querySelector('.booking__arrow-1').onclick = () => this.plus_month();
        }
        if(document.querySelector('.booking__arrow-2') !== null) {
            document.querySelector('.booking__arrow-2').onclick = () => this.minus_month();
        }
        if(document.querySelector('.booking__arrow-3') !== null) {
            document.querySelector('.booking__arrow-3').onclick = () => this.changeYear('+');
        }
        if(document.querySelector('.booking__arrow-4') !== null) {
            document.querySelector('.booking__arrow-4').onclick = () => this.changeYear('-');
        }

        if(document.querySelector('.booking__select') !== null) {
            document.querySelector('.booking__select').onclick = () => this.openSelect();
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

        if(document.querySelector('.booking__button') !== null) {
            document.querySelector('.booking__button').onclick = () => this.Cross();
        }

        if(document.querySelector('.booking__card-input-4') !== null) {
            this.newOrder.card.code.oninput = () => this.Cvc();
        }
        if(document.querySelector('.booking__card-input-3') !== null) {
            this.newOrder.card.number.oninput = () => this.Number();
        }

        if(this.button_book !== null) {
            this.button_book.onclick = () => this.booking_buttonClick();
        }

        if(document.querySelector('.booking__input-name') !== null) {
            this.newOrder.name.oninput = () => this.onInputName();
        }
        if(document.querySelector('.booking__input-email') !== null) {
            this.newOrder.email.oninput = () => this.onInputEmail();
        }
        if(document.querySelector('.booking__input-phone') !== null) {
            this.newOrder.phone.oninput = () => this.onInputTel();
        }
    }
    createClick(){
        let flag = false;
        if(document.querySelector('.booking__div-name').style.borderColor !== 'red' && document.querySelector('.booking__div-phone').style.borderColor !== 'red' && document.querySelector('.booking__div-email').style.borderColor !== 'red' && this.newOrder.name.value !== "" && this.newOrder.email.value !== "" && this.newOrder.phone.value !== "" && this.newOrder.date.textContent !== 'Date' && this.newOrder.time.textContent !== 'Time' && this.newOrder.card.number.style.borderColor !== 'red' && this.newOrder.card.number.value !== "" && this.newOrder.card.name.value !== "" && this.newOrder.card.code.value !== "" && this.newOrder.card.code.style.borderColor !== 'red'){
            if(!(this.newOrder.basicCount.textContent === '0' && this.newOrder.seniorCount.textContent === '0'))
            {
                flag = true;
            }
        }
        Input.buttonStyle(this.button_book, flag);
    }
    onInputEmail(){
        Input.onInputEmail(this.newOrder.email, 'tickets');
        this.createClick();
    }
    onInputCardholder(){
        if(this.newOrder.card.name.value.length > 0 && this.newOrder.card.name.value !== " "){
            this.newOrder.card.name.style.borderColor = 'rgb(147, 147, 147)';
        }
        else{
            this.newOrder.card.name.style.borderColor = 'red';

        }
        this.createClick();
    }
    onInputTel(){
        Input.onInputTel(this.newOrder.phone, 'tickets');
        this.createClick();
    }
    onInputName(){
        Input.onInputName(this.newOrder.name, 'tickets');
        this.createClick();
    }
    async booking_buttonClick(){
        if(this.button_book.style.backgroundColor === 'rgb(113, 7, 7)'){
            const ordersRef = await ref(db, 'orders');
            const newOrderRef = await push(ordersRef); 
            await set(newOrderRef, {
                name: this.newOrder.name.value,
                email: this.newOrder.email.value,
                phone: this.newOrder.phone.value,
                date: this.newOrder.date.textContent,
                time: this.newOrder.time.textContent,
                ticket_type: this.newOrder.type.textContent,
                entry_basic_ticket: this.newOrder.basicCount.textContent,
                entry_senior_ticket: this.newOrder.seniorCount.textContent,
                total: this.newOrder.allPrice.textContent.slice(7, this.newOrder.allPrice.textContent.length),
                card_number: this.newOrder.card.number.value,
                card_month: this.newOrder.card.month.textContent,
                card_year: this.newOrder.card.year.textContent,
                cardholder_name: this.newOrder.card.name.value,
                cvc: this.newOrder.card.code.value,

            })
            this.form.submit();
            alert("You have successfully booked your tickets.");
            location.href = "index.html";
        }
    }
    Number(){
        this.newOrder.card.number.value = this.newOrder.card.number.value.slice(0, 16);
        if(this.newOrder.card.number.value.length<16){
            this.newOrder.card.number.style.borderColor = 'red';
        }
        else{
            this.newOrder.card.number.style.borderColor = 'rgb(147, 147, 147)';
        }
        this.createClick();
    }
    Cvc(){
        this.newOrder.card.code.value = this.newOrder.card.code.value.slice(0, 4);
        if(this.newOrder.card.code.value.length<3){
            this.newOrder.card.code.style.borderColor = 'red';
        }
        else{
            this.newOrder.card.code.style.borderColor = 'rgb(147, 147, 147)';
        }
        this.createClick();
    }
    Option(id){
        for(let i=0; i<3; i++){
            if(id===i) {
                document.querySelector('.booking__text-type').textContent = mas_type[i];
                this.newOrder.type.textContent = mas_type[i];
                this.optionNone();
            }
        }
    }
    optionNone(){
        this.option_mas1.style.display = 'none';
        this.option_mas2.style.display = 'none';
        this.option_mas3.style.display = 'none';
        this.flag_select = true;
    }
    Cross(){
        count = count_save;
        count2 = count2_save;
    }
    openSelect(){
        if(this.flag_select){
            this.option_mas1.style.display = 'flex'; 
            this.option_mas2.style.display = 'flex';   
            this.option_mas3.style.display = 'flex'; 
            this.flag_select = false;
        }
        else{
            this.optionNone();
        }
    }

    plus_month(){
        this.month_count++;
        if (this.month_count <= 9) this.newOrder.card.month.textContent = '0' + (this.month_count).toString();
        else if(this.month_count <= 12) this.newOrder.card.month.textContent = (this.month_count).toString();
        else {
            this.month_count = 1;
            this.newOrder.card.month.textContent = '0' + (this.month_count).toString();
        }
    }
    minus_month(){
        this.month_count--;
        if (this.month_count > 9) this.newOrder.card.month.textContent = (this.month_count).toString();
        else if(this.month_count > 0) this.newOrder.card.month.textContent = '0' + (this.month_count).toString();
        else {
            this.month_count = 12;
            this.newOrder.card.month.textContent = (this.month_count).toString();
        }
    }
    changeYear(mark){
        if(mark === '+') this.year_count++;
        else this.year_count--;
        this.newOrder.card.year.textContent = (this.year_count).toString();
    }

    changeDate(){
        document.querySelector('.booking__div-date').style.borderColor = 'rgba(3, 3, 3, 1)';
        document.querySelector('.booking__message-time').textContent = "";
        let date2 = new Date(document.querySelector('.booking__input-date').value);
        this.newOrder.date.textContent = document.querySelector('.booking__input-date').value;
        document.querySelector('.booking__text-date').textContent =
            this.day[date2.getDay()].toString() +
            ', ' +
            this.month[date2.getMonth()].toString() +
            ' ' +
        date2.getDate().toString();
        this.createClick();
    }
    changeTime(){
        document.querySelector('.booking__message-time').textContent = "";
        document.querySelector('.booking__div-time').style.borderColor = 'rgba(3, 3, 3, 1)';
        this.newOrder.time.textContent = document.querySelector('.booking__input-time').value;
        document.querySelector('.booking__text-time').textContent = document.querySelector('.booking__input-time').value;
        this.createClick();
    }

    updateCount(context, event){
        let countVariable, totalCountElem, bookingGreyCountElem;
        if (context === 'count1'){
            countVariable = count;
            totalCountElem = this.newOrder.basicCount;
            bookingGreyCountElem = document.querySelector('.booking__count-grey-1');
        } 
        else{
            countVariable = count2;
            totalCountElem = this.newOrder.seniorCount;
            bookingGreyCountElem = document.querySelector('.booking__count-grey-2');
        } 
        if(event === '-'){
            countVariable--;
            if (countVariable < 0) {
                totalCountElem.textContent = 0;
                bookingGreyCountElem.textContent = 0;
            }
            else {
                totalCountElem.textContent = countVariable;
                bookingGreyCountElem.textContent = countVariable;
            }
        }
        else{
            if (countVariable < 0) countVariable = 0;
            countVariable++;
            if(countVariable > 999) countVariable = 999;
            totalCountElem.textContent = countVariable;
            bookingGreyCountElem.textContent = countVariable;
        }
        if (context === 'count1'){
            count = countVariable;
        }
        else{
            count2 = countVariable;
        }
        this.Cost();
        this.createClick();
    }
    
    Cost() {
        let price1 = 0;
        let price2 = 0;
        if(count >= 0) price1 = 20 * count;
        this.newOrder.basicPrice.textContent = (price1).toString() + ' €';
        if(count2 >= 0) price2 = 10 * count2;
        this.newOrder.seniorPrice.textContent = (price2).toString() + ' €';
        this.newOrder.allPrice.textContent = 'Total €' + (price1 + price2).toString();
    }
}

export default {Tickets, Booking};