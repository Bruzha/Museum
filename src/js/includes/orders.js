import AuthCookies from './authcookies.js';
import Input from './input.js';

class Orders{
    constructor(){
        this.unit();
    }
    unit(){
        this.loadPage();
        if(document.querySelector('.orders__a-button-order') !== null){
            document.querySelector('.orders__a-button-order').addEventListener('click', () => location.href = "profile-user.html");
        }
    }
    async loadPage() {
        const token = AuthCookies.getTocken();
        if (!token) {
            console.error('The user is not authenticated. Please login.');
            return;
        }
        try {
            const response = await fetch(`https://museum-4007c-default-rtdb.firebaseio.com/orders.json`);
            const orders = await response.json();
            const currentUserEmail = Input.getCurrentUserEmail(token);

            const userOrders = Object.values(orders).filter(order => order.email === currentUserEmail);
            if(userOrders.length > 0){
                this.displayUserOrders(userOrders);
            }
            else {
                console.error('The user is not found.');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }

    displayUserOrders(orders) {
        const tableBody = document.querySelector('.orders__tbody');
        tableBody.innerHTML='';
        let i = 1;
        orders.forEach(order => {            
            const row = document.createElement('tr');
            row.innerHTML=`
            <td>${i}</td>
            <td>${order.date}</td>
            <td>${order.time}</td>
            <td>${order.name}</td>
            <td>${order.ticket_type}</td>
            <td>${order.entry_basic_ticket}</td>
            <td>${order.entry_senior_ticket}</td>
            <td>${order.total}</td>
            `;
            tableBody.appendChild(row);
            i++;
        })
    }
}

export default { Orders };