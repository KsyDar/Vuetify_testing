import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
    state: () => { 
        const localUser = localStorage.getItem('id');
        return { 
            currentUser: localUser === null ? null : localUser, 
            currentOrders: [],
        }
    },
    actions: {
        async login(name, password) {
            try {
                if (name.length === 0 || password.length === 0) return
                const res = await axios.get(`http://localhost:3000/users?name=${name}&password=${password}`);
                if (res.data.length === 0) return
                this.currentUser = res.data[0].id;
                localStorage.setItem('id', res.data[0].id);
            }
            catch(err) {
                console.log(err);
            }
        },

        exit() {
            localStorage.removeItem('id');
        },

        async addUser(user) {
            const repeat = await axios.get(`http://localhost:3000/users?name=${user.name}`);
            if(repeat.data.length !== 0) {
                return false
            }


            try {
                const newUser = await axios.post('http://localhost:3000/users', user);
                this.currentUser = newUser.data.id;
                localStorage.setItem('id', newUser.data.id);   
                return true;
            }
            catch(err) {
                console.log(err);
            }
        },
    }
});