import { push, ref, set, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthCookies from './authcookies.js';

class Autorisation{
    constructor(){
        this.email = document.querySelector('.autorisation__input-email');
        this.login = document.querySelector('.autorisation__a-button-log-in');
        this.footer_username = document.querySelector('.footer__a-down-username');
        this.password = document.querySelector('.autorisation__input-password');

        this.message_email = document.querySelector('.autorisation__message-email');
        this.message_password = document.querySelector('.autorisation__message-password');
        this.users = [];

        this.unit();
    }
    unit(){
        if(this.login !== null) {
            this.login.onclick = () => this.loginClick();
        }
        if(this.email !== null) {
            this.email.oninput = () => this.onInputEmail();
        }
        if(this.password !== null) {
            this.password.oninput = () => this.onInputPassword();
        }
    }
    createClick(){
        if(document.querySelector('.autorisation__div-password').style.borderColor !== 'red' && document.querySelector('.autorisation__div-email').style.borderColor !== 'red' && this.email.value !== "" && this.password.value !== "")
        {
            this.login.style.backgroundColor = 'rgb(113, 7, 7)';
            this.login.style.pointerEvents = 'auto';
            this.login.style.cursor = 'pointer';
        }
        else{
            this.login.style.backgroundColor = 'rgb(147, 147, 147)';
            this.login.style.pointerEvents = 'none';
            this.login.style.cursor = 'auto';
        }
    }

    async loginClick(){
        const password = document.querySelector('.autorisation__input-password').value;
        const email = document.querySelector('.autorisation__input-email').value;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            AuthCookies.setCookie('token', userCredential._tokenResponse.idToken);
            AuthCookies.setCookie('refreshToken', userCredential._tokenResponse.refreshToken);
            delete sessionStorage.profile_email;
            sessionStorage.setItem('profile_email', email);
            location.href = "index.html";
        } catch (error) {
            const messageElement = document.querySelector('.autorisation__message-main');
            messageElement.textContent = "This user is not registered. Invalid email or password.";
        }
    }
    
    onInputPassword(){
        document.querySelector('.autorisation__message-main').textContent = "";
        if(this.password.value.length > 0){
            document.querySelector('.autorisation__div-password').style.borderColor = 'rgba(3, 3, 3, 1)';
            this.message_password.textContent = "";
            if(!/[A-ZА-Я]/.test(this.password.value)){
                document.querySelector('.autorisation__div-password').style.borderColor = 'red';
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
                document.querySelector('.autorisation__div-password').style.borderColor = 'red';
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
                document.querySelector('.autorisation__div-password').style.borderColor = 'red';
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
                document.querySelector('.autorisation__div-password').style.borderColor = 'red';
                this.message_password.textContent += "The minimum password length is 8 characters.";
            }

        }
        else{
            document.querySelector('.autorisation__div-password').style.borderColor = 'red';
            this.message_password.textContent = "Password is not filled in.";
        }
        this.createClick();
    }
    
    onInputEmail(){
        document.querySelector('.autorisation__message-main').textContent = "";
        document.querySelector('.autorisation__div-email').style.borderColor = 'red';
        const invalidChars = /[&=+\-<>'_,]/;
        if(this.email.value.length > 0){
            document.querySelector('.autorisation__div-email').style.borderColor = 'rgba(3, 3, 3, 1)';
            this.message_email.textContent = "";
            if(!this.isEmailValid(this.email.value)){
                this.message_email.textContent += "The e-mail does not match the specified format.";
                document.querySelector('.autorisation__div-email').style.borderColor = 'red';
            }
            if (invalidChars.test(this.email.value)){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must not contain the characters &=+-,<>'_.";
                }
                else{
                    this.message_email.textContent += "The e-mail must not contain the characters &=+-<>'_,.";
                }
                document.querySelector('.autorisation__div-email').style.borderColor = 'red';
            }
            if (!this.email.value.includes('@')){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must contain the character @.";
                }
                else{
                    this.message_email.textContent += "The e-mail must contain the character @.";
                }
                document.querySelector('.autorisation__div-email').style.borderColor = 'red';
            }
            if (this.email.value.includes('..')){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must not contain multiple dots in a row.";
                }
                else{
                    this.message_email.textContent += "The e-mail must not contain multiple dots in a row.";
                }
                document.querySelector('.autorisation__div-email').style.borderColor = 'red';
            }
            if(this.email.value.length > 49){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it length must not exceed 50 characters.";
                }
                else{
                    this.message_email.textContent += "The e-mail length must not exceed 50 characters.";
                }
                document.querySelector('.autorisation__div-email').style.borderColor = 'red';
            }
        }
        else{
            document.querySelector('.autorisation__div-email').style.borderColor = 'red';
            this.message_email.textContent = "E-mail is not filled in.";
        }
        this.createClick();
    }
    isEmailValid(value) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(value);
    }
}

export default {Autorisation};