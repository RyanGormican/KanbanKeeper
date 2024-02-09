<template>
  <div class="list">
    <h2>{{ title }}</h2>
    <div class="cards">
      <card
        v-for="(card, index) in cards"
        :key="index"
        :text="card.text"
        :listIndex="listIndex"
        :cardIndex="index" 
            @card-text-updated="updateCardText"
      ></card>
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
    cards: Array,
    listIndex: Number 
  },
   methods: {
  updateCardText({ newText, listIndex, cardIndex }) {
    this.$emit('list-updated', { newText: newText, listIndex: listIndex, cardIndex: cardIndex });
  }
  }
};
</script>
