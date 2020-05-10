<template>
  <div class="input-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'input-group',
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.input-group {
  display: inline-flex;
  width: 100%;
}

.input-group > .button {
  border-radius: 0px;
  border-left: 0px;
  &:first-child {
    border-radius: 3px 0px 0px 3px;
    border-left: 1px solid $color-bg-view;
  }
  &:last-child {
    border-radius: 0px 3px 3px 0px;
  }
}

.input-group > .input {
  flex-grow: 1;
  border-radius: 0px;
  border-left: 0px;
  &:first-child {
    border-radius: 5px 0px 0px 5px;
    border-left: 1px solid $color-bg-view;
  }
  &:last-child {
    border-radius: 0px 5px 5px 0px;
  }
  &:only-child {
    border-radius: 5px;
  }
}

.input-group > .select {
  flex-grow: 1;
  border-radius: 0px;
  border-left: 0px;
  &:first-child {
    border-radius: 5px 0px 0px 5px;
    border-left: 1px solid $color-bg-view;
    &.open {
      border-radius: 5px 0px 0px 0px;
    }
  }
  &:last-child {
    border-radius: 0px 5px 5px 0px;
    &.open {
      border-radius: 0px 5px 0px 0px;
    }
  }
  &:only-child {
    border-radius: 5px;
    &.open {
      border-radius: 5px 5px 0px 0px;
    }
  }
}
</style>
