<template>
  <div>
    <div class="bottom-tool-box">
      <div class="boxBtn" @click="clickWeatherBtn">
        <a-icon type="cloud"/>
      </div>
      <FilterBtnBox
        class="filterBox"
        @clickClose="clickFilterBoxClose"
        @changeFilterMode="e => this.$emit('changeFilterMode', e)"
        @changeSearchMode="e => this.$emit('changeSearchMode', e)"
      />
      <div class="boxBtn" @click="clickBookMarkBtn">
        <a-icon type="star"/>
      </div>
    </div>
  </div>
</template>
<script>
import FilterBtnBox from '../FilterBox/filterBtnBox';

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
    FilterBtnBox
  },
  props: {
  },
  data() {
    return {
      searchMode: false,
      filterMode: false,
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    clickWeatherBtn() {
      console.log('click')
      this.$notification['warning']({
        message: '날씨 기능은 추후 추가될 예정입니다.',
        duration: 3,
      })
    },
    clickBookMarkBtn() {
      this.$notification['warning']({
        message: '즐겨찾기 기능은 추후 추가될 예정입니다.',
        duration: 3,
      })
    },
    toggleFilterMode() {
      this.$emit('toggleFilterMode')  
    },
    toggleSearchMode() {
      this.$emit('toggleSearchMode')  
    },
    clickSearchBoxClose() {
      this.searchMode = false;
    },
    clickFilterBoxClose() {
      this.filterMode = false;
    },
    clickSearchBtn() {
      this.filterMode = false;
      this.searchMode = true;
    },
    clickFilterBtn() {
      this.searchMode = false;
      this.filterMode = true;
    },

  },
};
</script>
<style lang="scss">
</style>
