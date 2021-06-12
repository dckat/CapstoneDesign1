<template>
  <a-page-header
    class="page-header"
    title="Database"
    sub-title="Table - Drone Log"
  >
    <template slot="extra">
      <a-button
        key="1"
        type="primary"
        form="form"
        html-type="submit"
        :style="{padding: '0 15px'}"
      >
        검색
      </a-button>
    </template>

    <a-form id="form" @submit.prevent="searchData" class="form-wrapper">
      <a-descriptions
        :column="{xs: 1, sm: 3, md: 3, lg: 6, xl: 7, xxl: 7}"
        class="search-box"
      >
        <a-descriptions-item label="Schedule ID" class="form-item">
          <a-input v-model="searchParams.scheduleId" class="search-input-log" />
        </a-descriptions-item>
        <a-descriptions-item label="수평 속도" class="form-item">
          <a-button v-if="hsOpenFlag" @click="hsOpenFlag = !hsOpenFlag"
            >{{ minHorizontalSpeed }} -
            {{ maxHorizontalSpeed == 100 ? '100+' : maxHorizontalSpeed }} km/s
            <a-icon type="up" />
          </a-button>
          <a-button v-else @click="hsOpenFlag = !hsOpenFlag"
            >{{ minHorizontalSpeed }} -
            {{ maxHorizontalSpeed == 100 ? '100+' : maxHorizontalSpeed }} km/s
            <a-icon type="down" />
          </a-button>
          <div v-if="hsOpenFlag" class="slider-box">
            <a-slider
              range
              :marks="speedMarks"
              :max="100"
              :step="1"
              :default-value="[minHorizontalSpeed, maxHorizontalSpeed]"
              class="search-input"
              @change="onHorizontalSpeedChange"
              @afterChange="onHorizontalSpeedAfterChange"
            />
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="수직 속도" class="form-item">
          <a-button v-if="vsOpenFlag" @click="vsOpenFlag = !vsOpenFlag"
            >{{ minVerticalSpeed }} -
            {{ maxVerticalSpeed == 100 ? '100+' : maxVerticalSpeed }} km/s
            <a-icon type="up" />
          </a-button>
          <a-button v-else @click="vsOpenFlag = !vsOpenFlag"
            >{{ minVerticalSpeed }} -
            {{ maxVerticalSpeed == 100 ? '100+' : maxVerticalSpeed }} km/s
            <a-icon type="down" />
          </a-button>
          <div v-if="vsOpenFlag" class="slider-box">
            <a-slider
              range
              :marks="speedMarks"
              :max="100"
              :step="1"
              :default-value="[minVerticalSpeed, maxVerticalSpeed]"
              class="search-input"
              @change="onVerticalSpeedChange"
              @afterChange="onVerticalSpeedAfterChange"
            />
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="지면 고도" class="form-item">
          <a-button v-if="aglOpenFlag" @click="aglOpenFlag = !aglOpenFlag"
            >{{ minAboveGroundLevel }} -
            {{ maxAboveGroundLevel == 200 ? '200+' : maxAboveGroundLevel }} m
            <a-icon type="up" />
          </a-button>
          <a-button v-else @click="aglOpenFlag = !aglOpenFlag"
            >{{ minAboveGroundLevel }} -
            {{ maxAboveGroundLevel == 200 ? '200+' : maxAboveGroundLevel }} m
            <a-icon type="down" />
          </a-button>
          <div v-if="aglOpenFlag" class="slider-box">
            <a-slider
              range
              :marks="levelMarks"
              :max="200"
              :step="1"
              :default-value="[minAboveGroundLevel, maxAboveGroundLevel]"
              class="search-input"
              @change="onAboveGroundLevelChange"
              @afterChange="onAboveGroundLevelAfterChange"
            />
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="해발 고도" class="form-item">
          <a-button v-if="aslOpenFlag" @click="aslOpenFlag = !aslOpenFlag"
            >{{ minAboveSeaLevel }} -
            {{ maxAboveSeaLevel == 200 ? '200+' : maxAboveSeaLevel }} m
            <a-icon type="up" />
          </a-button>
          <a-button v-else @click="aslOpenFlag = !aslOpenFlag"
            >{{ minAboveSeaLevel }} -
            {{ maxAboveSeaLevel == 200 ? '200+' : maxAboveSeaLevel }} m
            <a-icon type="down" />
          </a-button>
          <div v-if="aslOpenFlag" class="slider-box">
            <a-slider
              range
              :marks="levelMarks"
              :max="200"
              :step="1"
              :default-value="[minAboveSeaLevel, maxAboveSeaLevel]"
              class="search-input"
              @change="onAboveSeaLevelChange"
              @afterChange="onAboveSeaLevelAfterChange"
            />
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="위도" class="form-item">
          <a-input v-model="searchParams.latitude" class="search-input-log" />
        </a-descriptions-item>
        <a-descriptions-item label="경도" class="form-item">
          <a-input v-model="searchParams.longitude" class="search-input-log" />
        </a-descriptions-item>
      </a-descriptions>
    </a-form>
  </a-page-header>
