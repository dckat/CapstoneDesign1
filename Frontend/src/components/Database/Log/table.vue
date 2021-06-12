<template>
  <a-table
    rowKey="id"
    bordered
    :loading="childLoading"
    :columns="columns"
    :data-source="getPageData"
    :scroll="{x: 1000}"
    :pagination="pagination"
    @change="changePage"
  >
    <a slot="modelName" slot-scope="data, row" @click="goDetail(row)">
      {{ data }}
    </a>

    <div slot="horizontalSpeed" slot-scope="data">{{ data }} km/h</div>
    <div slot="verticalSpeed" slot-scope="data">{{ data }} km/h</div>
    <div slot="aboveGroundLevel" slot-scope="data">{{ data }} m</div>
    <div slot="aboveSeaLevel" slot-scope="data">{{ data }} m</div>
  </a-table>
</template>

<script>
import databaseLogColumn from '@/utils/ColumnData/databaseLogColumn';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LogTable',
  props: {
    childLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      columns: databaseLogColumn,
    };
  },
  computed: {
    ...mapGetters('Log/page', {
      getPageData: 'getPageData',
      getPagination: 'getPagination',
      getPageParams: 'getPageParams',
    }),
    pagination: {
      get() {
        return this.getPagination;
      },
      set(e) {
        this.setPagination({
          size: e.size,
          page: e.page,
        });
      },
    },
  },
  methods: {
    ...mapActions('Log/page', {
      setPagination: 'setPagination',
      fetchPageData: 'fetchPageData',
    }),
    ...mapActions('Drone/detail', {
      fetchDroneDetailData: 'fetchDetailData',
    }),
    ...mapActions('Schedule/detail', {
      fetchScheduleDetailData: 'fetchDetailData',
    }),
    changePage(e) {
      this.pagination = {
        size: e.pageSize,
        page: e.current,
      };
      this.fetchPageData(this.getPageParams);
    },
    goDetail(row) {
      this.fetchDroneDetailData(row.droneId);
      this.fetchScheduleDetailData(row.scheduleId);
      this.$router.push({
        path: `/database/schedule/${row.scheduleId}`,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
