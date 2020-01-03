<template>
  <v-app>
    <!-- <v-content>
		<v-container fluid fill-height>-->
    <!-- <v-layout align-center justify-center> -->
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark dense>
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              prepend-icon="person"
              v-model="email"
              label="Email*"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="password"
              label="Password*"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-form>
          <small>* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeUserLoginDialog"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            flat
            :loading="userLoginSubmitButtonLoading"
            :disabled="userLoginSubmitButtonLoading"
            @click="submitLoginForm"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
    <!-- </v-layout> -->
    <!-- </v-container>
		</v-content>-->
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    passwordShow: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [v => !!v || 'Password is Required']
  }),
  computed: {
    ...mapState(['userLoginDialog', 'userLoginSubmitButtonLoading', 'error'])
  },

  methods: {
    submitLoginForm() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('signInAction', user);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    closeUserLoginDialog() {
      this.$store.dispatch('userLoginDialogAction', false);
    }
  }
};
</script>
