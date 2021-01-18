<template>
  <div class="home">
    <h1>Movie List</h1>
    <MovieMain></MovieMain>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieMain from '@/components/MovieMain.vue'

export default {
  name: 'Home',
  components: {
    MovieMain
  }
}
</script>