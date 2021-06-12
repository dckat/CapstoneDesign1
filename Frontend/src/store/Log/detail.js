export const state = () => ({
  detailData: null,
});

export const getters = {
  getDetailData: (state) => state.detailData,
};

export const actions = {
  fetchDetailData(context, id) {
    return new Promise((resolve, reject) => {
      context.commit('CLEAR_DETAIL_DATA');
      this.$axios.get(`/api/log/${id}`)
        .then((r) => {
          context.commit('SET_DETAIL_DATA', r.data);
          resolve(r.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export const mutations = {
  SET_DETAIL_DATA(state, payload) {
    state.detailData = payload;
  },
  CLEAR_DETAIL_DATA(state) {
    state.detailData = null;
  },
};
