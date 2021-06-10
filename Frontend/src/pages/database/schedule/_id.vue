<template>
  <div>
    <database-detail-header />
    <div class="page-main-without-header ">
      <div class="table-title">Log</div>
      <database-table :childLoading="parentLoading" @loadData="loadData" />
    </div>
  </div>
</template>

<script>
import DatabaseDetailHeader from '@/components/Database/Schedule/Detail/header';
import DatabaseTable from '@/components/Database/Log/table';
import {mapActions, mapGetters} from 'vuex';

export default {
  components: {
    DatabaseDetailHeader,
    DatabaseTable,
  },
  async asyncData({params, store}) {
    const {id} = params;
    await store.dispatch('Schedule/detail/fetchDetailData', id);
    return {id};
  },
  data() {
    return {
      parentLoading: false,
      searchParams: {},
    };
  },
  computed: {
    ...mapGetters('Schedule/detail', {
      getScheduleDetailData: 'getDetailData',
    }),
    ...mapGetters('Log/page', {
      getPageParams: 'getPageParams',
    }),
  },
  watch: {},
  created() {
    this.searchParams = JSON.parse(JSON.stringify(this.getPageParams));
    this.searchParams.scheduleId = this.getScheduleDetailData.id;
    this.setPageParams(this.searchParams);
    this.loadData();
  },
  beforeDestroy() {
    this.clearPageParams();
  },
  methods: {
    ...mapActions('Log/page', {
      fetchPageData: 'fetchPageData',
      clearPageParams: 'clearPageParams',
      setPageParams: 'setPageParams',
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

<style scoped lang="scss">
.table-title {
  font-size: 30px;
}
</style>
