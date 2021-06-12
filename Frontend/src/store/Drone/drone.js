import calcDistanceFromCoord from '@/utils/CommonFunction/calcDistanceFromCoord';

export const state = () => ({
  detailData: {},

  droneLogs: [],
  wholeDroneLogs: [],
  selectedLogList: [],
  selectedDroneId: null,
  accumulatedDistance: 0,
  logFilter: {
    checkFilter: false,
    maker: [],
    filteredDroneList: [],
    weight: [0, 50],
    altitude: [0, 200],
    speed: [0, 100],
  },
});

export const getters = {
  getDetailData: (state) => state.detailData,
  getDroneLogs: (state) => state.droneLogs,
  getWholeDroneLog: (state) => state.wholeDroneLogs,
  getSelectedLogList: (state) => state.selectedLogList,
  getSelectedLastLog: (state) => {
    if (state.selectedLogList.length === 0) return null;
    return state.selectedLogList[state.selectedLogList.length - 1];
  },
  getAccumulatedDistance: (state) => state.accumulatedDistance,
  getSelectedDroneId: (state) => state.selectedDroneId,
  getLogFilter: (state) => state.logFilter,
};

export const actions = {
  fetchDetailInfo(context, id) {
    return new Promise((resolve, reject) => {
      // context.commit('DEL_DETAIL_DATA');
      this.$axios.get(`/api/map/drone/${id}`)
        .then((r) => {
          const result = r.data;

          let tempLog = null;
          let distance = 0;
          for (let i = 0; i < result.droneLogs.length; i += 1) {
            const currentLog = result.droneLogs[i];
            distance += calcDistanceFromCoord(tempLog, currentLog) || 0;
            tempLog = currentLog;
          }
          result.distance = distance;
          context.commit('SET_DETAIL_DATA', result);
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  setDroneLogs(context, data) {
    const filter = context.getters.getLogFilter;
    const filteredLogs = data.logs.filter((v) => {
      let isMaker = true;
      if (filter.maker.length !== 0) {
        isMaker = !!filter.filteredDroneList.find((e) => Number(e.id) === Number(v.droneId));
      }
      const isSpeed = (v?.horizontalSpeed >= filter.speed[0] && (filter.speed[1] === 100 ? true : v?.horizontalSpeed <= filter.speed[1]))
        || (v?.verticalSpeed >= filter.speed[0] && (filter.speed[1] === 100 ? true : v?.verticalSpeed <= filter.speed[1]));
      const isAltitude = (v?.aboveGroundLevel >= filter.altitude[0] && (filter.altitude[1] === 200 ? true : v?.aboveGroundLevel <= filter.altitude[1]))
        || (v?.aboveSeaLevel >= filter.altitude[0] && (filter.altitude[1] === 200 ? true : v?.aboveSeaLevel <= filter.altitude[1]));
      const isWeight = v?.weight >= filter.weight[0] && (filter.weight[1] === 50 ? true : v?.weight <= filter.weight[1]);
      return isAltitude && isSpeed && isMaker;
    });
    context.commit(data.mutation, filteredLogs);
  },
  clearDroneLogs(context) {
    context.commit('CLEAR_DRONE_LOGS');
  },
  setSelectedLogList(context, data) {
    context.commit('SET_SELECTED_LOG_LIST', data);
  },
  clearSelectedLogList(context) {
    context.commit('CLEAR_SELECTED_LOG_LIST');
  },
  setSelectedDroneId(context, data) {
    context.commit('SET_SELECTED_DRONE_ID', data);
  },
  clearSelectedDroneId(context) {
    context.commit('CLEAR_SELECTED_DRONE_ID');
  },
  setAccumulatedDistance(context, data) {
    context.commit('SET_ACCUMULATED_DISTANCE', data);
  },
  clearAccumulatedDistance(context) {
    context.commit('CLEAR_ACCUMULATED_DISTANCE');
  },
  setLogFilter(context, data) {
    context.commit('SET_LOG_FILTER', data);
  },
  clearLogFilter(context) {
    context.commit('DEL_LOG_FILTER');
  },
};

export const mutations = {
  SET_LOG_FILTER(state, payload) {
    state.logFilter = payload;
  },
  DEL_LOG_FILTER(state) {
    state.logFilter = {
      checkFilter: false,
      filteredDroneList: [],
      maker: [],
      weight: [0, 50],
      altitude: [0, 200],
      speed: [0, 100],
    };
  },
  //
  SET_DETAIL_DATA(state, payload) {
    state.detailData = payload;
  },
  DEL_DETAIL_DATA(state) {
    state.detailData = null;
  },
  //
  SET_DRONE_LOGS(state, payload) {
    state.droneLogs = payload;
  },
  CLEAR_DRONE_LOGS(state) {
    state.droneLogs = [];
  },
  //
  SET_WHOLE_DRONE_LOGS(state, payload) {
    state.wholeDroneLogs = payload;
  },
  CLEAR_WHOLE_DRONE_LOGS(state) {
    state.wholeDroneLogs = [];
  },
  //
  SET_SELECTED_LOG_LIST(state, payload) {
    state.selectedLogList.push(payload);
  },
  CLEAR_SELECTED_LOG_LIST(state) {
    state.selectedLogList = [];
  },
  //
  SET_SELECTED_DRONE_ID(state, payload) {
    state.selectedDroneId = payload;
  },
  CLEAR_SELECTED_DRONE_ID(state) {
    state.selectedDroneId = null;
  },
  //
  SET_ACCUMULATED_DISTANCE(state, payload) {
    state.accumulatedDistance += payload;
  },
  CLEAR_ACCUMULATED_DISTANCE(state) {
    state.accumulatedDistance = 0;
  },
};
