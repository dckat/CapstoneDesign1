export const state = () => ({
  codes: [],
});

export const getters = {
  getCodes: (state) => state.codes,
};

export const actions = {
  fetchCodes(context) {
    return new Promise((resolve, reject) => {
      context.commit('DEL_CODES');
      this.$axios.get('/api/code/list')
        .then((r) => {
          const result = r.data;
          context.commit('SET_CODES', result);
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export const mutations = {
  SET_CODES(state, payload) {
    state.pageData = payload;
  },
  DEL_CODES(state) {
    state.pageData = null;
  },
};
