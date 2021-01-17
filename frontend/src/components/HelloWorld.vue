<template>
  <div class="movieList">
    <div class="searchbar" @keyup="event">
      <input v-on:input="typing" v-bind:value="keyword" placeholder="제목을 입력하세요" autofocus/>
    </div>
    <p></p>
    <div class="login"><button v-if="this.state.login" @click="handleClickButton(0)">추가</button>
    <button class="admin" @click="login" >{{this.state.name}}</button></div>
    <p></p>
    <li v-for = "item in movieList" v-bind:key = "item._id">
      <MovieCard :state.sync="state" :movie="item" @updateList="listUpdate" @update="handleClickButton"></MovieCard>
    </li>
     <RegisterMovie :data="this.updateData" :title="this.action" :visible.sync="visible" @update:visible="handleClickButton" >
    </RegisterMovie>
  </div>
</template>

<script>
import MovieCard from './MovieCard';
import RegisterMovie from './RegisterMovie';
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
      stillShotList: "",
      visible: false,
      action : "",
      updateData: [],

      state: {
        login : false,
        name : ""
      }
    }
  },
  mounted() {
    if(localStorage.getItem('access_token') != null){
      this.state.login = true;
      this.state.name = "LogOut"
    }else{
      this.state.login = false;
      this.state.name = "LogIn"
    }
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
        console.log(this.movieList)
      })
    },
    handleClickButton(s){
     
      if(s == 0){
        this.action = "영화 추가하기";
      }else{
        this.action = "영화 수정하기";
        this.updateData = s;
      }
      
      this.visible = !this.visible
    },
    login(){
      if(this.state.login){
        localStorage.removeItem("access_token");
        alert("로그아웃 되었습니다.");
        this.$router.go(0);
        return;
      }

      let password = prompt("비밀번호를 입력해주세요.");
      axios.post('/admin/'+password).then(res =>{
        console.log(res)
        if(res.data === "success"){
          localStorage.setItem("access_token", res)
          this.$router.go(0);
        }else{
          alert("로그인 실패하였습니다.");
        }
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
  .login{
    margin-left: 260px;
    display: inline;
  }
  .admin{
    margin-left: 220px;
  }
</style>
