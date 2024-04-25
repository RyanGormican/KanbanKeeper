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
    <hr style="border: none; border-top: 2px solid #000;">

      <!-- Add the buttons here -->
      <div class="toggle-buttons">
        <button @click="toggleView('list')">
          <Icon icon="ph:list" color="#000" width="24" />
        </button>
        <button @click="toggleView('calendar')">
          <Icon icon="mdi:calendar" color="#000" width="24" />
        </button>
      </div>

      <hr style="border: none; border-top: 2px solid #000;">

        <!-- Conditionally render either the kanban board or calendar -->
        <div v-if="currentView === 'list'">
          <kanban-board :lists="lists"></kanban-board>
        </div>
        <div v-else-if="currentView === 'calendar'">
          <!-- Your calendar component goes here -->
          <calendar :lists="lists"></calendar>
        </div>
      </div>
</template>

<script>
  import KanbanBoard from './components/KanbanBoard.vue';
  import Calendar from './components/Calendar.vue';
  import { Icon } from '@iconify/vue';
  import KanbanKeeper from './KanbanKeeper.ts';

  export default {
  name: 'App',
  components: {
  KanbanBoard,
  Icon,
  Calendar,
  },
  data() {
  return {
  lists: KanbanKeeper.getLists(),
  currentView: 'list'
  };
  },
  methods: {
  saveLists(lists) {
  this.lists = lists;
  KanbanKeeper.saveLists(this.lists);
  },
  toggleView(view) {
  this.currentView = view;
  }
  },
  watch: {
  lists: {
  handler: 'saveLists',
  deep: true
  }
  }
  };
</script>

<style>
  @import '@/assets/input.css';
  /* Add any styling for your toggle buttons here */
  .toggle-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  }
  .toggle-buttons button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  }
  .toggle-buttons button:hover {
  background-color: #f0f0f0;
  }
</style>
