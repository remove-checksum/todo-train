<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input
        v-model="completed"
        type="checkbox"
        @change="doneEdit"
      >
      <div
        v-if="!editing"
        class="todo-item-label"
        :class="{ completed: completed }"
        @dblclick="editTodo"
      >
        {{ title }}
      </div>
      <input
        v-else
        v-model="title"
        v-focus
        type="text"
        class="todo-item-edit"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
      >
    </div>
    <button
      @click="pluralize"
    >
      Pluralize
    </button>
    <button
      class="remove-item"
      @click="removeTodo(index)"
    >
      &times;
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: '',
    };
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  created() {
    eventBus.$on('pluralize', this.handlePluralize);
    eventBus.$on('checkAllTodos', this.handleCheckAll);
  },
  beforeDestroy() {
    eventBus.$off('pluralize', this.handlePluralize);
  },
  methods: {
    removeTodo(index) {
      eventBus.$emit('removedTodo', index);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if(this.title === '') this.title = this.beforeEditCache;
      this.editing = false;
      eventBus.$emit('finishedEdit', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    pluralize() {
      eventBus.$emit('pluralize');
    },
    handlePluralize() {
      this.title = this.title[this.title.length - 1] === 's' ? this.title.slice(0, -1) : `${this.title}s`;
      eventBus.$emit('finishedEdit', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      });
    }
  }
};
</script>