<template>
  <div class="calendar-container">
    <!-- Left 50% for the calendar view -->
    <div class="calendar">
      <h2>Calendar</h2>
      <!-- Navigation controls -->
      <div class="calendar-controls">
        <button @click="previousMonth">&lt;</button>
        <div>{{ monthNames[currentMonth] }} {{ currentYear }}</div>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="calendar-table">
        <div class="calendar-header">
          <div class="calendar-cell" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
        </div>
        <div class="calendar-body">
          <div
            class="calendar-row"
            v-for="(week, index) in weeks"
            :key="index"
          >
            <div
              class="calendar-cell"
              v-for="day in week"
              :key="day"
             :class="{ 'empty': day === '', 'selected': day === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear }"
              @click="selectDay(day)"
            >
              {{ day === '' ? '' : day }}
              <span class="due-count">{{ getDueCount(day) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Right 50% for the list of events -->
    <div class="events-container">
      <h2>Tasks</h2>
      <div v-if="filteredTasks.length > 0">
        <div v-for="(task, index) in filteredTasks" :key="index" class="event">
          <div class="event-title">{{ task.listTitle }} - {{ task.cardText }}</div>
      <div class="event-datetime">{{ formatDateTime(task.dueDateTime) }}</div>

        </div>
      </div>
      <div v-else>
        <p>No cards with due dates</p>
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
  data() {
    return {
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      currentMonth: (new Date()).getMonth(),
      currentYear: (new Date()).getFullYear(),
      selectedDay: null
    };
  },
  computed: {
    tasksWithDueDates() {
      // Flatten the lists and filter out cards without a dueDateTime
      return this.lists.flatMap(list => list.cards.filter(card => card.dueDateTime));
    },
  sortedTasks() {
  // Flatten the lists and filter out cards without a dueDateTime
  const tasksWithDueDates = this.lists.flatMap(list => list.cards.filter(card => card.dueDateTime));

  // Filter tasks to include only those with due dates in the future if no day is selected
  let filteredTasks = [];
  if (!this.selectedDay) {
    filteredTasks = tasksWithDueDates.filter(task => new Date(task.dueDateTime) > new Date());
  } else {
    filteredTasks = tasksWithDueDates;
  }

  // Map each task to an object containing the list title, card text, and dueDateTime
  return filteredTasks.map(task => {
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
},
  filteredTasks() {
    // Filter tasks based on the selected day
    if (this.selectedDay !== null) {
      const selectedDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      return this.sortedTasks.filter(task => task.dueDateTime.includes(selectedDateStr));
    } else {
      // If no day is selected, filter out past events
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      return this.sortedTasks.filter(task => task.dueDateTime.includes(todayStr) || new Date(task.dueDateTime) > now);
    }
  },
    weeks() {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const totalWeeks = Math.ceil((firstDayOfMonth + daysInMonth) / 7);

      const weeks = [];
      let dayCount = 1;

      for (let i = 0; i < totalWeeks; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j >= firstDayOfMonth) || (i > 0 && dayCount <= daysInMonth)) {
            week.push(dayCount++);
          } else {
            week.push('');
          }
        }
        weeks.push(week);
      }

      return weeks;
    }
  },
  methods: {
 formatDateTime(dateTime) {
  if (!dateTime) return '';
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const date = new Date(dateTime);
  const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  const formattedDate = date.toLocaleDateString('en-US', options);
  return `${formattedTime}, ${formattedDate}`;
},




getDueCount(day) {
      if (day === '') return 0;
      const dueDate = new Date(this.currentYear, this.currentMonth, day);
      const dueDateStr = dueDate.toISOString().split('T')[0]; // Convert to ISO string and get date part only
      return this.tasksWithDueDates.filter(task => task.dueDateTime.includes(dueDateStr)).length;
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if  (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
  selectDay(day) {
  // Toggle selection if clicking on the same day
  if (this.selectedDay === day && this.selectedMonth === this.currentMonth && this.selectedYear === this.currentYear) {
    this.selectedDay = null;
    this.selectedMonth = null;
    this.selectedYear = null;
  } else {
    // Set the selected day, month, and year to the clicked day
    this.selectedDay = day;
    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.currentYear;
  }
}


  }
};
</script>

<style scoped>
.calendar-container {
  display: flex;
  width: 100%;
  align-items: flex-start;
}

.calendar-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.calendar-controls button {
  background: none;
  border: none;
  cursor: pointer;
}

.calendar {
  width: 50%;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
}

.events-container {
  width: 50%;
  padding: 20px;
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

.calendar-table {
  display: table;
  width: 100%;
}

.calendar-header {
  display: table-row;
}

.calendar-body {
  display: table-row-group;
}

.calendar-row {
  display: table-row;
}

.calendar-cell {
  display: table-cell;
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
}

.due-count {
  display: block;
  font-size: 10px;
  color: #999;
}

.empty {
  visibility: hidden;
}

.selected {
  background-color: #cce6ff;
}
</style>

