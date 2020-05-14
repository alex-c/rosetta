<template>
  <div class="modal-container" @click="close()">
    <div class="modal">
      {{ message }}
      <div class="prompt" v-if="type == 'prompt'">
        <input class="input" placeholder="Locale name..." />
      </div>
      <InputGroup style="float:right;">
        <Button type="success">Ok</Button>
      </InputGroup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['type', 'message', 'callback'],
  methods: {
    close: function() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
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

.modal {
  padding: 16px;
  border-radius: 5px;
  background-color: $color-bg-view;
  box-shadow: 1px 1px 1px 0px $color-dark-border;
}
</style>
