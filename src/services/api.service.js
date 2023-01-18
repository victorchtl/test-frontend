import Axios from '@/services/axios.service.js'

export const getMovies = (page) => Axios.get(`/movies/?page=${page}`)

export const postRating = (data) => Axios.post('/reviews/', data)

export const getActors = (page) => Axios.get(`/actors/?page=${page}`)