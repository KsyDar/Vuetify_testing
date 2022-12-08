import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
    state: () => {
        return {
            'products': [], 
            currentProduct: null, 
            'types': [], 
            filters: [],
        }
    },

    actions: {
        async getProducts() {
            try {
                const res = await axios.get('http://localhost:3000/products');
                this.products = res.data;
            }
            catch (err) {
                console.log(err);
            }
        },

        async getTypes() {
            try {
                if(this.types.length === 0) {
                    const res = await axios.get('http://localhost:3000/types');
                    this.types = res.data;
                }
            }
            catch (err) {
                console.log(err);
            }
        },

        cleanFilters() {
            this.filters = [];
            this.types.forEach(type => type.selected = false)
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