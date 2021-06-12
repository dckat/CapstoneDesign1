/*
 * 전역으로 사용되는 mixin 지정입니다.
 */
import calcDistanceFromCoord from '@/utils/CommonFunction/calcDistanceFromCoord';
import calcAngleFromCoord from '@/utils/CommonFunction/calcAngleFromCoord';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      socketServerCnt: 5,
      droneCnt: 1000,
      selectedDroneLog: {},
      accumulatedDistance: 0,
      socketOnGoing: 0,
    };
  },
  computed: {
    ...mapGetters('Drone/drone', {
      getDroneLogs: 'getDroneLogs',
      getSelectedLogList: 'getSelectedLogList',
      getSelectedDroneId: 'getSelectedDroneId',
      getSelectedLastLog: 'getSelectedLastLog',
      getAccumulatedDistance: 'getAccumulatedDistance',
    }),
    ...mapGetters('Drone/Map', {
      getZoomLevel: 'getZoomLevel',
      getBoundary: 'getBoundary',
      isBoundary: 'isBoundary',
      zoomToActivateTime: 'zoomToActivateTime',
      getStateChange: 'getStateChange',
    }),
    mc_dateTime() {
      return (dateTime) => {
        if (dateTime == null || dateTime === 'Invalid Date' || dateTime === '') return '';
        return this.$dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
      };
    },
    mc_date() {
      return (date) => {
        if (date == null || date === 'Invalid Date' || date === '') return '';
        return this.$dayjs(date).format('YYYY-MM-DD');
      };
    },
    zoomToSee() {
      return (index) => {
        const div = index % 10;
        switch (this.zoom) {
        case 8:
          return div < 2;
        case 9:
          return div < 4;
        case 10:
          return div < 6;
        case 11:
          return div < 8;
        default:
          return true;
        }
      };
    },
  },
  methods: {
    ...mapActions('Drone/drone', {
      setDroneLogs: 'setDroneLogs',
      setSelectedLogList: 'setSelectedLogList',
      setAccumulatedDistance: 'setAccumulatedDistance',
      setSelectedDroneId: 'setSelectedDroneId',
    }),
    ...mapActions('Drone/Map', {
      clearStateChange: 'clearStateChange',
    }),
    connect() {
      if (window.clientSocket == null || window.clientSocket?.readyState === 3) {
        window.clientSocket = new WebSocket('ws://14.33.35.148:20206/drone');

        window.clientSocket.onopen = () => {
          console.log('socket on open');
        };
        window.clientSocket.onerror = () => {
          console.log('socket on error');
        };
        window.clientSocket.onmessage = (data) => {
          const logData = JSON.parse(data.data);

          let logInfo = null;
          const filterDroneLogs = logData.data.droneLog.filter((v, idx) => {
            if (this.getSelectedDroneId && v.droneId === this.getSelectedDroneId) logInfo = v;
            return this.isBoundary(v) && this.zoomToSee(idx);
          });

          if (this.socketOnGoing % this.zoomToActivateTime === 0 || this.getStateChange) {
            this.setDroneLogs({ logs: filterDroneLogs, mutation: 'SET_DRONE_LOGS' });
            this.setDroneLogs({ logs: logData.data.droneLog, mutation: 'SET_WHOLE_DRONE_LOGS' });
            this.clearStateChange();
          }

          if (logInfo) {
            this.setAccumulatedDistance(calcDistanceFromCoord(this.getSelectedLastLog, logInfo) || 0);
            logInfo.angle = calcAngleFromCoord(this.getSelectedLastLog, logInfo) || 0;
            logInfo.distance = this.getAccumulatedDistance;
            this.setSelectedLogList(logInfo);
          }

          this.socketOnGoing += 1;
        };
        window.clientSocket.onclose = () => {
          console.log('socket on close');
        };
      }
    },
    // connectMultiClient() {
    //   for (let j = 0; j < this.droneCnt * this.socketServerCnt; j += 1) {
    //     this.drones.push({ x: 0, y: 0 });
    //   }
    //   for (let i = 0; i < this.socketServerCnt; i += 1) {
    //     if (
    //       window[`wsSocket${i}`] == null
    //       || window[`wsSocket${i}`].readyState === 3
    //     ) {
    //       window[`wsSocket${i}`] = new WebSocket(
    //         'ws://14.33.35.148:20206/drone',
    //       );
    //       window[`wsSocket${i}`].onopen = () => {
    //         console.log(`socket${i} on open`);
    //       };
    //       window[`wsSocket${i}`].onerror = (e) => {
    //         console.log(`socket${i} on error occur ${e}`);
    //       };
    //       window[`wsSocket${i}`].onmessage = (data) => {
    //         const logData = JSON.parse(data.data);
    //         console.log(
    //           `message${i} ${this.$dayjs().format('HH:mm:ss')} : `,
    //           logData.droneData,
    //         );
    //         setTimeout(() => {
    //           for (let k = 0; k < this.droneCnt; k += 1) {
    //             this.drones[i * (k + 1) + k].x = logData.droneData[k].x;
    //             this.drones[i * (k + 1) + k].y = logData.droneData[k].y;
    //           }
    //         }, 0);
    //       };
    //       window[`wsSocket${i}`].onclose = () => {
    //         console.log(`socket${i} closed`);
    //       };
    //     }
    //   }
    // },
    disconnect() {
      if (window.clientSocket && window.clientSocket.readyState === 1) {
        window.clientSocket.close();
        window.clientSocket = null;
      }
    },
  },
};
