<template>
    <div class="ant-modal-content">
        <button
          type="button"
          aria-label="Close"
          class="ant-modal-close"
          @click="clickClose"
          >
            <span class="ant-modal-close-x">
            <a-icon style="color: white" type="close" />
            </span>
        </button>
        <div class="ant-modal-header">
            <div class="ant-modal-title">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="ant-modal-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>

export default {
  head() {
    return {
      title: 'Drone',
      meta: [
        {
          hid: 'database',
          name: 'Descriptions',
          content: 'DroneWeb-Content',
        },
      ],
    };
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
  },
};
</script>
<style lang="scss">
</style>
