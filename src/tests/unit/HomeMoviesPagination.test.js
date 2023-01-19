// Je n'ai pas réussi à installer vue-jest avec la version vuejs de ce projet, voici néanmoins quelques tests rédigés :

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import MovieCard from '@/components/shared/MovieCard.vue'
import HomeMoviesPagination from '@/components//Home/HomeMoviesPagination.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HomeMoviesPagination', () => {
    let wrapper
    let store
    let actions
    let state

    beforeEach(() => {
        actions = {
            fetchMovies: jest.fn(),
            updateCurrentPage: jest.fn()
        }
        state = {
            movies: {
                results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
                count: 2
            },
            currentPage: 1
        }
        store = new Vuex.Store({
            state,
            actions
        })
        wrapper = shallowMount(HomeMoviesPagination, {
            store,
            localVue,
            components: {
                MovieCard
            }
        })
    })

    it('should render the component', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('should call fetchMovies and updateCurrentPage when the component is mounted', () => {
        expect(actions.fetchMovies).toHaveBeenCalledWith(1)
        expect(actions.updateCurrentPage).toHaveBeenCalledWith(1)
    })

    it('should call updateMoviesPage when currentPageState is updated', () => {
        wrapper.vm.updateMoviesPage = jest.fn()
        wrapper.setData({ currentPageState: 2 })
        expect(wrapper.vm.updateMoviesPage).toHaveBeenCalledWith(2)
    })

    it('should navigate to movie details when a movie is clicked', () => {
        const navigateToMovieDetails = jest.fn()
        wrapper.setMethods({ navigateToMovieDetails })
        wrapper.findAllComponents(MovieCard).at(0).vm.$emit('click')
        expect(navigateToMovieDetails).toHaveBeenCalledWith(1)
    })

    it('should calculate the correct number of totalPages', () => {
        expect(wrapper.vm.totalPages).toEqual(1)
        wrapper.setData({
            movies: {
                results: [],
                count: 0
            }
        })
        expect(wrapper.vm.totalPages).toEqual(0)
    })
})