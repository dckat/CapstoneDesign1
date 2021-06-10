<template>
  <div>
    <a-descriptions layout="vertical" bordered>
      <a-descriptions-item :span="4">
        <template v-slot:label>
          <div>{{ foundDrone.modelName }}</div>
        </template>
        <img
          :src="foundDrone.picture || require('@/assets/images/drone-image.jpg')"
          :style="{width: '300px'}"
        />
      </a-descriptions-item>
      <a-descriptions-item label="실시간 정보" :span="4">
        <div class="des-sub-title">현재 위치</div>
        <div class="des-sub-cont-grid-4" style="margin-bottom: 10px;">
          <div>
            <div>경도</div>
            <div>{{ selectedLastLog.longitude ? selectedLastLog.longitude.toFixed(3) : '?' }}</div>
          </div>
          <div>
            <div>위도</div>
            <div>{{ selectedLastLog.latitude ? selectedLastLog.latitude.toFixed(3) : '?' }}</div>
          </div>
          <div>
            <div>이동거리</div>
            <div>{{ Math.floor(getDetailData.distance + selectedLastLog.distance) }}m</div>
          </div>
          <div>
            <div>운용시간</div>
            <div>{{ getTimeDiff(foundSchedule.startTime) }}</div>
          </div>
        </div>
        <div class="des-sub-cont-grid-2" style="margin-bottom: 10px;">
          <div>
            <div class="des-sub-title">현재 속도</div>
            <div class="des-sub-cont-grid-2">
              <div>
                <div>수평 속도</div>
                <div>{{ selectedLastLog.horizontalSpeed }}km/h</div>
              </div>
              <div>
                <div>수직 속도</div>
                <div>{{ selectedLastLog.verticalSpeed }}km/h</div>
              </div>
            </div>
          </div>
          <div>
            <div class="des-sub-title">현재 고도</div>
            <div class="des-sub-cont-grid-2">
              <div>
                <div>지면고도</div>
                <div>{{ selectedLastLog.aboveGroundLevel }}m</div>
              </div>
              <div>
                <div>해발고도</div>
                <div>{{ selectedLastLog.aboveSeaLevel }}m</div>
              </div>
            </div>
          </div>
        </div>
      </a-descriptions-item>
      <a-descriptions-item label="스케쥴" :span="4" :style="{padding: '0px'}">
        <div class="des-sub-cont-grid-2" style="margin-bottom: 10px;">
          <div>
            <div class="des-sub-title">시작 스케쥴</div>
            <div>
                <div>날짜/시간</div>
                <div style="margin-bottom: 5px;">{{ mc_dateTime(foundSchedule.startTime) || '?'  }}</div>
                <div>경도</div>
                <div style="margin-bottom: 5px;">{{ foundSchedule.startLongitude || '?'  }}</div>
                <div>위도</div>
                <div style="margin-bottom: 5px;">{{ foundSchedule.startLatitude || '?'  }}</div>
            </div>
          </div>
          <div>
            <div class="des-sub-title">실제 시작</div>
            <div>
                <div>날짜/시간</div>
                <div style="margin-bottom: 5px;">{{ droneLogs.length !== 0 ? mc_dateTime(droneLogs[0].createdAt) : "?" }}</div>
                <div>경도</div>
                <div style="margin-bottom: 5px;">{{ droneLogs.length !== 0 ? droneLogs[0].longitude : "?"  }}</div>
                <div>위도</div>
                <div style="margin-bottom: 5px;">{{ droneLogs.length !== 0 ? droneLogs[0].latitude : "?"  }}</div>
            </div>
          </div>
        </div>
        <div class="des-sub-title">종료 스케쥴</div>
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr">
          <div>
            <div>날짜/시간</div>
            <div>{{ mc_dateTime(foundSchedule.terminateTime) || '?'   }}</div>
          </div>
          <div>
            <div>경도</div>
            <div>{{ foundSchedule.terminateLongitude || '?'  }}</div>
          </div>
          <div>
            <div>위도</div>
            <div>{{ foundSchedule.terminateLatitude || '?'  }}</div>
          </div>
        </div>
      </a-descriptions-item>
      <a-descriptions-item label="드론 정보" :span="6">
        <div class="des-sub-cont-grid-4">
          <div>
            <div class="des-sub-title">제조사</div>
            <div>{{ foundDrone.maker || '?' }}</div>
          </div>
          <div>
            <div class="des-sub-title">종류</div>
            <div>{{ foundDrone.usageName || '?' }}</div>
          </div>
          <div>
            <div class="des-sub-title">제원</div>
            <div>{{ foundDrone.specification || '?' }}</div>
          </div>
          <div>
            <div class="des-sub-title">무게</div>
            <div>{{ foundDrone.weight }}g</div>
          </div>
        </div>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  head() {
    return {
      title: 'Drone',
      meta: [
        {
          hid: 'database',
          name: 'Descriptions',
          content: 'DroneWeb-Content',
        },
      ],
    };
  },
  watch: {
    getSelectedLastLog: {
      deep: true,
      handler(newVal) {
        this.selectedLastLog = newVal;
      },
    },
  },
  data() {
    return {
      selectedLastLog: {},
    };
  },
  computed: {
    ...mapGetters('Drone/drone', {
      getDetailData: 'getDetailData',
      getSelectedLastLog: 'getSelectedLastLog',
    }),
    foundSchedule() {
      return this.getDetailData.foundSchedule || {};
    },
    foundDrone() {
      return this.getDetailData.foundDrone || {};
    },
    droneLogs() {
      return this.getDetailData.droneLogs || [];
    },
    selectedLastLog() {
      return this.getSelectedLastLog || {};
    },
  },
  methods: {
    getTimeDiff(startTime) {
      const totalSeconds = this.$dayjs().diff(this.$dayjs(startTime), 's');
      const seconds = totalSeconds % 60;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const hours = Math.floor(totalSeconds / 3600);

      return `${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>
<style lang="scss">
.des-sub-title {
  font-size: 16px;
  font-weight: 900;
}

.des-sub-cont-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.des-sub-cont-grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.des-sub-cont {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

</style>
