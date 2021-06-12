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
    <div slot="usageName" slot-scope="data">
      {{ data == null ? '?' : data }}
    </div>
    <div slot="weight" slot-scope="data">
      {{ data == null ? '?' : data + 'kg' }}
    </div>
    <div slot="specification" slot-scope="data">
      {{ data == null ? '?' : data }}
    </div>
    <div slot="droneCategory" slot-scope="data">
      {{ data }}
    </div>
  </a-table>
</template>

<script>
import databaseColumn from '@/utils/ColumnData/databaseColumn';
import { mapActions, mapGetters } from 'vuex';

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
      columns: databaseColumn,
    };
  },
  computed: {
    ...mapGetters('Drone/page', {
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
    ...mapActions('Drone/page', {
      setPagination: 'setPagination',
      fetchPageData: 'fetchPageData',
    }),
    changePage(e) {
      this.pagination = {
        size: e.pageSize,
        page: e.current,
      };
      this.fetchPageData(this.getPageParams);
    },
    goDetail(row) {
      this.$router.push({
        path: `/database/drone/${row.id}`,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
