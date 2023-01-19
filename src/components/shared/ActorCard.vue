<template lang="">
    <div class="d-flex flex-column justify-center align-center text-center">
        <v-avatar :color="avatarColor" size="x-small">
            <v-icon size="x-small">mdi-account-circle</v-icon>
        </v-avatar>
        <p class="font-weight-regular fontcolor-grey text-caption text-center text-grey mt-2">
            {{firstName}}
        </p>
        <p class="font-weight-regular text-caption text-center">
            {{lastName}}
        </p>
    </div>
</template>
<script>
export default {
    props:{
        firstName:{
            type:String,
            default:'-'
        },
        lastName:{
            type:String,
            default:'-'
        },
        avatarColor:{
            type:String,
            default:'primary'
        }
    }
}
</script>