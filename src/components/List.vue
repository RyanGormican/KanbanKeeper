<template>
  <div class="list" @dragover.prevent="" @drop="onDrop">
    <span v-if="!editing">
      <h2 @click="startEditingTitle">{{ title }}</h2>
      <!-- Differentiate click event -->
      <Icon icon="ic:outline-note-add" width="20" @click.stop="addCard" />
      <Icon icon="mdi:trash" width="20" @click.stop="showDeletePopup = true" />
    </span>
    <input v-model="newTitle" v-else="" @blur="finishEditing" @keyup.enter="finishEditing">
     
      <div class="cards">
        <!-- Delete list confirmation popup -->
        <div v-if="showDeletePopup" class="delete-popup">
          <p>Are you sure you want to delete this list?</p>
          <button @click="deleteList">Delete</button>
          <button @click="cancelDelete">Cancel</button>
        </div>
      </div>
        <Card
          v-for="(card, index) in cards"
          :key="index"
          :text="card.text"
          :listIndex="listIndex"
          :cardIndex="index"
          :dueDateTime="card.dueDateTime"
          @card-text-updated="updateCardText"
          @due-date-time-updated="updateDueDateTime"
          @dragstart="onDragStart"
      ></Card>
      </div>
     
</template>

<script>
  import Card from './Card.vue';
  import { Icon } from '@iconify/vue';

  export default {
  name: 'List',
  components: {
  Card,
  Icon
  },
  props: {
  title: String,
  cards: Array,
  listIndex: Number
  },
  data() {
  return {
  editing: false,
  newTitle: this.title,
  showDeletePopup: false
  };
  },
  methods: {
  updateCardText({ newText, listIndex, cardIndex }) {
  this.$emit('list-updated', { newText, listIndex, cardIndex });
  if (newText.trim() === '') {
  this.cards.splice(cardIndex, 1);
  }
  },
  startEditingTitle() {
  this.editing = true;
  this.newTitle = this.title;
  this.$nextTick(() => {
  const inputElement = this.$el.querySelector('input');
  if (inputElement) {
  inputElement.focus();
  }
  });
  },
  updateDueDateTime({ newDueDateTime, listIndex, cardIndex }) {
  this.cards[cardIndex].dueDateTime = newDueDateTime;
  this.$emit('list-updated', { newText: this.cards[cardIndex].text, listIndex, cardIndex });
  },
  addCard() {
  const newCard = {
  text: 'New Task',
  dueDateTime: null
  };
  this.cards.push(newCard);
  this.$emit('list-updated', { newText: newCard.text, listIndex: this.listIndex, cardIndex: this.cards.length - 1 });
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
  },
  deleteList() {
  this.$emit('delete-list', this.listIndex);
  this.showDeletePopup = false;
  },
  cancelDelete() {
  this.showDeletePopup = false; 
  },
  onDrop(event) {
  const data = JSON.parse(event.dataTransfer.getData('text/plain'));
  const { fromListIndex, fromCardIndex } = data;
  const toListIndex = this.listIndex;

  if (fromListIndex !== toListIndex) {
  this.$emit('move-card', { fromListIndex, toListIndex, fromCardIndex });
  }
  },
  onDragStart(event, cardIndex) {
  event.dataTransfer.setData('text/plain', JSON.stringify({ fromListIndex: this.listIndex, fromCardIndex: cardIndex }));
  }
  }
  };
</script>

<style scoped="">
  .list {
  cursor: pointer;
  padding: 0.25vw;
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

  .delete-popup {
  background-color: red;
  padding: 20px;
  border: 1px solid black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
</style>
