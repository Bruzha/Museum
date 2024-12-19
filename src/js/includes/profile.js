import { ref, set, get, remove} from "firebase/database";
import { db } from "../../lib/firebase";
import AuthCookies from './authcookies.js';
import Input from './input.js';

class Profile{
    constructor(){
        this.form = document.querySelector('.profile__form');
        this.name = document.querySelector('.profile__input-name');
        this.email = document.querySelector('.profile__input-email');
        this.tel = document.querySelector('.profile__input-phone');
        this.save = document.querySelector('.profile__a-button-set-up');
        this.message_phone = document.querySelector('.profile__message-phone');
        this.old_username = "";
        this.old_tel = "";
        this.unit();
    }
    unit(){
        if(document.querySelector('.profile__a-button-order') !== null){
            document.querySelector('.profile__a-button-order').addEventListener('click', () => location.href = "history_orders.html");
        }
        if(this.form !== null) {
            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                
            })
        }
        if(this.name !== null) {
            if (AuthCookies.checkAuthentication()) {
                this.loadProfile();
            } 
        }
        if(this.tel !== null) {
            this.tel.addEventListener('input', () => this.onInputTel());
        }
        if(this.name !== null) {
            this.name.addEventListener('input', () => this.onInputName());
        }
        if(this.save !== null) {
            this.save.addEventListener('click', () => this.onClickSave());
        }
        if(document.querySelector('.header-profile__a-log-out') !== null){
            document.querySelector('.header-profile__a-log-out').addEventListener('click', () => this.onClickLoadOut());
        }
        if(document.querySelector('.header-profile__logo') !== null && document.querySelector('.header-profile__title') !== null){
            document.querySelector('.header-profile__logo').addEventListener('click', () => this.onClickLogoOrTitle());
            document.querySelector('.header-profile__title').addEventListener('click', () => this.onClickLogoOrTitle());
        }
    }
    onClickLogoOrTitle(){
        location.href = "index.html";
    }
    onClickLoadOut(){
        AuthCookies.log_out();
        this.onClickLogoOrTitle();
    }
    async loadProfile() {
        const token = AuthCookies.getTocken();
        if (!token) {
            console.error('The user is not authenticated. Please login.');
            return;
        }
        try {
            const response = await fetch(`https://museum-4007c-default-rtdb.firebaseio.com/users.json`);
            const users = await response.json();
            const currentUserEmail = Input.getCurrentUserEmail(token);
            const currentUser = Object.values(users).find(user => user.email === currentUserEmail);
            if (currentUser) {
                this.displayUserProfile(currentUser);
            } else {
                console.error('The user is not found.');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }

    displayUserProfile(user) {
        this.name.value = user.username;
        this.email.value = user.email;
        this.tel.value = user.phone;
        this.old_username = user.username;
        this.old_tel = user.phone;
    }
    createClick(){
        if(document.querySelector('.profile__div-name').style.borderColor !== 'red' && document.querySelector('.profile__div-phone').style.borderColor !== 'red' && this.name.value !== "" && this.tel.value !== ""){            
            if(this.name.value === this.old_username && this.tel.value === this.old_tel){
                Input.buttonStyle(this.save, false);
            }
            else{
                Input.buttonStyle(this.save, true);
            }
        }
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
        const phone = this.tel.value;
        let flag_username = true;
        let flag_tel = true;
        const existingData = await this.checkExistingUserData(username, phone);
        if(existingData.usernameExists){
            if(username === this.old_username){
                flag_username = true;
            }
            else{
                document.querySelector('.profile__message-name').textContent = 'This username is already being used by another user.';
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
                Input.buttonStyle(this.save, false);
                console.log('Update user!');
            }
            else {
                console.log('User not found!');
            }
        }
    }
    
    onInputName(){
        Input.onInputName(this.name, 'profile');
        this.createClick();
    }
    onInputTel(){
        Input.onInputTel(this.tel, 'profile');
        this.createClick();
    }
}

export default {Profile};