<template>
  <div>
    <analytics-header/>
    <div class="chart-div">
      <live-log-chart :chart-data="liveDroneData"/>
    </div>
    <div class="r-flex">
      <div class="pie-chart-div" style="margin-right: 20px">
        <maker-pie-chart :chart-data="makerData"/>
      </div>
      <div class="pie-chart-div">
        <drone-category-pie-chart :chart-data="categoryData" />
      </div>
    </div>
    <div class="chart-div">
      <time-category-column-chart :chart-data="timeDroneData"/>
    </div>

    <div class="page-main">
      <div>
        소켓 테스트
      </div>
      <a-button @click="getMessage">emit</a-button>
      <a-button @click="onM">on</a-button>
    </div>
  </div>
</template>

<script>
import AnalyticsHeader from '@/components/Analytics/header';
import MakerPieChart from '@/components/Analytics/Chart/makerPieChart';
import DroneCategoryPieChart from '@/components/Analytics/Chart/droneCategoryPieChart';
import TimeCategoryColumnChart from '@/components/Analytics/Chart/timeCategoryColumnChart';
import LiveLogChart from '@/components/Analytics/Chart/liveLogChart';

export default {
  components: {
    LiveLogChart,
    TimeCategoryColumnChart,
    AnalyticsHeader,
    DroneCategoryPieChart,
    MakerPieChart,
  },
  data() {
    return {
      socket: null,
      makerData: [],
      categoryData: [],
      timeDroneData: [],
      liveDroneData: [{
        name: '드론 기체 수',
        data: [],
      }],
    };
  },
  computed: {
    ranNum() {
      return (min, max) => parseInt((Math.random() * (max - min) + min), 10);
    },
  },
  created() {
    this.makeChartData();
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      // nuxt-socket-io opts:
      name: 'main', // Use socket "home"
      channel: '/testSoc',
      // socket.io-client opts:
      reconnection: false,
    });
    this.socket
      .on('receiveLog', (msg, cb) => {
        /* Handle event */
        console.log(msg);
        this.liveDroneData[0].data.push({
          x: this.$dayjs(msg.time).valueOf(), y: msg.num,
        });
      });
    this.socket
      .on('connection', (msg, cb) => {
        /* Handle event */
        console.log(msg, cb);
      });
  },
  methods: {
    getMessage() {
      this.socket.emit('getMessage', { id: 'abc123' }, (resp) => {
        this.messageRxd = resp;
      });
    },
    onM() {
      this.$axios.get('http://localhost:8888')
        .then((r) => {
          console.log('apiCall');
        });
    },
    makeChartData() {
      this.makerData = [{
        name: '기체수',
        colorByPoint: true,
        data: [
          {
            name: 'DJI', y: 6234,
          },
          {
            name: '3DRobotics', y: 1248,
          },
          {
            name: 'SYMA', y: 248,
          },
          {
            name: 'Parrot', y: 783,
          },
          {
            name: 'Cheerson', y: 563,
          },
        ],
      }];
      this.categoryData = [{
        name: '기체수',
        colorByPoint: true,
        data: [
          {
            name: 'TriCopter', y: 3452,
          },
          {
            name: 'QuadCopter', y: 4032,
          },
          {
            name: 'HexaCopter', y: 1395,
          },
          {
            name: 'OctaCopter', y: 474,
          },
        ],
      }];

      this.timeDroneData = [
        {
          name: 'Toy',
          data: [
            this.ranNum(1, 100),
            this.ranNum(1, 100),
            this.ranNum(100, 300),
            this.ranNum(100, 300),
            this.ranNum(50, 200),
            this.ranNum(1, 100),
          ],
        },
        {
          name: 'Racing',
          data: [
            this.ranNum(1, 100),
            this.ranNum(1, 100),
            this.ranNum(100, 300),
            this.ranNum(100, 300),
            this.ranNum(50, 200),
            this.ranNum(1, 100),
          ],
        },
        {
          name: 'Mission',
          data: [
            this.ranNum(100, 1000),
            this.ranNum(100, 1000),
            this.ranNum(1, 200),
            this.ranNum(1, 200),
            this.ranNum(1, 200),
            this.ranNum(100, 1000),
          ],
        },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.pie-chart-div {
  margin-top: 20px;
  height: 440px;
  width: calc(50% - 10px);
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 6px;
  border: $gray-2 1px solid;
}
.chart-div {
  margin-top: 20px;
  height: 440px;
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 6px;
  border: $gray-2 1px solid;
}
</style>
