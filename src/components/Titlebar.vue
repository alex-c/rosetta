<template>
  <div id="titlebar">
    <img src="../assets/icons/R-32.png" />
    <div id="title">Rosetta</div>
    <div id="actions"><span class="mdi mdi-home" /></div>
  </div>
</template>

<script>
export default {
  name: 'titlebar',
};
</script>

<style lang="scss" scoped>
#titlebar {
  display: flex;
}

#title {
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
}

#actions {
  display: flex;
}
</style>
