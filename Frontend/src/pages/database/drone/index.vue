<template>
  <div>
    <database-search-filter @loadData="loadData" />

    <div class="page-main">
      <database-table :childLoading="parentLoading" @loadData="loadData" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DatabaseSearchFilter from '@/components/Database/Drone/searchFilter';
import DatabaseTable from '@/components/Database/Drone/table';

export default {
  head() {
    return {
      title: 'Database-Drone',
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
    ...mapGetters('Drone/page', {
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
    ...mapActions('Drone/page', {
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
