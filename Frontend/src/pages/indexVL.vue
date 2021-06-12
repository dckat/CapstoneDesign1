<template>
  <div>
    <client-only>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
              data-projection="EPSG:4326" style="height: 400px">
        <vl-view :min-zoom="2" :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

        <vl-geoloc @update:position="geolocPosition = $event">
          <template slot-scope="geoloc">
            <!-- <vl-feature v-if="geoloc.position" id="position-feature">
              {{ geoloc.position }}
              <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon src="@/assets/images/drone.png" :scale="0.1" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
            </vl-feature> -->

            <vl-feature>
              <vl-geom-point :coordinates="[126.986606,37.310334]"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon src="@/assets/images/drone.png" :scale="0.2" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
            </vl-feature>

            <vl-feature v-for="(drone) in droneLogs" :key="drone.id">
              <vl-geom-point :coordinates="[drone.longitude,drone.latitude]"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon src="@/assets/images/drone.png" :scale="0.1" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
            </vl-feature>
          </template>
        </vl-geoloc>

        <vl-layer-tile id="osm">
          <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
      </vl-map>
      <div style="padding: 20px">
        Zoom: {{ zoom }}<br>
        Center: {{ center }}<br>
        Rotation: {{ rotation }}<br>
        My geolocation: {{ geolocPosition }}
      </div>
      <a-button @click="connect">connect</a-button>
<!--          <a-button @click="connectMultiClient">connectMultiClient</a-button>-->
          <a-button @click="disconnect">disconnect</a-button>
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MainHeader from '@/components/Main/header';
import Drone from '@/components/Main/drone';
import DroneDetail from '@/components/Main/Box/DetailBox/detailBox';

export default {
  components: {
    MainHeader, Drone, DroneDetail, ToolBox,
  },
  head() {
    return {
      title: 'DroneWeb',
      meta: [
        {
          hid: 'database',
          name: 'Descriptions',
          content: 'DroneWeb-Content',
        },
      ],
    };
  },
  data() {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      map: null,
      drones: [],
      testDrone: {
        latitude: 37.2430125,
        longitude: 127.0811054,
        polyline: {
          latlngs: [],
          color: 'green',
        },
      },
      currentLatitude: 37.2430125,
      currentLongitude: 127.0811054,
      showDroneDetail: false,
    };
  },
  computed: {
    ...mapGetters('Drone/drone', {
      getDetailData: 'getDetailData',
    }),
  },
  watch: {
    droneLogs: {
      deep: true,
      handler(newVal) {
        console.log('드론 소켓 로그 droneLogs', newVal);
      },
    },
  },
  created() {
    /**
     * getDetailData와 fetchDetailInfo로 상세 정보 조회
     * 속도, 이동거리, 방향은 모두 계산해서 출력함.
     */
    if (process.browser) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;
      }, () => {
      }, { enableHighAccuracy: true, maximumAge: 0 });
    }
  },
  methods: {
    ...mapActions('Drone/drone', {
      fetchDetailInfo: 'fetchDetailInfo',
      clearAccumulatedDistance: 'clearAccumulatedDistance',
      setSelectedDroneId: 'setSelectedDroneId',
    }),
    clickGpsBtn() {
      if (process.browser) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentLatitude = position.coords.latitude;
          this.currentLongitude = position.coords.longitude;
          this.map = this.$refs.map.mapObject.panTo([this.currentLatitude, this.currentLongitude]);
        }, () => {
        }, { enableHighAccuracy: true, maximumAge: 0 });
      }
    },
    clickDrone() {
      /**
       * id가 1일때 가정하고 만듦. 추후에 수정 필.
       * distance 거리 단위는 미터
       */
      this.setSelectedDroneId(1);
      this.clearAccumulatedDistance();
      this.fetchDetailInfo(1)
        .then((r) => {
          this.showDroneDetail = true;
          console.log('선택한 드론', r);
        });
      console.log('drone click');
    },
    clickMap() {
      console.log('click Map');
      this.showDroneDetail = false;
    },

    clickSearchBtn() {
      console.log('click btn');
    },
    clickFilterBtn() {
      console.log('click btn');
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  z-index: 0;
}

.gpsBtn {
  width: 35px;
  height: 35px;
  padding: 5px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.gpsBtn:hover {
  background-color: #f4f4f4;
}

</style>
