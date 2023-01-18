<template lang="">
    <v-main v-if="movies.count > 0">
        <v-container>
            <v-row justify='center'>
                <v-col
                    class="mt-2"
                    cols="12"
                >
                </v-col>
                <v-col
                    v-for="movie in movies.results"
                    :key="`${movie}`"
                    cols="2"
                    @click="navigateToMovieDetails(movie.id)"
                    v-bind:style="{ cursor: 'pointer' }"
                >
                    <MovieCard :title="movie.title"/>
                </v-col>
            </v-row>
        </v-container>
        <div class="text-center mt-10">
            <v-pagination
            size="30px"
            v-model="currentPageState"
            :length="totalPages"
            ></v-pagination>
        </div>
    </v-main>
    <v-main v-else>
        <v-container>
            <div class="d-flex justify-center">
                <p>
                    No Movies available
                </p>
            </div>
        </v-container>
    </v-main>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import MovieCard from '@/components/shared/MovieCard.vue'

export default {
    components: {
        MovieCard
    },
    computed: {
        ...mapState(['movies', 'currentPage']),
        currentPageState: {
            get() {
                return this.currentPage
            },
            set(value) {
                this.updateCurrentPage(value)
            }
        },
        totalPages() {
            if (this.movies.count > 0) return Math.ceil(this.movies.count / 5)
            else return 0
        }
    },
    methods: {
        ...mapActions(['fetchMovies', 'updateCurrentPage']),
        updateMoviesPage(pageNumber) {
            this.fetchMovies(pageNumber)
        },
        navigateToMovieDetails(id) {
            this.$router.push(`/movie/${id}`)
        }
    },
    mounted() {
        this.fetchMovies(1)
        this.updateCurrentPage(1)
    }
}
</script>
<style lang="">
    
</style>