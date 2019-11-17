import axios from "axios";

export default {
  state: {
    albums: [],
    loading: false
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
        const res = await axios.get("/albums/myAlbums");
        if (res.status === 200) {
          commit("SET_ALBUMS", res.data.albums);
          commit("SET_LOADING", false);
          return res;
        }
      } catch (error) {
        console.log("Error : ", error);
      }
      commit("SET_LOADING", false);
    },
    async AddAlbum({ commit, dispatch }, name) {
      try {
        const res = await axios.post("/albums", name);
        if (res.status === 201) {
          return await dispatch("GetAlbums");
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    }
  },
  namespaced: true
};
