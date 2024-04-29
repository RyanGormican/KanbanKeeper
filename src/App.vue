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

      <div class="toggle-buttons">
        <button @click="toggleView('list')">
          <Icon icon="ph:list" color="#000" width="24" />
        </button>
        <button @click="toggleView('calendar')">
          <Icon icon="mdi:calendar" color="#000" width="24" />
        </button>
        <button @click="toggleView('tasks')">
          <Icon icon="carbon:checkmark-filled" color="#000" width="24" />
        </button>
        <button @click="toggleView('utility')">
          <Icon icon="mdi:wrench" color="#000" width="24" />
        </button>
      </div>

      <hr style="border: none; border-top: 2px solid #000;">

        <div v-if="currentView === 'list'">
          <kanban-board ref="kanbanBoard":lists="lists"   @showCardModal="showCardModal"</kanban-board>
        </div>
        <div v-else-if="currentView === 'calendar'">
          <calendar :lists="lists" @task-selected="handleTaskSelected"></calendar>
        </div>
        <div v-else-if="currentView === 'utility'">
          <utility :lists="lists" @updateLists="handleListUpdate" />
        </div>
      </div>
</template>

<script>
  import KanbanBoard from './components/KanbanBoard.vue';
  import Calendar from './components/Calendar.vue';
  import Utility from './components/Utility.vue';
  import { Icon } from '@iconify/vue';
  import KanbanKeeper from './KanbanKeeper.ts';

  export default {
  name: 'App',
  components: {
  KanbanBoard,
  Icon,
  Calendar,
  Utility,
  },
  data() {
  return {
  lists: KanbanKeeper.getLists(),
  currentView: 'list',
  };
  },
  methods: {
  saveLists(lists) {
  this.lists = lists;
  KanbanKeeper.saveLists(this.lists);
  },
  handleTaskSelected(selectedTask) {
  // Switch to the board view
  this.currentView = 'list';
  this.$emit('show-card-modal', { card: selectedTask, listIndex: selectedTask.listIndex, cardIndex: selectedTask.cardIndex });
  

  },

  toggleView(view) {
  this.currentView = view;
  },
  handleListUpdate(newList) { // Method to handle updated list data from Utility.vue
  this.lists = newList;
  }
  },
  watch: {
  lists: {
  handler: 'saveLists',
  deep: true,
  },
  },
  };
</script>

<style>
  @import '@/assets/input.css';
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
