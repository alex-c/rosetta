<template>
  <div id="app">
    <Titlebar />
    <div id="screen">
      <Menu @collapsed="resize" />
      <div id="workspace" :class="{ expanded: workspaceExpanded }">
        Translations
      </div>
    </div>
  </div>
</template>

<script>
import Titlebar from '@/components/Titlebar.vue';
import Menu from '@/components/Menu.vue';

export default {
  name: 'app',
  components: { Titlebar, Menu },
  data() {
    return {
      workspaceExpanded: false,
    };
  },
  methods: {
    resize: function(collapsed) {
      this.workspaceExpanded = collapsed;
    },
  },
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
  background-color: $color-bg-screen;
  color: white;
}

#titlebar {
  height: 32px;
}

#screen {
  width: 100%;
  height: calc(100% - 32px);
}

#workspace {
  margin-left: 241px;
  padding: 16px;
  text-align: left;
  &.expanded {
    margin-left: 41px;
  }
}
</style>
