import { push, ref, set, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
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
    
    async checkExistingUserData(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            //для поиска username
            const usersRef = ref(db, 'users/');
            const snapshot = await get(usersRef);
            if (!snapshot.exists()) {
                return {};
            }
            const existingUsers = snapshot.val();
            let foundUser = null;
            for (const key in existingUsers) {
                const user = existingUsers[key];
                if (user.email === email) {
                    if (user.password === password) {
                        foundUser = user;
                        break;
                    }
                }
            }
        
            return {
                emailExists: true,
                passwordExists: true,
                username: foundUser.username || 'Пользователь',
            };
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                return { emailExists: false, passwordExists: false };
            } 
            else if (error.code === 'auth/wrong-password') {
                return { emailExists: true, passwordExists: false };
            } 
            else {
                console.error("Authentication Error:", error);
                return { emailExists: false, passwordExists: false };
            }
        }

    }

    async loginClick(){
        const password = document.querySelector('.autorisation__input-password').value;
        const email = document.querySelector('.autorisation__input-email').value;

        const existingData = await this.checkExistingUserData(email, password);
        
        if (existingData.emailExists && existingData.passwordExists) {
            alert("Welcome " + existingData.username + "!")
            //sessionStorage.setItem('footer_username', existingData.username);
            //document.querySelector('.autorisation__a-button-log-in').href = "index.html";
        } else {
            const messageElement = document.querySelector('.autorisation__message-main');
            if (!existingData.emailExists || !existingData.passwordExists) {
                messageElement.textContent = "This user is not registered. Invalid email or password.";
            }
        }
    
            // const password = document.querySelector('.autorisation__input-password').value;
            // const email = document.querySelector('.autorisation__input-email').value;

            // //const user = this.checkUser(email, password); 
            // //const res_username = this.findUsername(email, password);
            // const existingData = await this.checkExistingUserData(email, password);
            // if(existingData.emailExists && existingData.passwordExists){      
            //     // if(res_username.exists){
            //     sessionStorage.setItem('footer_username', existingData.username);
            //     // }
            //     document.querySelector('.autorisation__a-button-log-in').href="index.html";
            //     }
            // else{
            //     document.querySelector('.autorisation__message-main').textContent = "Such a user has not been registered yet.";
            // }
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
    // isPhoneValid(value){
    //     const belarusPhonePattern = /^375[- ]?\(?((29)|(33))\)?[- ]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2}$/;
    //     return belarusPhonePattern.test(value);
    // }
    isEmailValid(value) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(value);
    }
}

export default {Autorisation};