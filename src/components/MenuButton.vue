<template>
  <div class="menu-button" @click="$emit('click')">
    <span class="mdi" :class="['mdi-' + icon]" />
  </div>
</template>

<script>
export default {
  name: 'menu-button',
  props: {
    icon: String,
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';

.menu-button {
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
}
</style>
