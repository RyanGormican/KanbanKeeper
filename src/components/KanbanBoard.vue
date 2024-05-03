<template>
  <div class="kanban-board">
    <div class="kanban-controls">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search cards by text">
    </div>
      <div class="date-time-filter">
        <label for="start-date">Start Date:</label>
        <input type="datetime-local" id="start-date" v-model="startDate">
          <label for="end-date">End Date:</label>
          <input type="datetime-local" id="end-date" v-model="endDate">
            <button @click="clearDateRange">Clear</button>
          </div>


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
        <button @click="addTask">Add Task</button>
        <div v-if="selectedCard.tasks">
          <div v-for="(task, index) in selectedCard.tasks" :key="index">
            <input type="checkbox" v-model="task.completed" @change="toggleTaskCompletion(index)">
              <input type="text" v-model="task.title" @change="updateTaskTitle(index)">
                <Icon icon="mdi:delete" @click="deleteTask(index)" />
              </div>
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
  cardIndex: Number,
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
  showDeletePopup: false,
  startDate: null,
  endDate: null
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
  // Remove the card from the source list
  const movedCard = this.lists[fromListIndex].cards.splice(fromCardIndex, 1)[0];
  // Add the card to the target list
  this.lists[toListIndex].cards.push(movedCard);
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
  filterCardsByDateRange(cards) {
  if (!this.startDate || !this.endDate) return cards;

  const startDateTime = new Date(this.startDate).getTime();
  const endDateTime = new Date(this.endDate).getTime();

  return cards?.filter(card => {
  if (card.dueDateTime) {
  const cardDateTime = new Date(card.dueDateTime).getTime();
  return cardDateTime >= startDateTime && cardDateTime <= endDateTime;
    }
    return false;
    });
    },

    clearDateRange() {
    this.startDate = null;
    this.endDate = null;
    this.searchQuery='';
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
    this.lists[this.selectedListIndex].cards.splice(this.selectedCardIndex, 1);
    this.showDeletePopup = false;
    this.closeCardModal();
    },
    cancelDelete() {
    this.showDeletePopup = false;
    },
    addTask() {
    if (!this.selectedCard) return;
    if (!this.selectedCard.tasks) {
    this.selectedCard.tasks = [];
    }
    this.selectedCard.tasks.push({ title: 'New Task', completed: false });
    },



    toggleTaskCompletion(index) {

    },
    updateTaskTitle(index) {
    if (this.selectedCard && this.selectedCard.tasks && this.selectedCard.tasks[index]) {
  this.selectedCard.tasks[index].title = this.selectedCard.tasks[index].title.trim(); 
  }
  },

  deleteTask(index) {
  if (this.selectedCard && this.selectedCard.tasks) {
  this.selectedCard.tasks.splice(index, 1);
  }
  },

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
  // Trimmed search query
  const trimmedQuery = this.searchQuery.trim();

  // Check if searchQuery or startDate and endDate have a value
  if (!trimmedQuery && !(this.startDate && this.endDate)) {
    // If both searchQuery and date range are empty, return the full list with all cards
    return this.lists.map(list => {
      return {
        ...list,
        filteredCards: list.cards
      };
    });
  }


  const lowercaseQuery = trimmedQuery.toLowerCase();

  // Filter lists based on whether any of their cards match the search query and date range
  return this.lists.map(list => {
    // Apply search query filter
    let filteredCards = list.cards.filter(card => {
      return card.text.toLowerCase().includes(lowercaseQuery);
    });

    // Apply date range filter if start and end dates are set
    if (this.startDate && this.endDate) {
      const startDateTime = new Date(this.startDate).getTime();
      const endDateTime = new Date(this.endDate).getTime();

      filteredCards = filteredCards.filter(card => {
        if (!card.dueDateTime) return false;
        const cardDateTime = new Date(card.dueDateTime).getTime();
        return cardDateTime >= startDateTime && cardDateTime <= endDateTime;
      });
    }

    return {
      ...list,
      filteredCards
    };
  }).filter(list => {
    const hasMatchingCards = list.filteredCards.length > 0;
    const hasSearchQuery = trimmedQuery !== '';
    const hasDateRange = this.startDate && this.endDate;
    return hasMatchingCards || (hasSearchQuery && hasDateRange);
  });
}

    }
    };
  </script>

<style scoped="">
  @import '@/assets/input.css';
</style>

