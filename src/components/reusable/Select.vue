<template>
  <div class="select" :class="{ open }" @click="open = !open" v-bind:value="selected">
    <div class="selected">{{ selected.label }}<span :class="['mdi', 'mdi-chevron-' + (open ? 'up' : 'down')]" /></div>
    <div class="options" v-show="open">
      <div class="option" v-for="option of options" :key="option.value" @click="select(option)">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: this.options.length > 0 ? this.options[0] : null,
      open: false,
    };
  },
  methods: {
    select(option) {
      this.selected = option;
      this.$emit('input', option);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.select {
  display: inline-block;
  position: relative;
  text-align: left;
  padding: 6px 10px;
  font-size: 13px;
  background-color: $color-bg-screen;
  border: 1px solid $color-bg-view;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 0px $color-bg-app;
  &:hover {
    cursor: pointer;
    background-color: $color-bg-app;
  }
  &.open {
    background-color: $color-bg-app;
    border-radius: 5px 5px 0px 0px;
  }
}

.selected > .mdi {
  float: right;
  margin-left: 6px;
}

.options {
  position: absolute;
  top: 30px;
  left: -1px;
  right: -1px;
  z-index: 1000;
  background-color: $color-bg-app;
  border: 1px solid $color-bg-view;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 1px 1px 1px 0px $color-bg-app;
}

.option {
  padding: 6px 10px;
  &:last-child {
    border-radius: 0px 0px 5px 5px;
  }
}

.option:hover {
  background-color: $color-bg-screen;
}
</style>
