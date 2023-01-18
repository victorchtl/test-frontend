<template lang="">
    <v-img
        class="bg-surface rounded"
        width="100%"
        :aspect-ratio="2/3"
        :src="imageUrl"
        cover
    ></v-img>
    <p class="font-weight-medium text-caption text-uppercase">
      {{title}}
    </p>
</template>
<script>
import movieImage from '@/assets/images/no_image_available_dark.png'
export default {
    props: {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: movieImage
    }
  }
}
</script>