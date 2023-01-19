<template lang="">
    <v-dialog v-model="dialog" width="fit-content">
        <template v-slot:activator="{ props }">
            <!-- Dialog Opening Button -->
            <v-btn
                :style="{ 'font-size': '10px' }"
                variant="flat"
                color="primary"
                v-bind="props"
                size="x-small"
            >
                Add Rating
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
            <!-- New Rating -->
            <div class="d-flex flex-column align-center justify-center ma-10">
                <v-rating
                    v-model="newRating"
                    bg-color="orange-lighten-1"
                    color="primary"
                    half-increments
                ></v-rating>
                <p class="font-weight-regular text-p mt-5">
                    Rating : {{newRating}}
                </p>
            </div>
            <!-- Add Rating Button -->
            <v-card-actions>
                <v-btn
                    variant="flat"
                    color="primary"
                    block
                    @click="addNewRating"
                >
                    Add New Rating
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { postRating } from '@/services/api.service.js'
export default {
    data() {
        return {
            dialog: false,
            newRating: 3,
        }
    },
    computed: {
        ...mapState(['currentPage']),
    },
    methods: {
        ...mapActions(['fetchMovies', 'updateError']),
        async addNewRating() {
            try {
                const newRatingData = {
                    movie: parseInt(this.$route.params.id),
                    grade: parseInt(this.newRating)
                }
                await postRating(newRatingData)
                this.fetchMovies(this.currentPage)
                this.closeDialog()
            } catch (e) {
                console.log(e)
                this.updateError({ isError: true, message: e.message })
            }
        },
        resetNewRating() {
            this.newRating = 3
        },
        closeDialog() {
            this.resetNewRating()
            this.dialog = false
        }
    }
}
</script>