<!-- Card.vue -->
<template>
  <div class="card">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    text: String
  }
};
</script>

<style>
  @import '@/assets/input.css';
.card {
  background-color: #f4f4f4;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>
