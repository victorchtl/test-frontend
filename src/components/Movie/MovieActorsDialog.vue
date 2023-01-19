<template lang="">
    <v-dialog v-model="dialog" width="fit-content">
        <template v-slot:activator="{ props }">
            <!-- Dialog Opening Button -->
            <v-btn
                :style="{ 'font-size': '7px', 'padding':'4px' }"
                icon="mdi-pencil"
                color="primary"
                size="extrasmall"
                v-bind="props"
            >
            </v-btn>
        </template>
        <!-- Dialog Content -->
        <v-card>
            <!-- Close Dialog Button -->
            <div class="d-flex justify-end">
                <v-btn
                    icon="mdi-close"
                    color="primary"
                    size="medium"
                    class="ma-2"
                    @click="closeDialog"
                >
                </v-btn>
            </div>
            <!-- New Actors -->
            <div class="d-flex align-center justify-center ma-10" :style="{cursor:'pointer'}">
                <v-col v-for="actor in actorsToRemove" :key="actor.id" cols="auto">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <ActorCard
                            v-bind="props"
                            :firstName="actor.first_name"
                            :lastName="actor.last_name"
                            :style="isHovering?{filter:'opacity(.5)'}:undefined"
                            @click="switchActor(actor)"
                            />
                        </template>
                    </v-hover>
                </v-col>
                <v-col v-for="actor in actorsToAdd" :key="actor.id" cols="auto">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <ActorCard
                            v-bind="props"
                            :firstName="actor.first_name"
                            :lastName="actor.last_name"
                            avatarColor="grey"
                            :style="isHovering?{filter:'opacity(.5)'}:undefined"
                            @click="switchActor(actor)"
                            />
                        </template>
                    </v-hover>
                </v-col>
            </div>
            <!-- Edit Actors Button -->
            <v-card-actions>
                <v-btn
                    variant="flat"
                    color="primary"
                    block
                    @click="updateMovieActors"
                >
                    Edit Movie Actors
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { updateMovie } from '@/services/api.service.js'
import ActorCard from '@/components/shared/ActorCard.vue'
export default {
    data() {
        return {
            dialog: false,
            actorsToAdd: [],
            actorsToRemove: [],
        }
    },
    components: {
        ActorCard
    },
    computed: {
        ...mapState(['movies', 'currentPage', 'actors']),
        movieDetails() {
            const id = this.$route.params.id
            return this.movies.results.find(obj => obj.id == id)
        },
        movieActors() {
            return this.actors.filter(object => this.movieDetails.actors.includes(object.id));
        },
        nonMovieActors() {
            return this.actors.filter(object => !this.movieDetails.actors.includes(object.id));
        }
    },
    methods: {
        ...mapActions(['fetchMovies']),

        async updateMovieActors() {
            try {
                const newActorsData = {
                    actors: this.actorsToAdd
                }
                const id = this.$route.params.id
                await updateMovie(id, newActorsData)
                this.fetchMovies(this.currentPage)
                this.closeDialog()
            } catch (error) {
                console.log(error)
                this.actorsToRemove = this.actors.filter(object => this.movieDetails.actors.includes(object.id))
                this.actorsToAdd = this.actors.filter(object => !this.movieDetails.actors.includes(object.id))
                this.closeDialog()
            }
        },
        closeDialog() {
            this.dialog = false
        },
        switchActor(actor) {
            if (this.actorsToAdd.includes(actor)) {
                this.actorsToAdd = this.actorsToAdd.filter(obj => obj.id != actor.id);
                this.actorsToRemove = [...this.actorsToRemove, actor]
            } else {
                this.actorsToRemove = this.actorsToRemove.filter(obj => obj.id != actor.id);
                this.actorsToAdd = [...this.actorsToAdd, actor]
            }

        }
    },
    mounted() {
        this.actorsToRemove = this.actors.filter(object => this.movieDetails.actors.includes(object.id))
        this.actorsToAdd = this.actors.filter(object => !this.movieDetails.actors.includes(object.id))
    }
}
</script>