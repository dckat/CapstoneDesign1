<template>
  <div class="error-main">
    <a-result
      style="margin-top: -50px"
      :status="this.error.statusCode.toString()"
      :title="this.error.statusCode.toString()"
      :sub-title="this.error.message"
    >
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">
          Go to Main
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.error-main {
  background-color: white;
  height: calc(100vh - 84px - 69px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
