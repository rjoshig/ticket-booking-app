<template>
  <v-app id="inspire">
    <!-- display nav bar -->

    <nav-bar></nav-bar>

    <!-- <v-layout justify-center align-center> -->
    <v-flex shrink></v-flex>
    <!-- </v-layout> -->
    <v-content>
      <router-view></router-view>
      <!-- <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <Dashboard></Dashboard>
        </v-layout>
			</v-container>-->
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from '@/views/NavBar';

export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@import '~bootstrap/dist/css/bootstrap.css';
</style>
