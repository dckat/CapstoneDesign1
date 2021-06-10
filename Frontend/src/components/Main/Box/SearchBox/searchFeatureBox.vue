<template>
  <div>
    <CloseBox
      @clickClose="clickClose"
    >
      <template v-slot:header>
        드론 기체 검색
      </template>
      <template v-slot:body>
        <a-alert
          v-if="getLogFilter.checkFilter"
          message="필터가 적용된 상태입니다."
          type="info" show-icon
          class="filter-alert"
        />
        <div class="r-flex gap-default"
             :style="{marginTop: getLogFilter.checkFilter ? '10px' : '0px'}"
        >
          <a-select
            v-model="searchType"
            class="search-input"
            style="min-width: 80px"
          >
            <a-select-option value="modelName">
              모델명
            </a-select-option>
            <a-select-option value="maker">
              제조사
            </a-select-option>
            <a-select-option value="usageName">
              용도
            </a-select-option>
          </a-select>
          <a-input-search
            placeholder="검색어"
            enter-button
            @search="onSearch"
          />
        </div>

        <a-list
          v-if="searchData.length"
          bordered
          :data-source="searchData">
          <a-list-item
            slot="renderItem"
            slot-scope="item"
            @click="() => clickListItem(item)"
          >
            {{ `${item.modelName} / ${item.maker} / ${item.usage || '*'}` }}
          </a-list-item>
        </a-list>
      </template>
    </CloseBox>
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
    };
  },
  computed: {
    ...mapGetters('Etc', {
      getMakerDroneList: 'getMakerDroneList',
    }),
    ...mapGetters('Drone', {
      getLogFilter: 'drone/getLogFilter',
      getWholeDroneLog: 'drone/getWholeDroneLog',
    }),
  },
  created() {

  },
  methods: {
    onSearch(value) {
      const params = {};
      params[this.searchType] = value;
      this.$store.dispatch('Drone/list/fetchListContents', params).then((r) => {
        this.searchData = r.drones;
      });
    },
    handleSearch(value) {

    },
    clickClose() {
      this.$emit('clickClose');
    },
    clickListItem(item) {
      let checkValid = false;
      this.getWholeDroneLog.forEach((log) => {
        if (Number(log.droneId) === Number(item.id)) {
          this.$emit('focusChange', log.latitude, log.longitude);
          this.$emit('clickDrone', Number(item.id));
          checkValid = true;
        }
      });
      if (!checkValid) {
        this.$warning({
          title: '선택하신 드론은 현재 가동 중이지 않은 드론입니다.',
        });
      }
    },
  },
};
</script>
<style lang="scss">
</style>
