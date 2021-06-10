<template>
  <a-page-header
    class="page-header"
    title="Database"
    sub-title="Table - DroneSchedule"
  >
    <template slot="extra">
      <a-button key="1" type="primary" form="form" html-type="submit">
        검색
      </a-button>
    </template>

    <a-form id="form" @submit.prevent="searchData" class="form-wrapper">
      <a-form-item label="검색 범위" class="form-item">
        <div>
          <a-date-picker
            v-model="startValue"
            :disabled-date="disabledStartDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Start Date"
            @openChange="handleStartOpenChange"
          />
          <span :style="{padding: '0 10px'}">-</span>
          <a-date-picker
            v-model="endValue"
            :disabled-date="disabledEndDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="End Date"
            :open="endOpen"
            @openChange="handleEndOpenChange"
          />
        </div>
      </a-form-item>
    </a-form>
  </a-page-header>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'DatabaseSearchFilter',
  components: {},
  data() {
    return {
      searchParams: {},
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  },
  watch: {
    startValue(val) {
      if (val != null) {
        this.searchParams.startTime = val.format('YYYY-MM-DD HH:mm:ss');
      } else {
        this.searchParams.startTime = null;
      }
    },
    endValue(val) {
      if (val !== null) {
        this.searchParams.terminateTime = val.format('YYYY-MM-DD HH:mm:ss');
      } else {
        this.searchParams.terminateTime = null;
      }
    },
  },
  computed: {
    ...mapGetters('Schedule/page', {
      getPageParams: 'getPageParams',
    }),
  },
  created() {
    this.searchParams = JSON.parse(JSON.stringify(this.getPageParams));
  },
  methods: {
    ...mapActions('Schedule/page', {
      setPageParams: 'setPageParams',
    }),
    searchData() {
      console.log(this.searchParams);
      this.setPageParams(this.searchParams);
      this.$emit('loadData');
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';
.form-wrapper {
  height: 40px;
}
.form-wrapper,
.form-item {
  display: flex;
  margin-left: 10px;
  margin-bottom: 0;
}
.slider-box {
  background: white;
  padding: 10px 15px;
  border-radius: 20px;
  border: solid 1px $antblue;
  position: fixed;
  z-index: 9;
}
</style>
