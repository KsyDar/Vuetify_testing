import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
    state: () => ({'products': [], currentProduct: null, 'types': []}),
    actions: {
        async getProducts() {
            try {
                const res = await axios.get('http://localhost:3000/products');
                this.products = res.data;
                return this.products;
            }
            catch(err) {
                console.log(err);
            }
        },

        async getTypes() {
            try {
                const res = await axios.get('http://localhost:3000/types');
                this.types = res.data;
                return this.types;
            }
            catch(err) {
                console.log(err);
            }
        }
    }

})