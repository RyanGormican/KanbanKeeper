<!-- App.vue -->
<template>
  <div id="app">
    <div class="links">
      <a href="https://www.linkedin.com/in/ryangormican/">
        <Icon icon="mdi:linkedin" color="#0e76a8" width="60" />
      </a>
      <a href="https://github.com/RyanGormican/KanbanKeeper">
        <Icon icon="mdi:github" color="#e8eaea" width="60" />
      </a>
      <a href="https://ryangormicanportfoliohub.vercel.app/">
        <Icon icon="teenyicons:computer-outline" color="#199c35" width="60" />
      </a>
    </div>
    <div class="title">
      <h1> KanbanKeeper</h1>
    </div>
    <kanban-board :lists="lists"></kanban-board>
  </div>
</template>

<script>
  import KanbanBoard from './components/KanbanBoard.vue';
  import { Icon } from '@iconify/vue';
  import KanbanKeeper from './KanbanKeeper.ts'; // Import KanbanKeeper

  export default {
  name: 'App',
  components: {
  KanbanBoard,
  Icon
  },
  data() {
  return {
  lists: KanbanKeeper.getLists()
  };
  },
  methods: {
  saveLists(lists) {
  this.lists = lists; 
  KanbanKeeper.saveLists(lists); 
  }
  }
  };
</script>

<style>
  @import '@/assets/input.css';
</style>
