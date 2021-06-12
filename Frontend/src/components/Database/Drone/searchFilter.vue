<template>
  <a-page-header
    class="page-header"
    title="Database"
    sub-title="Table - Drone list"
  >
    <template slot="extra">
      <a-button key="1" type="primary" form="form" html-type="submit">
        검색
      </a-button>
    </template>

    <a-form id="form" @submit.prevent="searchData" class="form-wrapper">
      <a-form-item label="모델명" class="form-item">
        <a-input v-model="searchParams.modelName" class="search-input" />
      </a-form-item>
      <a-form-item label="제조사" class="form-item">
        <a-input v-model="searchParams.maker" class="search-input" />
      </a-form-item>
      <a-form-item label="무게" class="form-item">
        <a-button
          v-if="searchOpenFlag"
          class="search-input"
          @click="searchOpenFlag = !searchOpenFlag"
          >{{ sliderBegin }} - {{ sliderEnd == 50 ? '50+' : sliderEnd }} kg
          <a-icon type="up" />
        </a-button>
        <a-button
          v-else
          class="search-input"
          @click="searchOpenFlag = !searchOpenFlag"
          >{{ sliderBegin }} - {{ sliderEnd == 50 ? '50+' : sliderEnd }} kg
          <a-icon type="down" />
        </a-button>
        <div v-if="searchOpenFlag" class="slider-box">
          <a-slider
            range
            :marks="marks"
            :max="50"
            :step="1"
            :default-value="[sliderBegin, sliderEnd]"
            class="search-input"
            @change="onSliderChange"
            @afterChange="onSliderAfterChange"
          />
        </div>
      </a-form-item>
      <a-form-item label="종류" has-feedback class="form-item">
        <a-select
          class="search-input"
          default-value=""
          @change="handleSelectChange"
        >
          <a-select-option value="">
            선택 안 함
          </a-select-option>
          <a-select-option value="촬영용">
            촬영용
          </a-select-option>
          <a-select-option value="산업용">
            산업용
          </a-select-option>
          <a-select-option value="군사용">
            군사용
          </a-select-option>
          <a-select-option value="레이싱용">
            레이싱용
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-page-header>
</template>

<script>
import {droneCategory} from '@/utils/CommonData/selectOptions';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'DatabaseSearchFilter',
  components: {},
  data() {
    return {
      searchOpenFlag: false,
      categoryOptions: droneCategory,
      searchParams: {},
      marks: {
        0: '0kg',
        50: '50+kg',
      },
      sliderBegin: 0,
      sliderEnd: 50,
    };
  },
  computed: {
    ...mapGetters('Drone/page', {
      getPageParams: 'getPageParams',
    }),
  },
  created() {
    this.searchParams = JSON.parse(JSON.stringify(this.getPageParams));
  },
  methods: {
    ...mapActions('Drone/page', {
      setPageParams: 'setPageParams',
    }),
    searchData() {
      console.log(this.searchParams);
      this.setPageParams(this.searchParams);
      this.$emit('loadData');
    },
    handleSelectChange(value) {
      this.searchParams.usageName = value;
      this.searchData();
    },
    onSliderChange(value) {
      this.sliderBegin = value[0];
      this.sliderEnd = value[1];
    },
    onSliderAfterChange(value) {
      this.searchParams.minWeight = value[0];
      this.searchParams.maxWeight = value[1];
      if (value[1] == 50) {
        this.searchParams.maxWeight = null;
      }
      this.searchOpenFlag = !this.searchOpenFlag;
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
  padding: 10px 20px;
  border-radius: 20px;
  border: solid 1px $antblue;
  position: fixed;
  z-index: 10;
}
</style>
