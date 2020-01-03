<template>
  <v-container>
    <!-- <v-layout align-center justify-center fill-height> -->
    <v-navigation-drawer width="190" v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile @click="loadDashboardPage">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left dense>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <!-- mine rjoshi-->
      <v-toolbar-items class="hidden-xs-only" v-if="!isUserLoggedIn">
        <v-btn
          small
          flat
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          @click="handleRegisterAndLogin(item.title)"
        >
          <v-icon right>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-xs-only" v-else>
        <v-btn small flat @click="logoutFromFirebase">
          <v-icon right>delete_sweep</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <RegistrationForm></RegistrationForm>
    <SigninForm></SigninForm>
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
// import AppRegister from '@/components/auth/AppRegister.vue';
import RegistrationForm from '@/views/RegistrationForm.vue';
import SigninForm from '@/views/SigninForm.vue';

import { mapState } from 'vuex';

export default {
  data: () => ({
    drawer: null
  }),

  props: {
    source: String
  },
  components: {
    RegistrationForm,
    SigninForm
  },
  computed: {
    ...mapState(['userLoginDialog']),
    items() {
      let menuItems = [
        {
          title: 'Register',
          icon: 'face',
          link: '/register'
        },
        {
          title: 'Login',
          icon: 'no_encryption',
          link: '/signin'
        }
      ];
      return menuItems;
    },

    isUserLoggedIn() {
      return this.$store.getters.user;
    }
  },

  methods: {
    logoutFromFirebase() {
      console.log('LOGOUT METHOD');
      this.$store.dispatch('signOutAction');
    },

    handleRegisterAndLogin(itemKey) {
      if (itemKey == 'Login') {
        this.$store.dispatch('userLoginDialogAction', true);
      } else if (itemKey == 'Register') {
        this.$store.dispatch('userRegistrationDialogAction', true);
      }
    },

    loadDashboardPage() {
      this.$router.push('/dashboard');
    }
  }
};
</script>
