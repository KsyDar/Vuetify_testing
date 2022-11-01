import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
    state: () => ({ 'products': [], currentProduct: null, 'types': [], filters: [], 'basket': [] }),
    actions: {
        async getProducts(type) {
            try {
                const res = await axios.get('http://localhost:3000/products');
                this.products = res.data;
                if (type) {
                    let filteredProducts = this.products.filter(product => product.typeId === type);
                    return filteredProducts;
                }
                else {
                    return this.products;
                }
            }
            catch (err) {
                console.log(err);
            }
        },

        async getTypes() {
            try {
                const res = await axios.get('http://localhost:3000/types');
                this.types = res.data;
                return this.types;
            }
            catch (err) {
                console.log(err);
            }
        },

        addToBasket(product) {
            const repeat = this.basket.find(el => el.id === product.id);
            if(repeat) {
                repeat.amount++;
            }
            else {
                this.basket.push(product);
            };
        },

        removeFromBasket(product) {
            const item = this.basket.find(el => el.id === product.id);
            if(item.amount > 1) {
                item.amount -= 1;
            }
            else {
                this.basket = this.basket.filter(el => el.id !== product.id);
            }
        },

        calculateTotal() {
            let total = 0;
            this.basket.forEach(el => {
                const sum = el.amount * el.price
                total += sum
            });
            return total
        },

        setFilter(filters) {
            this.filters = filters;
        },
    },

    getters: {
        filteredItems() {
            if(this.filters.length === 0 || this.filters.length >= this.types) return this.products;
            return this.products.filter(product => this.filters.indexOf(product.typeId) !== -1);
        }
    },

})