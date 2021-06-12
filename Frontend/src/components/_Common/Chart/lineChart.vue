<template>
  <div v-if="chartData != null">
    <highcharts :options="options"
                :callback="onChartLoaded"
                :class="chartClass"
                :style="borderStyle"
    />
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue';

export default {
  name: 'lineChart',
  components: {
    highcharts: Chart,
  },
  props: {
    chartData: {
      type: Array,
      default: null,
    },
    chartSettings: {
      type: Object,
      default: null,
    },
    chartClass: {
      type: String,
      default: null,
    },
    bordered: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
      options: {},
      borderStyle: {},
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if (val == null) return;
        this.options.series = val;

        if (this.chart == null) return;
        this.chart.redraw();
        this.chart.setSize(null);
      },
    },
    chartSettings: {
      deep: true,
      handler(val) {
        if (val == null) return;
        this.setCustomChartSetting(val);

        if (this.chart == null) return;
        this.chart.redraw();
        this.chart.setSize(null);
      },
    },
  },
  created() {
    this.options.series = this.chartData;
    this.setCustomChartSetting(this.chartSettings);
    if (this.bordered) {
      this.borderStyle = {
        border: '2px solid #dde2ec',
      };
    }
  },
  methods: {
    onChartLoaded(chart) {
      if (this.chart == null) { this.chart = chart; }

      this.chart.zoomOut(false);
      this.chart.redraw();
      this.chart.setSize(null);
    },
    /**
     * Label Formatter로 Html로 레이블 설정 가능
     * 자세한 설정은 https://api.highcharts.com/highcharts/plotOptions
     * @param settings
     */
    setCustomChartSetting(settings) {
      this.options.chart = {
        type: 'line',
      };
      if (settings == null) return;
      this.options = { ...settings, series: this.chartData };
      this.options.chart.type = 'line';
    },
  },
};
</script>

<style scoped>

</style>
