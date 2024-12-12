import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthCookies from './authcookies.js';
import Input from './input.js';

class Autorisation{
    constructor(){
        this.email = document.querySelector('.autorisation__input-email');
        this.login = document.querySelector('.autorisation__a-button-log-in');
        this.password = document.querySelector('.autorisation__input-password');
        this.message_email = document.querySelector('.autorisation__message-email');
        this.message_password = document.querySelector('.autorisation__message-password');
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
        let flag = false;
        if(document.querySelector('.autorisation__div-password').style.borderColor !== 'red' && document.querySelector('.autorisation__div-email').style.borderColor !== 'red' && this.email.value !== "" && this.password.value !== "")
        {
            flag = true;
        }
        Input.buttonStyle(this.login, flag);
    }

    async loginClick(){
        const password = document.querySelector('.autorisation__input-password').value;
        const email = document.querySelector('.autorisation__input-email').value;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            AuthCookies.setCookie('token', userCredential._tokenResponse.idToken);
            AuthCookies.setCookie('refreshToken', userCredential._tokenResponse.refreshToken);
            location.href = "index.html";
        } catch (error) {
            const messageElement = document.querySelector('.autorisation__message-main');
            messageElement.textContent = "This user is not registered. Invalid email or password.";
        }
    }
    
    onInputPassword(){
        document.querySelector('.autorisation__message-main').textContent = "";
        Input.onInputPassword(this.password, 'autorisation');
        this.createClick();
    }
    
    onInputEmail(){
        document.querySelector('.autorisation__message-main').textContent = "";
        Input.onInputEmail(this.email, 'autorisation');
        this.createClick();
    }
}

export default Autorisation;