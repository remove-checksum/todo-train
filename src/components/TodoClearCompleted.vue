<template>
  <button @click="clearCompleted">
    Clear completed
  </button>
</template>

<script>
export default {
  name: 'TodoClearCompleted',
  methods: {
    clearCompleted() {
      eventBus.$emit('clearCompleted');
    }
  }
};
</script>