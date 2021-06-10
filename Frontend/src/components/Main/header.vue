<template>
  <a-page-header
    class="page-header"
    title="RT-Map"
    sub-title="Realtime Drone Simulation Map"
  >
    <template slot="extra">
      <a-tooltip placement="bottom">
        <template slot="title">
          <div>맵이 중앙에 위치하도록 </div>
          <div>스크롤을 이동합니다.</div>
        </template>
        <a-button type="primary" icon="select"
                  @click="moveScroll"
        >
          Move Scroll
        </a-button>
      </a-tooltip>
    </template>
  </a-page-header>
</template>

<script>

export default {
  name: 'MainHeader',
  components: {},
  data() {
    return {
    };
  },
  methods: {
    moveScroll() {
      window.scrollTo(0, 105);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
