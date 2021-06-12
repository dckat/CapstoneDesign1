<template>
  <div>
    <main-header/>
    <div class="page-main">
      <div id="map-wrap">
        <client-only>
          <div class="mapBox">
            <l-map
              ref="map"
              class="map"
              :center="[currentLatitude, currentLongitude]"
              :options="{zoomControl: false}"
              :zoom="zoom"
              :max-zoom="18"
              :min-zoom="8"
              @update:zoom="zoomUpdate"
              @update:bounds="boundsUpdate"
              @click="clickMap"
            >
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>

              <l-control position="bottomright">
                <img
                  @click="clickGpsBtn"
                  class="gpsBtn"
                  :src="require('@/static/img/gps.png')"
                />
              </l-control>

              <l-control-zoom position="bottomright"></l-control-zoom>
              <template v-for="(drone) in getDroneLogs">
                <drone
                  :key="drone.id"
                  :latitude="drone.latitude"
                  :longitude="drone.longitude"
                  :icon="icon"
                  @clickDrone=clickDrone(drone.droneId)
                />
              </template>

              <l-polyline :lat-lngs="selectedDroneRoute" :color="'green'"></l-polyline>

            </l-map>
            <DroneDetail
              class="drone-detail"
              v-if="showDroneDetail"
            />
            <SearchBtnBox
              class="search-box"
              @changeFilterMode="e => filterMode = e"
              @changeSearchMode="e => searchMode = e"
            />
            <SearchFeatureBox
              v-if="searchMode"
              @clickClose="searchMode = false"
              @focusChange="(lat, lng) => focusChange(lat, lng)"
              @clickDrone="(id) => clickDrone(id)"
              class="search-box"
            />
            <BottomToolBox
              class="bottom-tool-box"
              @changeFilterMode="e => filterMode = e"
              @changeSearchMode="e => searchMode = e"
            />
            <FilterFeatureBox
              v-if="filterMode"
              @clickClose="filterMode = false"
              class="filter-feature-box"
            />

          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import { mapActions, mapGetters } from 'vuex';
import MainHeader from '@/components/Main/header';
import Drone from '@/components/Main/drone';
import DroneDetail from '@/components/Main/Box/DetailBox/detailBox';
import SearchBtnBox from '@/components/Main/Box/SearchBox/searchBtnBox';
import SearchFeatureBox from '@/components/Main/Box/SearchBox/searchFeatureBox';
import BottomToolBox from '@/components/Main/Box/BottomToolBox/bottomToolBox';
import FilterFeatureBox from '@/components/Main/Box/FilterBox/filterFeatureBox';

import droneImg from '@/static/img/drone.svg';

export default {
  components: {
    MainHeader, Drone, DroneDetail, SearchBtnBox, SearchFeatureBox, BottomToolBox, FilterFeatureBox,
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
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      map: null,
      selectedDroneRoute: [],
      selectedDroneData: {},
      selectedDroneId: null,
      currentLatitude: 37.2430125,
      currentLongitude: 127.0811054,
      showDroneDetail: false,
      filterMode: false,
      searchMode: false,
      icon: droneImg,

      zoom: 15,
      socketCheckInterval: null,
    };
  },
  computed: {
    ...mapGetters('Drone/drone', {
      getDetailData: 'getDetailData',
      getDroneLogs: 'getDroneLogs',
      getSelectedLogList: 'getSelectedLogList',
      getSelectedLastLog: 'getSelectedLastLog',
      getSelectedDroneId: 'getSelectedDroneId',
    }),
  },
  watch: {
    getDroneLogs: {
      deep: true,
      handler(newVal) {
        // console.log('드론 소켓 로그 getDroneLogs', newVal);
      },
    },
    getSelectedLastLog: {
      deep: true,
      handler(newVal) {
        this.selectedDroneRoute.push([newVal.latitude, newVal.longitude]);
        // console.log('page 속도 등 계산한 정보 selectedDroneLog', newVal);
      },
    },
  },
  created() {
    if (process.client) {
    // Websocket 연결
      this.connect();
      this.socketCheckInterval = setInterval(() => {
        console.log('socketState', window.clientSocket.readyState);
        this.connect();
      }, 30000);
      setTimeout(() => {
        this.zoom = 16;
      }, 2000);

      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;
      }, (e) => {
        console.log('err', e);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 2000 });
    }
  },
  methods: {
    ...mapActions('Drone/drone', {
      fetchDetailInfo: 'fetchDetailInfo',
      setSelectedDroneId: 'setSelectedDroneId',
    }),
    ...mapActions('Drone/Map', {
      setBoundary: 'setBoundary',
      setZoomLevel: 'setZoomLevel',
    }),
    zoomUpdate(zoom) {
      this.setZoomLevel(zoom);
    },
    boundsUpdate(bounds) {
      this.setBoundary(bounds);
    },
    focusChange(lat, lng) {
      this.map = this.$refs.map.mapObject.panTo([lat, lng]);
    },
    clickGpsBtn() {
      if (process.client) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentLatitude = position.coords.latitude;
          this.currentLongitude = position.coords.longitude;
          this.focusChange(this.currentLatitude, this.currentLongitude);
        }, (e) => {
          console.log('err', e);
        }, { enableHighAccuracy: true, maximumAge: 0, timeout: 2000 });
      }
    },
    clickDrone(droneId) {
      if (this.getSelectedDroneId === droneId) return;
      this.selectedDroneRoute = [];
      this.setSelectedDroneId(droneId);
      this.accumulatedDistance = 0; // 미터

      this.fetchDetailInfo(this.getSelectedDroneId)
        .then((r) => {
          console.log('선택한 드론', r);
          r.droneLogs.forEach((droneLog) => {
            this.selectedDroneRoute.push([droneLog.latitude, droneLog.longitude]);
          });
          this.selectedDroneData = this.getDetailData;
          this.showDroneDetail = true;
        });
    },
    clickMap() {
      this.showDroneDetail = false;
      this.selectedDroneRoute = [];
      this.setSelectedDroneId(null);
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
.mapBox {
 height: calc(100vh - 100px);
 position: relative;
}

.map {
  z-index: 0;
}

.drone-detail {
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 10px;
}

.tool-box {
  position: absolute;
  z-index: 10;
  top: 10px;
  right: 10px;
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
