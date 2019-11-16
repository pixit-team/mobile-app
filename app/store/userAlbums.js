import axios from "axios";

export default {
  state: {
    albums: [],
    loading: true
  },
  getters: {
    albums(state) {
      return state.albums;
    }
  },
  mutations: {
    SET_ALBUMS(state, albums) {
      state.albums = albums;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async GetAlbums({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await axios.get("/albums");
        if (res.status === 200) {
          console.log("SEting Albums");
          commit("SET_ALBUMS", res.data.albums);
          commit("SET_LOADING", false);
          return res;
        }
      } catch (error) {
        console.log("Error : ", error);
      }
      commit("SET_LOADING", false);
    }
  },
  namespaced: true
};
