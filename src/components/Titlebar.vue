<template>
  <div id="titlebar">
    <img src="../assets/icons/R-32.png" />
    <div id="title">Rosetta</div>
    <div id="actions">
      <TitlebarAction icon="window-minimize" @click="minimize" />
      <TitlebarAction icon="window-restore" @click="restore" v-if="maximized" />
      <TitlebarAction icon="window-maximize" @click="maximize" v-else />
      <TitlebarAction icon="window-close" @click="close" />
    </div>
  </div>
</template>

<script>
import { remote } from 'electron';
import TitlebarAction from './TitlebarAction.vue';

export default {
  name: 'titlebar',
  components: { TitlebarAction },
  data() {
    const window = remote.getCurrentWindow();
    return {
      window: window,
      maximized: window.isMaximized(),
    };
  },
  methods: {
    minimize: function() {
      this.window.minimize();
    },
    maximize: function() {
      this.window.maximize();
    },
    restore: function() {
      this.window.unmaximize();
    },
    close: function() {
      this.window.close();
    },
  },
  mounted() {
    this.window.on('maximize', () => {
      this.maximized = true;
    });
    this.window.on('unmaximize', () => {
      this.maximized = false;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';

#titlebar {
  display: flex;
  background-color: $color-bg-content;
  text-align: left;
}

#title {
  flex-grow: 1;
  font-size: 16px;
  padding: 8px;
  -webkit-app-region: drag;
}

#actions {
  display: flex;
}
</style>
