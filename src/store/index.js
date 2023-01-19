import { createStore } from 'vuex'
import { getMovies, getActors } from '@/services/api.service.js'

export default createStore({
    state: {
        movies: [],
        currentPage: 1,
        actors:[]
    },
    mutations: {
        setMovies: (state, data) => (state.movies = data),
        setCurrentPage: (state, page) => (state.currentPage = page),
        setActors: (state, data) => (state.actors = data),
    },
    actions: {
        // Retrieve All Movies by pages of 5 items
        async fetchMovies({ commit }, page) {
            try {
                const response = await getMovies(page);
                commit('setMovies', response.data);
            } catch (error) {
                console.error(error);
            }
        },
        // Update current home pagination
        updateCurrentPage({ commit }, page) {
            commit('setCurrentPage', page)
        },
        // Retrieve all actors by looping over pages of 5 items
        async fetchActors({ commit }) {
            commit('setActors', [])
            let page = 1
            try {
                const res = await getActors(page)
                commit('setActors', res.data.results)
                const actorsPageNumbers = Math.ceil(res.data.count / 5)
                while (actorsPageNumbers > page) {
                    page++
                    try {
                        const resp = await getActors(page)
                        const newData = this.state.actors.concat(resp.data.results)
                        commit('setActors', newData)
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
})