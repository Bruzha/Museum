class AuthCookies {
    static #setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    static #getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    static log_in(userCredential){
        this.#setCookie('token', userCredential._tokenResponse.idToken);
        this.#setCookie('refreshToken', userCredential._tokenResponse.refreshToken);
    }
    static log_out(){
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
    static getTocken(){
        const token = this.#getCookie('token');
        return token;
    }
    static checkAuthentication() {
        return !!this.#getCookie('token');
    }

}

export default AuthCookies;