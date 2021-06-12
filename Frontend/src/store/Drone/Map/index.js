/* eslint-disable no-underscore-dangle */
export const state = () => ({
  zoomLevel: 16,
  boundary: {
    northEast: {},
    southWest: {},
  },
  stateChange: false,
});

export const getters = {
  getZoomLevel: (state) => state.zoomLevel,
  getBoundary: (state) => state.boundary,
  getStateChange: (state) => state.stateChange,
  isBoundary: (state) => (drone) => {
    const checkLatBound = drone.latitude >= state.boundary.southWest.lat && drone.latitude <= state.boundary.northEast.lat;
    const checkLngBound = drone.longitude >= state.boundary.southWest.lng && drone.longitude <= state.boundary.northEast.lng;
    return checkLatBound && checkLngBound;
  },
  zoomToActivateTime: (state) => {
    switch (state.zoomLevel) {
    case 8:
      return 30;
    case 9:
      return 15;
    case 10:
      return 10;
    case 11:
      return 6;
    case 12:
      return 4;
    case 13:
      return 3;
    case 14:
      return 2;
    default:
      return 1;
    }
  },
};

export const actions = {
  setZoomLevel(context, data) {
    context.commit('SET_ZOOM_LEVEL', data);
  },
  setBoundary(context, data) {
    context.commit('SET_BOUNDARY', data);
  },
  clearZoomLevel(context) {
    context.commit('DEL_ZOOM_LEVEL');
  },
  clearBoundary(context) {
    context.commit('DEL_BOUNDARY');
  },
  clearStateChange(context) {
    context.commit('RESET_STATE_CHANGE');
  },
};

export const mutations = {
  SET_ZOOM_LEVEL(state, payload) {
    state.zoomLevel = payload;
    state.stateChange = true;
  },
  SET_BOUNDARY(state, payload) {
    state.boundary = { northEast: payload?._northEast, southWest: payload?._southWest };
    state.stateChange = true;
  },
  DEL_ZOOM_LEVEL(state) {
    state.zoomLevel = 16;
  },
  DEL_BOUNDARY(state) {
    state.boundary = {
      northEast: {},
      southWest: {},
    };
  },
  RESET_STATE_CHANGE(state) {
    state.stateChange = false;
  },
};
