<template>
  <div class="button" :class="[sizeClass]" @click="$emit('click')">
    <span v-if="icon !== undefined" class="mdi" :class="'mdi-' + icon" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'button',
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
@import '@/style/colors.scss';

.button {
  display: inline-block;
  background-color: $color-bg-content;
  border: 1px solid $color-bg-view;
  box-shadow: 1px 1px 1px 0px $color-bg-app;
  &:hover {
    cursor: pointer;
    background-color: $color-bg-app;
  }
  &:active {
    border-color: $color-primary;
  }
  & > .mdi {
    margin-right: 6px;
  }
  &.regular {
    padding: 6px 10px;
    border-radius: 5px;
    font-size: 13px;
  }
  &.small {
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 12px;
  }
}
</style>
