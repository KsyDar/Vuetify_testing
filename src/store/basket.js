import { defineStore } from 'pinia'
import axios from 'axios'

export const useBasketStore = defineStore('basket', {
    state: () => { 
        const localBasket = JSON.parse(localStorage.getItem('basket'))
        return { 
            'basket': localBasket === null ? [] : localBasket,
        }
    },

    actions: {
        addToBasket(product) {
            const repeat = this.basket.find(el => el.id === product.id);
            if(repeat) {
                repeat.amount++;
            }
            else {
                this.basket.push(product);
            };
            localStorage.basket = JSON.stringify(this.basket);
        },

        removeFromBasket(product) {
            const item = this.basket.find(el => el.id === product.id);
            if(item.amount > 1) {
                item.amount -= 1;
            }
            else {
                this.basket = this.basket.filter(el => el.id !== product.id);
            };
            localStorage.basket = JSON.stringify(this.basket);
        },

        calculateTotal() {
            let total = 0;
            this.basket.forEach(el => {
                const sum = el.amount * el.price
                total += sum
            });
            return total
        },
    }
})