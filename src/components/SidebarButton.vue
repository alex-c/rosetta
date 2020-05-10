<template>
  <div class="sidebar-button" @click="$emit('click', menu)" :class="{ active: menu === active }">
    <span class="mdi" :class="['mdi-' + icon]" />
  </div>
</template>

<script>
export default {
  name: 'sidebar-button',
  props: {
    icon: String,
    menu: String,
    active: String,
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';

.sidebar-button {
  float: left;
  width: 40px;
  height: 40px;
  font-size: 24px;
  & > .mdi:before {
    width: 24px;
    height: 24px;
    margin: 8px;
  }
  &:hover {
    cursor: pointer;
    background-color: $color-bg-content;
  }
  &.active {
    color: $color-primary;
  }
}
</style>
