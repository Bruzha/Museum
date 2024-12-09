import { push, ref, set, get, update, getDatabase, child, query, orderByChild, equalTo} from "firebase/database";
import { db } from "../../lib/firebase";
import { auth } from '../../lib/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import firebase from "firebase/compat/app";
// import AuthCookies from './authcookies.js';
class Forgot{
    constructor(){
        this.email = document.querySelector('.forgot__input-email');
        this.button_config = document.querySelector('.forgot__a-button-config');
        this.button_save = document.querySelector('.forgot__a-button-save');
        this.new_password = document.querySelector('.forgot__input-new-password');
        this.copy_new_password = document.querySelector('.forgot__input-copy-new-password');
        this.message_email = document.querySelector('.forgot__message-email');
        this.message_new_password = document.querySelector('.forgot__message-new-password');
        this.message_copy_new_password = document.querySelector('.forgot__message-copy-new-password');
        this.message_main = document.querySelector('.forgot__message-main');
        this.old_password_value_db = null;
        this.username_value_db = null;
        this.users = [];

        this.unit();
    }
    unit(){
        if(this.email !== null) {
            this.email.oninput = () => this.onInputEmail();
        }
        if(this.new_password !== null) {
            this.new_password.oninput = () => this.onInputPassword('.forgot__div-new-password', '.forgot__message-new-password', this.new_password.value);
        }
        if(this.copy_new_password !== null) {
            this.copy_new_password.oninput = () => this.onInputPassword('.forgot__div-copy-new-password', '.forgot__message-copy-new-password', this.copy_new_password.value);
        }
        if(this.button_config !== null) {
            this.button_config.onclick = () => this.onClickConfig();
        }
        if(this.button_save !== null) {
            this.button_save.onclick = () => this.onClickSave();
        }
    }
    createClick(){
        if(document.querySelector('.forgot__div-email').style.borderColor !== 'red' && this.email.value !== "")
        {
            this.button_config.style.backgroundColor = 'rgb(113, 7, 7)';
            this.button_config.style.pointerEvents = 'auto';
            this.button_config.style.cursor = 'pointer';
        }
        else{
            this.button_config.style.backgroundColor = 'rgb(147, 147, 147)';
            this.button_config.style.pointerEvents = 'none';
            this.button_config.style.cursor = 'auto';
        }
    }
    createClickSave(){
        if(document.querySelector('.forgot__div-new-password').style.borderColor !== 'red' && document.querySelector('.forgot__div-copy-new-password').style.borderColor !== 'red' && this.new_password.value !== "" && this.copy_new_password.value !== "")
        {
            this.button_save.style.backgroundColor = 'rgb(113, 7, 7)';
            this.button_save.style.pointerEvents = 'auto';
            this.button_save.style.cursor = 'pointer';
        }
        else{
            this.button_save.style.backgroundColor = 'rgb(147, 147, 147)';
            this.button_save.style.pointerEvents = 'none';
            this.button_save.style.cursor = 'auto';
        }
    }

