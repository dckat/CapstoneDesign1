<template>
  <live-line-chart :chart-data="chartData"
                   :chart-settings="chartSettings"
  />
</template>

<script>
import LiveLineChart from '@/components/_Common/Chart/liveLineChart';
import dayjs from 'dayjs';

export default {
  components: {
    LiveLineChart,
  },
  props: {
    chartData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      chartSettings: {
        chart: {
          height: 400,
        },
        title: {
          text: '시간별 드론 기체 수',
          style: {
            fontSize: '20px',
          },
        },
        width: '100%',
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
            text: null,
          },
          min: 0,
        },
        tooltip: {
          formatter() {
            const trList = this.points.map((elem) => `
              <tr>
                <td style="font-size: 16px; padding:0; color:${elem.color}">${elem.series.name}</td>
                <td style="font-size: 16px; padding:0; color:${elem.color}">: <b>${elem.y}</b></td>
              </tr>
              `);
            return `
            <span style="font-size:12px; color:${this.color}">${dayjs(this.x).format('YYYY-MM-DD HH:mm:ss')}</span>
            <table>
             ${trList}
            </table>
            `;
          },
        },
        data: {
          enablePolling: true,
          dataRefreshRate: 2,
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">

</style>
