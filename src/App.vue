<template>
  <div
    id="app"
    class="container"
  >
    <img
      alt="Vue logo"
      src="./assets/logo.png"
      class="logo"
    >
    <todo-list />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList
  },

};
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
