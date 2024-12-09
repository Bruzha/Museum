import { push, ref, set, get, getDatabase, child, update, remove} from "firebase/database";
import { db } from "../../lib/firebase";
import { auth } from '../../lib/firebase';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getIdToken, getUserById} from "firebase/auth";
import AuthCookies from './authcookies.js';

class Profile{
    constructor(){
        this.name = document.querySelector('.profile__input-name');
        this.email = document.querySelector('.profile__input-email');
        this.tel = document.querySelector('.profile__input-phone');
        this.save = document.querySelector('.profile__a-button-set-up');

        this.message_name = document.querySelector('.profile__message-name');
        this.message_email = document.querySelector('.profile__message-email');
        this.message_phone = document.querySelector('.profile__message-phone');
        this.users = [];
        this.old_username = "";
        this.old_tel = "";

        this.load_out = document.querySelector('.header-profile__a-log-out');
        this.unit();
    }
    unit(){
        if(this.name !== null) {
            if (AuthCookies.checkAuthentication()) {
                this.getUserData();
            } 
        }
        if(this.tel !== null) {
            this.tel.oninput = () => this.onInputTel();
            this.tel.onkeyup = () => this.onInputTelKeyup();
        }
        if(this.name !== null) {
            this.name.oninput = () => this.onInputName();
        }
        if(this.save !== null) {
            this.save.onclick = () => this.onClickSave();
        }
        if(this.load_out !== null){
            this.load_out.onclick = () => this.onClickLoadOut();
        }
    }
    onClickLoadOut(){
        AuthCookies.setCookie('token', '', -1);
        AuthCookies.setCookie('refreshToken', '', -1);
        location.href = "index.html";
    }
    async EmailSearch(email) {
        const usersRef = ref(db, 'users/');
        const snapshot = await get(usersRef);
          
        if (!snapshot.exists()) {
             return {};
        }
    
        const existingUsers = snapshot.val();
        const existingData = {
            emailExists: false,
            phoneExist: null,
            usernameExist: null,
        };
        for (const key in existingUsers) {
            if (existingUsers[key].email === email) {
                existingData.emailExists = true;
                existingData.phoneExist = existingUsers[key].phone;
                existingData.usernameExist = existingUsers[key].username;
            }
        }
        return existingData;
    }
    async getUserData() {
        const email = sessionStorage.getItem('profile_email');
        console.log(email);
        const existingData = await this.EmailSearch(email);
        this.name.value = existingData.usernameExist;
        this.tel.value = existingData.phoneExist;
        this.email.value = email;
        this.old_username = existingData.usernameExist;
        this.old_tel = existingData.phoneExist;
    }
    createClick(){
        if(document.querySelector('.profile__div-name').style.borderColor !== 'red' && document.querySelector('.profile__div-phone').style.borderColor !== 'red' && this.name.value !== "" && this.tel.value !== "")
        {
            this.save.style.display = 'flex';
            this.save.style.pointerEvents = 'auto';
            this.save.style.cursor = 'pointer';
        }
        else{
            this.save.style.display = 'none';
            this.save.style.pointerEvents = 'none';
            this.save.style.cursor = 'auto';
        }
    }
    onInputTelKeyup(){
        this.tel.value = this.tel.value.replace(/[^\d]/g, "");
    }

    async checkExistingUserData(username, phone) {
        const usersRef = ref(db, 'users/');
        const snapshot = await get(usersRef);
    
        if (!snapshot.exists()) {
             return {};
        }
    
        const existingUsers = snapshot.val();
        const existingData = {
            usernameExists: false,
            phoneExists: false
        };
        for (const key in existingUsers) {
            if (existingUsers[key].username === username) {
                existingData.usernameExists = true;
            }
            if (existingUsers[key].phone === phone) {
                existingData.phoneExists = true;
            }
        }
        return existingData;
    }
    async onClickSave(){
        const username = document.querySelector('.profile__input-name').value;
        const email = document.querySelector('.profile__input-email').value;
        const phone = this.tel.value;
        let flag_username = true;
        let flag_tel = true;
        const existingData = await this.checkExistingUserData(username, phone);
        if(existingData.usernameExists){
            if(username === this.old_username){
                flag_username = true;
            }
            else{
                this.message_name.textContent = 'This username is already being used by another user.';
                flag_username = false;
            }
        }
        if(existingData.phoneExists){
            if(phone === this.old_tel){
                flag_tel = true;
            }
            else{
                this.message_phone.textContent = 'Another user is already using this phone.';
                flag_tel = false;
            }
        }
        if(flag_username && flag_tel){
            const auth = getAuth();
            const database = getDatabase();
            // Поиск пользователя по username
            
            const oldUserRef = ref(db, 'users/' + this.old_username);
            const snapshot = await get(oldUserRef);
            
            if (snapshot.exists()) {
                const userData = snapshot.val();
                await remove(oldUserRef);
                const newUserRef = ref(db, 'users/' + username);
                await set(newUserRef, {
                    username: username,
                    email: userData.email,
                    phone: phone,
                    password: userData.password,
                });
                this.old_username = username;
                this.old_tel = phone;
                this.save.style.display = 'none';
                this.save.style.pointerEvents = 'none';
                this.save.style.cursor = 'auto';
                console.log('Update user!');
            }
            else {
                console.log('Пользователь не найден!');
            }
        }
    }
    
    onInputName(){
        if(this.name.value.length > 0 && this.name.value !== " "){
            document.querySelector('.profile__div-name').style.borderColor = 'rgba(3, 3, 3, 1)';
            this.message_name.textContent = "";
        }
        else{
            document.querySelector('.profile__div-name').style.borderColor = 'red';
            this.message_name.textContent = "Username is not filled in.";
        }
        if(document.querySelector('.profile__input-name').value === this.old_username && document.querySelector('.profile__input-phone').value === this.old_tel)
            {
                console.log('Nothing update!');
                this.save.style.display = 'none';
                this.save.style.pointerEvents = 'none';
                this.save.style.cursor = 'auto';  
            }
            else{
        this.createClick();
            }
    }
    onInputTel(){
        if(this.tel.value.length > 0){
            if((this.tel.value).toString().slice(0, 3) === '375'){
                if((this.tel.value).toString().slice(3, 5) === '29' || (this.tel.value).toString().slice(3, 5) === '33'){
                    if(this.tel.value.length === 12){
                        document.querySelector('.profile__div-phone').style.borderColor = 'rgba(3, 3, 3, 1)';
                        this.message_phone.textContent = "";
                    }
                    else{
                        this.message_phone.textContent = "The phone number must contain 7 digits.";
                        document.querySelector('.profile__div-phone').style.borderColor = 'red';
                    }
                }
                else{
                    this.message_phone.textContent = "The operator's code must be 29 or 33.";
                    document.querySelector('.profile__div-phone').style.borderColor = 'red';
                }
            }
            else{
                this.message_phone.textContent = "The phone number should start with 375.";
                document.querySelector('.profile__div-phone').style.borderColor = 'red';
            }
        }
        else{
            document.querySelector('.profile__div-phone').style.borderColor = 'red';
            this.message_phone.textContent = "Phone is not filled in.";
        }
        if(document.querySelector('.profile__input-name').value === this.old_username && document.querySelector('.profile__input-phone').value === this.old_tel)
            {
                console.log('Nothing update!');
                this.save.style.display = 'none';
                this.save.style.pointerEvents = 'none';
                this.save.style.cursor = 'auto';
            }
            else{
        this.createClick();
        }
    }
}

export default {Profile};