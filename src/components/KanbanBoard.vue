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
      >
      </list>

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
