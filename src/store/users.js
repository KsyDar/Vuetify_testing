import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
    state: () => {
        const localUser = localStorage.getItem('user'); 
        return { 
            currentUser: localUser === null ? null : localUser,
        }
    },
    actions: {
        async login(name, password) {
            try {
                if (name.length === 0 || password.length === 0) return
                const res = await axios.get(`http://localhost:3000/users?name=${name}&password=${password}`);
                if (res.data.length === 0) return
                this.currentUser = res.data[0];
                localStorage.setItem('user', this.currentUser);
            }
            catch(err) {
                console.log(err);
            }
        },

        exit() {
            localStorage.removeItem('user');
        },

        async addUser(user) {
            const repeat = await axios.get(`http://localhost:3000/users?name=${user.name}`);
            if(repeat.data.length !== 0) {
                return false
            }


            try {
                const newUser = await axios.post('http://localhost:3000/users', user);
                this.currentUser = newUser.data;
                localStorage.setItem('user', newUser.data);   
                return true;
            }
            catch(err) {
                console.log(err);
            }
        },

        async updateUserInformation(user) {
            if (this.currentUser === null) return;

            this.currentUser.fio = user.fio;
            this.currentUser.address = user.address;
            this.currentUser.number = user.mobile;

            const updatedUser = await axios.put(`http://localhost:3000/users/${this.currentUser.id}`, this.currentUser);
            localStorage.removeItem('user');
            localStorage.setItem('user', updatedUser.data);
        }
    }
});