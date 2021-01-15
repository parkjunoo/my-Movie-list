<template>
  <div class="movieList">
    <div class="searchbar"  @keyup="event">
      <input v-on:input="typing" v-bind:value="keyword" placeholder="검색어를 입력하세요" autofocus/>
    </div>
    <p></p>
    <button v-on:click="openNew">추가</button>
    <p></p>
    <li v-for = "item in movieList" v-bind:key = "item._id">
      <MovieCard :movie="item" @updateList="listUpdate" ></MovieCard>
    </li>
  </div>
</template>

<script>
import MovieCard from './MovieCard'
import axios from 'axios';
export default {
  components:{
    MovieCard
  },
  name: 'HelloWorld',
  data(){
    return{
      movieList: [],
      keyword: ""
    }
  },
  mounted() {
    listUpdate();
  },
  methods: {
    typing(e) {
      this.keyword = e.target.value
        if(this.keyword == ""){
          this.movieList = [];
        }
        console.log(this.keyword);
    },
    event(){
      console.log("입력 : " + this.keyword);
      axios.get('/movies/' + this.keyword, {
        }).then(res =>{
          this.movieList = res.data;
          console.log(res.data);
      })
    },
    listUpdate(){
      axios.get('/movies').then(res =>{
      this.movieList = res.data; 
      })
    }
  },
}
</script>

<style>
  li{
   list-style:none;
  }
  .movieList{
     text-align: center;
  }
</style>
