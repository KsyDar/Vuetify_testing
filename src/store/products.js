import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
    state: () => { 
        const localBasket = JSON.parse(localStorage.getItem('basket'))
        return {
            'products': [], 
            currentProduct: null, 
            'types': [], 
            filters: [],
        }
    },

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

        cleanFilters() {
            this.filters = [];
        },

        setFilter(type) {
            if (this.filters.indexOf(type.id) === -1) {
                this.filters.push(type.id);
                type.selected = true;
            } else {
                this.filters = this.filters.filter((f) => f !== type.id);
                type.selected = false;
            };
        },
    },

    getters: {
        filteredItems() {
            if(this.filters.length === 0 || this.filters.length >= this.types) return this.products;
            return this.products.filter(product => this.filters.indexOf(product.typeId) !== -1);
        }
    }
})