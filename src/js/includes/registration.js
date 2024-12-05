import { push, ref, set, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { auth } from '../../lib/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class Registration{
    constructor(){
        this.name = document.querySelector('.registration__input-name');
        this.email = document.querySelector('.registration__input-email');
        this.tel = document.querySelector('.registration__input-phone');
        this.setup = document.querySelector('.registration__a-button-set-up');
        this.footer_username = document.querySelector('.footer__a-down-username');
        this.password = document.querySelector('.registration__input-password');

        this.message_name = document.querySelector('.registration__message-name');
        this.message_email = document.querySelector('.registration__message-email');
        this.message_phone = document.querySelector('.registration__message-phone');
        this.message_password = document.querySelector('.registration__message-password');
        this.users = [];

        this.unit();
    }
    unit(){
        if(this.setup !== null) {
            this.setup.onclick = () => this.setupClick();
        }
        if(this.email !== null) {
            this.email.oninput = () => this.onInputEmail();
        }
        if(this.tel !== null) {
            this.tel.oninput = () => this.onInputTel();
            this.tel.onkeyup = () => this.onInputTelKeyup();
        }
        if(this.name !== null) {
            this.name.oninput = () => this.onInputName();
        }
        if(this.password !== null) {
            this.password.oninput = () => this.onInputPassword();
        }
    }
    createClick(){
        if(document.querySelector('.registration__div-password').style.borderColor !== 'red' && document.querySelector('.registration__div-name').style.borderColor !== 'red' && document.querySelector('.registration__div-phone').style.borderColor !== 'red' && document.querySelector('.registration__div-email').style.borderColor !== 'red' && this.name.value !== "" && this.email.value !== "" && this.tel.value !== "" && this.password.value !== "")
        {
            this.setup.style.backgroundColor = 'rgb(113, 7, 7)';
            this.setup.style.pointerEvents = 'auto';
            this.setup.style.cursor = 'pointer';
        }
        else{
            this.setup.style.backgroundColor = 'rgb(147, 147, 147)';
            this.setup.style.pointerEvents = 'none';
            this.setup.style.cursor = 'auto';
        }
    }
    onInputTelKeyup(){
        this.tel.value = this.tel.value.replace(/[^\d]/g, "");
    }
    saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Функция для проверки пользователя в localStorage
    ////***/
    // checkUsername(username) {
    //     const users = JSON.parse(localStorage.getItem('users')) || [];
    //     return users.find(user => user.username === username);
    // }
    // checkEmail(email) {
    //     const users = JSON.parse(localStorage.getItem('users')) || [];
    //     return users.find(user => user.email === email);
    // }
    // checkPhone(phone) {
    //     const users = JSON.parse(localStorage.getItem('users')) || [];
    //     return users.find(user => user.phone === phone);
    // }
    // checkPassword(password) {
    //     const users = JSON.parse(localStorage.getItem('users')) || [];
    //     return users.find(user => user.password === password);
    // }

    async checkExistingUserData(username, email, phone) {
        const usersRef = ref(db, 'users/');
        const snapshot = await get(usersRef);
    
        if (!snapshot.exists()) {
             return {}; // Не существует пользователей
        }
    
        const existingUsers = snapshot.val();
        const existingData = {
            usernameExists: false,
            emailExists: false,
            phoneExists: false
        };
    
        // Перебор объектов пользователей
        for (const key in existingUsers) {
            if (existingUsers[key].username === username) {
                existingData.usernameExists = true;
            }
            if (existingUsers[key].email === email) {
                existingData.emailExists = true;
            }
            if (existingUsers[key].phone === phone) {
                existingData.phoneExists = true;
            }
        }
    
        return existingData;
    }
    async setupClick(){
            const username = document.querySelector('.registration__input-name').value;
            const email = document.querySelector('.registration__input-email').value;
            const phone = document.querySelector('.registration__input-phone').value;
            const password = document.querySelector('.registration__input-password').value;
            const user = { username, email, phone, password };
            let flag = true;
            const existingData = await this.checkExistingUserData(username, email, phone);
            if(existingData.usernameExists){
                this.message_name.textContent = 'A user with that username has already been registered.';
                flag = false;
            }
            if(existingData.emailExists){
                this.message_email.textContent = 'A user with that e-mail has already been registered.';
                flag = false;
            }
            if(existingData.phoneExists){
                this.message_phone.textContent = 'A user with that phone has already been registered.';
                flag = false;
            }
            if(flag){
                // const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                // const uid = userCredential.user.uid;
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // ...
                })
                // Запись данных о пользователе в базу данных
                const newUserRef = ref(db, 'users/' + username); 
                set(newUserRef, {
                    username: username,
                    email: email,
                    phone: phone,
                    password: password
                })
                //sessionStorage.setItem('footer_username', this.name.value);
                //document.querySelector('.registration__a-button-set-up').href="index.html";
            }
    }
    onInputPassword(){
        if(this.password.value.length > 0){
            document.querySelector('.registration__div-password').style.borderColor = 'rgba(3, 3, 3, 1)';
            this.message_password.textContent = "";
            if(!/[A-ZА-Я]/.test(this.password.value)){
                document.querySelector('.registration__div-password').style.borderColor = 'red';
                if(this.message_password.textContent !== "")
                {
                    this.message_password.textContent = this.message_password.textContent.slice(0, -1);
                    this.message_password.textContent += ", one capital letter.";
                }
                else{
                    this.message_password.textContent += "The password must contain at least one capital letter.";
                }
            }
            if(!/\d/.test(this.password.value)){
                document.querySelector('.registration__div-password').style.borderColor = 'red';
                if(this.message_password.textContent !== "")
                {
                    this.message_password.textContent = this.message_password.textContent.slice(0, -1);
                    this.message_password.textContent += ", one digit.";
                }
                else{
                    this.message_password.textContent += "The password must contain at least one digit.";
                }
            }
            if(!/[^A-ZА-Яa-zа-я0-9]/.test(this.password.value)){
                document.querySelector('.registration__div-password').style.borderColor = 'red';
                if(this.message_password.textContent !== "")
                {
                    this.message_password.textContent = this.message_password.textContent.slice(0, -1);
                    this.message_password.textContent += ", one special character.";
                }
                else{
                    this.message_password.textContent += "The password must contain at least one special character.";
                }
            }
            if(this.password.value.length < 8){
                document.querySelector('.registration__div-password').style.borderColor = 'red';
                this.message_password.textContent += "The minimum password length is 8 characters.";
            }

        }
        else{
            document.querySelector('.registration__div-password').style.borderColor = 'red';
            this.message_password.textContent = "Password is not filled in.";
        }
        this.createClick();
    }
    onInputName(){
        if(this.name.value.length > 0 && this.name.value !== " "){
            document.querySelector('.registration__div-name').style.borderColor = 'rgba(3, 3, 3, 1)';
            this.message_name.textContent = "";
        }
        else{
            document.querySelector('.registration__div-name').style.borderColor = 'red';
            this.message_name.textContent = "Username is not filled in.";
        }
        this.createClick();
    }
    onInputTel(){
        if(this.tel.value.length > 0){
            if((this.tel.value).toString().slice(0, 3) === '375'){
                if((this.tel.value).toString().slice(3, 5) === '29' || (this.tel.value).toString().slice(3, 5) === '33'){
                    if(this.tel.value.length === 12){
                        document.querySelector('.registration__div-phone').style.borderColor = 'rgba(3, 3, 3, 1)';
                        this.message_phone.textContent = "";
                    }
                    else{
                        this.message_phone.textContent = "The phone number must contain 7 digits.";
                    }
                }
                else{
                    this.message_phone.textContent = "The operator's code must be 29 or 33.";
                }
            }
            else{
                this.message_phone.textContent = "The phone number should start with 375.";
            }
        }
        else{
            document.querySelector('.registration__div-name').style.borderColor = 'red';
            this.message_phone.textContent = "Phone is not filled in.";
        }
        this.createClick();
    }
    onInputEmail(){
        document.querySelector('.registration__div-email').style.borderColor = 'red';
        const invalidChars = /[&=+\-<>'_,]/;
        if(this.email.value.length > 0){
            document.querySelector('.registration__div-email').style.borderColor = 'rgba(3, 3, 3, 1)';
            this.message_email.textContent = "";
            if(!this.isEmailValid(this.email.value)){
                this.message_email.textContent += "The e-mail does not match the specified format.";
                document.querySelector('.registration__div-email').style.borderColor = 'red';
            }
            if (invalidChars.test(this.email.value)){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must not contain the characters &=+-,<>'_.";
                }
                else{
                    this.message_email.textContent += "The e-mail must not contain the characters &=+-<>'_,.";
                }
                document.querySelector('.registration__div-email').style.borderColor = 'red';
            }
            if (!this.email.value.includes('@')){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must contain the character @.";
                }
                else{
                    this.message_email.textContent += "The e-mail must contain the character @.";
                }
                document.querySelector('.registration__div-email').style.borderColor = 'red';
            }
            if (this.email.value.includes('..')){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must not contain multiple dots in a row.";
                }
                else{
                    this.message_email.textContent += "The e-mail must not contain multiple dots in a row.";
                }
                document.querySelector('.registration__div-email').style.borderColor = 'red';
            }
            if(this.email.value.length > 49){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it length must not exceed 50 characters.";
                }
                else{
                    this.message_email.textContent += "The e-mail length must not exceed 50 characters.";
                }
                document.querySelector('.registration__div-email').style.borderColor = 'red';
            }
        }
        else{
            document.querySelector('.registration__div-email').style.borderColor = 'red';
            this.message_email.textContent = "E-mail is not filled in.";
        }
        this.createClick();
    }
    // isPhoneValid(value){
    //     const belarusPhonePattern = /^375[- ]?\(?((29)|(33))\)?[- ]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2}$/;
    //     return belarusPhonePattern.test(value);
    // }
    isEmailValid(value) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(value);
    }
}

export default {Registration};