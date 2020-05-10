<template>
  <div id="home">
    <div id="project-wizard">
      <div id="wizard-title">Welcome to Rosetta!</div>
      <div id="wizard-body">
        <TimelineWizard>
          <TimelineStep icon="folder-open">
            <span>Select a directory to open an i18n project:</span>
            <div class="center" style="margin-top: 8px;">
              <InputGroup>
                <input class="input" type="text" placeholder="Directory path..." v-model="directory" />
                <Button icon="folder-open" @click="openDirectoryDialog">Select Directory</Button>
              </InputGroup>
            </div>
          </TimelineStep>
          <TimelineStep icon="format-font">
            <span>Select an i18n format:</span>
            <div class="center" style="margin-top: 8px;">
              <InputGroup>
                <Select :options="[{ label: 'i18n JSON', value: 'i18n JSON' }]" />
              </InputGroup>
            </div>
          </TimelineStep>
          <TimelineStep icon="bookmark">
            <span>Enter a name, if you want to bookmark this project:</span>
            <div class="center" style="margin-top: 8px;">
              <InputGroup>
                <input class="input" type="text" placeholder="Project name..." />
              </InputGroup>
            </div>
          </TimelineStep>
          <TimelineStep icon="check">
            <div class="center">
              <Button icon="translate" @click="loadProject">Start translating!</Button>
            </div>
          </TimelineStep>
        </TimelineWizard>
      </div>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron';

import TimelineWizard from '@/components/TimelineWizard.vue';
import TimelineStep from '@/components/TimelineStep.vue';

export default {
  name: 'home',
  components: { TimelineWizard, TimelineStep },
  data() {
    return {
      directory: '',
    };
  },
  methods: {
    openDirectoryDialog: function() {
      const selection = remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      });
      if (selection !== undefined) {
        this.directory = selection[0];
      }
    },
    loadProject: function() {},
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';

#home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#project-wizard {
  width: 500px;
  background-color: $color-bg-view;
  border-radius: 5px;
}

#wizard-title {
  padding: 8px;
  font-size: 16px;
  background-color: $color-bg-app;
  border-bottom: 1px solid $color-primary;
  border-radius: 5px 5px 0px 0px;
}

.wizard-section {
  margin: 16px;
}
</style>
