<template>
  <div id="app">
    <div id="titlebar">
      <img src="./assets/icons/R-32.png" />
      Rosetta
    </div>
    <div id="screen"><router-view /></div>
  </div>
</template>

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
  text-align: center;
  background-color: $color-bg-app;
  color: white;
}

#titlebar {
  height: 32px;
  background-color: $color-bg-view;
  text-align: left;
}

#screen {
}
</style>
