<template>
  <div class="check-all">
    <label>
      <input
        type="checkbox"
        :checked="length === 0 ? false : !remaining"
        @change="allChecked"
      >
      Check All
    </label>
  </div>
</template>

<script>
export default {
  name: 'TodoCheckAll',
  props: {
    remaining: {
      type: Boolean,
      required: true
    },
    length: {
      type: Number,
      required: true
    }
  },
  methods: {
    allChecked() {
      eventBus.$emit('checkAllChanged');
    }
  }
};
</script>

<style>

</style>