<template>
  <pie-chart :chart-data="chartData"
             :chart-settings="chartSettings"
  />
</template>

<script>
import PieChart from '@/components/_Common/Chart/pieChart';

export default {
  name: 'droneCategoryPieChart',
  components: {
    PieChart,
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
          text: '카테고리별 드론 기체 수',
          style: {
            fontSize: '20px',
          },
        },
        width: '50%',
        plotOptions: {
          pie: {
            shadow: true,
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              useHTML: true,
              distance: -50,
              formatter() {
                if (this.percentage.toFixed(0) < 6) return '';
                return `<div style="padding: 6px 4px 4px 6px;
                                    background-color: rgba(0, 0, 0, 0.5);
                                    border: 2px solid #f2f4f8;
                                    border-radius: 6px;
                                    ">${this.percentage.toFixed(1)}%</div>`;
              },
              style: {
                fontSize: '16px',
                color: 'white',
              },
            },
            showInLegend: true,
          },
        },
        tooltip: {
          formatter() {
            return `
            <span style="font-size:16px; color:${this.color}">${this.key}</span>
            <table>
              <tr>
                <td style="padding:0">${this.series.name}</td>
                <td style="padding:0">: <b>${this.y}</b></td>
              </tr>
              <tr>
                <td style="padding:0">점유율</td>
                <td style="color:{series.color};padding:0">: <b>${this.percentage.toFixed(1)}%</b></td>
              </tr>
            </table>
            `;
          },
        },
      },
    };
  },
};
</script>

<style scoped>

</style>
