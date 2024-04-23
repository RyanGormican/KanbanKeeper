<template>
  <div class="card" draggable="true" @dragstart="onDragStart">
    <div>
      <p v-if="!editing" @click="startEditing">{{ text }}</p>
      <!-- Click handler for card text -->
      <input v-if="editing" v-model="editedText" @blur="saveChanges" @keyup.enter="saveChanges">
    </div>
    <div>
      <input type="datetime-local" :value="formattedDueDateTime" v-if="editing" @input="updateDueDateTime" class="due-date-input">
        <!-- Display formatted due date time -->
        <p v-if="dueDateTime">
          <Icon icon="fluent-mdl2:date-time"/> {{ formattedDueDateTime }}</p>
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
  listIndex: Number,
  cardIndex: Number,
  dueDateTime: String
  },
  data() {
  return {
  editing: false,
  editedText: this.text
  };
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
  }
  },
  methods: {
  startEditing(event) {
  if (!this.editing && !event.target.classList.contains('due-date-input')) {
  this.editing = true;
  this.$nextTick(() => {
  const inputElement = this.$el.querySelector('input[type="text"]');
  if (inputElement) {
  inputElement.focus();
  }
  });
  }
  },
  updateDueDateTime(event) {
  const newDueDateTime = event.target.value;
  this.$emit('due-date-time-updated', { newDueDateTime, listIndex: this.listIndex, cardIndex: this.cardIndex });
  },
  saveChanges() {
  this.$emit('card-text-updated', { newText: this.editedText, listIndex: this.listIndex, cardIndex: this.cardIndex });
  this.editing = false;
  },
  onDragStart(event) {
  event.dataTransfer.setData('text/plain', JSON.stringify({ listIndex: this.listIndex, cardIndex: this.cardIndex }));
  }
  }
  };
</script>

<style>
  @import '@/assets/input.css';
</style>
