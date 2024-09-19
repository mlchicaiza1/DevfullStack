<template>
  <div>
    <!--Abrir el modal -->
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal">
        Agregar Producto
      </button>
    </div>
   
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productModalLabel">Agregar Producto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="name" class="form-label">Nombre del Producto</label>
                  <input type="text" id="name" v-model="product.name" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Descripción</label>
                  <input type="text" id="description" v-model="product.description" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="price" class="form-label">Precio</label>
                  <input type="number" id="price" v-model="product.price" class="form-control" required min="0" />
                </div>
                <div class="mb-3">
                  <label for="stock" class="form-label">Stock</label>
                  <input type="number" id="stock" v-model="product.stock" class="form-control" required min="0" />
                </div>
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="submit" class="btn btn-primary">Guardar Producto</button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>

    
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useProductStore } from '../stores/productStore';
import { Modal } from 'bootstrap';

export default defineComponent({
  setup() {
    const productStore = useProductStore();
    const product = ref({
      name: '',
      description: '',
      price: 0,
      stock: 0,
    });

    const error = ref<string | null>(null);

    const submitForm = async () => {
      try {
        await productStore.addProduct(product.value);
        product.value = { name: '', description: '', price: 0, stock: 0 }; // Reset form
        error.value = null;
         const modalElement = document.getElementById('productModal');
        if (modalElement) {
          const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
          bootstrapModal.hide();
        }
      } catch (err) {
        error.value = 'Error al agregar producto';
      }
    };

    return {
      product,
      error,
      submitForm,
    };
  },
});
</script>
