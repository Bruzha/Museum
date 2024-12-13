class Input {
    static onInputName(name, content) {
        let div, message;
        if(content === 'registration'){
            div = document.querySelector('.registration__div-name');
            message = document.querySelector('.registration__message-name');
        }
        else if (content === 'profile'){
            div = document.querySelector('.profile__div-name');
            message = document.querySelector('.profile__message-name');
        }
        else if(content === 'tickets'){
            div = document.querySelector('.booking__div-name');
            message = document.querySelector('.booking__message-name');
        }
        ///
        if(name.value !== ""){
            div.style.borderColor = 'rgba(3, 3, 3, 1)';
            message.textContent = "";
            name.parentNode.classList.add('success');
            name.parentNode.classList.remove('error');
        }
        else{
            div.style.borderColor = 'red';
            message.textContent = "Username is not filled in.";
            name.parentNode.classList.add('error');
            name.parentNode.classList.remove('success');
        }
    }
    static onInputTel(tel, content){
        tel.value = tel.value.replace(/[^\d]/g, "");
        let div, message;
        if(content === 'registration'){
            div = document.querySelector('.registration__div-phone');
            message = document.querySelector('.registration__message-phone');
        }
        else if(content === 'profile'){
            div = document.querySelector('.profile__div-phone');
            message = document.querySelector('.profile__message-phone');
        }
        else if(content === 'tickets'){
            div = document.querySelector('.booking__div-phone');
            message = document.querySelector('.booking__message-phone');
        }
        if(tel.value.length > 0){
            if((tel.value).toString().slice(0, 3) === '375'){
                if((tel.value).toString().slice(3, 5) === '29' || (tel.value).toString().slice(3, 5) === '33'){
                    if(tel.value.length === 12){
                        div.style.borderColor = 'rgba(3, 3, 3, 1)';
                        message.textContent = "";
                    }
                    else{
                        message.textContent = "The phone number must contain 7 digits.";
                        div.style.borderColor = 'red';
                    }
                }
                else{
                    message.textContent = "The operator's code must be 29 or 33.";
                    div.style.borderColor = 'red';
                }
            }
            else{
                message.textContent = "The phone number should start with 375.";
                div.style.borderColor = 'red';
            }
        }
        else{
            div.style.borderColor = 'red';
            message.textContent = "Phone is not filled in.";
        }
    }
    static onInputEmail(email, content){
        let div, message;
        if(content === 'registration'){
            div = document.querySelector('.registration__div-email');
            message = document.querySelector('.registration__message-email');
        }
        else if (content === 'autorisation'){
            div = document.querySelector('.autorisation__div-email');
            message = document.querySelector('.autorisation__message-email');
        }
        else if (content === 'forgot'){
            div = document.querySelector('.forgot__div-email');
            message = document.querySelector('.forgot__message-email');
        }
        else if(content === 'tickets'){
            div = document.querySelector('.booking__div-email');
            message = document.querySelector('.booking__message-email');
        }
        ///
        if(email.value === ''){
            div.style.borderColor = 'red';
            message.textContent = 'E-mail is not filled in.';
            email.parentNode.classList.add('error');
            email.parentNode.classList.remove('success');
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) || /[&=+\-<>'_,]/.test(email.value) || email.value.includes('..')){
            div.style.borderColor = 'red';
            message.textContent = 'The e-mail is not in a valid format.';
            const invalidChars = /[&=+\-<>'_,]/;
            if (invalidChars.test(email.value)){
                message.textContent = message.textContent.slice(0, -1);
                message.textContent += ", it must not contain the characters &=+-,<>'_.";
            }
            if (!email.value.includes('@')){
                message.textContent = message.textContent.slice(0, -1);
                message.textContent += ", it must contain the character @.";
            }
            if (email.value.includes('..')){
                message.textContent = message.textContent.slice(0, -1);
                message.textContent += ", it must not contain multiple dots in a row.";
            }
            email.parentNode.classList.add('error');
            email.parentNode.classList.remove('success');
        }
        else{
            div.style.borderColor = 'rgba(3, 3, 3, 1)';
            message.textContent = "";
            email.parentNode.classList.add('success');
            email.parentNode.classList.remove('error');
        }
    }
    static onInputPassword(password, content){
        let div, message;
        if(content === 'registration'){
            div = document.querySelector('.registration__div-password');
            message = document.querySelector('.registration__message-password');
        }
        else if (content === 'autorisation'){
            div = document.querySelector('.autorisation__div-password');
            message = document.querySelector('.autorisation__message-password');
        }
        else if (content === 'forgot-new'){
            div = document.querySelector('.forgot__div-new-password');
            message = document.querySelector('.forgot__message-new-password');
        }
        else if (content === 'forgot-copy-new'){
            div = document.querySelector('.forgot__div-copy-new-password');
            message = document.querySelector('.forgot__message-copy-new-password');
        }
        ///
        if(password.value === ''){
            div.style.borderColor = 'red';
            message.textContent = 'Password is not filled in.';
            password.parentNode.classList.add('error');
            password.parentNode.classList.remove('success');
        }
        else{
            message.textContent = "";
            div.style.borderColor = 'rgba(3, 3, 3, 1)';
            if(password.value.length < 8){
                div.style.borderColor = 'red';
                message.textContent = 'The minimum password length is 8 characters.';
            }
            if(!/[A-ZА-Я]/.test(password.value)){
                div.style.borderColor = 'red';
                if(message.textContent !== "")
                {
                    message.textContent = message.textContent.slice(0, -1);
                    message.textContent += ", one capital letter.";
                }
                else{
                    message.textContent += "The password must contain at least one capital letter.";
                }
            }
            if(!/\d/.test(password.value)){
                div.style.borderColor = 'red';
                if(message.textContent !== "")
                {
                    message.textContent = message.textContent.slice(0, -1);
                    message.textContent += ", one digit.";
                }
                else{
                    message.textContent += "The password must contain at least one digit.";
                }
            }
            if(!/[^A-ZА-Яa-zа-я0-9]/.test(password.value)){
                div.style.borderColor = 'red';
                if(message.textContent !== "")
                {
                    message.textContent = message.textContent.slice(0, -1);
                    message.textContent += ", one special character.";
                }
                else{
                    message.textContent += "The password must contain at least one special character.";
                }
            }
            if(div.style.borderColor === 'rgba(3, 3, 3, 1)'){
                email.parentNode.classList.add('success');
                email.parentNode.classList.remove('error');
            }
            else{
                password.parentNode.classList.add('error');
                password.parentNode.classList.remove('success');
            }
        }
    }
   
    static buttonStyle(button, context){
        if(context){
            button.style.backgroundColor = 'rgb(113, 7, 7)';
            button.style.pointerEvents = 'auto';
            button.style.cursor = 'pointer';
        }
        else{
            button.style.backgroundColor = 'rgb(147, 147, 147)';
            button.style.pointerEvents = 'none';
            button.style.cursor = 'auto';
        }
    }
}

export default Input;