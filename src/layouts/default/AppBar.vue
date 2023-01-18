<template>
    <v-app-bar flat>
        <template v-slot:prepend>
            <v-btn @click="navToHome">
                <v-icon size="x-large">mdi-home</v-icon>
            </v-btn>
        </template>
        <v-app-bar-title>Movie Reviews</v-app-bar-title>
        <template v-slot:append>
        </template>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        navToHome() {
            this.$router.push('/')
        }
    }
}
</script>