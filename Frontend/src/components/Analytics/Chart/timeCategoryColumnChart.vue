<template>
  <column-chart :chart-data="chartData"
    :chart-settings="chartSettings"/>
</template>

<script>
import ColumnChart from '@/components/_Common/Chart/columnChart';

export default {
  name: 'timeCategoryColumnChart',
  components: {
    ColumnChart,

  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartSettings: {
        chart: {
          height: 400,
        },
        title: {
          text: '시간-드론 타입별 드론 기체 수',
          style: {
            fontSize: '20px',
          },
        },
        width: '100%',
        xAxis: {
          categories: [
            '00:00 ~ 04:00',
            '04:00 ~ 08:00',
            '08:00 ~ 12:00',
            '12:00 ~ 16:00',
            '16:00 ~ 20:00',
            '20:00 ~ 24:00',
          ],
        },
        yAxis: {
          title: {
            text: null,
          },
          min: 0,
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">

</style>
