<template>
  <table border="1">
  <tr>
    <td rowspan="5"><img class="stillshot" :src="$props.movie.movie_stillshot"></td>
    <td class="table_modi" colspan="2" align=right><button v-on:click="updateMovie">수정</button><button v-on:click="deleteMovie($props.movie._id)">삭제</button></td>
  </tr>
  <tr>
    <td class="table_movie_title" colspan="2" align=center>{{$props.movie.movie_title}}{{$props.movie.movie_age}}</td>
  </tr>
  <tr>
    <td class="table_movie_score" colspan="2">{{$props.movie.movie_score}}</td>
  </tr>
  <tr>
    <td class="table_movie_published" colspan="2">{{$props.movie.movie_published}}</td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
</table>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MovieCard',
  props: ['movie'],
  data(){
    return{
      updateList : []
    }
  },
  mounted() {
      console.log(this.$props.movie)
  },
  methods: {
    deleteMovie(id){
      axios.delete('/movies/' + id).then(res =>{
        console.log("삭제됨");
        this.$emit('updateList', this.updateList);
      })
    },
    updateMovie(){

      
      
    }
    
  },
}
</script>

<style>
  .stillshot{
    width: 150px;
    height: 195px;
  }
  .movieList{
    width: 1500px;
  }
  table{
    width: 600px;
    height: 200px;
    display: inline-block;
  }
  tr{
    object-fit: cover;
  }
  .table_movie_score, .table_movie_published, .table_modi{
    width: 450px;
  }
</style>
