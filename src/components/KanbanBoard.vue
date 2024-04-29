<template>
  <div class="kanban-board">
    <!-- Search bar -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search cards by text">
    </div>

    <div class="lists-container">
      <List
      v-for="(list, index) in filteredLists"
      :key="index"
      :title="list.title"
      :cards="list.filteredCards"
      :listIndex="index"
      @list-updated="updateCardText"
      @list-title-updated="updateListText"
      @move-card="moveCard"
      @delete-list="deleteList"
      @card-selected="showCardModal"
></List>

      <Icon icon="ci:list-add" width="50" @click="addList"/>
    </div>

    <!-- Modal for displaying selected card details -->
    <div class="modal" v-if="selectedCard">
      <div class="modal-content">
        <span class="close" @click="closeCardModal">&times;</span>
        <div>
          <p v-if="!editing" @click="startEditing">{{ selectedCard.text }}</p>
          <input v-if="editing" v-model="editedText" @blur="saveChanges" @keyup.enter="saveChanges">
        </div>
        <div>
          <input type="datetime-local" :value="formattedDueDateTime" v-if="editing" @input="updateDueDateTime" class="due-date-input">
            <p v-if="!editing && selectedCard.dueDateTime"  @click="startEditing">
              <Icon icon="fluent-mdl2:date-time"/> {{ formattedDueDateTime }}
            </p>
          </div>
        <Icon icon="mdi:trash-can-outline" width="20" @click.stop="showDeletePopup = true" />
        <!-- Delete card confirmation popup -->
        <div v-if="showDeletePopup" class="delete-popup">
          <p>Are you sure you want to delete this card?</p>
          <button @click="deleteCardFromModal">Delete</button>
          <button @click="cancelDelete">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import List from './List.vue';
  import { Icon } from '@iconify/vue';

  export default {
  name: 'KanbanBoard',
  components: {
  List,
  Icon
  },
  props: {
  lists: Array,
  index: Number,
  cardIndex:Number,
  selectedListIndex: Number,
  selectedCardIndex: Number
  },
  data() {
  return {
  selectedCard: null,
  editing: false,
  editedText: '',
  selectedListIndex: null,
  selectedCardIndex: null,
  editedDueDateTime: '',
  searchQuery: '',
  showDeletePopup: false 
  };
  },
  methods: {
  updateCardText({ newText, listIndex, cardIndex }) {
  this.$emit('list-updated', { newText, listIndex, cardIndex });
  },
  updateListText({ newTitle, listIndex }) {
  this.$emit('list-title-updated', { newTitle, listIndex });
  },
  addList() {
  const newList = {
  title: 'New List',
  cards: []
  };
  this.lists.push(newList);
  },
  moveCard({ fromListIndex, toListIndex, fromCardIndex }) {
  this.$emit('card-moved', { fromListIndex, toListIndex, fromCardIndex });
  },
  deleteList(listIndex) {
  this.lists.splice(listIndex, 1);
  },
  showCardModal(card, listIndex, cardIndex) {
  this.selectedCard = card;
  this.selectedListIndex = listIndex;
  this.selectedCardIndex = cardIndex;
  this.showDeletePopup = false;
  this.isModalOpen = true;
  },

  closeCardModal() {
  this.selectedCard = null;
  this.isModalOpen = false;
  },
  startEditing() {
  this.editing = true;
  this.editedText = this.selectedCard.text;
  this.editedDueDateTime = this.selectedCard.dueDateTime;
  },
  updateDueDateTime(event) {
  this.editedDueDateTime = event.target.value;
  },
  saveChanges() {
  this.selectedCard.text = this.editedText;
  this.selectedCard.dueDateTime = this.editedDueDateTime;
  this.editing = false;
  },
  deleteCardFromModal() {
  // Emit an event to delete the selected card
  this.lists[this.selectedListIndex].cards.splice(this.selectedCardIndex, 1);
  this.showDeletePopup = false;
  this.closeCardModal(); // Close the modal after deleting the card
  },


  cancelDelete() {
  // Cancel delete action, hide the delete confirmation popup
  this.showDeletePopup = false;
  }
  },
  computed: {
  formattedDueDateTime() {
  if (this.selectedCard && this.selectedCard.dueDateTime) {
  const date = new Date(this.selectedCard.dueDateTime);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}`;
  } else {
  return '';
  }
  },
  filteredLists() {
  const trimmedQuery = this.searchQuery.trim();

  if (trimmedQuery === '') {
  // If searchQuery is empty, return the lists with all cards included
  return this.lists.map(list => ({
  ...list,
  filteredCards: list.cards
  }));
  }

  const lowercaseQuery = trimmedQuery.toLowerCase();
  return this.lists.map(list => {
  const filteredCards = list.cards.filter(card => card.text && card.text.toLowerCase().includes(lowercaseQuery));
  return {
  ...list,
  filteredCards
  };
  }).filter(list => list.filteredCards?.length > 0);
  }
  }
  };
</script>

<style scoped="">
  @import '@/assets/input.css';
</style>
