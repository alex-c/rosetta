<template>
  <div :class="['button', sizeClass, typeClass]" @click="$emit('click')">
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
    type: String,
  },
  data() {
    return {
      sizeClass: this.size !== undefined ? this.size : 'regular-size',
      typeClass: this.type !== undefined ? this.type + '-area' : 'regular-type',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.button {
  display: inline-block;
  border: 1px solid $color-bg-view;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 0px $color-bg-app;
  &:hover {
    cursor: pointer;
  }
  & > .mdi {
    margin-right: 6px;
  }
  &.regular-size {
    padding: 6px 10px;
    border-radius: 5px;
    font-size: 13px;
  }
  &.regular-type {
    background-color: $color-bg-content;
    &:hover {
      cursor: pointer;
      background-color: $color-bg-app;
    }
  }
  &.small {
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 12px;
  }
}
</style>