</template>

<script>
/* eslint-disable prefer-destructuring */
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'LogSearchFilter',
  components: {},
  data() {
    return {
      hsOpenFlag: false,
      vsOpenFlag: false,
      aslOpenFlag: false,
      aglOpenFlag: false,
      searchParams: {},
      speedMarks: {
        0: '0km/h',
        100: '100+km/h',
      },
      levelMarks: {
        0: '0m',
        200: '200+m',
      },
      minVerticalSpeed: 0,
      maxVerticalSpeed: 100,
      minHorizontalSpeed: 0,
      maxHorizontalSpeed: 100,
      minAboveSeaLevel: 0,
      maxAboveSeaLevel: 200,
      minAboveGroundLevel: 0,
      maxAboveGroundLevel: 200,
    };
  },
  computed: {
    ...mapGetters('Log/page', {
      getPageParams: 'getPageParams',
    }),
  },
  created() {
    this.searchParams = JSON.parse(JSON.stringify(this.getPageParams));
  },
  methods: {
    ...mapActions('Log/page', {
      setPageParams: 'setPageParams',
    }),
    searchData() {
      console.log(this.searchParams);
      this.setPageParams(this.searchParams);
      this.$emit('loadData');
    },
    onHorizontalSpeedChange(value) {
      this.minHorizontalSpeed = value[0];
      this.maxHorizontalSpeed = value[1];
    },
    onHorizontalSpeedAfterChange(value) {
      this.hsOpenFlag = !this.hsOpenFlag;
      this.searchParams.minHorizontalSpeed = this.minHorizontalSpeed;
      this.searchParams.maxHorizontalSpeed = this.maxHorizontalSpeed;
      if (this.maxHorizontalSpeed == 100) {
        this.searchParams.maxHorizontalSpeed = null;
      }
    },
    onVerticalSpeedChange(value) {
      this.minVerticalSpeed = value[0];
      this.maxVerticalSpeed = value[1];
    },
    onVerticalSpeedAfterChange(value) {
      this.vsOpenFlag = !this.vsOpenFlag;
      this.searchParams.minVerticalSpeed = this.minVerticalSpeed;
      this.searchParams.maxVerticalSpeed = this.maxVerticalSpeed;
      if (this.maxVerticalSpeed == 100) {
        this.searchParams.maxVerticalSpeed = null;
      }
    },
    onAboveSeaLevelChange(value) {
      this.minAboveSeaLevel = value[0];
      this.maxAboveSeaLevel = value[1];
    },
    onAboveSeaLevelAfterChange(value) {
      this.aslOpenFlag = !this.aslOpenFlag;
      this.searchParams.minAboveSeaLevel = this.minAboveSeaLevel;
      this.searchParams.maxAboveSeaLevel = this.maxAboveSeaLevel;
      if (this.maxAboveSeaLevel == 200) {
        this.searchParams.maxAboveSeaLevel = null;
      }
    },
    onAboveGroundLevelChange(value) {
      this.minAboveGroundLevel = value[0];
      this.maxAboveGroundLevel = value[1];
    },
    onAboveGroundLevelAfterChange(value) {
      this.aglOpenFlag = !this.aglOpenFlag;
      this.searchParams.minAboveGroundLevel = this.minAboveGroundLevel;
      this.searchParams.maxAboveGroundLevel = this.maxAboveGroundLevel;
      if (this.maxAboveGroundLevel == 200) {
        this.searchParams.maxAboveGroundLevel = null;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';
.form-wrapper {
  //height: 40px;
  justify-content: space-between;
}
.form-wrapper,
.form-item {
  display: flex;
  margin-right: 10px;
  margin-bottom: 0;
}

.slider-box {
  background: white;
  padding: 10px 23px;
  border-radius: 20px;
  border: solid 1px $antblue;
  position: fixed;
  z-index: 9;
}

.search-input-log {
  width: 100px;
}

.ant-btn {
  padding: 0 10px;
}
</style>
