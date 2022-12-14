import { defineStore } from 'pinia'
import axios from 'axios'

export const useBasketStore = defineStore('basket', {
    state: () => { 
        const localBasket = JSON.parse(localStorage.getItem('basket'))
        return { 
            total: 0,
            'basket': localBasket === null ? [] : localBasket,
        }
    },

    actions: {
        updateBasket(product) {
            const item = this.basket.find(el => el.id === product.id);
            if(!item) {
                this.basket.push(product);
            }
            else {
                if(product.amount < 1) {
                    this.basket = this.basket.filter(el => el.id !== product.id);
                }
                else {
                    item.amount = product.amount;
                }
            }
            localStorage.basket = JSON.stringify(this.basket);
        },

        getCounter(product) {
            const item = this.basket.find((el) => el.id === product.id);
            if(item) {
                return item.amount
            }
            else {
                return 0
            };
        },

        cleanBasket() {
            this.basket = [];
            localStorage.removeItem('basket');
        },
    },
    
    getters: {
        calculatedTotal: (state) => {
            state.basket.forEach(el => {
                const sum = el.amount * el.price
                state.total += sum
            });
            return state.total;
        },
    },
})