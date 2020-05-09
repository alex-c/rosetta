<template>
  <div id="home">
    <div id="project-wizard">
      <div id="wizard-title">Welcome to Rosetta!</div>
      <div id="wizard-body">
        <TimelineWizard>
          <TimelineStep icon="folder-open">
            <span>Select a directory to open a i18n project:</span>
            <div class="center" style="margin-top: 8px;">
              <Button icon="folder-open" @click="openDirectoryDialog">Select Directory</Button>
              <input ref="directoryDialog" type="file" webkitdirectory hidden />
            </div>
          </TimelineStep>
          <TimelineStep icon="format-font">
            <span>Select a i18n format:</span>
            <div class="center" style="margin-top: 8px;">
              <select>
                <option>vue-i18n</option>
              </select>
            </div>
          </TimelineStep>
          <TimelineStep icon="bookmark">
            <span>Enter a name to bookmark this project:</span>
            <div class="center" style="margin-top: 8px;">
              <input type="text" placeholder="Project name" />
            </div>
          </TimelineStep>
        </TimelineWizard>
        <!--div class="wizard-section">
          Select a folder to open a translation project:
          <div class="center"><Button icon="folder-open" @click="openDirectoryDialog">Select Directory</Button></div>
          <input ref="directoryDialog" type="file" webkitdirectory hidden />
        </div>
        <div class="wizard-section">
          Select an internationalization format:
          <select>
            <option>vue-i18n</option>
          </select>
        </div>
        <div class="wizard-section">
          If you want to bookmark this project, enter a name:
          <input type="text" />
        </div-->
      </div>
    </div>
  </div>
</template>

<script>
import TimelineWizard from '@/components/TimelineWizard.vue';
import TimelineStep from '@/components/TimelineStep.vue';

export default {
  name: 'home',
  components: { TimelineWizard, TimelineStep },
  methods: {
    openDirectoryDialog: function() {
      this.$refs.directoryDialog.click();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';

#home {
  width: 100%;
  height: 100%;
}

#project-wizard {
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -200px;
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
