<!-- KanbanBoard.vue -->
<template>
  <div class="kanban-board">
    <div class="lists-container">
      <list
     v-for="(list, index) in lists"
     :key="index"
     :title="list.title"
     :cards="list.cards"
     :listIndex="index"
      @list-updated="updateCardText"
      @list-title-updated="updateListText"
      >
      </list>
      <div class="add-list" @click="addList">+</div>
    </div>
  </div>
</template>

<script>
  import List from './List.vue';
  import { reactive } from 'vue';

  export default {
  name: 'KanbanBoard',
  components: {
  List
  },
  props: {
  lists: Array
  },
  methods: {
  updateCardText({ newText, listIndex, cardIndex }) {
  this.lists[listIndex].cards[cardIndex].text = newText;
  },
  updateListText({ newTitle, listIndex}) {
  this.lists[listIndex].title = newTitle;
  },
  addList() {
  const newList = {
  title: 'New List',
  cards: []
  };
  this.lists.push(newList);
  }
  }
  };
</script>

<style scoped="">
  .kanban-board {

  }

  .lists-container {
  display: flex;
  overflow-x: auto; 
  }

  .list {
  flex: 0 0 auto; 
  margin-right: 20px; 
  }
</style>
