<template>
  <div class="container">
    <h2>Gestión de Productos</h2>
    <AddProductForm />
    <ProductTable />
    <AboutView/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddProductForm from './components/AddProductForm.vue';
import ProductTable from './components/ProductTable.vue';

export default defineComponent({
  components: {
    AddProductForm,
    ProductTable,
  },
});
</script>
<style>
.container {
  margin-top: 20px;
}
</style>