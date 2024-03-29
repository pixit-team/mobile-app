import axios from "axios";

export default {
  state: {
    albums: [],
    loading: false,
    added_photo: null
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
    ADDED_PHOTO(state, added_photo) {
      state.added_photo = added_photo;
    },
    RESET(state) {
      state.albums = [];
      state.loading = false;
      state.added_photo = null;
    }
  },
  actions: {
    async SetAddedPhoto({ commit }, added_photo) {
      commit("ADDED_PHOTO", added_photo);
    },
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
    },
    Reset({ commit }) {
      commit("RESET");
    }
  },
  namespaced: true
};
