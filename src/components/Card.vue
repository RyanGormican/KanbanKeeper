<template>
  <div class="card" draggable="true" @dragstart="onDragStart">
    <div>
      <p v-if="!editing" @click="startEditing">{{ text }}</p>
      <!-- Click handler for card text -->
      <input v-if="editing" v-model="editedText" @blur="saveChanges" @keyup.enter="saveChanges">
    </div>
    <div>
      <input type="date" :value="formattedDueDate" v-if="editing" @input="updateDueDate" class="due-date-input">
        <p v-if="dueDate">{{ formattedDueDate }}</p>
      </div>
  </div>
</template>

<script>
  export default {
  name: 'Card',
  props: {
  text: String,
  listIndex: Number,
  cardIndex: Number,
  dueDate: String 
  },
  data() {
  return {
  editing: false,
  editedText: this.text
  };
  },
  computed: {
  formattedDueDate() {
  return this.dueDate ? new Date(this.dueDate).toISOString().split('T')[0] : '';
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
  updateDueDate(event) {
  const newDueDate = event.target.value;
  this.$emit('due-date-updated', { newDueDate, listIndex: this.listIndex, cardIndex: this.cardIndex });
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
