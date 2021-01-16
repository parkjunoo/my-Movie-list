<template>
  <div class="movieList">
    <div class="searchbar" @keyup="event">
      <input v-on:input="typing" v-bind:value="keyword" placeholder="제목을 입력하세요" autofocus/>
    </div>
    <p></p>
    <button @click="handleClickButton">추가</button>
    <p></p>
    <li v-for = "item in movieList" v-bind:key = "item._id">
      <MovieCard :movie="item" @updateList="listUpdate" ></MovieCard>
    </li>
     <RegisterMovie title="영화 등록하기" :visible.sync="visible" @update:visible="handleClickButton">
    </RegisterMovie>
  </div>
</template>

<script>
import MovieCard from './MovieCard'
import RegisterMovie from './RegisterMovie'
import axios from 'axios';
export default {
  components:{
    MovieCard,
    RegisterMovie
  },
  name: 'HelloWorld',
  data(){
    return{
      movieList: [],
      keyword: "",
      visible: false
    }
  },
  mounted() {
    this.listUpdate();
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
    },
    handleClickButton(){
      this.visible = !this.visible
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
