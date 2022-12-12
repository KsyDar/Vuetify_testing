import { defineStore } from 'pinia'
import axios from 'axios'
import { useUsersStore } from './users';

export const useOrdersStore = defineStore('orders', {
    state: () => { 
        return {  
            currentOrders: [],
        }
    },

    actions: {
        async getOrdersHistory() {
            try {
                const usersStore = useUsersStore();
                const user = usersStore.currentUser;
                
                const res = await axios.get(`http://localhost:3000/orders?userId=${user}`);
                this.currentOrders = res.data;
            }
            catch(err) {
                console.log(err);
            }
        },

        async updateOrdersHistory(newOrder) {
            try {
                await axios.post('http://localhost:3000/orders', newOrder);
            }
            catch(err) {
                console.log(err);
            }
        },
    }
});