<template>
  <div class="box">
    <div class="box-title">{{title}}</div>
    <div class="box-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'box',
  props: ['title'],
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.box {
  width: 500px;
  background-color: $color-bg-view;
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