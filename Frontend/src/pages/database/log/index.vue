<template>
  <div>
    <log-search-filter @loadData="loadData"/>

    <div class="page-main">
      <log-table :childLoading="parentLoading" @loadData="loadData"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LogSearchFilter from '@/components/Database/Log/SearchFilter';
import LogTable from '@/components/Database/Log/table';

export default {
  head() {
    return {
      title: 'Database-Log',
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
    LogTable,
    LogSearchFilter,
  },
  data() {
    return {
      parentLoading: false,
    };
  },
  computed: {
    ...mapGetters('Log/page', {
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
    ...mapActions('Log/page', {
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
