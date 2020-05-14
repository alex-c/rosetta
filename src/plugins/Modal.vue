<template>
  <div class="modal-container" @click.self="close()">
    <Box :style="{ width }" :title="titleProp">
      <div class="modal-inner">
        {{ message }}
        <div class="prompt" v-if="type == 'prompt'">
          <input class="input" placeholder="" v-model="value" />
        </div>
        <div class="modal-buttons">
          <Button type="success" @click="confirm">Ok</Button>
          <Button @click="close">Cancel</Button>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['type', 'title', 'message', 'callback', 'width'],
  data() {
    return {
      value: '',
    };
  },
  computed: {
    widthStyle() {
      return this.width === undefined ? 'auto' : this.width;
    },
    titleProp() {
      return this.title;
    },
  },
  methods: {
    close: function() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    confirm: function() {
      if (this.callback !== undefined && typeof this.callback === 'function') {
        if (this.type === 'confirm') {
          this.callback();
        } else if (this.type === 'prompt') {
          this.callback(this.value);
        }
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.modal-container {
  position: fixed;
  top: 32px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(40, 40, 40, 0.8);
}

.modal-inner {
  padding: 16px;
}

.prompt {
  margin-top: 8px;
  display: flex;
  & > input {
    flex-grow: 1;
  }
}

.modal-buttons {
  margin-top: 8px;
  overflow: auto;
  & > div {
    float: right;
    margin-left: 8px;
  }
}
</style>
