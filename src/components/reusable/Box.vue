<template>
  <div class="box" :style="{ width }">
    <div class="box-title" v-if="title !== undefined">{{ title }}</div>
    <div class="box-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'box',
  props: ['title', 'width'],
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.box {
  text-align: left;
  background-color: $color-bg-view;
  border: 1px solid $color-dark-border;
  border-radius: 5px;
}

.box-title {
  padding: 8px;
  font-size: 16px;
  background-color: $color-bg-app;
  border-bottom: 1px solid $color-primary;
  border-radius: 5px 5px 0px 0px;
}
</style>
