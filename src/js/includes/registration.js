import { ref, set, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AuthCookies from './authcookies.js';
import Input from './input.js';

class Registration{
    constructor(){
        this.form = document.querySelector('.registration__form');
        this.name = document.querySelector('.registration__input-name');
        this.email = document.querySelector('.registration__input-email');
        this.tel = document.querySelector('.registration__input-phone');
        this.setup = document.querySelector('.registration__a-button-set-up');
        this.password = document.querySelector('.registration__input-password');
        this.message_email = document.querySelector('.registration__message-email');
        this.message_phone = document.querySelector('.registration__message-phone');
        this.message_password = document.querySelector('.registration__message-password');
        this.unit();
    }
    unit(){
        if(this.form !== null) {
            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                
            })
        }
        if(this.setup !== null) {
            this.setup.onclick = () => this.setupClick();
        }
        if(this.email !== null) {
            this.email.oninput = () => this.onInputEmail();
        }
        if(this.tel !== null) {
            this.tel.oninput = () => this.onInputTel();
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
            Input.buttonStyle(this.setup, true);
        }
        else{
            Input.buttonStyle(this.setup, false);
        }
    }

    async checkExistingUserData(username, email, phone) {
        const usersRef = ref(db, 'users/');
        const snapshot = await get(usersRef);
    
        if (!snapshot.exists()) {
             return {};
        }
    
        const existingUsers = snapshot.val();
        const existingData = {
            usernameExists: false,
            emailExists: false,
            phoneExists: false
        };
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
            const username = this.name.value;
            const email = this.email.value;
            const phone = this.tel.value;
            const password = this.password.value;
            let flag = true;
            const existingData = await this.checkExistingUserData(username, email, phone);
            if(existingData.usernameExists){
                document.querySelector('.registration__message-name').textContent = 'A user with that username has already been registered.';
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
                const auth = await getAuth();
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                AuthCookies.log_in(userCredential);
                const newUserRef = await ref(db, 'users/' + username); 
                await set(newUserRef, {
                    username: username,
                    email: email,
                    phone: phone,
                    password: password
                })
                this.form.submit();
                location.href = "index.html";
            }
    }
    onInputPassword(){
        Input.onInputPassword(this.password, 'registration');
        this.createClick();
    }
    onInputName(){
        Input.onInputName(this.name, 'registration');
        this.createClick();
    }
    onInputTel(){
        Input.onInputTel(this.tel, 'registration');
        this.createClick();
    }
    onInputEmail(){
        Input.onInputEmail(this.email, 'registration');
        this.createClick();
    }
}

export default {Registration};