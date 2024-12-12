import { ref, get, update} from "firebase/database";
import { db } from "../../lib/firebase";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import Input from './input.js';
class Forgot{
    constructor(){
        this.email = document.querySelector('.forgot__input-email');
        this.button_config = document.querySelector('.forgot__a-button-config');
        this.button_save = document.querySelector('.forgot__a-button-save');
        this.new_password = document.querySelector('.forgot__input-new-password');
        this.copy_new_password = document.querySelector('.forgot__input-copy-new-password');
        this.message_email = document.querySelector('.forgot__message-email');
        this.message_main = document.querySelector('.forgot__message-main');
        this.old_password_value_db = null;
        this.username_value_db = null;
        this.unit();
    }
    unit(){
        if(this.email !== null) {
            this.email.oninput = () => this.onInputEmail();
        }
        if(this.new_password !== null) {
            this.new_password.oninput = () => this.onInputPassword('forgot-new');
        }
        if(this.copy_new_password !== null) {
            this.copy_new_password.oninput = () => this.onInputPassword('forgot-copy-new');
        }
        if(this.button_config !== null) {
            this.button_config.onclick = () => this.onClickConfig();
        }
        if(this.button_save !== null) {
            this.button_save.onclick = () => this.onClickSave();
        }
    }
    createClick(button_config){
        let flag = false;
        let button_contex;
        if(button_config === 'button_config'){
            button_contex = this.button_config;
            if(document.querySelector('.forgot__div-email').style.borderColor !== 'red' && this.email.value !== ""){
                flag = true;
            }
        }
        if(button_config === 'button_save'){
            button_contex = this.button_save;
            if(document.querySelector('.forgot__div-new-password').style.borderColor !== 'red' && document.querySelector('.forgot__div-copy-new-password').style.borderColor !== 'red' && this.new_password.value !== "" && this.copy_new_password.value !== ""){
                flag = true;
            }
        }
        Input.buttonStyle(button_contex, flag);
        // if(flag)
        // {
        //     button_contex.style.backgroundColor = 'rgb(113, 7, 7)';
        //     button_contex.style.pointerEvents = 'auto';
        //     button_contex.style.cursor = 'pointer';
        // }
        // else{
        //     button_contex.style.backgroundColor = 'rgb(147, 147, 147)';
        //     button_contex.style.pointerEvents = 'none';
        //     button_contex.style.cursor = 'auto';
        // }
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
            const username = this.username_value_db;
            const newPassword = this.new_password.value;
            const oldPassword = this.old_password_value_db;            
            const newUserRef = ref(db, 'users/' + username); 
            await update(newUserRef, {
                password: newPassword,
            })
            const userCredential = await signInWithEmailAndPassword(auth, this.email.value, oldPassword);           
            const user = userCredential.user;
            await updatePassword(user, newPassword);
            location.href = "autorisation.html";
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
    onInputPassword(content){
        if(content === 'forgot-new'){
            Input.onInputPassword(this.new_password, 'forgot-new');
        }
        else{
            Input.onInputPassword(this.copy_new_password, 'forgot-copy-new');
        }
        this.createClick('button_save');
    }
    onInputEmail(){
        Input.onInputEmail(this.email, 'forgot');
        this.createClick('button_config');
    }
}

export default {Forgot};