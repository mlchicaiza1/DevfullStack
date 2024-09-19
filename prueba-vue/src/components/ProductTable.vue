<template>
  <div>
    <h3>Productos</h3>
    <!-- Tabla personalizada -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in paginatedProducts" :key="index">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editProduct(product)">Editar</button>
          </td>
        </tr>
        <tr v-if="!paginatedProducts.length">
          <td colspan="5" class="text-center">No se encontraron productos.</td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <nav v-if="totalPages > 1" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">Anterior</button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">Siguiente</button>
        </li>
      </ul>
    </nav>

    <!--Modal para editar-->
    <EditProductForm
      v-if="showModal"
      :productToEdit="selectedProduct"
      @updateProduct="updateProduct"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useProductStore } from '../stores/productStore';
import EditProductForm from './EditProductForm.vue';
import { Modal } from 'bootstrap';

export default defineComponent({
  components: {
    EditProductForm
  },
  setup() {
    const productStore = useProductStore();
    const currentPage = ref(1);
    const pageSize = ref(5);

    onMounted(() => {
      productStore.fetchProducts();
    });

    const products = computed(() => productStore.products || []);
    const error = computed(() => productStore.error);

    //Total de páginas
    const totalPages = computed(() => {
      return Math.ceil(products.value.length / pageSize.value);
    });

    //Página actual
    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return products.value.slice(start, end);
    });

    // Navegación de páginas
    const goToPage = (page: number) => {
      currentPage.value = page;
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    const showModal = ref(false);
    const selectedProduct = ref({
      name: '',
      description: '',
      price: 0,
      stock: 0
    });

    const editProduct = (product: any) => {
      selectedProduct.value = { ...product };
      showModal.value = true;

      const modalElement = document.getElementById('editProductModal');
      if (modalElement) {
        const modal =  new Modal(modalElement); 
        modal.show();
      }
    };

    const updateProduct = async (updatedProduct: any) => {
      await productStore.editProduct(updatedProduct);
      showModal.value = false;
    };

    return {
      currentPage,
      pageSize,
      totalPages,
      paginatedProducts,
      error,
      goToPage,
      prevPage,
      nextPage,
      showModal,
      selectedProduct,
      editProduct,
      updateProduct
    };
  }
});
</script>
