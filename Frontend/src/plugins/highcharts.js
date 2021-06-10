import Vue from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import HighchartsBoost from 'highcharts/modules/boost';
import HighchartsBoostCanvas from 'highcharts/modules/boost-canvas';
// import HighchartsExporting from 'highcharts/modules/exporting';
// import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
// import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsBoost(Highcharts);
HighchartsBoostCanvas(Highcharts);
// HighchartsExporting(Highcharts);
// HighchartsOfflineExporting(Highcharts);
// HighchartsExportData(Highcharts);
HighchartsMore(Highcharts);

const options = {
  time: {
    timezoneOffset: -540,
  },
  colors: [
    '#C08B9C', '#F5D1B7', '#E99C65', '#7A9A82',
    '#28B3BE', '#A6A6A6', '#F4C96B', '#C04176',
    '#8885A4', '#454C88', '#94A4BE', '#E9DF84',
    '#7EAFB2',
  ],
  credits: {
    enabled: false,
    style: {
      color: '#FFFFFF',
    },
  },
  chart: {
    style: {
      fontFamily: 'Noto Sans Kr, sans-serif',
      fontWeight: 500,
    },
    animation: true,
  },
  title: {
    style: {
      color: '#2a274d',
    },
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  xAxis: {
    labels: {
      style: {
        color: '#4f4f7a',
        fontSize: '14px',
      },
      shared: true,
      useHTML: true,
    },
  },
  yAxis: {
    labels: {
      style: {
        color: '#4f4f7a',
        fontSize: '14px',
      },
      shared: true,
      useHTML: true,
    },
  },
  labels: {
    style: {
      color: '#4f4f7a',
    },
    shared: true,
    useHTML: true,
  },
  tooltip: {
    headerFormat: '<span style="font-size:16px;">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}</td>'
      + '<td style="padding:0"><b>: {point.y}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true,
    style: {
      fontSize: '14px',
    },
    borderWidth: 2,
    borderRadius: 6,
  },
  legend: {
    useHTML: true,
    enabled: true,
    itemStyle: {
      color: '#4f4f7a',
      fontSize: '14px',
    },
    itemHoverStyle: {
      color: '#100f28',
      fontSize: '14px',
    },
    itemHiddenStyle: {
      color: '#dde2ec',
      fontSize: '14px',
    },
  },
  loading: {
    labelStyle: {
      color: '#013477',
    },
    style: {
      backgroundColor: 'gray',
    },
  },
  exporting: {
    sourceWidth: 1000,
    sourceHeight: 500,
    buttons: {
      contextButton: {
        theme: {
          fill: 'transparent',
        },
        x: -2,
        y: 0,
        menuItems: [
          'viewFullscreen',
          'printChart',
          'separator',
          'downloadPDF',
          'downloadPNG',
          'downloadXLS',
        ],
      },
    },
    fallbackToExportServer: false,
  },
  mapNavigation: {
    enableMouseWheelZoom: true,
  },
};

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
  },
  ...options,
});

Vue.use(HighchartsVue, {
  highcharts: Highcharts,
});
