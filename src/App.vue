<template>
  <div id="app">
    <Titlebar />
    <div id="screen"><router-view /></div>
  </div>
</template>

<script>
import Titlebar from '@/components/Titlebar.vue';

export default {
  name: 'app',
  components: { Titlebar },
};
</script>

<style lang="scss">
@import './style/colors.scss';
@import './assets/fonts/fonts.css';

#app {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  font-family: metropolisregular, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  text-align: center;
  background-color: $color-bg-app;
  color: white;
}

#titlebar {
  height: 32px;
  background-color: $color-bg-view;
  text-align: left;
}
</style>
