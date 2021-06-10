/* eslint-disable no-param-reassign */
export const state = () => ({
  pageData: [],
  pageParams: {
    scheduleId: null,
    latitude: null,
    longitude: null,
    minVerticalSpeed: null,
    maxVerticalSpeed: null,
    minHorizontalSpeed: null,
    maxHorizontalSpeed: null,
    minAboveSeaLevel: null,
    maxAboveSeaLevel: null,
    minAboveGroundLevel: null,
    maxAboveGroundLevel: null,
    pageNo: 1,
    pageSize: 10,
    total: 0,
  },
});

export const getters = {
  getPageData: (state) => state.pageData,
  getPageParams: (state) => state.pageParams,
  getPagination: (state) => {
    const {total, pageSize} = state.pageParams;
    const page = state.pageParams.pageNo;
    return {total, pageSize, page};
  },
};

export const actions = {
  fetchPageData(context, params) {
    return new Promise((resolve, reject) => {
      context.commit('DEL_PAGE_DATA');
      this.$axios
        .get('/api/log/page', {
          params,
        })
        .then((r) => {
          const result = r.data;
          result.droneLogs.forEach((elem, idx) => {
            elem.no =
              result.totalElement - (result.pageNo * result.pageSize + idx);
          });
          context.commit('SET_PAGE_DATA', result);
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  setPageParams(context, data) {
    context.commit('SET_PAGE_PARAMS', data);
  },
  clearPageParams(context) {
    context.commit('DEL_PAGE_PARAMS');
  },
  setPagination(context, params) {
    context.commit('SET_PAGINATION', params);
  },
};

export const mutations = {
  SET_PAGE_DATA(state, payload) {
    state.pageData = payload.droneLogs;
    state.pageParams.total = Number(payload.totalElement);
    state.pageParams.pageNo = Number(payload.pageNo);
    state.pageParams.pageSize = Number(payload.pageSize);
  },
  DEL_PAGE_DATA(state) {
    state.pageData = [];
  },
  SET_PAGE_PARAMS(state, params) {
    state.pageParams = JSON.parse(JSON.stringify(params));
  },
  SET_PAGINATION: (state, data) => {
    state.pageParams.pageNo = data.page;
    state.pageParams.pageSize = data.size;
  },
  DEL_PAGE_PARAMS(state) {
    state.pageParams = {
      scheduleId: null,
      minSpeed: null,
      maxSpeed: null,
      minAltitude: null,
      maxAltitude: null,
      latitude: null,
      longitude: null,
      pageNo: 1,
      pageSize: 10,
      total: 0,
    };
  },
};