    async checkExistingUserData(email) {
        const usersRef = ref(db, 'users/');
        const snapshot = await get(usersRef);
          
        if (!snapshot.exists()) {
             return {};
        }
    
        const existingUsers = snapshot.val();
        const existingData = {
            emailExists: false,
            passwordExist: null,
            usernameExist: null,
        };
        for (const key in existingUsers) {
            if (existingUsers[key].email === email) {
                existingData.emailExists = true;
                existingData.passwordExist = existingUsers[key].password;
                existingData.usernameExist = existingUsers[key].username;
            }
        }
        return existingData;
    }
    async onClickSave(){
        this.message_main.textContent = "";
        let flag = true;
        if(this.old_password_value_db === this.new_password.value){
            this.message_main.textContent = "The new password must not match the old password.";
            flag = false;
        }
        if(this.copy_new_password.value !== this.new_password.value){
            this.message_main.textContent += "The passwords in the fields must match.";
            flag = false;
        }
        if(flag){
            const auth = getAuth();
            const database = getDatabase();
            const username = this.username_value_db;
            const newPassword = this.new_password.value;
            const oldPassword = this.old_password_value_db;
            // Поиск пользователя по username
            
            const newUserRef = ref(db, 'users/' + username); 
            update(newUserRef, {
                password: newPassword,
            })
            signInWithEmailAndPassword(auth, this.email.value, oldPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                updatePassword(user, newPassword);
                console.log('Password change!');
                location.href = "autorisation.html";
            });
        }
    }
    async onClickConfig(){
        const existingData = await this.checkExistingUserData(this.email.value);
        if(!existingData.emailExists){
            this.message_email.textContent = 'A user with that e-mail was not found.';
        }
        else{
            document.querySelector('.forgot__div-button-config').style.display = 'none';
            document.querySelector('.forgot__div-email').style.display = 'none';
            document.querySelector('.forgot__div-relative-email').style.display = 'none'
            document.querySelector('.forgot__div-button-save').style.display = 'flex';
            document.querySelector('.forgot__div-new-password').style.display = 'flex';
            document.querySelector('.forgot__div-copy-new-password').style.display = 'flex';
            document.querySelector('.forgot__div-relative-new-password').style.display = 'flex';
            document.querySelector('.forgot__div-relative-copy-new-password').style.display = 'flex';
            this.old_password_value_db = existingData.passwordExist;       
            this.username_value_db = existingData.usernameExist; 
            console.log(this.old_password_value_db);
            console.log(this.username_value_db);
        }
    }
    //this.password.value = class_value_password
    onInputPassword(class_div_password, class_message_password, class_value_password){
        if(class_value_password.length > 0){
            document.querySelector(class_div_password).style.borderColor = 'rgba(3, 3, 3, 1)';
            document.querySelector(class_message_password).textContent = "";
            if(!/[A-ZА-Я]/.test(class_value_password)){
                document.querySelector(class_div_password).style.borderColor = 'red';
                if(document.querySelector(class_message_password).textContent !== "")
                {
                    document.querySelector(class_message_password).textContent = document.querySelector(class_message_password).textContent.slice(0, -1);
                    document.querySelector(class_message_password).textContent += ", one capital letter.";
                }
                else{
                    document.querySelector(class_message_password).textContent += "The password must contain at least one capital letter.";
                }
            }
            if(!/\d/.test(class_value_password)){
                document.querySelector(class_div_password).style.borderColor = 'red';
                if(document.querySelector(class_message_password).textContent !== "")
                {
                    document.querySelector(class_message_password).textContent = document.querySelector(class_message_password).textContent.slice(0, -1);
                    document.querySelector(class_message_password).textContent += ", one digit.";
                }
                else{
                    document.querySelector(class_message_password).textContent += "The password must contain at least one digit.";
                }
            }
            if(!/[^A-ZА-Яa-zа-я0-9]/.test(class_value_password)){
                document.querySelector(class_div_password).style.borderColor = 'red';
                if(document.querySelector(class_message_password).textContent !== "")
                {
                    document.querySelector(class_message_password).textContent = document.querySelector(class_message_password).textContent.slice(0, -1);
                    document.querySelector(class_message_password).textContent += ", one special character.";
                }
                else{
                    document.querySelector(class_message_password).textContent += "The password must contain at least one special character.";
                }
            }
            if(class_value_password.length < 8){
                document.querySelector(class_div_password).style.borderColor = 'red';
                document.querySelector(class_message_password).textContent += "The minimum password length is 8 characters.";
            }

        }
        else{
            document.querySelector(class_div_password).style.borderColor = 'red';
            document.querySelector(class_message_password).textContent = "Password is not filled in.";
        }
        this.createClickSave();
    }
    onInputEmail(){
        document.querySelector('.forgot__div-email').style.borderColor = 'red';
        const invalidChars = /[&=+\-<>'_,]/;
        if(this.email.value.length > 0){
            document.querySelector('.forgot__div-email').style.borderColor = 'rgba(3, 3, 3, 1)';
            this.message_email.textContent = "";
            if(!this.isEmailValid(this.email.value)){
                this.message_email.textContent += "The e-mail does not match the specified format.";
                document.querySelector('.forgot__div-email').style.borderColor = 'red';
            }
            if (invalidChars.test(this.email.value)){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must not contain the characters &=+-,<>'_.";
                }
                else{
                    this.message_email.textContent += "The e-mail must not contain the characters &=+-<>'_,.";
                }
                document.querySelector('.forgot__div-email').style.borderColor = 'red';
            }
            if (!this.email.value.includes('@')){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must contain the character @.";
                }
                else{
                    this.message_email.textContent += "The e-mail must contain the character @.";
                }
                document.querySelector('.forgot__div-email').style.borderColor = 'red';
            }
            if (this.email.value.includes('..')){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it must not contain multiple dots in a row.";
                }
                else{
                    this.message_email.textContent += "The e-mail must not contain multiple dots in a row.";
                }
                document.querySelector('.forgot__div-email').style.borderColor = 'red';
            }
            if(this.email.value.length > 49){
                if(this.message_email.textContent !== ""){
                    this.message_email.textContent = this.message_email.textContent.slice(0, -1);
                    this.message_email.textContent += ", it length must not exceed 50 characters.";
                }
                else{
                    this.message_email.textContent += "The e-mail length must not exceed 50 characters.";
                }
                document.querySelector('.forgot__div-email').style.borderColor = 'red';
            }
        }
        else{
            document.querySelector('.forgot__div-email').style.borderColor = 'red';
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

export default {Forgot};