<template>
  <div>
    <img
      @click="clickFilterBtn"
      class="filterBtn"
      :src="require('@/static/img/filter.png')"/>
  </div>
</template>
<script>

import CloseBox from '@/components/_Common/CloseBox/closeBox';
import { mapActions, mapGetters } from 'vuex';

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
      filterMode: false,
      filteredDroneList: [],
      manufacturerValue: [],
      weightValue: [0, 50],
      weightMarks: {
        0: '0kg',
        50: '50kg+',
      },
      altitudeValue: [0, 200],
      altitudeMarks: {
        0: '0m',
        200: '200m+',
      },
      speedValue: [0, 100],
      speedMarks: {
        0: '0km/h',
        100: '100km/h+',
      },
      filmingOptions: ['True', 'False'],
      filmingValue: 'True',
    };
  },
  computed: {
    ...mapGetters('Etc', {
      getMakers: 'getMakers',
    }),
    ...mapGetters('Drone', {
      getLogFilter: 'drone/getLogFilter',
      getFixedDroneList: 'list/getFixedDroneList',
    }),
  },
  created() {
  },
  methods: {
    ...mapActions('Drone/drone', {
      setLogFilter: 'setLogFilter',
      clearLogFilter: 'clearLogFilter',
    }),
    clickFilterBtn() {
        this.$emit('changeSearchMode', false)
        this.$emit('changeFilterMode', true)
    },
    clickClose() {
      this.$emit('clickClose');
    },
    changeManufacturer(value) {
      this.manufacturerValue = value;
      this.filteredDroneList = this.getFixedDroneList.filter((v) => !!this.manufacturerValue.find((e) => v.maker === e));
    },
    changeWeight(weight) {
      this.weightValue = weight;
    },
    changeAltitude(altitude) {
      this.altitudeValue = altitude;
    },
    changeSpeed(speed) {
      this.speedValue = speed;
    },
    applyFilter() {
      this.setLogFilter({
        checkFilter: true,
        maker: this.manufacturerValue,
        filteredDroneList: this.filteredDroneList,
        weight: this.weightValue,
        altitude: this.altitudeValue,
        speed: this.speedValue,
        filming: this.filmingValue,
      });
    },
    clickReset() {
      this.clearLogFilter();
      this.filteredDroneList = [];
      this.manufacturerValue = [];
      this.weightValue = [0, 50];
      this.altitudeValue = [0, 200];
      this.speedValue = [0, 100];
      this.filmingValue = [];
    },
  },
};
</script>
<style lang="scss">
</style>
