<template>
  <div>
    <button>
   <label for="fileInput">
      <Icon icon="mdi:import" width="24" style="cursor: pointer;" />
    </label>
    IMPORT
    </button>
    <input type="file" accept=".json" id="fileInput" hidden ref="fileInput" @change="handleFileUpload" />
     <button @click="downloadList">
    <Icon icon="mdi:export" width="24" />
    EXPORT
    </button>
  </div>
</template>

<script>
 import { Icon } from '@iconify/vue';
export default {
  props: {
    lists: Array, 
  },
  components:{
    Icon,
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        this.$emit('updateLists', data);
      };
      reader.readAsText(file);
    },
    downloadList() {
      const listData = JSON.stringify(this.lists);
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(new Blob([listData], { type: 'text/plain' }));
      downloadLink.download = 'kanban-list.json'; // Set download filename
      downloadLink.click();
    },
  },
};
</script>

<style scoped>

</style>
