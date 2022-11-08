import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
    state: () => ({ 'users': [], currentUser: null, orders: [], currentOrders: null}),
    actions: {
        async getUsers() {
            try {
                const res = await axios.get('http://localhost:3000/users');
                this.users = res.data;
            }
            catch(err) {
                console.log(err);
            }
        },

        login(name, password) {
            const user = this.users.find(el => el.name === name && el.password === password);
            if(!user) {
                return false;
            }
            else {
                this.currentUser = user;
            }
        },

        exit() {
            this.currentUser = null;
        },

        async addUser(user) {
            this.currentUser = user;
            try {
                await axios.post('http://localhost:3000/users', user);
            }
            catch(err) {
                console.log(err);
            }
        },

        async getOrdersHistory() {
            try {
                const res = await axios.get('http://localhost:3000/orders')
                this.orders = res.data;
                this.currentOrders = this.orders.filter(el => el.userId === this.currentUser.id);
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
        }
    }
})