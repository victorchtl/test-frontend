<template lang="">
    <v-snackbar
          v-model="error.isError"
          timeout="-1"
          location="top"
          color="error"
          variant="flat"
        >
          {{error.message}}
    
          <template v-slot:actions>
            <v-btn
              color="white"
              variant="text"
              @click="close()"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </template>
    <script>
    import { mapActions, mapState } from 'vuex';
    
    export default {
        data: () => ({
            snackbar: true,
            timeout: 2000,
        }),
        computed:{
            ...mapState(['error'])
        },
        methods:{
            ...mapActions(['updateError']),
            close() {
                this.updateError({isError:false, message:''})
                this.snackbar = false
            }
        }
    }
    </script>