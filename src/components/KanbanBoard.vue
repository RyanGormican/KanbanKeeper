<template>
  <div class="kanban-board">
    <div class="lists-container">
      <List
        v-for="(list, index) in lists"
        :key="index"
        :title="list.title"
        :cards="list.cards"
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
            <Icon icon="fluent-mdl2:date-time"/> {{ formattedDueDateTime }}</p>
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
    lists: Array
  },
  data() {
    return {
      selectedCard: null,
      editing: false,
      editedText: '',
      editedDueDateTime: '',
      isModalOpen: false // Track the visibility of the modal
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
      this.$emit('list-added', newList);
    },
    moveCard({ fromListIndex, toListIndex, fromCardIndex }) {
      this.$emit('card-moved', { fromListIndex, toListIndex, fromCardIndex });
    },
    deleteList(listIndex) {
      this.$emit('list-deleted', listIndex);
    },
    showCardModal(card) {
      this.selectedCard = card;
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
    }
  }
};
</script>

<style scoped="">
/* Modal styling */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
