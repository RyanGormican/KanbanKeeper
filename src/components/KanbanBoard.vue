<template>
  <div class="kanban-board">
    <div class="lists-container">
      <List
        v-for="(list, index) in lists"
        :key="index"
        :title="list.title"
        :cards="list.cards"
        :listIndex="index"
        @list-updated="updateCardText"
        @list-title-updated="updateListText"
        @move-card="moveCard"
        @delete-list="deleteList"
      ></List>
       <Icon icon="ci:list-add" width="50" @click="addList"/>
    </div>

  </div>
</template>

<script>
import List from './List.vue';
import { Icon } from '@iconify/vue';
export default {
  name: 'KanbanBoard',
  components: {
    List,
    Icon
  },
  props: {
    lists: Array
  },
  methods: {
    updateCardText({ newText, listIndex, cardIndex }) {
      this.lists[listIndex].cards[cardIndex].text = newText;
    },
    updateListText({ newTitle, listIndex }) {
      this.lists[listIndex].title = newTitle;
    },
    addList() {
      const newList = {
        title: 'New List',
        cards: []
      };
      this.lists.push(newList);
    },
    moveCard({ fromListIndex, toListIndex, fromCardIndex }) {
      const card = this.lists[fromListIndex].cards.splice(fromCardIndex, 1)[0];
      this.lists[toListIndex].cards.splice(fromCardIndex, 0, card); // Insert the card at the appropriate index in the destination list
    },
    deleteList(listIndex) {
      this.lists.splice(listIndex, 1); // Remove the list at the specified index
    }
  }
};
</script>

<style scoped="">
  @import '@/assets/input.css';
</style>
