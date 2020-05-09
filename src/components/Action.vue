<template>
  <div class="action" @click="$emit('click')">
    <span class="mdi mdi-" :class="['mdi-' + icon, sizeClass]" />
  </div>
</template>

<script>
export default {
  name: 'action',
  props: {
    icon: String,
    size: String,
  },
  data() {
    return {
      sizeClass: this.size !== undefined ? this.size : 'regular',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';

.action {
  font-size: 16px;
  width: 24px;
  height: 24px;
  margin: 4px;
  & > .mdi:before {
    width: 16px;
    height: 16px;
    margin: 4px;
  }
  &:hover {
    cursor: pointer;
    background-color: $color-bg-view;
  }
}
</style>
