import { createStore } from 'vuex'
import { getMovies } from '@/services/api.service.js'

export default createStore({
    state: {
        movies: [],
        currentPage: 1
    },
    mutations: {
        setMovies: (state, data) => (state.movies = data),
        setCurrentPage: (state, page) => (state.currentPage = page),
    },
    actions: {
        async fetchMovies({ commit }, page) {
            try {
                const response = await getMovies(page);
                commit('setMovies', response.data);
            } catch (error) {
                console.error(error);
            }
        },
        updateCurrentPage({ commit }, page) {
            commit('setCurrentPage', page)
        },
    }
})