<!-- KanbanBoard.vue -->
<template>
  <div class="kanban-board">
    <div class="lists-container">
      <list v-for="(list, index) in lists" :key="index" :title="list.title" :cards="list.cards"></list>
    </div>
  </div>
</template>

<script>
  import List from './List.vue';

  export default {
  name: 'KanbanBoard',
  components: {
  List
  },
  props: {
  lists: Array
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
