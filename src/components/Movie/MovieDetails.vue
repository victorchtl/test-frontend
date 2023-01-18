<template lang="">
    <v-main justify="center">
        <v-container>
            <v-row>
                <!-- Movie Image -->
                <v-col cols="12" sm="5" md="4" lg="4" xl="3">
                    <v-img
                        class="bg-surface rounded"
                        width="100%"
                        :aspect-ratio="2/3"
                        src='@/assets/images/no_image_available_dark.png'
                        cover
                    ></v-img>
                </v-col>
                <!-- Movie Informations -->
                <v-col>
                    <div class="d-flex flex-column">
                        <!-- Movie Title and Avg Rating -->
                        <div class="d-flex align-center">
                            <p class="font-weight-bold text-h4 text-uppercase mr-3">
                                {{movieDetails.title}}
                            </p>
                            <v-rating
                                v-model="rating"
                                density="compact"
                                color="primary"
                                size="small"
                                readonly
                                half-increments
                            ></v-rating>
                        </div>
                        <!-- Movie Add New Rating Button and Dialog -->
                        <div>
                            <MovieRatingDialog />
                        </div>
                        <!-- Movie Description and Edit Description -->
                        <div class="d-flex align-center mt-5">
                            <p class="font-weight-regular text-overline mr-2">
                                Resume
                            </p>
                            <v-btn
                                v-if="!isDescriptionEdit"
                                :style="{ 'font-size': '10px', 'padding':'4px' }"
                                icon="mdi-pencil"
                                color="primary"
                                size="extrasmall"
                                @click="toggleDescriptionEdit()"
                            >
                            </v-btn>
                        </div>
                        <p v-if="!isDescriptionEdit" class="font-weight-regular text-body-2">
                            {{movieDetails.description}}
                        </p>
                        <div v-else>
                            <v-textarea
                                class="mt-2"
                                name="input-7-1"
                                variant="outlined"
                                label="Edit Description"
                                auto-grow
                                v-model='newDescription'
                            ></v-textarea>
                            <div class="d-flex justify-end">
                                <v-btn variant="flat" size="x-small" color="warning" @click="cancelDescriptionEdit()" class="mr-2">cancel</v-btn>
                                <v-btn variant="flat" size="x-small" color="success" @click="updateDescription()">edit</v-btn>
                            </div>
                        </div>
                        <!-- Movie Actors -->
                        <p class="font-weight-regular text-overline mt-5">
                            Actors
                        </p>
                    </div>      
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import MovieRatingDialog from '@/components/Movie/MovieRatingDialog.vue'
export default {
    data() {
        return {
            isDescriptionEdit: false,
            newDescription: ''
        }
    },
    components:{
        MovieRatingDialog
    },
    computed: {
        ...mapState(['movies']),
        movieDetails() {
            const id = this.$route.params.id
            return this.movies.results.find(obj => obj.id == id)
        },
        rating() {
            return parseFloat(this.movieDetails.avg_grade)
        }
    },
    methods: {
        ...mapActions(['fetchMovies']),
        toggleDescriptionEdit() {
            this.isDescriptionEdit = !this.isDescriptionEdit
        },
        cancelDescriptionEdit() {
            this.newDescription = this.movieDetails.description
            this.toggleDescriptionEdit()
        },
        updateDescription() {

        }
    },
}
</script>
<style lang="">
    
</style>