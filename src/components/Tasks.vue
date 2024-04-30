<template>
  <div class="tasks">
    <h2>Tasks</h2>
    <div v-for="(list, listIndex) in lists" :key="listIndex">
      <div v-for="(card, cardIndex) in list.cards" :key="cardIndex">
        <h4  v-if="card.tasks && card.tasks.length > 0"></h4>
        <div v-if="card.tasks && card.tasks.length > 0">
          <div v-for="(task, taskIndex) in card.tasks" :key="taskIndex">
            <p v-if="!task.completed"class="event-title"> {{list.title}} -  {{ card.text }} - {{ task.title }} </p>
            <p v-if="!task.completed"class="event-datetime"> {{ formatDateTime(card.dueDateTime)}} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      required: true,
    }
  },
  methods:{
   formatDateTime(dateTime) {
            if (!dateTime) return '';
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            const date = new Date(dateTime);
            const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
            const formattedDate = date.toLocaleDateString('en-US', options);
            return `${formattedTime}, ${formattedDate}`;
            },
  },
};
</script>

<style scoped>
  @import '@/assets/input.css';

</style>
