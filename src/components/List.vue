<!-- List.vue -->
<template>
  <div class="list">
    <h2>{{ title }}</h2>
    <div class="cards">
      <card v-for="(card, index) in cards" :key="index" :text="card.text"></card>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'List',
  components: {
    Card
  },
  props: {
    title: String,
    cards: Array
  }
};
</script>
