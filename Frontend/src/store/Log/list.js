export const state = () => ({
  listContents: [],
});

export const getters = {
  getListContents: (state) => state.listContents,
};

export const actions = {
  /* params는 page.js의 pageParams 프로퍼티 중 size, no, total을 제외한 것 */
  fetchListContents(context, params) {
    return new Promise((resolve, reject) => {
      context.commit('CLEAR_LIST_DATA');
      this.$axios.get('/api/log/list', {
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
};

export const mutations = {
  SET_LIST_DATA(state, payload) {
    state.listContents = payload;
  },
  CLEAR_LIST_DATA(state) {
    state.listContents = [];
  },
  N_MGR_LIST(state) {
  },
};
