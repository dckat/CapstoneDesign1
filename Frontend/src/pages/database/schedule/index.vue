<template>
  <div>
    <database-search-filter @loadData="loadData" />
    <div class="page-main">
      <database-table :childLoading="parentLoading" @loadData="loadData" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import DatabaseSearchFilter from '@/components/Database/Schedule/searchFilter';
import DatabaseTable from '@/components/Database/Schedule/table';

export default {
  head() {
    return {
      title: 'Database',
      meta: [
        {
          hid: 'database',
          name: 'Descriptions',
          content: 'db-Content',
        },
      ],
    };
  },
  components: {
    DatabaseTable,
    DatabaseSearchFilter,
  },
  data() {
    return {
      parentLoading: false,
    };
  },
  computed: {
    ...mapGetters('Schedule/page', {
      getPageParams: 'getPageParams',
    }),
  },
  created() {
    this.loadData();
  },
  beforeDestroy() {
    this.clearPageParams();
  },
  methods: {
    ...mapActions('Schedule/page', {
      fetchPageData: 'fetchPageData',
      clearPageParams: 'clearPageParams',
    }),
    loadData() {
      this.parentLoading = true;
      this.fetchPageData(this.getPageParams).finally(() => {
        this.parentLoading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
