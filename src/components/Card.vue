<template>
  <div class="card" draggable="true" @dragstart="onDragStart">
    <div>
      <p>{{ text }}</p>
    </div>
    <div>
      <p v-if="dueDateTime">
        <Icon icon="fluent-mdl2:date-time"/> {{ formattedDueDateTime }}
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
  cardIndex: Number
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
  onDragStart(event) {
  event.dataTransfer.setData('text/plain', JSON.stringify({ listIndex: this.listIndex, cardIndex: this.cardIndex }));
  }
  }
  };
</script>

<style scoped="">
  @import '@/assets/input.css';
</style>
