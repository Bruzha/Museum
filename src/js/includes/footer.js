class Footer{
    constructor(){
        this.footer_username = document.querySelector('.footer__a-down-username');
        this.header_a = document.querySelector('.header__a-log-in');
        this.unit();
    }
    unit(){
        //localStorage.clear();
        // if(this.footer_username !== null && sessionStorage.getItem('footer_username') !== null){
        //     this.footer_username.textContent = sessionStorage.getItem('footer_username');
        //     this.header_a.innerHTML = "Profile";
        //     this.header_a.href = "profile-user.html";
        //     //delete sessionStorage.footer_username;
        // }
    }
}
export default {Footer};