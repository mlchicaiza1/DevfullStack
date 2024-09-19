import { defineStore } from 'pinia';
import axios from 'axios';


export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get('/api/products');
        this.products.splice(0, this.products.length, ...response.data);
      } catch (error) {
        this.error = 'Error fetching products';
      }
    },
    async addProduct(product: Product) {
      try {
        const response = await axios.post('/api/products', product);
        this.products.push(response.data);
      } catch (error) {
        this.error = 'Error adding product';
      }
    },

    async editProduct(updatedProduct: Product) {
      try {
        const response = await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct);
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
          this.products.splice(index, 1, response.data);
        }
      } catch (error) {
        this.error = 'Error editing product';
      }
    }
  }
});

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}