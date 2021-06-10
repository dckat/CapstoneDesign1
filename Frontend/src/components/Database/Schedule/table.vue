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
    <div slot="startTime" slot-scope="data">
      {{ mc_dateTime(data) }}
    </div>
    <div slot="terminateTime" slot-scope="data">
      {{ mc_dateTime(data) }}
    </div>
  </a-table>
</template>

<script>
import databaseScheduleColumn from '@/utils/ColumnData/databaseScheduleColumn';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'DatabaseTable',
  props: {
    childLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      columns: databaseScheduleColumn,
    };
  },
  computed: {
    ...mapGetters('Schedule/page', {
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
    ...mapActions('Schedule/page', {
      setPagination: 'setPagination',
      fetchPageData: 'fetchPageData',
    }),
    ...mapActions('Drone/detail', {
      fetchDetailData: 'fetchDetailData',
    }),
    changePage(e) {
      this.pagination = {
        size: e.pageSize,
        page: e.current,
      };
      this.fetchPageData(this.getPageParams);
    },
    goDetail(row) {
      this.fetchDetailData(row.droneId);
      this.$router.push({
        path: `/database/schedule/${row.id}`,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
