<template>
  
  <div align=center id="nav">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style>
h1{
  text-align: center;
}
body{
  overflow-y: scroll;
}
</style>
