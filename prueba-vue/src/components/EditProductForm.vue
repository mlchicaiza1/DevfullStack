<template>
    <div
      class="modal fade"
      id="editProductModal"
      tabindex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductModalLabel">Editar Producto</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEdit">
              <div class="mb-3">
                <label for="productName" class="form-label">Nombre</label>
                <input
                  type="text"
                  id="productName"
                  class="form-control"
                  v-model="product.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label">Descripción</label>
                <input
                  type="text"
                  id="productDescription"
                  class="form-control"
                  v-model="product.description"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">Precio</label>
                <input
                  type="number"
                  id="productPrice"
                  class="form-control"
                  v-model="product.price"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productStock" class="form-label">Stock</label>
                <input
                  type="number"
                  id="productStock"
                  class="form-control"
                  v-model="product.stock"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType, ref, watch } from 'vue';
  import { Modal } from 'bootstrap';
  export default defineComponent({
    props: {
      productToEdit: {
        type: Object as PropType<{
          name: string;
          description: string;
          price: number;
          stock: number;
        }>,
        required: true
      }
    },
    setup(props, { emit }) {
      const product = ref({ ...props.productToEdit });
  
      watch(
        () => props.productToEdit,
        (newProduct) => {
          product.value = { ...newProduct };
        }
      );

      const submitEdit = () => {
        emit('updateProduct', product.value);
        const modalElement = document.getElementById('editProductModal');
        if (modalElement) {
          const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
          bootstrapModal.hide();
        }
      };
  
      return {
        product,
        submitEdit
      };
    }
  });
  </script>

  