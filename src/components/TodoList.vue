<template>
  <div>
    <div class="todo-header">
      <div class="check-all">
        <label>
          <input
            type="checkbox"
            :checked="todos.length === 0 ? false : !anyRemaining"
            @change="checkAllTodos"
          >
          Check All
        </label>
      </div>
      <input
        v-model="newTodo"
        type="text"
        class="todo-input"
        placeholder="type here"
        @keyup.enter="addTodo"
      >
    </div>
    <div class="todos-wrapper">
      <transition-group
        name="fade"
      >
        <todo-item
          v-for="(todo, index) in todosFiltered"
          :key="todo.id"
          :todo="todo"
          :index="index"
          :check-all="!anyRemaining"
          @removedTodo="removeTodo"
          @finishedEdit="finishEdit"
        />
      </transition-group>
    </div>
    <div class="todo-extra">
      <div>{{ plural }}</div>
      <div>
        <button
          :class="{ active: filter === 'all'}"
          @click="filter = 'all'"
        >
          All
        </button>
        <button
          :class="{ active: filter === 'active'}"
          @click="filter = 'active'"
        >
          Active
        </button>
        <button
          :class="{ active: filter === 'completed'}"
          @click="filter = 'completed'"
        >
          Completed
        </button>
      </div>
      <div>
        <transition name="fade">
          <button
            v-if="showClearCompleted"
            @click="clearCompleted"
          >
            Clear completed
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  data() {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
      filter: 'all',
      todos: [
        {
          id: 1,
          title: 'Finish project',
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: 'OOga booga',
          completed: false,
          editing: false
        }
      ],
    }
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    plural() {
      return `${this.remaining} ${this.remaining === 1 ? 'item' : 'items'} left`;
    },
    anyRemaining() {
      return this.remaining !== 0;
    },
    todosFiltered() {
      if (this.filter === 'all') {
        return this.todos;
      } else if (this.filter === 'active') {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.filter === 'completed') {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },
    showClearCompleted() {
      return this.todos.some((todo) => todo.completed)
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo === '') return;
      this.todos.unshift({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })
      this.newTodo = '';
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed)
    },
    finishEdit(data) {
      this.todos.splice(data.index, 1, data.todo)
    }
  },
};
</script>

<style lang="scss">
/* TODO: REFACTOR TO BEM */


button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  border-radius: 5px;
  border: 2px solid lightgray;

  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: 0;
  }
}

input[type="checkbox"] {
  justify-self: center;
}

.todo-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding-bottom: 6px;
}

.check-all {
  font-size: 16px;
  width: 20%;
  margin-right: 12px;
}

.todo-input {
  width: 100%;
  padding: 12px 6px;
  font-size: 18px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: #41b883;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.todos-wrapper {
  min-height: 200px;
  max-height: 400px;
  overflow: scroll;
}

.todo-item-label {
  padding: 12px;
  border: 1px solid white;
  margin-left: 12px;
  text-align: left;
  width: 100%;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;

  &:focus {
    outline: none;
  }
}
.completed {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}
.todo-extra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-bottom: 14px;
}

.active {
  background-color: #41b883;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
