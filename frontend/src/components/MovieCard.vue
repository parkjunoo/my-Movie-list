<template>
  <div >
  <div  align="center" v-if="this.description" @click="this.summary" class="story_Box">
    <h5>줄거리</h5>
    <hr>
    {{$props.movie.movie_description}}
    <hr>
  </div>
  <table v-else >  
  <tr>
    <td rowspan="5"><img class="stillshot" :src="`/image/${this.thumbnail}`"></td>
    <td @click="this.summary" class="table_movie_title" colspan="2">{{$props.movie.movie_title}}
      <img class="age_img" :src="`/static/${$props.movie.movie_age}.png`"></td>
    <td rowspan="5" align=right style = "white-space : nowrap" valign=top>
      <div class="tools"><div class="tools_edit" v-if="state.login" t v-on:click="handleClickButton($props.movie)">✏️</div>
      <div class="tools_delete" v-if="state.login" v-on:click="deleteMovie($props.movie._id)">🗑</div></div></td>
  </tr>
  <tr @click="this.summary">
    <td  class="table_movie_score" colspan="2">
      <div class ="star-box">
        <div class="wrap-star">
          <div class='star-rating'>
            <span :style ="`width:${$props.movie.movie_score/10*100}%`"></span>
          </div>
        </div>
      </div>
      {{$props.movie.movie_score}}
    </td>
  </tr>
  <tr @click="this.summary">
    <td class="table_movie_published" colspan="2">{{$props.movie.movie_published}}</td>
  </tr>
  <tr align="left">
    <td valign=bottom border="0" class="table_modi" colspan="2">
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
      this.handleClickButton(id)
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
    background-color: #f0f0f0;

  }
  tr{
    object-fit: cover;
  }
  .table_movie_score, .table_movie_published, .table_modi{
    font-weight: 700;
    width: 450px;
  }
  .mini-Thumbnail{
    text-align: left;
    width: 85px;
    height: 112px;
    max-height: 100%;
    margin-right: 2px;
  }
  .story_Box{
    margin-top: 2px;
    margin: 0 auto;
    text-align: center;
    width: 600px;
    height: 205px;
    background-color: white;
    overflow-y: scroll;
    
  }
  .tools_edit, .tools_delete{
    height: 22px;
    width: 22px;
    margin: 2px;
    display: inline-block;
    cursor: pointer;
  }
  .age_img{
    width: 20px;
    height: 20px;
  }
  .tools {
    display: inline-block;
  }
  .table_movie_title{
    font-weight: 1000;
  }
  .star-box{
    margin-left: 130px;
    align-items: center;
    width: 100px;
  }
  .star-rating {width:122px; float: left; }
  .star-rating,.star-rating span {display:inline-block; height:22px; overflow:hidden; background:url(/static/star.png)no-repeat; float: left;  }
  .star-rating span{background-position:left bottom; line-height:0; vertical-align:top; float: left;  }
  
</style>
