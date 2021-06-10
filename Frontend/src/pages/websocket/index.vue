<template>
  <div>
    <analytics-header/>
    <div class="chart-div">
      <live-log-chart :chart-data="liveDroneData"/>
    </div>

    <div class="page-main">
      <div>
        웹 소켓 테스트
      </div>
      <a-input v-model="socketClientCnt"/>
      <a-button @click="multConnect">multConnect</a-button>
      <a-button @click="connect">connect</a-button>
      <a-button @click="sendMessage">sendMessage</a-button>
      <a-button @click="disconnectMult">disconnectMult</a-button>
      <a-button @click="disconnectSol">disconnectSol</a-button>
      <div>
        <a-button @click="multConnectDynamic">multConnectDynamic</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import AnalyticsHeader from '@/components/Analytics/header';
import LiveLogChart from '@/components/Analytics/Chart/liveLogChart';
import { mapActions, mapGetters } from 'vuex';
import calcGeoLocation from '@/utils/Mixins/Component/calcGeolocation';

export default {
  components: {
    LiveLogChart,
    AnalyticsHeader,
  },
  mixins: [calcGeoLocation],
  data() {
    return {
      socketClientCnt: 10,
      liveDroneData: [
        {
          name: '드론 기체 수',
          data: [],
        },
        {
          name: '활성화된 드론 수',
          data: [],
        },
      ],
      angle: {},
      velocity: {},
    };
  },
  computed: {
    ...mapGetters('GeoLocation', {
      getCoord: 'getCoord',
      getAngle: 'getAngle',
      getVelocity: 'getVelocity',
    }),
    ranNum() {
      return (min, max) => parseInt((Math.random() * (max - min) + min), 10);
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapActions('GeoLocation', {
      saveCoord: 'saveCoord',
    }),
    connect() {
      // window.webSocketSol = new WebSocket('ws://localhost:20202');
      window.webSocketSol = new WebSocket('ws://14.33.35.148:20202');
      window.webSocketSol.onopen = () => {
        console.log('socket on open');
      };
      window.webSocketSol.onerror = () => {
        console.log('socket on open');
      };
      window.webSocketSol.onmessage = (data) => {
        // console.log(data);
        const logData = JSON.parse(data.data);
        // this.saveCoord(logData);
        console.log(`message ${this.$dayjs().format('HH:mm:ss')} : `, logData);
      };
      window.webSocketSol.onclose = () => {
        console.log('socket on open');
      };
    },
    multConnect() {
      for (let i = 0; i < 10; i += 1) {
        if (window[`wsSocket${i}`] == null || window[`wsSocket${i}`].readyState === 3) {
          // window[`wsSocket${i}`] = new WebSocket(`ws://localhost:20203/${i + 1}`);
          window[`wsSocket${i}`] = new WebSocket(`ws://14.33.35.148:20203/${i + 1}`);
          window[`wsSocket${i}`].onopen = () => {
            console.log(`socket${i} on open`);
          };
          window[`wsSocket${i}`].onerror = () => {
            console.log(`socket${i} on error`);
          };
          window[`wsSocket${i}`].onmessage = (data) => {
            // console.log(data);
            const logData = JSON.parse(data.data);
            // this.saveCoord(logData);
            console.log(`message${i} ${this.$dayjs().format('HH:mm:ss')} : `, logData);
          };
          window[`wsSocket${i}`].onclose = () => {
            console.log(`socket${i} on close`);
          };
        }
      }
    },
    sendMessage() {
      window.wsSocket.send('client sent message');
    },
    multConnectDynamic() {
      for (let i = 0; i < this.socketClientCnt; i += 1) {
        if (window[`wsSocket${i}`] == null || window[`wsSocket${i}`].readyState === 3) {
          // window[`wsSocket${i}`] = new WebSocket(`ws://localhost:20203/${i + 1}`);
          window[`wsSocket${i}`] = new WebSocket(`ws://14.33.35.148:20204/${i + 1}`);
          window[`wsSocket${i}`].onopen = () => {
            console.log(`socket${i} on open`);
          };
          window[`wsSocket${i}`].onerror = () => {
            console.log(`socket${i} on error`);
          };
          window[`wsSocket${i}`].onmessage = (data) => {
            // console.log(data);
            const logData = JSON.parse(data.data);
            // this.saveCoord(logData);
            console.log(`message${i} ${this.$dayjs().format('HH:mm:ss')} : `, logData);
          };
          window[`wsSocket${i}`].onclose = () => {
            console.log(`socket${i} on close`);
          };
        }
      }
    },
    disconnectMult() {
      for (let i = 0; i < this.socketClientCnt; i += 1) {
        if (window[`wsSocket${i}`].readyState === 1) {
          window[`wsSocket${i}`].close();
          window[`wsSocket${i}`] = null;
        }
      }
    },
    disconnectMult2() {
      for (let i = 0; i < this.socketClientCnt; i += 1) {
        if (window[`wsSocket${i}`].readyState === 1) {
          window[`wsSocket${i}`].close();
          window[`wsSocket${i}`] = null;
        }
      }
    },
    disconnectSol() {
      if (window.webSocketSol.readyState === 1) {
        window.webSocketSol.close();
        window.webSocketSol = null;
      }
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
