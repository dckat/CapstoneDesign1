export const state = () => ({
  makers: [],
  makerDroneList: [],
  // modelNameList: [],
});

export const getters = {
  getMakers: (state) => state.makers,
  getMakerDroneList: (state) => state.makerDroneList,
  // getModelNameList: (state) => state.modelNameList,
};

export const actions = {
  setMakers(context, data) {
    context.commit('DEL_MAKERS');
    context.commit('SET_MAKERS', data);
  },
};

export const mutations = {
  SET_MAKERS(state, payload) {
    state.makers = Object.keys(payload);
    Object.entries(payload).forEach(([key, value]) => {
      state.makerDroneList.push({ maker: key, children: value });
      // state.modelNameList = [...state.modelNameList, ...value];
    });
  },
  DEL_MAKERS(state) {
    state.makers = [];
    state.makerDroneList = [];
    // state.modelNameList = [];
  },
};
