import { ref, set, get, remove} from "firebase/database";
import { db } from "../../lib/firebase";
import AuthCookies from './authcookies.js';
import Input from './input.js';

class Profile{
    constructor(){
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
        if(this.name !== null) {
            if (AuthCookies.checkAuthentication()) {
                this.loadProfile();
            } 
        }
        if(this.tel !== null) {
            this.tel.oninput = () => this.onInputTel();
        }
        if(this.name !== null) {
            this.name.oninput = () => this.onInputName();
        }
        if(this.save !== null) {
            this.save.onclick = () => this.onClickSave();
        }
        if(document.querySelector('.header-profile__a-log-out') !== null){
            document.querySelector('.header-profile__a-log-out').onclick = () => this.onClickLoadOut();
        }
        if(document.querySelector('.header-profile__logo') !== null && document.querySelector('.header-profile__title') !== null){
            document.querySelector('.header-profile__logo').onclick = () => this.onClickLogoOrTitle();
            document.querySelector('.header-profile__title').onclick = () => this.onClickLogoOrTitle();
        }
    }
    onClickLogoOrTitle(){
        location.href = "index.html";
    }
    onClickLoadOut(){
        AuthCookies.setCookie('token', '', -1);
        AuthCookies.setCookie('refreshToken', '', -1);
        this.onClickLogoOrTitle();
    }
    async loadProfile() {
        const token = AuthCookies.getCookie('token');
        if (!token) {
            console.error('The user is not authenticated. Please login.');
            return;
        }

        try {
            const response = await fetch(`https://museum-4007c-default-rtdb.firebaseio.com/users.json`);
            const users = await response.json();
            const currentUserEmail = this.getCurrentUserEmail(token);
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

    getCurrentUserEmail(token) {
        const decoded = atob(token.split('.')[1]);
        const { email } = JSON.parse(decoded);
        return email;
    }

    displayUserProfile(user) {
        document.querySelector('.profile__input-name').value = user.username;
        document.querySelector('.profile__input-email').value = user.email;
        document.querySelector('.profile__input-phone').value = user.phone;
        this.old_username = user.username;
        this.old_tel = user.phone;
    }
    createClick(){
        if(document.querySelector('.profile__div-name').style.borderColor !== 'red' && document.querySelector('.profile__div-phone').style.borderColor !== 'red' && this.name.value !== "" && this.tel.value !== "")
        {
            this.save.style.display = 'flex';
            this.save.style.pointerEvents = 'auto';
            this.save.style.cursor = 'pointer';
        }
        else{
            this.buttonNone();
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
                this.buttonNone();
                console.log('Update user!');
            }
            else {
                console.log('User not found!');
            }
        }
    }
    
    onInputName(){
        Input.onInputName(this.name, 'profile');

        if(document.querySelector('.profile__input-name').value === this.old_username && document.querySelector('.profile__input-phone').value === this.old_tel){
            console.log('Nothing update!');
            this.buttonNone();  
        }
        else{
            this.createClick();
        }
    }
    onInputTel(){
        Input.onInputTelKeyup(this.tel);
        Input.onInputTel(this.tel, 'profile');
        if(document.querySelector('.profile__input-name').value === this.old_username && document.querySelector('.profile__input-phone').value === this.old_tel){
            console.log('Nothing update!');
            this.buttonNone();
        }
        else{
            this.createClick();
        }
    }
    buttonNone(){
        this.save.style.display = 'none';
        this.save.style.pointerEvents = 'none';
        this.save.style.cursor = 'auto';  
    }
}

export default {Profile};