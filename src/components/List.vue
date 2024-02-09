<template>
  <div class="list" @click="startEditing">
    <span v-if="!editing">
      <h2>{{ title }}</h2>
      <div class="add-card" @click.stop="addCard">+</div>
    </span>
    <input v-model="newTitle" v-else @blur="finishEditing" @keyup.enter="finishEditing">
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
  data() {
    return {
      editing: false,
      newTitle: this.title
    };
  },
  methods: {
    updateCardText({ newText, listIndex, cardIndex }) {
      this.$emit('list-updated', { newText: newText, listIndex: listIndex, cardIndex: cardIndex });
      if (newText.trim() === '') {
        this.cards.splice(cardIndex, 1);
      }
    },
    addCard() {
      const newCard = { text: 'New Task' }; 
      this.cards.push(newCard);
      this.$emit('list-updated', { newText: newCard.text, listIndex: this.listIndex, cardIndex: this.cards.length - 1 });
    },
    startEditing() {
      this.editing = true;
      this.newTitle = this.title; 
      this.$nextTick(() => {
        this.$el.querySelector('input').focus();
      });
    },
    finishEditing() {
      this.editing = false;
      if (this.newTitle.trim() === '') {
        this.newTitle = this.title;
        return;
      }
      if (this.newTitle !== this.title) {
        this.$emit('list-title-updated', { newTitle: this.newTitle, listIndex: this.listIndex });
      }
    }
  }
};
</script>

<style scoped>
.list {
  cursor: pointer;
}

.list h2 {
  margin: 0;
}

input {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.add-card {
  margin-left: 10px;
  cursor: pointer;
  font-size: 1.5rem;
}

.cards {
  margin-top: 10px;
}
</style>
