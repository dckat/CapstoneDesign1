export const state = () => ({
  listContents: [],
  fixedDroneList: [],
});

export const getters = {
  getListContents: (state) => state.listContents,
  getFixedDroneList: (state) => state.fixedDroneList,
};

export const actions = {
  /* params는 page.js의 pageParams 프로퍼티 중 size, no, total을 제외한 것 */
  fetchListContents(context, params) {
    return new Promise((resolve, reject) => {
      context.commit('CLEAR_LIST_DATA');
      this.$axios.get('/api/drone/list', {
        params,
      })
        .then((r) => {
          context.commit('SET_LIST_DATA', r.data);
          resolve(r.data);
        })
        .catch((e) => {
          console.log(e.response);
          reject(e);
        });
    });
  },
  setFixedDroneList(context, data) {
    context.commit('SET_FIXED_DRONE_LIST', data);
  },
};

export const mutations = {
  SET_FIXED_DRONE_LIST(state, payload) {
    state.fixedDroneList = payload;
  },
  SET_LIST_DATA(state, payload) {
    state.listContents = payload.drones;
  },
  CLEAR_LIST_DATA(state) {
    state.listContents = [];
  },
};
