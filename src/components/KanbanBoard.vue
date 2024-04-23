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
      <div class="add-list" @click="addList">+</div>
    </div>
  </div>
</template>

<script>
import List from './List.vue';

export default {
  name: 'KanbanBoard',
  components: {
    List
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
.kanban-board {}

.lists-container {
  display: flex;
  overflow-x: auto;
  font-size: 1.2rem;
}

.add-list {
  flex: 0 0 auto;
  margin-right: 20px;
  cursor: pointer;
  font-size: 1.5rem;
  padding-left: 30px;
}
</style>
