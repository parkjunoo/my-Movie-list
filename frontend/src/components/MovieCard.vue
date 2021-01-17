<template>
  <div >
  <div align="center" v-if="this.description" @click="this.summary" class="story_Box"></div>
  <table v-else @click="this.summary" >  
  <tr>
    <td rowspan="5"><img class="stillshot" :src="`/image/${this.thumbnail}`"></td>
    <td class="table_movie_title" colspan="2">{{$props.movie.movie_title}}<img class="age_img" :src="`/static/${$props.movie.movie_age}.png`"></td>
    <td rowspan="5" align=right valign=top ><button class="tools_table" v-if="state.login" t v-on:click="handleClickButton($props.movie)">수정</button>
      <button class="tools_table" v-if="state.login" v-on:click="deleteMovie($props.movie._id)">삭제</button></td>
  </tr>
  <tr>
    <td class="table_movie_score" colspan="2">{{$props.movie.movie_score}}</td>
  </tr>
  <tr>
    <td class="table_movie_published" colspan="2">{{$props.movie.movie_published}}</td>
  </tr>
  <tr align="left">
    <td class="table_modi" colspan="2">
      <span v-for="item in stillShotList" :key="item._id">
        <img v-on:click="changeThumbNail(item.movie_stillshot)" class="mini-Thumbnail" :src="this.path + item.movie_stillshot">
      </span>
    
    </td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>

</table>
</div>
</template>

<script>
import RegisterMovie from './RegisterMovie'
import axios from 'axios';
export default {
  name: 'MovieCard',
  props: ['movie','state'],
  components:{
    RegisterMovie
  },
  data(){
    return{
      thumbnail : "",
      updateList : [],
      stillShotList : [],
      path : "/image/",
      visible: false,
      description: false
    }
  },
  mounted() {
    axios.get('/stillshot/' + this.$props.movie._id).then(res =>{
      this.stillShotList = res.data;
      this.thumbnail = this.stillShotList[0].movie_stillshot;
      this.stillShotList.shift();
    })
  },
  methods: {
    summary(){
      this.description = !this.description;
    },
    deleteMovie(id){
      axios.delete('/movies/' + id).then(res =>{
        this.$emit('updateList', this.updateList);
        
      })
    },
    updateMovie(id){
      this.handleClickButton()
    },
    changeThumbNail(src){
      let temp = this.thumbnail;
      this.thumbnail = src; 
    },
    handleClickButton(e){
      this.$emit('update', e);
    }
  },
  
}
</script>

<style>
  .body{
    background-color: #898b91 ;
  }
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
    border: 1px solid #444444;
    margin: 0px;
    padding: 0px;

  }
  tr{
    object-fit: cover;
  }
  .table_movie_score, .table_movie_published, .table_modi{
    width: 450px;
  }
  .mini-Thumbnail{
    text-align: left;
    width: 85px;
    height: 110px;
    max-height: 100%;
    margin-right: 5px;
  }
  .story_Box{
    margin-top: 2px;
    margin: 0 auto;
    text-align: center;
    width: 600px;
    height: 205px;
    background-color: white;
  }
  .tools_table{
    
    float: left;
  
  }
  .age_img{
    width: 20px;
    height: 20px;
  }
</style>
