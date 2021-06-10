<template>
  <div>
    <CloseBox
      @clickClose="clickClose"
    >
      <template v-slot:header>
        드론 필터
      </template>
      <template v-slot:body>
        <a-alert
          v-if="getLogFilter.checkFilter"
          message="필터가 적용된 상태입니다."
          type="info" show-icon
          class="filter-alert"
        />
        <div :style="{padding: '0 10px 0 5px', marginTop: getLogFilter.checkFilter ? '-5px' : '-20px'}">
          <div class="label">
            <span>제조사</span>
          </div>
          <a-select
            :value="manufacturerValue"
            mode="tags"
            style="width: 100%;"
            placeholder="제조사"
            @change="changeManufacturer">

            <a-select-option v-for="(maker,index) in getMakers"
                             :key="index"
                             :value="maker"
            >
              {{ maker }}
            </a-select-option>
          </a-select>
          <div class="label"><span>무게</span></div>
          <a-slider
            :value="weightValue"
            range
            :marks="weightMarks"
            :max="50"
            :min="0"
            @change="changeWeight"
          />
          <div class="label"><span>고도</span></div>
          <a-slider
            :value="altitudeValue"
            range
            :marks="altitudeMarks"
            :max="200"
            :min="0"
            @change="changeAltitude"/>
          <div class="label"><span>속력</span></div>
          <a-slider
            :value="speedValue"
            range
            :marks="speedMarks"
            :max="100"
            :min="0"
            @change="changeSpeed"/>

          <div style="display: flex; justify-content: space-between; text-align: right; margin-top: 40px">
            <a-button @click="applyFilter">
              <a-icon type="check"/>
              필터 적용
            </a-button>
            <a-button @click="clickReset">
              <a-icon type="reload"/>
              필터 리셋
            </a-button>
          </div>
        </div>
      </template>
    </CloseBox>
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
