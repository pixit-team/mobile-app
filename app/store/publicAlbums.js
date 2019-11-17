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
    },
    RESET(state) {
      state.albums = [];
      state.loading = false;
    }
  },
  actions: {
    async GetAlbums({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await axios.get("/albums/");
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
    async JoinAlbum({ dispatch }, albumUuid) {
      try {
        const res = await axios.post(`/albums/${albumUuid}/join`);
        if (res.status === 200) {
          dispatch("GetAlbums");
          dispatch("userAlbums/GetAlbums", {}, { root: true });
          return res;
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    },
    Reset({ commit }) {
      commit("RESET");
    }
  },
  namespaced: true
};
