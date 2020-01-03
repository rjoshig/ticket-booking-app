<template>
  <!-- <div id="app">
	<v-app id="inspire">-->
  <v-container align-center>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout row v-if="item.heading" align-center :key="item.heading">
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }} 1</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click>
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }} 4</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-list-tile
            v-else
            @click="handleSidebarMenuClick(item.text)"
            :key="item.text"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }} 3</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dense dark :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>

        <span class="hidden-sm-and-down">Ticketing App</span>
      </v-toolbar-title>

      <v-toolbar-items class="hidden-xs-only" v-if="!isUserLoggedIn">
        <v-btn
          small
          flat
          v-for="toolbarItem in toolbarItems"
          :key="toolbarItem.title"
          :to="toolbarItem.link"
          @click="handleRegisterAndLogin(toolbarItem.title)"
        >
          <v-icon right>{{ toolbarItem.icon }}</v-icon>
          {{ toolbarItem.title }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-else>
        <v-btn small flat @click="logoutFromFirebase">
          <v-icon right>delete_sweep</v-icon>Logout
        </v-btn>
      </v-toolbar-items>

      <v-text-field
        flat
        solo-inverted
        append-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify"
          />
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title"
          >Create contact</v-card-title
        >
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt
                  />
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field placeholder="Job title"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <!-- </v-app>
	</div>-->
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    dialog: false,
    drawer: true,
    items: [
      { icon: 'dashboard', text: 'Dashboard' },
      { icon: 'event', text: 'Schedules' },
      { icon: 'content_copy', text: 'Duplicates' },

      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Labels',
        model: true,
        children: [{ icon: 'add', text: 'Create label' }]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' }
        ]
      },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Send feedback' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Go to the old version' }
    ]
  }),

  props: {
    source: String
  },

  computed: {
    ...mapState(['userLoginDialog']),
    toolbarItems() {
      const menuItems = [
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

    handleSidebarMenuClick(itemKey) {
      //Define key in the array and pass that down here, use that to match the route

      switch (itemKey) {
        case 'Dashboard':
          this.$router.push('/dashboard');
          break;
        case 'Schedules':
          this.$router.push('/schedules');
          break;
        case 'Settings':
          this.$router.push('/settings');
          break;

        default:
          this.$router.push('/');
      }
    }
  }
};
</script>
