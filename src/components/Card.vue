<template>
  <div class="card" draggable="true" @dragstart="onDragStart" @dblclick="toggleEditMode">
    <p v-if="!editing" @click="toggleEditMode">{{ text }}</p>
    <input v-if="editing" v-model="editedText" @blur="saveChanges" @keyup.enter="saveChanges">
  </div>
</template>

<script>
  export default {
  name: 'Card',
  props: {
  text: String,
  listIndex: Number,
  cardIndex: Number
  },
  data() {
  return {
  editing: false,
  editedText: this.text
  };
  },
  methods: {
  toggleEditMode() {
  this.editing = !this.editing;
  if (this.editing) {
  this.$nextTick(() => {
  this.$el.querySelector('input').focus();
  });
  }
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
