<template>
  <div class="calendar">

    <div class="calendar-events">
      <div v-if="tasksWithDueDates.length > 0">
        <div v-for="(task, index) in sortedTasks" :key="index" class="event">
          <div class="event-title">{{ task.listTitle }} - {{ task.cardText }}</div>
          <div class="event-datetime">{{ formatDateTime(task.dueDateTime) }}</div>
        </div>
      </div>
      <div v-else>
        <p>No events with due dates</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  computed: {
    tasksWithDueDates() {
      // Flatten the lists and filter out cards without a dueDateTime
      return this.lists.flatMap(list => list.cards.filter(card => card.dueDateTime));
    },
    sortedTasks() {
      // Flatten the lists and filter out cards without a dueDateTime
      const tasksWithDueDates = this.lists.flatMap(list => list.cards.filter(card => card.dueDateTime));

      // Map each task to an object containing the list title, card text, and dueDateTime
      return tasksWithDueDates.map(task => {
        // Find the list that contains the task by iterating through the lists array
        for (const list of this.lists) {
          if (list.cards.includes(task)) {
            return {
              listTitle: list.title,
              cardText: task.text,
              dueDateTime: task.dueDateTime
            };
          }
        }
        // If the task is not found in any list, return null
        return null;
      }).filter(task => task !== null) // Filter out any null values
      .sort((a, b) => new Date(a.dueDateTime) - new Date(b.dueDateTime));
    }
  },
  methods: {
    formatDateTime(dateTime) {
      if (!dateTime) return '';
      const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateTime).toLocaleDateString('en-US', options);
    }
  }
};
</script>

<style scoped>
.calendar {
  width: 50%;
  float: right;
  padding: 20px;
}

.calendar-header {
  margin-bottom: 20px;
}

.calendar-events {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.event {
  margin-bottom: 10px;
}

.event-title {
  font-weight: bold;
}

.event-datetime {
  color: #666;
}
</style>
