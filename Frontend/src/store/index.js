export const state = () => ({
  settings: {},
});

export const getters = {
  getSettings: (state) => state.settings,
};

export const actions = {
  setSettings(context, params) {
    context.commit('CHANGE_SETTINGS', params);
  },
  async nuxtServerInit({ dispatch }, ctx) {
    dispatch('Code/fetchCodes');
  },
};

export const mutations = {
  CHANGE_SETTINGS(state, payload) {
    state.settings = payload;
  },
};
