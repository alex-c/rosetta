<template>
  <div id="app">
    <Titlebar />
    <div id="workspace" :class="{ expanded: workspaceExpanded }">
      <router-view />
    </div>
    <Sidebar @collapsed="resize" />
  </div>
</template>

<script>
import Titlebar from '@/components/Titlebar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'app',
  components: { Titlebar, Sidebar },
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
@import './style/classes.scss';
@import './assets/fonts/fonts.css';

#app {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  font-family: sf_ui_textregular, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  text-align: center;
  background-color: $color-bg-screen;
  color: white;
  text-shadow: 1px 1px 1px $color-bg-screen;
}

#titlebar {
  height: 32px;
  font-family: metropolisregular, sans-serif;
}

#workspace {
  position: fixed;
  left: 341px;
  top: 32px;
  right: 0px;
  bottom: 0px;
  text-align: left;
  border-top: 1px solid $color-dark-border;
  &.expanded {
    left: 41px;
  }
  overflow: auto;
}
</style>
