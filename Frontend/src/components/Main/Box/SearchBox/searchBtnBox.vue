<template>
  <div>
    <img
      class="searchBtn"
      @click="clickSearchBtn"
      :src="require('@/static/img/search.png')"/>
  </div>
</template>
<script>

import CloseBox from '@/components/_Common/CloseBox/closeBox';
import { mapGetters } from 'vuex';

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
  components: {
    CloseBox,
  },
  props: {},
  data() {
    return {
      searchValue: null,
      searchType: 'modelName',
      searchData: [],
      dataSource: [],
      searchMode: false,
    };
  },
  computed: {
    ...mapGetters('Etc', {
      getMakerDroneList: 'getMakerDroneList',
    }),
    ...mapGetters('Drone', {
      getLogFilter: 'drone/getLogFilter',
      getDroneLogs: 'drone/getDroneLogs',
    }),
  },
  created() {
  },
  methods: {
    async onSearch(value) {
      const params = {};
      params[this.searchType] = value;
      const result = await this.$store.dispatch('Drone/list/fetchListContents', params);
      const objectDrone = {};
      this.getDroneLogs.forEach((e) => {
        objectDrone[Number(e.droneId)] = true;
      });
      this.searchData = [...result.drones.filter((v) => objectDrone[Number(v.id)])];
    },
    clickSearchBtn() {
      this.$emit('changeFilterMode', false)
      this.$emit('changeSearchMode', true)
    },
    clickClose() {
      this.$emit('clickClose');
      this.searchMode = false;
    },
    clickListItem(item) {
      console.log('click', item);
    },
  },
};
</script>
<style lang="scss">
</style>
