<template>
  <div id="project-container">
    <div id="project">
      <div id="control">
        <div id="control-header">
          Keys
          <span class="mdi mdi-plus" @click="addKey" />
        </div>
        <input id="filter" type="text" placeholder="Filter..." v-model="filter" />
      </div>
      <div id="locales" ref="locales">
        <div v-for="locale in locales" :key="locale.name" class="locale">{{ locale.name }}</div>
      </div>
      <div id="keys" ref="keys">
        <Key v-for="key in keys" :key="key" :tKey="key" />
      </div>
      <div id="translations" @scroll="scroll">
        <div v-for="locale in locales" :key="locale.name" class="locale-translations">
          <div v-for="key in keys" :key="key" class="translation">{{ locale.translations[key] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Key from '@/components/Key.vue';

export default {
  name: 'project',
  components: { Key },
  data() {
    return {
      filter: '',
    };
  },
  computed: {
    locales() {
      return this.$store.getters.editedLocales;
    },
    keys() {
      return this.$store.getters.filteredKeys(this.filter);
    },
  },
  methods: {
    addKey: function() {
      this.$prompt({ title: 'New Key', message: 'Enter a new key:' }, newKey => {
        this.$store.commit('addKey', newKey);
      });
    },
    scroll: function(event) {
      this.$refs['locales'].scrollLeft = event.target.scrollLeft;
      this.$refs['keys'].scrollTop = event.target.scrollTop;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

#project-container {
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  padding: 16px;
  overflow: hidden;
}

#project {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 51px auto;
  justify-content: start;
  align-content: start;
}

#control {
  background-color: $color-bg-view;
  border-bottom: 1px solid $color-bg-app;
  border-right: 1px solid $color-bg-app;
}

#control-header {
  padding: 4px 4px 0px 4px;
  & > .mdi {
    float: right;
    &:hover {
      cursor: pointer;
      color: $color-primary;
    }
  }
}

#filter {
  width: calc(100% - 12px);
  margin: 4px;
  padding: 2px;
  border: none;
  outline: none;
  background-color: $color-bg-screen;
  color: white;
  font-family: inconsolatamedium, monospace;
  font-size: 13px;
}

#locales {
  display: flex;
  overflow: hidden;
  background-color: $color-bg-content;
  border-bottom: 1px solid $color-bg-app;
}

.locale {
  flex: 1 1 0;
  min-width: 200px;
  height: 100%;
  border-right: 1px solid $color-bg-app;
  &:last-child {
    border-right: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
}

#keys {
  overflow: hidden;
  background-color: $color-bg-content;
  border-right: 1px solid $color-bg-app;
  font-family: inconsolatamedium, monospace;
  font-size: 13px;
  text-shadow: none;
}

#translations {
  display: flex;
  overflow: auto;
  background-color: $color-bg-view;
  font-family: inconsolatamedium, monospace;
  font-size: 13px;
  text-shadow: none;
}

.locale-translations {
  flex: 1 1 0;
  min-width: 200px;
  border-right: 1px solid $color-bg-app;
  &:last-child {
    border-right: none;
  }
}

.translation {
  height: 14px;
  padding: 4px;
  border-bottom: 1px solid $color-bg-app;
  &:last-child {
    border-bottom: none;
  }
}
</style>
