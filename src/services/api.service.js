import Axios from '@/services/axios.service.js'

export const getMovies = (page) => Axios.get(`/movies/?page=${page}`)

export const updateMovie = (id, data) => Axios.put(`/movie/${id}`, data)

export const postRating = (data) => Axios.post('/reviews/', data)

export const getActors = (page) => Axios.get(`/actors/?page=${page}`)