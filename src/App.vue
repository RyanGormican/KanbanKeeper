<!-- App.vue -->
<template>
  <div id="app">
    <div className="links">
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
  export default {
  name: 'App',
  components: {
  KanbanBoard,
  Icon
  },
  data() {
  return {
  lists: [
  { title: 'To Do', cards: [{ text: 'Task 1' }, { text: 'Task 2' }] },
  { title: 'In Progress', cards: [{ text: 'Task 3' }, { text: 'Task 4' }] },
  { title: 'Done', cards: [{ text: 'Task 5' }, { text: 'Task 6' }] }
  ]
  };
  }
  };
</script>
<style>
  @import '@/assets/input.css';

</style>