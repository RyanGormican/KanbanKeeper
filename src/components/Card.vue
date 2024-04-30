<template>
  <div class="card" draggable="true" @dragstart="onDragStart">
    <div>
      <p>{{ text }}</p>
    </div>
    <div class="card-info">
      <p v-if="dueDateTime">
        <Icon icon="mdi:calendar"/> {{ formattedDueDateTime }}
      </p>
      <p v-if="tasks && tasks.length > 0">
        <Icon icon="carbon:checkmark-filled"/> {{ completedTasksCount }} / {{ totalTasksCount }}
      </p>
    </div>
  </div>
</template>

<script>
  import { Icon } from '@iconify/vue';

  export default {
  name: 'Card',
  components: {
  Icon
  },
  props: {
  text: String,
  dueDateTime: String,
  listIndex: Number,
  cardIndex: Number,
  tasks: Array
  },
  computed: {
  formattedDueDateTime() {
  if (this.dueDateTime) {
  const date = new Date(this.dueDateTime);
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
  completedTasksCount() {
  if (!this.tasks) return 0;
  return this.tasks.filter(task => task.completed).length;
  },
  totalTasksCount() {
  return this.tasks ? this.tasks.length : 0;
  }
  },
  methods: {
  onDragStart(event) {
  event.dataTransfer.setData('text/plain', JSON.stringify({ listIndex: this.listIndex, cardIndex: this.cardIndex }));
  }
  }
  };
</script>

<style scoped="">
  @import '@/assets/input.css';
</style>
