<template>
  <div class="remaining">
    {{ plural }}
  </div>
</template>

<script>
export default {
  name: 'TodoItemsRemaining',
  props: {
    remaining: {
      type: Number,
      required: true
    }
  },
  computed: {
    plural() {
      return `${this.remaining} ${this.remaining === 1 ? 'task' : 'tasks'} left`;
    }
  }
};
</script>

<style>
.remaining {
  min-width: 100px;
}
</style>